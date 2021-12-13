<?php

    namespace App\Service\Catalog;

    use App\Entity\Catalog\Catalog;
    use App\Entity\Catalog\Picture;
    use App\Service\Cache\CacheHelper;
    use Liip\ImagineBundle\Imagine\Cache\CacheManager;
    use Symfony\Component\Cache\Adapter\FilesystemAdapter;
    use Symfony\Component\Cache\Adapter\TagAwareAdapter;
    use Symfony\Component\HttpFoundation\BinaryFileResponse;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\ResponseHeaderBag;
    use Symfony\Component\HttpFoundation\StreamedResponse;
    use Symfony\Component\HttpKernel\KernelInterface;
    use Symfony\Component\String\Slugger\AsciiSlugger;
    use Symfony\Contracts\Cache\ItemInterface;
    use Symfony\Contracts\HttpClient\HttpClientInterface;
    use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

    class PictureDownloadProvider
    {
        public const IS_LOCAL = true;
    
    
        public const  SQUARE = 'square';
        public const  SM = 'sm';
        public const  MD = 'md';
        public const  LG = 'lg';
        public const  VLG = 'vlg';
        public const  ORIGINAL = 'original';
    
        private UploaderHelper $uploaderHelper;
        private CacheManager $imagineCacheManager;
        private KernelInterface $kernel;
        private HttpClientInterface $client;

        public function __construct(
            UploaderHelper      $uploaderHelper,
            CacheManager        $imagineCacheManager,
            KernelInterface     $kernel,
            HttpClientInterface $client
        )
        {
            $this->uploaderHelper = $uploaderHelper;
            $this->imagineCacheManager = $imagineCacheManager;
            $this->kernel = $kernel;
            $this->client = $client;
        }

        public function catalog(Catalog $catalog)
        {
            $cache = new TagAwareAdapter(
                new FilesystemAdapter(),
            );
    
            return $cache->get(CacheHelper::CATALOG_DOWNLOAD . $catalog->getId(), function (ItemInterface $item) use ($catalog) {
                $item->expiresAfter(3600);
        
                CacheHelper::setTagsFromCatalog($item, $catalog);
        
                $zip = new \ZipArchive();
                $zipName = sprintf('%s.zip', (new AsciiSlugger())->slug($catalog->getName())->lower());
                $zipPath = $this->kernel->getProjectDir() . '/var/' . $zipName;
        
                $zip->open($zipPath, \ZipArchive::CREATE);
                foreach ($catalog->getPictures() as $picture) {
                    CacheHelper::setTagsFromPicture($item, $picture);
                    if (!$picture->isEnabled()) {
                        continue;
                    }
                    $zip->addFromString(
                        $picture->getFile()->getImageOriginalName(),
                        file_get_contents($this->uploaderHelper->asset($picture->getFile()))
                    );
                }
                $zip->close();

                $response = new Response(file_get_contents($zipPath));
                $response->headers->set('Content-Type', 'application/zip');
                $response->headers->set('Content-Disposition', 'attachment;filename="' . $zipName . '"');
                $response->headers->set('Content-length', (string)filesize($zipPath));

                @unlink($zipPath);

                return $response;
            });
        }

        public function getResizedPicture(Catalog $catalog, Picture $picture, ?string $size = self::ORIGINAL)
        {
            $cache = new TagAwareAdapter(
                new FilesystemAdapter(),
            );
    
            return $cache->get(sprintf(CacheHelper::PICTURE_DOWNLOAD, $picture->getId(), $size), function (ItemInterface $item) use ($picture, $size, $catalog) {
                $item->expiresAfter(3600);
        
                CacheHelper::setTagsFromPicture($item, $picture);
                if (!PictureHelper::checkEnabledRecusively($picture, $catalog)) {
                    return null;
                }
                $imageName = $picture->getFile()->getImageName();
        
                if ($filter = $this->getLiipFilter($size)) {
                    if (!$this->imagineCacheManager->isStored($imageName, $filter)) {
                        $this->client->request('GET', $this->imagineCacheManager->getBrowserPath($imageName, $filter));
                    }
            
                    $urlPath = $this->imagineCacheManager->resolve($imageName, $filter);
            
                    return $this->getResponse($imageName, $urlPath);
                }
        
                if (self::IS_LOCAL) {
                    return $this->getResponseLocal($imageName, $this->uploaderHelper->asset($picture->getFile()));
                }
                return $this->getResponse($imageName, $this->uploaderHelper->asset($picture->getFile()));
            });
        }

        private function getLiipFilter(string $size)
        {
            switch ($size) {
                case self::SQUARE:
                    return 'picture_square';
                case self::SM:
                    return 'picture_sm';
                case self::MD:
                    return 'picture_md';
                case self::LG:
                    return 'picture_lg';
                case self::VLG:
                    return 'picture_vlg';
            }
            return null;
        }

        private function getResponse(string $imageName, string $urlPath)
        {
            $response = new StreamedResponse();

            $response->headers->set('Content-Type', 'application/force-download');
            $response->headers->set(
                'Content-Disposition',
                $response->headers->makeDisposition(
                    ResponseHeaderBag::DISPOSITION_ATTACHMENT,
                    $imageName
                )
            );
    
            $response->setCallback(function () use ($urlPath) {
                $c = curl_init($urlPath);
                curl_exec($c);
                curl_close($c);
            });
    
            return $response;
        }
    
        private function getResponseLocal(string $imageName, string $urlPath)
        {
            $response = new BinaryFileResponse($urlPath);
            $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, $imageName);
        
            return $response;
        }
    }
