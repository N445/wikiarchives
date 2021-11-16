<?php
    
    namespace App\Controller\Catalog;
    
    use App\DataTransformer\Catalog\CatalogDataTransformer;
    use App\Entity\Catalog\Catalog;
    use App\Form\Catalog\AjaxCatalogTreeType;
    use App\Repository\Catalog\CatalogRepository;
    use App\Repository\Catalog\CatalogTreeRepository;
    use App\Service\Catalog\CatalogRemover;
    use Doctrine\ORM\EntityManagerInterface;
    use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Form\FormInterface;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;


    #[Route("/admin/ajax/catalog", options: ["expose" => true]), IsGranted('ROLE_CONTRIBUTOR')]
    class AjaxCatalogController extends AbstractController
    {
        private CatalogRepository $catalogRepository;
        private CatalogTreeRepository $catalogTreeRepository;
        private EntityManagerInterface $em;
        private CatalogDataTransformer $catalogDataTransformer;
    
        public function __construct(
            CatalogRepository      $catalogRepository,
            CatalogTreeRepository  $catalogTreeRepository,
            EntityManagerInterface $em,
            CatalogDataTransformer $catalogDataTransformer
        )
        {
            $this->catalogRepository = $catalogRepository;
            $this->catalogTreeRepository = $catalogTreeRepository;
            $this->em = $em;
            $this->catalogDataTransformer = $catalogDataTransformer;
        }
    
    
        #[Route('/add', name: "ADMIN_AJAX_CATALOG_CATALOG_ADD", methods: ["GET", "POST"])]
        public function add(Request $request)
        {
            $parentCatalog = null;
            if ($parentCatalogId = $request->get('parentCatalogId')) {
                $parentCatalog = $this->catalogRepository->find($parentCatalogId);
            }
            $newcatalog = (new Catalog())->setParent($parentCatalog);
        
            $newCatalogForm = $this->createForm(AjaxCatalogTreeType::class, $newcatalog);
        
            $newCatalogForm->handleRequest($request);
            if ($newCatalogForm->isSubmitted()) {
                if ($newCatalogForm->isValid()) {
                    $this->em->persist($newcatalog);
                    $this->em->flush();
                    $newCatalogForm = $this->createForm(AjaxCatalogTreeType::class, new Catalog());
    
                    return $this->getFormResponse($newcatalog, $newCatalogForm, true, 'new');
                }
    
    
                return $this->getFormResponse($newcatalog, $newCatalogForm, false, 'new');
            }
        
        
            return $this->getFormResponse($newcatalog, $newCatalogForm, true, 'new');
        }
    
        #[Route("/{id}/edit", name: "ADMIN_AJAX_CATALOG_CATALOG_EDIT", methods: ["GET", "POST"])]
        public function edit(int $id, Request $request)
        {
            if (!$catalog = $this->catalogRepository->byIdAdmin($id)) {
                return $this->json([
                    'success' => false,
                    'message' => 'Pas de dossier trouvé',
                ]);
            }
        
            $editCatalogForm = $this->createForm(AjaxCatalogTreeType::class, $catalog);
        
            $editCatalogForm->handleRequest($request);
        
            if ($editCatalogForm->isSubmitted()) {
                if ($editCatalogForm->isValid()) {
                    $this->em->persist($catalog);
                    $this->em->flush();
                    $editCatalogForm = $this->createForm(AjaxCatalogTreeType::class, new Catalog());
    
    
                    return $this->getFormResponse($catalog, $editCatalogForm, true, 'edit');
                }
            
            
                return $this->getFormResponse($catalog, $editCatalogForm, false, 'edit');
            }
        
            return $this->getFormResponse($catalog, $editCatalogForm, true, 'edit');
        }
    
        #[Route("/{id}/remove", name: "ADMIN_AJAX_CATALOG_CATALOG_REMOVE", methods: ["POST"])]
        public function remove(int $id,CatalogRemover $catalogRemover)
        {
            if (!$catalog = $this->catalogRepository->byIdAdmin($id)) {
                return $this->json([
                    'success' => false,
                    'message' => 'Pas de dossier trouvé',
                ]);
            }
    
            $catalogRemover->remove($catalog);
//            $this->catalogTreeRepository->removeFromTree($catalog);
//            $em->clear(); // clear cached nodes
//            $this->em->remove($catalog);
//            $this->em->flush();
        
            return $this->json([
                'success' => true,
            ]);
        }
    
        #[Route("/{id}/set-parent/{parentId}", name: "ADMIN_AJAX_CATALOG_CATALOG_SET_PARENT", methods: ["POST"])]
        public function setParent(int $id, ?int $parentId = null, Request $request)
        {
            if (!$directory = $this->catalogRepository->byIdAdmin($id)) {
                return $this->json([
                    'success' => false,
                    'message' => 'Pas de dossier trouvé',
                ]);
            }
    
            if ($catalogPrevId = $request->get('catalogPrevId')) {
                if ($catalogPrev = $this->catalogRepository->byIdAdmin($catalogPrevId)) {
                    $this->catalogTreeRepository->persistAsNextSiblingOf($directory, $catalogPrev);
                }
            } else {
                $this->catalogTreeRepository->persistAsFirstChild($directory);
            }
    
            if (!$parentId) {
                $directory->setParent(null);
        
                $this->em->persist($directory);
                $this->em->flush();
                return $this->json([
                    'success' => true,
                ]);
            }
    
            if (!$parentDirectory = $this->catalogRepository->byIdAdmin($parentId)) {
                return $this->json([
                    'success' => false,
                    'message' => 'Pas de dossier trouvé',
                ]);
            }
    
            $directory->setParent($parentDirectory);
    
            $this->em->persist($directory);
            $this->em->flush();
    
            return $this->json([
                'success' => true,
            ]);
        }
        
        #[Route("/{id}", name: "ADMIN_AJAX_CATALOG_CATALOG_OPEN", methods: ["GET"])]
        public function show(int $id): Response
        {
            if (!$catalog = $this->catalogRepository->byIdAdmin($id)) {
                return $this->json([
                    'success' => false,
                    'message' => 'Pas de dossier trouvé',
                ]);
            }
            return $this->json([
                'success' => true,
                'catalog' => $this->catalogDataTransformer->toArray($catalog),
                'html' => $this->renderView('catalog/catalog/includes/_catalog-content.html.twig', [
                    'catalog' => $catalog,
                ]),
            ]);
        }
    
        private function getFormResponse(Catalog $catalog, FormInterface $form, bool $success, string $type)
        {
            $view = 'catalog/catalog/includes/_modal-new-catalog.html.twig';
            if ('edit' === $type) {
                $view = 'catalog/catalog/includes/_modal-edit-catalog.html.twig';
            }
            return $this->json([
                'success' => $success,
                'catalog' => $this->catalogDataTransformer->toArray($catalog),
                'form' => $this->renderView($view, [
                    'newCatalogForm' => $form->createView(),
                ]),
            ]);
        }
    }
