<?php

    namespace App\Provider;

    use App\Entity\Catalog\Catalog;
    use App\Entity\Catalog\Picture;
    use App\Model\Breadcrumb\Breadcrumb;
    use App\Model\Map\MapPoint;
    use App\Repository\Catalog\PictureRepository;
    use App\Service\Breadcrumb\BreadcrumbCreator;
    use App\Service\Cache\CacheHelper;
    use App\Service\Catalog\CatalogHelper;
    use App\Service\Catalog\PictureHelper;
    use Knp\Component\Pager\Pagination\PaginationInterface;
    use Psr\Cache\InvalidArgumentException;
    use Symfony\Component\Cache\Adapter\FilesystemAdapter;
    use Symfony\Component\Cache\Adapter\TagAwareAdapter;
    use Symfony\Contracts\Cache\ItemInterface;
    use Twig\Environment;

    class PictureProvider
    {
        const CACHE_PICTURE = 'picture-%d';
        private PictureRepository $pictureRepository;
        private Environment $twig;
        private TagAwareAdapter $cache;
        private BreadcrumbCreator $breadcrumbCreator;
    
        public function __construct(
            PictureRepository $pictureRepository,
            Environment       $twig,
            BreadcrumbCreator $breadcrumbCreator
        )
        {
            $this->pictureRepository = $pictureRepository;
            $this->twig = $twig;
            $this->cache = new TagAwareAdapter(
                new FilesystemAdapter(),
            );
            $this->breadcrumbCreator = $breadcrumbCreator;
        }
    
        /**
         * @param string|null $query
         * @param Catalog|null $catalog
         * @param int $page
         * @param int $nbPerPage
         * @return PaginationInterface
         */
        public function search(?string $query, ?Catalog $catalog, int $page, int $nbPerPage = 10): PaginationInterface
        {
            return $this->pictureRepository->search($query, $catalog, $page, $nbPerPage);
        }
    
        /**
         * @param int $id
         * @return Picture|null
         * @throws InvalidArgumentException
         */
        public function byId(int $id): ?Picture
        {
            return $this->cache->get(sprintf(CacheHelper::PICTURE_ID, $id), function (ItemInterface $item) use ($id) {
                $item->expiresAfter(3600);
    
    
                CacheHelper::setTagsFromPictureId($item, $id);
    
                if (!$picture = $this->pictureRepository->byIdFront($id)) {
                    return null;
                }
                
                CacheHelper::setTagsFromCatalogWithParent($item, $picture->getCatalog());
                
                if (!PictureHelper::checkEnabledRecusively($picture)) {
                    return null;
                }
                return $picture;
            });
        }
    
        /**
         * @param Picture $picture
         * @return Breadcrumb
         * @throws InvalidArgumentException
         */
        public function getBreadCrumb(Picture $picture): Breadcrumb
        {
            return $this->cache->get(sprintf(CacheHelper::PICTURE_BREADCRUMB_BY_ID, $picture->getId()), function (ItemInterface $item) use ($picture) {
                $item->expiresAfter(3600);
    
                CacheHelper::setTagsFromCatalogWithParent($item, $picture->getCatalog());
                CacheHelper::setTagsFromPicture($item, $picture);
                return $this->breadcrumbCreator->getPictureBreadcrumb($picture);
            });
        }
    
        /**
         * @param Catalog $catalog
         * @param int $page
         * @param int $nbPerPage
         * @return PaginationInterface
         * @throws InvalidArgumentException
         */
        public function byCatalogPaginated(Catalog $catalog, int $page, int $nbPerPage = 10): PaginationInterface
        {
             return $this->cache->get(sprintf(CacheHelper::PICTURE_PAGINATION, $catalog->getId(), $page, $nbPerPage), function (ItemInterface $item) use ($catalog, $page, $nbPerPage) {
                $item->expiresAfter(3600);
            
                $pagination = $this->pictureRepository->byCatalogPaginatedFront($catalog, $page, $nbPerPage);
            
                CacheHelper::setTagsFromCatalog($item, $catalog);
                return $pagination;
            });
        }
    
        /**
         * @return MapPoint[]
         * @throws InvalidArgumentException
         */
        public function getGpsPoints(): array
        {
            return $this->cache->get(CacheHelper::PICTURE_MAP, function (ItemInterface $item) {
                $item->expiresAfter(3600);
            
                $mapsPoints = [];
                $catalogs = [];
                foreach ($this->pictureRepository->getGpsPointsFront() as $picture) {
                    $catalogs[$picture->getCatalog()->getId()] = $picture->getCatalog();
                
                    if (($lat = $picture->getExif()->getLat() ?? null) === null) {
                        continue;
                    }
                    if (($lng = $picture->getExif()->getLng() ?? null) === null) {
                        continue;
                    }
                    if (!CatalogHelper::checkIfParentsIsEnabled($picture->getCatalog())) {
                        continue;
                    }
                
                    $mapsPoints[] = (new MapPoint())
                        ->setLat($lat)
                        ->setLng($lng)
                        ->setTitle($picture->getName())
                        ->setHtml($this->twig->render('default/map/_marker-popup.html.twig', [
                            'picture' => $picture,
                        ]))//                    ->setHtml($picture->getDescription())
                    ;
                }
                foreach ($catalogs as $catalog) {
                    CacheHelper::setTagsFromCatalog($item, $catalog);
                }
                return $mapsPoints;
            });
        }
    }
