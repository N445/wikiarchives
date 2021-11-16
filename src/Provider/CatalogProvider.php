<?php
    
    namespace App\Provider;
    
    use App\Entity\Catalog\Catalog;
    use App\Model\Breadcrumb\Breadcrumb;
    use App\Model\Catalog\CatalogCounter as CatalogCounterModel;
    use App\Repository\Catalog\CatalogRepository;
    use App\Service\Breadcrumb\BreadcrumbCreator;
    use App\Service\Cache\CacheHelper;
    use App\Service\Catalog\CatalogCounter;
    use Doctrine\ORM\EntityManagerInterface;
    use Doctrine\ORM\NonUniqueResultException;
    use Psr\Cache\InvalidArgumentException;
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
        private EntityManagerInterface $em;
        private BreadcrumbCreator $breadcrumbCreator;
        private TagAwareAdapter $cache;
    
        /**
         * @param CatalogRepository $catalogRepository
         * @param EntityManagerInterface $em
         * @param BreadcrumbCreator $breadcrumbCreator
         */
        public function __construct(
            CatalogRepository $catalogRepository,
            EntityManagerInterface $em,
            BreadcrumbCreator $breadcrumbCreator
        )
        {
            $this->catalogRepository = $catalogRepository;
            $this->em = $em;
            $this->breadcrumbCreator = $breadcrumbCreator;
            $this->cache = new TagAwareAdapter(
                new FilesystemAdapter(),
            );
        }
    
        /**
         * @return Catalog|null
         * @throws NonUniqueResultException
         */
        public function root(): ?Catalog
        {
            return $this->catalogRepository->getRootFront();
        }
    
        /**
         * @param string|null $query
         * @param Catalog|null $catalog
         * @return Catalog[]
         */
        public function search(?string $query, ?Catalog $catalog)
        {
            return $this->catalogRepository->search($query, $catalog);
        }
    
        /**
         * @param int $id
         * @param bool $isFull
         * @return Catalog|null
         * @throws InvalidArgumentException
         */
        public function byId(int $id, bool $isFull = false): ?Catalog
        {
            return $this->cache->get(sprintf(CacheHelper::CATALOG_BY_ID, $id, $isFull ? 'y' : 'n'), function (ItemInterface $item) use ($id, $isFull) {
                $item->expiresAfter(3600);
        
                CacheHelper::setTagsFromCatalogId($item, $id);
                return $this->catalogRepository->byIdFront($id, $isFull);
            });
        }
    
        /**
         * @param Catalog $catalog
         * @return Breadcrumb
         * @throws InvalidArgumentException
         */
        public function getBreadCrumb(Catalog $catalog): Breadcrumb
        {
            return $this->cache->get(sprintf(CacheHelper::CATALOG_BREADCRUMB_BY_ID, $catalog->getId()), function (ItemInterface $item) use ($catalog) {
                $item->expiresAfter(3600);
        
                $catalog = $this->catalogRepository->byIdFront($catalog->getId(), false);
                CacheHelper::setTagsFromCatalogWithParent($item, $catalog);
                return $this->breadcrumbCreator->getCatalogBreadcrumb($catalog);
            });
        }
    
        /**
         * @param Catalog $catalog
         * @return CatalogCounterModel
         * @throws InvalidArgumentException
         */
        public function countAll(Catalog $catalog): CatalogCounterModel
        {
            return $this->cache->get(sprintf(CacheHelper::CATALOG_COUNT_ALL, $catalog->getId()), function (ItemInterface $item) use ($catalog) {
                $item->expiresAfter(3600);
            
                $catalogCounter = new CatalogCounterModel();
            
                CatalogCounter::countAll($catalog, $catalogCounter, $item);
            
                return $catalogCounter;
            });
        }


//        public function countPictures(Catalog $catalog)
//        {
//            $cache = new TagAwareAdapter(
//                new FilesystemAdapter(),
//            );
//
//            return $cache->get(sprintf(CacheHelper::CATALOG_COUNT_PICTURES, $catalog->getId()), function (ItemInterface $item) use ($catalog) {
//                $item->expiresAfter(3600);
//
//                $data = CatalogCounter::getCountPictures($catalog);
//
//                CacheHelper::setTagsFromCatalog($item, $catalog, false, false, false);
//                CacheHelper::setTagsFromCatalogIds($item, $data['ids']);
//
//                return $data['count'];
//            });
//        }

//        public function old_countChildren(Catalog $catalog)
//        {
//            $cache = new TagAwareAdapter(
//                new FilesystemAdapter(),
//            );
//
//            return $cache->get(sprintf(CacheHelper::CATALOG_COUNT_CHILDREN, $catalog->getId()), function (ItemInterface $item) use ($catalog) {
//                $item->expiresAfter(3600);
//
//                $sql = "select id,name,enabled
//from (select * from catalog ) products_sorted,
//        (select @pv := :initialId) initialisation
//where   find_in_set(parent_id, @pv)
//and     length(@pv := concat(@pv, ',', id))";
//
//
//                $children = $this->em->getConnection()->executeQuery($sql, [
//                    'initialId' => $catalog->getId()
//                ])->fetchAllAssociative();
//
//                $ids = array_filter(
//                    array_map(function ($child) {
//                        return $child['enabled'] === "1" ? $child['id'] : null;
//                    }, $children)
//                );
//
//                CacheHelper::setTagsFromCatalog($item, $catalog, false, false, false);
//                CacheHelper::setTagsFromCatalogIds($item, $ids);
//
//                return count($ids);
//            });
//        }

//        public function countChildren(Catalog $catalog)
//        {
//            $cache = new TagAwareAdapter(
//                new FilesystemAdapter(),
//            );
//
//            return $cache->get(sprintf(CacheHelper::CATALOG_COUNT_CHILDREN, $catalog->getId()), function (ItemInterface $item) use ($catalog) {
//                $item->expiresAfter(3600);
//
//                $children = $this->catalogRepository->children($catalog);
//                CacheHelper::setTagsFromCatalog($item, $catalog, false, false, false);
//
//                array_walk($children, function (Catalog $child) use (&$enableMap, $item) {
//                    CacheHelper::setTagsFromCatalogId($item, $child->getId());
//                });
//
//                return CatalogCounter::getCountChildren($catalog);
//            });
//        }
    
    }