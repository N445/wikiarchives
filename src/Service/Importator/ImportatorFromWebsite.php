<?php

namespace App\Service\Importator;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Repository\Catalog\CatalogRepository;
use App\Repository\Catalog\PictureRepository;
use App\Service\Catalog\PictureExifPopulator;
use App\Service\Catalog\Version\PictureVersionHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

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
    
    public function __construct(
        CatalogRepository      $catalogRepository,
        EntityManagerInterface $em,
        HttpClientInterface    $wikiarchivesClient,
        PictureRepository      $pictureRepository
    )
    {
        $this->catalogRepository = $catalogRepository;
        $this->em = $em;
        $this->wikiarchivesClient = $wikiarchivesClient;
        $this->pictureRepository = $pictureRepository;
    }
    
    public function import()
    {
        $this->init();
//        $this->setRoot();
//        $this->setCatalogs();
        $this->setPictures();
    }
    
    private function init()
    {
        $this->setFakeImages();
        dump($this->getFakeImages());
        die;
    
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
            $this->em->flush();
        }
    }
    
    private function setCatalogs()
    {
        $response = $this->wikiarchivesClient->request('GET', "https://wikiarchives.space/ws.php", [
            'query' => [
                'format' => 'json',
                'method' => 'pwg.categories.getList',
                'recursive' => 'true',
            ]
        ]);
        
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
            $newCatalog = (new Catalog())
                ->setPiwigoId($category['id'])
                ->setName($category['name'])
                ->setImageName($this->getFakeImages()[array_rand($this->getFakeImages())]);
            
            $this->catalogs[$newCatalog->getPiwigoId()] = $newCatalog;
            if ($parentId = $category['id_uppercat'] ?? null) {
                $parent = $this->catalogs[$parentId];
                $newCatalog->setParent($parent);
            } else {
                $newCatalog->setParent($this->root);
            }
            $this->em->persist($newCatalog);
        }
        $this->em->flush();
    }
    
    private function setPictures()
    {
        $infoPagination = $this->getInfoPagination();
        
        $nbPages = $infoPagination['nbPages'];
        $total = $infoPagination['total'];
        
        
        foreach (range(367, $nbPages) as $page) {
            dump($page . '/' . $nbPages);
            $response = $this->wikiarchivesClient->request('GET', "https://wikiarchives.space/ws.php", [
                'query' => [
                    'format' => 'json',
                    'method' => 'pwg.categories.getImages',
                    'recursive' => 'true',
                    'per_page' => 500,
                    'page' => $page,
                ]
            ]);
            
            if (200 !== $response->getStatusCode()) {
                dump('erreur d\'api');
                dump($response);
                die;
            }
            $responseArray = $response->toArray();
            $pictures = $responseArray['result']['images'];
            
            
            foreach ($pictures as $key => $pictureRaw) {
                if (array_key_exists($pictureRaw['id'], $this->pictures)) {
                    continue;
                }
                $pictureFake = $this->getFakeImages()[array_rand($this->getFakeImages())];
    
    
                $newFile = (new Picture\File())
                    ->setImageDimensions([$pictureRaw["width"] ?? 999, $pictureRaw["height"] ?? 666])
                    ->setImageMimeType("image/jpeg")
                    ->setImageOriginalName($pictureRaw['file'])
                    ->setImageSize(5000000)
                    ->setImageName($pictureFake);
    
    
                $newPicture = (new Picture())
                    ->setPiwigoId($pictureRaw['id'])
                    ->setFile($newFile)
                    ->setCreatedAt(new \DateTime($pictureRaw['date_available']));
    
                $newPicture->getValidatedVersion()
                           ->setName($pictureRaw['name'])
                           ->setDescription($pictureRaw['comment'])
                           ->setStatus(PictureVersionHelper::STATUS_ACCEPTED)
                ;
    
    
                PictureExifPopulator::populate($newPicture);
//                PictureContentPopulator::setContent($newPicture);
    
                if ($parentId = $pictureRaw['categories'][0]['id'] ?? null) {
                    $parent = $this->catalogs[$parentId];
                    $newPicture->setCatalog($parent);
                }
                $this->pictures[$newPicture->getPiwigoId()] = $newPicture;
                $this->em->persist($newPicture);
                dump(count($this->pictures) . '/' . $total);
                if ($key % 1000 === 0) {
                    dump('flush');
                    $this->em->flush();
                }
            }
            $this->em->flush();
        }
    }
    
    private function getInfoPagination()
    {
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
    }
    
    /**
     * @return array
     */
    public function getFakeImages(): array
    {
        return $this->fakeImages;
    }
    
    /**
     * @param array $fakeImages
     * @return ImportatorFromWebsite
     */
    public function setFakeImages(): ImportatorFromWebsite
    {
        $fakeImages = [
            'image-5.jpg',
            'image-4.jpg',
            'image-3.jpg',
            'image-2.jpg',
            'image-1.jpg',
        ];
        foreach ($fakeImages as $fakeImage) {
            $this->fakeImages[] = [
                'name' => $fakeImage,
                'exif' => PictureExifPopulator::getExifFromFile(__DIR__ . '/../../DataFixtures/images/' . $fakeImage)
            ];
        }
        return $this;
    }
}