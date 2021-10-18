<?php
    
    namespace App\Provider;
    
    use App\Repository\Catalog\CatalogRepository;

    class CatalogProvider
    {
        private CatalogRepository $catalogRepository;
    
        public function __construct(CatalogRepository $catalogRepository)
        {
            $this->catalogRepository = $catalogRepository;
        }
    
        public function root()
        {
            return $this->catalogRepository->getRootFront($id);
        }
    
    
        public function search(?string $query)
        {
            return $this->catalogRepository->search($query);
        }
    
        public function byId(int $id)
        {
            return $this->catalogRepository->byIdFront($id);
        }
    }