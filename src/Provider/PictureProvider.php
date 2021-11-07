<?php

    namespace App\Provider;

    use App\Entity\Catalog\Catalog;
    use App\Entity\Catalog\Picture;
    use App\Model\Map\MapPoint;
    use App\Repository\Catalog\PictureRepository;
    use Symfony\Component\Cache\Adapter\FilesystemAdapter;
    use Symfony\Component\Cache\Adapter\TagAwareAdapter;
    use Symfony\Contracts\Cache\ItemInterface;
    use Twig\Environment;

    class PictureProvider
    {
        const CACHE_PICTURE = 'picture-%d';
        private PictureRepository $pictureRepository;
        private Environment $twig;
    
        public function __construct(
            PictureRepository $pictureRepository,
            Environment       $twig
        )
        {
            $this->pictureRepository = $pictureRepository;
            $this->twig = $twig;
        }
    
        public function search(?string $query, ?Catalog $catalog, int $page, int $nbPerPage = 10)
        {
            return $this->pictureRepository->search($query, $catalog, $page, $nbPerPage);
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
                $item->tag(sprintf('catalog_%d', $catalog->getId()));
                $pagination = $this->pictureRepository->byCatalogPaginatedFront($catalog, $page, $nbPerPage);
                /** @var Picture $picture */
                foreach ($pagination->getItems() as $picture) {
                    $item->tag(sprintf('picture_%d', $picture->getId()));
                }
                return $pagination;
            });
        }
    
        public function getGpsPoints()
        {
        
            $cache = new TagAwareAdapter(
                new FilesystemAdapter(),
            );
        
        
            return $cache->get(sprintf('picture_map'), function (ItemInterface $item) {
                $item->expiresAfter(3600);
            
                $mapsPoints = [];
                foreach ($this->pictureRepository->getGpsPointsFront() as $picture) {
                    $item->tag(sprintf('picture_%d', $picture->getId()));
                
                    if (!$lat = $picture->getExif()->getLat() ?? null) {
                        continue;
                    }
                    if (!$lng = $picture->getExif()->getLng() ?? null) {
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
                return $mapsPoints;
            });
        }
    }
