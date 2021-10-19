<?php
    
    namespace App\Service\Catalog;
    
    use App\Entity\Catalog\Picture;
    use Liip\ImagineBundle\Imagine\Cache\CacheManager;
    use Symfony\Component\HttpFoundation\File\File;
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
            $filename = $picture->getFile()->getImageName();
            $vichPath = $this->uploaderHelper->asset($picture->getFile());
//            $absolute = $this->kernel->getProjectDir() . '/public' . $vichPath;
//            $path = './../../../public' . $this->uploaderHelper->asset($picture->getFile());

            if ($filter = $this->getLiipFilter($size)) {
                if (!$this->imagineCacheManager->isStored($vichPath, $filter)) {
                    $response = $this->client->request('GET', $this->imagineCacheManager->getBrowserPath($vichPath, $filter));
                }
                
                $urlPath = $this->imagineCacheManager->resolve($vichPath, $filter);
                $parsedUrl = parse_url($urlPath);
                $absolute = $this->kernel->getProjectDir() . '/public' . $parsedUrl['path'];
                $file = new File($absolute);
                return $file;
            }
            
            return $vichPath;
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
    }