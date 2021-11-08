<?php
    
    namespace App\Controller;


    use App\Entity\Catalog\Catalog;
    use App\Provider\CatalogProvider;
    use App\Provider\PictureProvider;
    use App\Service\Catalog\PictureExifPopulator;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    class DefaultController extends AbstractController
    {
        private CatalogProvider $catalogProvider;
        private PictureProvider $pictureProvider;
    
        public function __construct(
            CatalogProvider   $catalogProvider,
            PictureProvider   $pictureProvider
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
    
        #[Route('/map', name: 'MAP')]
        public function map(Request $request)
        {
            $gpsPoints = $this->pictureProvider->getGpsPoints();
            foreach ($gpsPoints as $gpsPoint) {
                if($gpsPoint->getLat() === 0.0){
                    dump($gpsPoint);
                }
            }
            return $this->render('default/map.html.twig', [
                'pictureGpsPoints' => $gpsPoints
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
    
        #[Route('/test', name: 'TEST')]
        public function test(Request $request, EntityManagerInterface $em)
        {
            $url = "http://wikiarchives.space/upload/2020/07/15/20200715113431-f6c23cd8.jpg";
            dump($url);
            dump(exif_read_data($url));
            dump(PictureExifPopulator::getExifFromUrl($url));
            
            die;
            return $this->render('default/test.html.twig', [
            ]);
        }
    
    
    }
