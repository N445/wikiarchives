<?php

namespace App\Service\Importator;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Message\ImageDownload;
use App\Repository\Catalog\CatalogRepository;
use App\Repository\Catalog\PictureRepository;
use App\Service\Catalog\PictureExifPopulator;
use App\Service\Catalog\Version\PictureVersionHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\HttpClient\ResponseInterface;

class ImportatorFromWebsite
{
    public const DOMAIN = 'https://wikiarchives.space/';
    
    private array $pictures = [];
    private array $catalogs = [];
    private CatalogRepository $catalogRepository;
    private EntityManagerInterface $em;
    private HttpClientInterface $wikiarchivesClient;
    private ?Catalog $root;
    private PictureRepository $pictureRepository;
    private array $fakeImages = [];
    private FilesystemAdapter $cache;
    private MessageBusInterface $bus;
    
    public function __construct(
        CatalogRepository      $catalogRepository,
        EntityManagerInterface $em,
        HttpClientInterface    $wikiarchivesClient,
        PictureRepository      $pictureRepository,
        MessageBusInterface    $bus
    )
    {
        $this->catalogRepository = $catalogRepository;
        $this->em = $em;
        $this->wikiarchivesClient = $wikiarchivesClient;
        $this->pictureRepository = $pictureRepository;
        $this->cache = new FilesystemAdapter();
        $this->bus = $bus;
    }
    
    public function import()
    {
        $this->init();
        $this->setRoot();
        $this->setCatalogs();
        $this->setPictures();
    }
    
    private function init()
    {
        dump('init');
        $this->setFakeImages();
    
    
        foreach ($this->catalogRepository->findAll() as $catalog) {
            if ($piwigoId = $catalog->getPiwigoId()) {
                $this->catalogs[$piwigoId] = $catalog;
            }
        }
        foreach ($this->pictureRepository->findAll() as $picture) {
            if ($piwigoId = $picture->getPiwigoId()) {
                $this->pictures[$piwigoId] = $picture;
            }
        }
    }
    
    private function setRoot()
    {
        if (!$this->root = $this->catalogRepository->getRootOne()) {
            $this->root = (new Catalog())->setName(Catalog::ROOT);
            $this->em->persist($this->root);
    
            dump('create root');
            $this->em->flush();
        }
    }
    
    private function setCatalogs()
    {
        dump('setCatalogs');
        $response = $this->cache->get('import_catalogues', function (ItemInterface $item) {
            $item->expiresAfter(3600);
            return $this->wikiarchivesClient->request('GET', "https://wikiarchives.space/ws.php", [
                'query' => [
                    'format' => 'json',
                    'method' => 'pwg.categories.getList',
                    'recursive' => 'true',
                ]
            ]);
        });
    
        if (200 !== $response->getStatusCode()) {
            dump('erreur d\'api');
            dump($response);
            die;
        }
        $responseArray = $response->toArray();
    
        if ('ok' !== $responseArray['stat']) {
            dump('api not ok');
            dump($response);
            die;
        }
        if (!$categories = $responseArray['result']['categories']) {
            dump('pas de categories');
            dump($response);
            die;
        }
        
        foreach ($categories as $key => $category) {
            if (array_key_exists($category['id'], $this->catalogs)) {
                continue;
            }
    
            $fakeImage = $this->getFakeImages()[array_rand($this->getFakeImages())];
    
            $newCatalog = (new Catalog())
                ->setPiwigoId($category['id'])
                ->setName($category['name']);
    
            $this->catalogs[$newCatalog->getPiwigoId()] = $newCatalog;
            if ($parentId = $category['id_uppercat'] ?? null) {
                $parent = $this->catalogs[$parentId];
                $newCatalog->setParent($parent);
            } else {
                $newCatalog->setParent($this->root);
            }
            $this->em->persist($newCatalog);
        }
    
        dump('flush catalogs');
        $this->em->flush();
    }
    
    private function setPictures()
    {
//        $start = microtime(true);
        dump('setPictures');
        $infoPagination = $this->getInfoPagination();
    
        $nbPages = $infoPagination['nbPages'];
        $total = $infoPagination['total'];
    
        $i = 0;
    
        foreach (range(1, $nbPages) as $page) {
            dump('Page : ' . $page . ' sur ' . $nbPages);

//            $response = $this->cache->get('import_images_' . $page, function (ItemInterface $item) use ($page) {
//                $item->expiresAfter(36000);
//                return $this->getResponse($page);
//            });
    
            $response = $this->getResponse($page);
    
            if (200 !== $response->getStatusCode()) {
                dump('erreur d\'api');
                dump($response);
                die;
            }
            $responseArray = $response->toArray();
            $pictures = $responseArray['result']['images'];
    
            dump(count($pictures));
    
    
            foreach ($pictures as $key => $pictureRaw) {
                $i++;
                $raw_id = $pictureRaw['id'];
                $raw_width = $pictureRaw['width'] ?? null;
                $raw_height = $pictureRaw['height'] ?? null;
                $raw_hit = $pictureRaw['hit'];
                $raw_file = $pictureRaw['file'];
                $raw_name = $pictureRaw['name'];
                $raw_comment = $pictureRaw['comment'];
                $raw_date_creation = $pictureRaw['date_creation'];
                $raw_date_available = $pictureRaw['date_available'];
                $raw_page_url = $pictureRaw['page_url'];
                $raw_element_url = $pictureRaw['element_url'];
                $raw_categories = $pictureRaw['categories'];
        
                if (array_key_exists($raw_id, $this->pictures)) {
                    continue;
                }
        
                $newFile = (new Picture\File())
                    ->setImageDimensions([$raw_width, $raw_height])
                    ->setImageMimeType("image/jpeg")
                    ->setImageOriginalName($raw_file)
                    ->setImageName($raw_name);
        
        
                $newPicture = (new Picture())
                    ->setPiwigoId($pictureRaw['id'])
                    ->setFile($newFile)
                    ->setCreatedAt(new \DateTime($raw_date_available));
        
                $newPicture->getValidatedVersion()
                           ->setName($raw_name)
                           ->setDescription($raw_comment)
                           ->setStatus(PictureVersionHelper::STATUS_ACCEPTED)
                ;


//                PictureExifPopulator::populate($newPicture);
//                PictureContentPopulator::setContent($newPicture);
        
                if ($parentId = $raw_categories[0]['id'] ?? null) {
                    $parent = $this->catalogs[$parentId];
                    $newPicture->setCatalog($parent);
                    $this->em->persist($parent);
                }
                $this->pictures[$newPicture->getPiwigoId()] = $newPicture;
        
                $this->bus->dispatch(new ImageDownload($raw_id, $raw_element_url));
        
                $this->em->persist($newPicture);
        
                if ($i % 1000 === 0) {
                    dump(count($this->pictures) . '/' . $total);
                    dump('flush');
                    $this->em->flush();
                }
                if ($i === 1000) {
                    die;
                }
            }
    
            dump('flush');
            $this->em->flush();
        }

//        $time_elapsed_secs = microtime(true) - $start;
//        dump($time_elapsed_secs);
//        dump(new \DateInterval($time_elapsed_secs));
    }
    
    /**
     * @param int $page
     * @return ResponseInterface
     * @throws TransportExceptionInterface
     */
    private function getResponse(int $page): ResponseInterface
    {
        return $this->wikiarchivesClient->request('GET', "https://wikiarchives.space/ws.php", [
            'query' => [
                'format' => 'json',
                'method' => 'pwg.categories.getImages',
                'recursive' => 'true',
                'per_page' => 500,
                'page' => $page,
            ]
        ]);
    }
    
    private function getInfoPagination()
    {
        return $this->cache->get('import_pagination', function (ItemInterface $item) {
            $item->expiresAfter(3600);
            
            $response = $this->wikiarchivesClient->request('GET', "https://wikiarchives.space/ws.php", [
                'query' => [
                    'format' => 'json',
                    'method' => 'pwg.categories.getImages',
                    'recursive' => 'true',
                    'per_page' => 0,
                ]
            ]);
        
            if (200 !== $response->getStatusCode()) {
                dump('erreur d\'api');
                dump($response);
                die;
            }
            $responseArray = $response->toArray();
            $total = (int)$responseArray['result']['paging']['total_count'];
            return [
                'nbPages' => (int)ceil($total / 500),
                'total' => $total,
            ];
        });
    }
    
    /**
     * @return array
     */
    public function getFakeImages(): array
    {
        return $this->fakeImages;
    }
    
    /**
     * @return ImportatorFromWebsite
     */
    public function setFakeImages(): ImportatorFromWebsite
    {
        $finder = new Finder();
// find all files in the current directory
        $finder->files()
               ->in(__DIR__ . '/../../../public/uploads/picture/')
               ->name('aaa-test-image-*')
        ;
    
    
        /** @var SplFileInfo $image */
        foreach ($finder as $image) {
            $this->fakeImages[] = [
                'name' => $image->getRelativePathname(),
                'exif' => PictureExifPopulator::getExifFromFile($image->getPathname())
            ];
        }
        return $this;
    }
}