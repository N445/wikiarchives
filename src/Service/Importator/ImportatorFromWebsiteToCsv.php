<?php

namespace App\Service\Importator;

use App\Entity\Catalog\Catalog;
use App\Repository\Catalog\CatalogRepository;
use App\Repository\Catalog\PictureRepository;
use App\Service\Catalog\PictureExifPopulator;
use Doctrine\ORM\EntityManagerInterface;
use League\Csv\Writer;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ImportatorFromWebsiteToCsv
{
    public const DOMAIN = 'https://wikiarchives.space/';
    
    private int $pictures = 0;
    private array $rows = [];
    private CatalogRepository $catalogRepository;
    private EntityManagerInterface $em;
    private HttpClientInterface $wikiarchivesClient;
    private ?Catalog $root;
    private PictureRepository $pictureRepository;
    private array $fakeImages = [];
    private FilesystemAdapter $cache;
    private Writer $csvWriter;
    private KernelInterface $kernel;
    
    public function __construct(
        CatalogRepository      $catalogRepository,
        EntityManagerInterface $em,
        HttpClientInterface    $wikiarchivesClient,
        PictureRepository      $pictureRepository,
        KernelInterface        $kernel
    )
    {
        $this->catalogRepository = $catalogRepository;
        $this->em = $em;
        $this->wikiarchivesClient = $wikiarchivesClient;
        $this->pictureRepository = $pictureRepository;
        $this->cache = new FilesystemAdapter();
        $this->kernel = $kernel;
    }
    
    public function import()
    {
        $this->init();
        $this->setPictures();
        file_put_contents($this->kernel->getProjectDir() . '/var/piwigo-data.csv', $this->csvWriter->toString());
    }
    
    private function init()
    {
        dump('init');
        $csvPath = $this->kernel->getProjectDir() . '/var/piwigo-data.csv';
        
        $header = [
            'piwigoId',
            'width',
            'height',
            'mimeType',
            'originalName',
            'size',
            'createdAt',
            'name',
            'description',
            'catalogId',
            'exif_title',
            'exif_author',
            'exif_camera',
            'exif_caption',
            'exif_copyright',
            'exif_creationdate',
            'exif_credit',
            'exif_aperture',
            'exif_exposure',
            'exif_exposuremilliseconds',
            'exif_focallength',
            'exif_focaldistance',
            'exif_iso',
            'exif_colorspace',
            'exif_filesize',
            'exif_height',
            'exif_width',
            'exif_horizontalresolution',
            'exif_verticalresolution',
            'exif_headline',
            'exif_jobtitle',
            'exif_keywords',
            'exif_mimetype',
            'exif_orientation',
            'exif_software',
            'exif_source',
            'exif_gps',
            'exif_lat',
            'exif_lng',
        ];
        
        
        $this->csvWriter = Writer::createFromString();
        
//        $this->csvWriter->insertOne($header);
//        file_put_contents($csvPath, $this->csvWriter->toString());
    }
    
    private function setPictures()
    {
        dump('setPictures');
        $infoPagination = $this->getInfoPagination();
        
        $nbPages = $infoPagination['nbPages'];
        $total = $infoPagination['total'];
        
        
        foreach (range(21, $nbPages) as $page) {
            dump($page . '/' . $nbPages);
            
            $response = $this->cache->get('import_images_' . $page, function (ItemInterface $item) use ($page) {
                $item->expiresAfter(3600);
                return $this->wikiarchivesClient->request('GET', "https://wikiarchives.space/ws.php", [
                    'query' => [
                        'format' => 'json',
                        'method' => 'pwg.categories.getImages',
                        'recursive' => 'true',
                        'per_page' => 500,
                        'page' => $page,
                    ]
                ]);
            });
            
            if (200 !== $response->getStatusCode()) {
                dump('erreur d\'api');
                dump($response);
                die;
            }
            $responseArray = $response->toArray();
            $pictures = $responseArray['result']['images'];
            
            
            foreach ($pictures as $key => $pictureRaw) {
                $this->pictures++;
                
                $exif = $this->cache->get('import_images_exif' . $pictureRaw['id'], function (ItemInterface $item) use ($pictureRaw) {
                    $item->expiresAfter(3600);
                    return PictureExifPopulator::getExifFromUrl($pictureRaw['element_url']);
                });
                
                $row = [
                    'piwigoId' => $pictureRaw["id"],
                    'width' => $pictureRaw["width"],
                    'height' => $pictureRaw["height"],
                    'mimeType' => "image/jpeg",
                    'originalName' => $pictureRaw['file'],
                    'size' => 5000000,
                    'createdAt' => $pictureRaw['date_available'],
                    'name' => $pictureRaw['name'],
                    'description' => $pictureRaw['comment'],
                    'catalogId' => $pictureRaw['categories'][0]['id'] ?? null,
                    'exif_title' => $exif->getTitle(),
                    'exif_author' => $exif->getAuthor(),
                    'exif_camera' => $exif->getCamera(),
                    'exif_caption' => $exif->getCaption(),
                    'exif_copyright' => $exif->getCopyright(),
                    'exif_creationdate' => $exif->getCreationdate()?->format('Y-m-d H:i:s'),
                    'exif_credit' => $exif->getCredit(),
                    'exif_aperture' => $exif->getAperture(),
                    'exif_exposure' => $exif->getExposure(),
                    'exif_exposuremilliseconds' => $exif->getExposureMilliseconds(),
                    'exif_focallength' => $exif->getFocalLength(),
                    'exif_focaldistance' => $exif->getFocalDistance(),
                    'exif_iso' => $exif->getIso(),
                    'exif_colorspace' => $exif->getColorSpace(),
                    'exif_filesize' => $exif->getFileSize(),
                    'exif_height' => $exif->getHeight(),
                    'exif_width' => $exif->getWidth(),
                    'exif_horizontalresolution' => $exif->getHorizontalResolution(),
                    'exif_verticalresolution' => $exif->getVerticalResolution(),
                    'exif_headline' => $exif->getHeadline(),
                    'exif_jobtitle' => $exif->getJobTitle(),
                    'exif_keywords' => implode(';', $exif->getKeywords()),
                    'exif_mimetype' => $exif->getMimeType(),
                    'exif_orientation' => $exif->getOrientation(),
                    'exif_software' => $exif->getSoftware(),
                    'exif_source' => $exif->getSource(),
                    'exif_lat' => $exif->getLat(),
                    'exif_lng' => $exif->getLng(),
                ];
                
                $this->csvWriter->insertOne($row);
                
                dump($this->pictures . '/' . $total);
            }
            file_put_contents($this->kernel->getProjectDir() . '/var/piwigo-data.csv', $this->csvWriter->toString(),FILE_APPEND);
        }
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