<?php
    
    namespace App\Controller\Catalog;
    
    use App\Entity\Catalog\Catalog;
    use App\Form\Catalog\AjaxCatalogTreeType;
    use App\Form\Catalog\CatalogType;
    use App\Form\Catalog\PictureMassEditType;
    use App\Form\Catalog\PicturesDuplicateRemoverType;
    use App\Model\Breadcrumb\Breadcrumb;
    use App\Model\Breadcrumb\BreadcrumbLink;
    use App\Model\Catalog\PicturesDuplicateRemover;
    use App\Model\Catalog\PicturesMassEdit;
    use App\Repository\Catalog\CatalogRepository;
    use App\Repository\Catalog\CatalogTreeRepository;
    use App\Service\Catalog\PictureDoublonManager;
    use App\Service\Catalog\PicturesMassEditHelper;
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
        private CatalogTreeRepository $catalogTreeRepository;
    
        public function __construct(
            EntityManagerInterface $em,
            CatalogRepository      $catalogRepository,
            CatalogTreeRepository  $catalogTreeRepository
        )
        {
            $this->em = $em;
            $this->catalogRepository = $catalogRepository;
            $this->catalogTreeRepository = $catalogTreeRepository;
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
            $trees = $trees[0]->getChildren();
    
            if (!$id) {
                if (!$catalog = $this->catalogRepository->getRootOne()) {
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
    
            $breadcrumb = new Breadcrumb([
                new BreadcrumbLink('navigation.dashboard', $this->generateUrl('ADMIN')),
                new BreadcrumbLink('catalog.tree.label', $this->generateUrl('ADMIN_CATALOG_CATALOG_TREE')),
            ]);
    
            return $this->render('catalog/catalog/tree.html.twig', [
                'trees' => $trees,
                'catalog' => $catalog,
                'breadcrumb' => $breadcrumb,
                'catalogs' => array_filter($this->catalogRepository->findAll(), function (Catalog $catalog) {
                    return $catalog->getName() !== Catalog::ROOT;
                }),
            ]);
        }
    
        #[Route('/browse/{id}', name: 'ADMIN_CATALOG_CATALOG_BROWSE', methods: ['GET','POST'])]
        public function browse(?int $id = null, Request $request): Response
        {
            if (!$id) {
                $catalog = $this->catalogRepository->getRootOne();
            } else {
                $catalog = $this->catalogRepository->byIdAdmin($id);
            }
        
            $breadcrumb = new Breadcrumb([
                new BreadcrumbLink('navigation.dashboard', $this->generateUrl('ADMIN')),
                new BreadcrumbLink('catalog.browse.label', $this->generateUrl('ADMIN_CATALOG_CATALOG_BROWSE')),
            ]);
        
            foreach ($this->catalogTreeRepository->getPath($catalog) as $item) {
                if ('root' !== $item->getName()) {
                    $breadcrumb->addLink(new BreadcrumbLink($item->getName(), $this->generateUrl('ADMIN_CATALOG_CATALOG_BROWSE', [
                        'id' => $item->getId()
                    ])));
                }
            }
        
        
            $newcatalog = (new Catalog())->setParent($catalog);
            $newCatalogForm = $this->createForm(AjaxCatalogTreeType::class, $newcatalog);
            $newCatalogForm->handleRequest($request);
            if ($newCatalogForm->isSubmitted() && $newCatalogForm->isValid()) {
                $this->em->persist($newcatalog);
                $this->em->flush();
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_BROWSE', [
                    'id' => $catalog->getId()
                ]);
            }
            return $this->render('catalog/catalog/browse.html.twig', [
                'catalog' => $catalog,
                'breadcrumb' => $breadcrumb,
                'newCatalogForm' => $newCatalogForm->createView(),
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
                
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_BROWSE', [], Response::HTTP_SEE_OTHER);
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
    
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_BROWSE', [], Response::HTTP_SEE_OTHER);
            }
    
            return $this->renderForm('catalog/catalog/edit.html.twig', [
                'catalog' => $catalog,
                'form' => $form,
            ]);
        }
    
        #[Route('/{id}/ajout-multiple/', name: 'ADMIN_CATALOG_NEW_MULTIPLE', methods: ['GET', 'POST'])]
        public function newMultiple(?int $id): Response
        {
            if (!$catalog = $this->catalogRepository->byIdAdmin($id)) {
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_BROWSE');
            }
        
            $breadcrumb = new Breadcrumb([
                new BreadcrumbLink('navigation.dashboard', $this->generateUrl('ADMIN')),
                new BreadcrumbLink('catalog.browse.label', $this->generateUrl('ADMIN_CATALOG_CATALOG_BROWSE')),
            ]);
        
            foreach ($this->catalogTreeRepository->getPath($catalog) as $item) {
                if ('root' !== $item->getName()) {
                    $breadcrumb->addLink(new BreadcrumbLink($item->getName(), $this->generateUrl('ADMIN_CATALOG_CATALOG_BROWSE', [
                        'id' => $item->getId()
                    ])));
                }
            }
        
            $breadcrumb->addLink(new BreadcrumbLink('picture.form.add_multiple.label', $this->generateUrl('ADMIN_CATALOG_EDIT_MULTIPLE', [
                'id' => $catalog->getId()
            ])));
        
        
            return $this->renderForm('catalog/catalog/new-multiple.html.twig', [
                'catalog' => $catalog,
                'breadcrumb' => $breadcrumb,
            ]);
        }
    
        #[Route('/{id}/modification-multiple', name: 'ADMIN_CATALOG_EDIT_MULTIPLE', methods: ['GET', 'POST'])]
        public function editMultiple(?int $id, Request $request, PicturesMassEditHelper $pictureMassEdit): Response
        {
            if (!$catalog = $this->catalogRepository->byIdAdmin($id)) {
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_BROWSE');
            }
        
            $picturesMassEdit = (new PicturesMassEdit())
                ->setOriginalCatalog($catalog)
                ->addNewCatalog($catalog)
                ->setPictures($catalog->getPictures()->toArray());
            $form = $this->createForm(PictureMassEditType::class, $picturesMassEdit);
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                $pictureMassEdit->massEdit($picturesMassEdit);
                return $this->redirectToRoute('ADMIN_CATALOG_EDIT_MULTIPLE', [
                    'id' => $id
                ]);
            }
        
            $breadcrumb = new Breadcrumb([
                new BreadcrumbLink('navigation.dashboard', $this->generateUrl('ADMIN')),
                new BreadcrumbLink('catalog.browse.label', $this->generateUrl('ADMIN_CATALOG_CATALOG_BROWSE')),
            ]);
        
            foreach ($this->catalogTreeRepository->getPath($catalog) as $item) {
                if ('root' !== $item->getName()) {
                    $breadcrumb->addLink(new BreadcrumbLink($item->getName(), $this->generateUrl('ADMIN_CATALOG_CATALOG_BROWSE', [
                        'id' => $item->getId()
                    ])));
                }
            }
        
            $breadcrumb->addLink(new BreadcrumbLink('catalog.form.mass_edit.label', $this->generateUrl('ADMIN_CATALOG_EDIT_MULTIPLE', [
                'id' => $catalog->getId()
            ])));
    
            return $this->renderForm('catalog/catalog/edit-multiple.html.twig', [
                'catalog' => $catalog,
                'breadcrumb' => $breadcrumb,
                'form' => $form,
                'catalogs' => array_filter($this->catalogRepository->findAll(), function ($catalog) {
                    return Catalog::ROOT !== $catalog->getName();
                }),
            ]);
        }
    
        #[Route('/{id}/doublon', name: 'ADMIN_CATALOG_DOUBLON', methods: ['GET', 'POST'])]
        public function doublon(?int $id, Request $request, PictureDoublonManager $pictureDoublonManager): Response
        {
            if (!$catalog = $this->catalogRepository->byIdAdmin($id)) {
                return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_BROWSE');
            }
        
            $breadcrumb = new Breadcrumb([
                new BreadcrumbLink('navigation.dashboard', $this->generateUrl('ADMIN')),
            ]);
        
            foreach ($this->catalogTreeRepository->getPath($catalog) as $item) {
                if ('root' !== $item->getName()) {
                    $breadcrumb->addLink(new BreadcrumbLink($item->getName(), $this->generateUrl('ADMIN_CATALOG_CATALOG_BROWSE', [
                        'id' => $item->getId()
                    ])));
                }
            }
        
            $breadcrumb->addLink(new BreadcrumbLink('catalog.form.doublon.label', $this->generateUrl('ADMIN_CATALOG_DOUBLON', [
                'id' => $catalog->getId()
            ])));
        
            $doublons = $pictureDoublonManager->find($catalog);
        
            $pictureDuplicate = new PicturesDuplicateRemover();
            $form = $this->createForm(PicturesDuplicateRemoverType::class, $pictureDuplicate);
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                dump($pictureDuplicate);
                $pictureDoublonManager->clearDuplicateByKeys($catalog, $pictureDuplicate);
                return $this->redirectToRoute('ADMIN_CATALOG_DOUBLON', [
                    'id' => $catalog->getId()
                ]);
            }
        
            return $this->renderForm('catalog/catalog/doublon.html.twig', [
                'catalog' => $catalog,
                'breadcrumb' => $breadcrumb,
                'doublons' => $doublons,
                'form' => $form,
                'catalogs' => array_filter($this->catalogRepository->findAll(), function ($catalog) {
                    return Catalog::ROOT !== $catalog->getName();
                }),
            ]);
        }
    
        #[Route('/{id}', name: 'ADMIN_CATALOG_CATALOG_DELETE', methods: ['POST'])]
        public function delete(Request $request, Catalog $catalog): Response
        {
            if (Catalog::ROOT === $catalog->getName()) {
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
