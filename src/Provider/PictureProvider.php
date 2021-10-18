<?php
    
    namespace App\Provider;
    
    use App\Repository\Catalog\PictureRepository;
    use Symfony\Component\Cache\Adapter\FilesystemAdapter;
    use Symfony\Contracts\Cache\ItemInterface;
    
    class PictureProvider
    {
        const CACHE_PICTURE = 'picture-%d';
        private PictureRepository $pictureRepository;
        
        public function __construct(PictureRepository $pictureRepository)
        {
            $this->pictureRepository = $pictureRepository;
        }
        
        public function search(?string $query)
        {
            return $this->pictureRepository->search($query);
        }
        
        public function byId(int $id)
        {
            return $this->pictureRepository->byIdFront($id);
//            $cache = new FilesystemAdapter();
//
//            return $cache->get('2picture-' . $id, function (ItemInterface $item) use ($id) {
//                $item->expiresAfter(3600);
//                $item->tag(sprintf(self::CACHE_PICTURE, $id));
//                return $this->pictureRepository->byIdFront($id);
//            });
        }
    }