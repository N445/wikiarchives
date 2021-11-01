<?php
    
    namespace App\Provider;

    use App\Entity\Catalog\Catalog;
    use App\Entity\Catalog\Picture;
    use App\Repository\Catalog\PictureRepository;
    use Symfony\Component\Cache\Adapter\FilesystemAdapter;
    use Symfony\Component\Cache\Adapter\TagAwareAdapter;
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
        }
    
        public function byCatalogPaginated(Catalog $catalog, int $page, int $nbPerPage = 10)
        {
//            return $this->pictureRepository->byCatalogPaginatedFront($catalog, $page, $nbPerPage);
        
            $cache = new TagAwareAdapter(
                new FilesystemAdapter(),
            );
        
        
            return $cache->get(sprintf('picture_pagination_%d_%d_%d', $catalog->getId(), $page, $nbPerPage), function (ItemInterface $item) use ($catalog, $page, $nbPerPage) {
                $item->expiresAfter(3600);
                $item->tag(sprintf('catalog_', $catalog->getId()));
                $pagination = $this->pictureRepository->byCatalogPaginatedFront($catalog, $page, $nbPerPage);
                /** @var Picture $picture */
                foreach ($pagination->getItems() as $picture) {
                    $item->tag(sprintf('picture_%d', $picture->getId()));
                }
                return $pagination;
            });
        }
    }