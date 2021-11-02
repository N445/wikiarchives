<?php
    
    namespace App\Provider;
    
    use App\Entity\Catalog\Catalog;
    use App\Repository\Catalog\CatalogRepository;

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
    }