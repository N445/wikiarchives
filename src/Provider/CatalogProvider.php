<?php
    
    namespace App\Provider;
    
    use App\Entity\Catalog\Catalog;
    use App\Entity\Catalog\Picture;
    use App\Repository\Catalog\CatalogRepository;
    use Symfony\Component\Cache\Adapter\FilesystemAdapter;
    use Symfony\Component\Cache\Adapter\TagAwareAdapter;
    use Symfony\Contracts\Cache\ItemInterface;

    class CatalogProvider
    {
        public const CACHE = true;
    
        public const CACHE_CATALOG_ROOT = 'catalog_root';
    
        public const CATALOG_ID = '2_catalog_id_%d';
        public const PICTURE_ID = '2_picture_id_%d';
    
        public const TAG_CATALOG_ID = 'tag_catalog_id_%d';
        public const TAG_PICTURE_ID = 'tag_picture_id_%d';
    
        private CatalogRepository $catalogRepository;
    
        public function __construct(CatalogRepository $catalogRepository)
        {
            $this->catalogRepository = $catalogRepository;
        }
    
        public function root()
        {
            return $this->catalogRepository->getRootFront();
        }
    
    
        public function search(?string $query, ?Catalog $catalog)
        {
            return $this->catalogRepository->search($query, $catalog);
        }
    
        public function byId(int $id, bool $isFull = false)
        {
            return $this->catalogRepository->byIdFront($id, $isFull);
        }
    
        public function countPictures(Catalog $catalog)
        {
            $cache = new TagAwareAdapter(
                new FilesystemAdapter(),
            );
        
            return $cache->get(sprintf('7catalog_count_pictures_' . $catalog->getId()), function (ItemInterface $item) use ($catalog) {
                $item->expiresAfter(3600);
                $item->tag(sprintf('catalog_%d', $catalog->getId()));
            
                $count = 0;
                foreach ($catalog->getPictures() as $picture) {
                    /** @var Picture $picture */
                    $item->tag(sprintf('picture_%d', $picture->getId()));
                    if ($picture->isEnabled()) {
                        $count++;
                    }
                }
                foreach ($catalog->getChildren() as $child) {
                    /** @var Catalog $child */
                    $item->tag(sprintf('catalog_%d', $child->getId()));
                    if ($child->isEnabled()) {
                        $count = $count + $this->countPictures($child);
                    }
                }
                return $count;
            });
        }
    
        public function countChildren(Catalog $catalog)
        {
            $cache = new TagAwareAdapter(
                new FilesystemAdapter(),
            );
        
            return $cache->get(sprintf('7catalog_count_children_' . $catalog->getId()), function (ItemInterface $item) use ($catalog) {
                $item->expiresAfter(3600);
                $item->tag(sprintf('catalog_%d', $catalog->getId()));
            
                $count = 0;
                foreach ($catalog->getChildren() as $child) {
                    /** @var Catalog $child */
                    $item->tag(sprintf('catalog_%d', $child->getId()));
                    if ($child->isEnabled()) {
                        $count++;
                    }
                }
                foreach ($catalog->getChildren() as $child) {
                    /** @var Catalog $child */
                    $item->tag(sprintf('catalog_%d', $child->getId()));
                    if ($child->isEnabled()) {
                        $count = $count + $this->countChildren($child);
                    }
                }
                return $count;
            });
        }
    }