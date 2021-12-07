<?php
    
    namespace App\Controller;


    use App\Entity\Catalog\Catalog;
    use App\Entity\Toto;
    use App\Provider\CatalogProvider;
    use App\Provider\PictureProvider;
    use App\Repository\Catalog\CatalogRepository;
    use App\Repository\Catalog\PictureRepository;
    use Knp\Component\Pager\PaginatorInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Cache\Adapter\FilesystemAdapter;
    use Symfony\Component\Cache\Adapter\TagAwareAdapter;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Contracts\Cache\ItemInterface;

    class DefaultController extends AbstractController
    {
        private CatalogProvider $catalogProvider;
        private PictureProvider $pictureProvider;
    
        public function __construct(
            CatalogProvider $catalogProvider,
            PictureProvider $pictureProvider
        )
        {
            $this->catalogProvider = $catalogProvider;
            $this->pictureProvider = $pictureProvider;
        }
    
        #[Route('/', name: 'HOMEPAGE')]
        public function index(): Response
        {
            return $this->render('default/index.html.twig', [
                'root' => $this->catalogProvider->root(),
            ]);
        }
    
    
        #[Route('/about', name: 'ABOUT')]
        public function about(Request $request)
        {
            return $this->render('default/about.html.twig', []);
        }
    
        #[Route('/legal-mention', name: 'LEGAL_MENTION')]
        public function legalMention(Request $request)
        {
            return $this->render('default/legal-mention.html.twig', []);
        }
    
    
        #[Route('/map', name: 'MAP')]
        public function map(Request $request)
        {
            return $this->render('default/map.html.twig', [
                'pictureGpsPoints' => $this->pictureProvider->getGpsPoints()
            ]);
        }
    
    
        #[Route('/search', name: 'SEARCH')]
        public function search(Request $request): Response
        {
            $catalogId = $request->get('catalogId', null);
        
            $catalog = null;
            if ($catalogId) {
                $catalog = $this->catalogProvider->byId($catalogId);
            }
        
            $query = $request->get('q', null);
//            $query = $request->get('queryCatalog', null);
        
            if (!$query && $catalog) {
                return $this->redirectToRoute('CATALOG', [
                    'id' => $catalog->getId()
                ]);
            }
            if (!$query) {
                return $this->redirectToRoute('HOMEPAGE');
            }
    
    
            $page = $request->get('page', 1);
    
            return $this->render('default/search.html.twig', [
                'catalog' => $catalog,
                'catalogs' => $this->catalogProvider->search($query, $catalog),
                'pagination' => $this->pictureProvider->search($query, $catalog, $page, 12 * 5),
                'query' => $query,
//                'queryCatalog' => $queryCatalog,
            ]);
        }
    
        /**
         * Création de la route "test grid"
         */
        #[Route('/test-grid', name: 'TEST_GRID')]
        public function testGrid(Request $request, PictureRepository $pictureRepository,PaginatorInterface $paginator)
        {
            $picturesQb = $pictureRepository->createQueryBuilder('p')
                                          ->addSelect('v', 'f')
                                          ->leftJoin('p.validatedVersion', 'v')
                                          ->leftJoin('p.file', 'f')
                                          ->getQuery()
            ;
    
            $paginator = $paginator->paginate($picturesQb,1,500);
        
            return $this->render('default/test-grid.html.twig', [
                'pictures' => $paginator
            ]);
        }
    
    
        #[Route('/test', name: 'TEST')]
        public function test(
            CatalogRepository $catalogRepository,
        )
        {
        
            $cache = new TagAwareAdapter(
                new FilesystemAdapter(),
            );

            $data = $cache->get('aaaaaalkmktest', function (ItemInterface $item) use ($catalogRepository) {
                $item->expiresAfter(3600);
                dump('test dump');

                /** @var Catalog $catalog */
                return $catalogRepository->createQueryBuilder('c')
                                             ->andWhere('c.id = :id')
                                             ->setParameter('id', 102)
                                             ->getQuery()
                                             ->getOneOrNullResult()
                ;
            });
            dump($data);
        
            die;
        
            return $this->render('default/test.html.twig', [
            ]);
        }
    
    
    }
