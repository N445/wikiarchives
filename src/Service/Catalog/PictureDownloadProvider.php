<?php
    
    namespace App\Service\Catalog;
    
    use App\Entity\Catalog\Picture;
    use Liip\ImagineBundle\Imagine\Cache\CacheManager;
    use Symfony\Component\HttpFoundation\ResponseHeaderBag;
    use Symfony\Component\HttpFoundation\StreamedResponse;
    use Symfony\Component\HttpKernel\KernelInterface;
    use Symfony\Contracts\HttpClient\HttpClientInterface;
    use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

    class PictureDownloadProvider
    {
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
        
        public function getResizedPicture(Picture $picture, string $size)
        {
            $imageName = $picture->getFile()->getImageName();
    
            if ($filter = $this->getLiipFilter($size)) {
                if (!$this->imagineCacheManager->isStored($imageName, $filter)) {
                    $this->client->request('GET', $this->imagineCacheManager->getBrowserPath($imageName, $filter));
                }
        
                $urlPath = $this->imagineCacheManager->resolve($imageName, $filter);
        
                return $this->getResponse($imageName, $urlPath);
            }
    
            return $this->getResponse($imageName, $this->uploaderHelper->asset($picture->getFile()));
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

// set headers to force file download
            $response->headers->set('Content-Type', 'application/force-download');
            $response->headers->set(
                'Content-Disposition',
                $response->headers->makeDisposition(
                    ResponseHeaderBag::DISPOSITION_ATTACHMENT,
                    $imageName
                )
            );

// stream content from the URL to the browser
            $response->setCallback(function () use ($urlPath) {
                $c = curl_init($urlPath);
                curl_exec($c);
                curl_close($c);
            });
        
            return $response;
        }
    }