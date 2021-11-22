<?php
    
    namespace App\Controller\Catalog;
    
    use App\Entity\Catalog\Catalog;
    use App\Form\Catalog\CatalogType;
    use App\Repository\Catalog\CatalogRepository;
    use Doctrine\ORM\EntityManagerInterface;
    use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    #[Route('/admin/catalog/catalog'), IsGranted('ROLE_CONTRIBUTOR')]
    class CatalogController extends AbstractController
    {
        /**
         * @var EntityManagerInterface
         */
        private EntityManagerInterface $em;
        /**
         * @var CatalogRepository
         */
        private CatalogRepository $catalogRepository;
        
        public function __construct(
            EntityManagerInterface $em,
            CatalogRepository      $catalogRepository
        )
        {
            $this->em = $em;
            $this->catalogRepository = $catalogRepository;
        }
        
        #[Route('/', name: 'ADMIN_CATALOG_CATALOG_INDEX', methods: ['GET'])]
        public function index(?int $id = null): Response
        {
            return $this->render('catalog/catalog/index.html.twig', [
                'catalogs' => $this->catalogRepository->findAll(),
            ]);
        }
        
        
        #[Route('/tree/{id}', name: 'ADMIN_CATALOG_CATALOG_TREE', methods: ['GET'])]
        public function tree(?int $id = null): Response
        {
            $trees = $this->catalogRepository->getRootAdmin();
            
            if (!$id) {
                if(!$catalog = $this->catalogRepository->getRootOne()){
                    $catalog = (new Catalog())->setName(Catalog::ROOT);
                    $this->em->persist($catalog);
                    $this->em->flush();
                }
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_TREE', [
                    'id' => $catalog->getId(),
                ]);
            }
            if (!$trees) {
                $catalog = (new Catalog())->setName(Catalog::ROOT);
                $this->em->persist($catalog);
                $this->em->flush();
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_TREE', [
                    'id' => $catalog->getId(),
                ]);
            }
            $catalog = $this->catalogRepository->byIdAdmin($id);
    
            return $this->render('catalog/catalog/tree.html.twig', [
                'trees' => $trees,
                'catalog' => $catalog,
                'catalogs' => array_filter($this->catalogRepository->findAll(), function (Catalog $catalog) {
                    return $catalog->getName() !== Catalog::ROOT;
                }),
            ]);
        }
    
        #[Route('/browse/{id}', name: 'ADMIN_CATALOG_CATALOG_BROWSE', methods: ['GET'])]
        public function browse(?int $id = null): Response
        {
            if (!$id) {
                $catalog = $this->catalogRepository->getRootOne();
            } else {
                $catalog = $this->catalogRepository->byIdAdmin($id);
            }
            
            dump($catalog);
        
            return $this->render('catalog/catalog/browse.html.twig', [
                'catalog' => $catalog,
            ]);
        }
    
        #[Route('/new', name: 'ADMIN_CATALOG_CATALOG_NEW', methods: ['GET', 'POST'])]
        public function new(Request $request): Response
        {
            $catalog = new Catalog();
            $form = $this->createForm(CatalogType::class, $catalog);
            $form->handleRequest($request);
        
            if ($form->isSubmitted() && $form->isValid()) {
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($catalog);
                $entityManager->flush();
                
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_INDEX', [], Response::HTTP_SEE_OTHER);
            }
            
            return $this->renderForm('catalog/catalog/new.html.twig', [
                'catalog' => $catalog,
                'form' => $form,
            ]);
        }
        
        #[Route('/{id}', name: 'ADMIN_CATALOG_CATALOG_SHOW', methods: ['GET'])]
        public function show(Catalog $catalog): Response
        {
            return $this->render('catalog/catalog/show.html.twig', [
                'catalog' => $catalog,
            ]);
        }
        
        #[Route('/{id}/edit', name: 'ADMIN_CATALOG_CATALOG_EDIT', methods: ['GET', 'POST'])]
        public function edit(Request $request, Catalog $catalog): Response
        {
            if(Catalog::ROOT === $catalog->getName()){
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_INDEX');
            }
            $form = $this->createForm(CatalogType::class, $catalog);
            $form->handleRequest($request);
            
            if ($form->isSubmitted() && $form->isValid()) {
                $this->getDoctrine()->getManager()->flush();
                
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_INDEX', [], Response::HTTP_SEE_OTHER);
            }
            
            return $this->renderForm('catalog/catalog/edit.html.twig', [
                'catalog' => $catalog,
                'form' => $form,
            ]);
        }
        
        #[Route('/{id}', name: 'ADMIN_CATALOG_CATALOG_DELETE', methods: ['POST'])]
        public function delete(Request $request, Catalog $catalog): Response
        {
            if(Catalog::ROOT === $catalog->getName()){
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_INDEX');
            }
            if ($this->isCsrfTokenValid('delete' . $catalog->getId(), $request->request->get('_token'))) {
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->remove($catalog);
                $entityManager->flush();
            }
            
            return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_INDEX', [], Response::HTTP_SEE_OTHER);
        }
    }
