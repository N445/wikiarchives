<?php
    
    namespace App\Controller;


    use App\Form\Catalog\Picture\VersionValidatorType;
    use App\Provider\CatalogProvider;
    use App\Provider\PictureProvider;
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
        public function test(Request $request)
        {
            $validationForm = $this->get('form.factory')->createNamed('version_validator_1', VersionValidatorType::class);
            $validationForm->handleRequest($request);
        
            $validationForm2 = $this->get('form.factory')->createNamed('version_validator_2', VersionValidatorType::class);
            $validationForm2->handleRequest($request);
        
            if ($validationForm->isSubmitted() && $validationForm->isValid()) {
                dump('$finalVersion');
                die;
            }
        
        
            if ($validationForm2->isSubmitted() && $validationForm2->isValid()) {
                dump('$finalVersion2');
                die;
            }
            return $this->render('default/test.html.twig', [
                'validationForm' => $validationForm->createView(),
                'validationForm2' => $validationForm2->createView(),
            ]);
        }
    
    
    }
