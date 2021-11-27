<?php

namespace App\Controller\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Form\Catalog\PictureMassEditType;
use App\Form\Catalog\PictureType;
use App\Model\Catalog\PicturesMassEdit;
use App\Repository\Catalog\CatalogRepository;
use App\Repository\Catalog\Picture\VersionRepository;
use App\Repository\Catalog\PictureRepository;
use App\Service\Catalog\PictureContentPopulator;
use App\Service\Catalog\PictureExifPopulator;
use App\Service\Catalog\PictureRemover;
use App\Service\Catalog\PicturesMassEditHelper;
use App\Service\Catalog\Version\PictureVersionHelper;
use Knp\Component\Pager\PaginatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/catalog/picture'), IsGranted('ROLE_CONTRIBUTOR')]
class PictureController extends AbstractController
{
    /**
     * @var PictureRepository
     */
    private $pictureRepository;
    private VersionRepository $versionRepository;
    private CatalogRepository $catalogRepository;
    
    public function __construct(PictureRepository $pictureRepository, VersionRepository $versionRepository, CatalogRepository $catalogRepository)
    {
        $this->pictureRepository = $pictureRepository;
        $this->versionRepository = $versionRepository;
        $this->catalogRepository = $catalogRepository;
    }
    
    #[Route('/all', name: 'ADMIN_CATALOG_PICTURE_INDEX', methods: ['GET'])]
    public function index(Request $request, PaginatorInterface $paginator): Response
    {
        $pagination = $paginator->paginate(
            $this->pictureRepository->createQueryBuilder('p')->getQuery(), /* query NOT result */
            $request->get('page', 1), /*page number*/
            100 /*limit per page*/
        );
    
        return $this->render('catalog/picture/index.html.twig', [
            'pagination' => $pagination,
        ]);
    }
    
    
    #[Route('/orphelines', name: 'ADMIN_CATALOG_PICTURE_ORPHELINES', methods: ['GET'])]
    public function orphelines(): Response
    {
        return $this->render('catalog/picture/index-catalog.html.twig', [
            'catalog' => (new Catalog())->setName('Orphelines'),
            'pictures' => $this->pictureRepository->createQueryBuilder('p')
                                                  ->where('p.catalog is null')
                                                  ->getQuery()
                                                  ->getResult()
            ,
        ]);
    }
    
    #[Route('/catalog/{catalogId}', name: 'ADMIN_CATALOG_PICTURE_INDEX_CATALOG', methods: ['GET'])]
    public function indexCatalog(int $catalogId, Request $request, PaginatorInterface $paginator): Response
    {
        if (!$catalog = $this->catalogRepository->byIdAdmin($catalogId)) {
            return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_BROWSE');
        }
        
        return $this->render('catalog/picture/index-catalog.html.twig', [
            'catalog' => $catalog,
            'pictures' => $catalog->getPictures(),
        ]);
    }
    
    #[Route('/new/', name: 'ADMIN_CATALOG_PICTURE_NEW', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $picture = new Picture();
        $form = $this->createForm(PictureType::class, $picture);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            
            PictureExifPopulator::populate($picture);
            PictureContentPopulator::setContent($picture);
            
            $picture->getValidatedVersion()->setStatus(PictureVersionHelper::STATUS_ACCEPTED);
            
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($picture);
            $entityManager->flush();
    
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX', [], Response::HTTP_SEE_OTHER);
        }
    
        return $this->renderForm('catalog/picture/new.html.twig', [
            'picture' => $picture,
            'form' => $form,
        ]);
    }
    
    #[Route('/ajout-multiple/', name: 'ADMIN_CATALOG_PICTURE_NEW_MULTIPLE', methods: ['GET', 'POST'])]
    public function newMultiple(): Response
    {
        return $this->renderForm('catalog/picture/new-multiple.html.twig', [
            'catalogs' => array_filter($this->catalogRepository->findAll(), function ($catalog) {
                return Catalog::ROOT !== $catalog->getName();
            }),
        ]);
    }
    
    #[Route('/modification-multiple/{catalogId}', name: 'ADMIN_CATALOG_PICTURE_EDIT_MULTIPLE', methods: ['GET', 'POST'])]
    public function editMultiple(?int $catalogId, Request $request, PicturesMassEditHelper $pictureMassEdit): Response
    {
        if (!$catalog = $this->catalogRepository->byIdAdmin($catalogId)) {
            return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_BROWSE');
        }
        
        $picturesMassEdit = (new PicturesMassEdit())
            ->setOriginalCatalog($catalog)
            ->setNewCatalog($catalog)
            ->setPictures($catalog->getPictures()->toArray());
        $form = $this->createForm(PictureMassEditType::class, $picturesMassEdit);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $pictureMassEdit->massEdit($picturesMassEdit);
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_EDIT_MULTIPLE', [
                'catalogId' => $catalogId
            ]);
        }
        
        return $this->renderForm('catalog/picture/edit-multiple.html.twig', [
            'catalog' => $catalog,
            'form' => $form,
            'catalogs' => array_filter($this->catalogRepository->findAll(), function ($catalog) {
                return Catalog::ROOT !== $catalog->getName();
            }),
        ]);
    }
    
    
    #[Route('/{id}', name: 'ADMIN_CATALOG_PICTURE_SHOW', methods: ['GET'])]
    public function show(int $id): Response
    {
        if (!$picture = $this->pictureRepository->byIdAdmin($id)) {
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX');
        }
        return $this->render('catalog/picture/show.html.twig', [
            'picture' => $picture,
        ]);
    }
    
    #[Route('/{id}/edit', name: 'ADMIN_CATALOG_PICTURE_EDIT', methods: ['GET', 'POST'])]
    public function edit(Request $request, int $id): Response
    {
        if (!$picture = $this->pictureRepository->byIdAdmin($id)) {
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX');
        }
        
        $form = $this->createForm(PictureType::class, $picture);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            PictureExifPopulator::populate($picture);
            PictureContentPopulator::setContent($picture);
            $this->getDoctrine()->getManager()->flush();
    
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_EDIT', [
                'id' => $picture->getId()
            ], Response::HTTP_SEE_OTHER);
        }
        
        return $this->renderForm('catalog/picture/edit.html.twig', [
            'picture' => $picture,
            'form' => $form,
        ]);
    }
    
    
    #[Route('/{id}', name: 'ADMIN_CATALOG_PICTURE_DELETE', methods: ['POST'])]
    public function delete(Request $request, int $id, PictureRemover $pictureRemover): Response
    {
        if (!$picture = $this->pictureRepository->byIdAdmin($id)) {
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX');
        }
    
        if ($this->isCsrfTokenValid('delete' . $picture->getId(), $request->request->get('_token'))) {
//            $entityManager = $this->getDoctrine()->getManager();
//            $entityManager->remove($picture);
//            $entityManager->flush();
            $pictureRemover->remove($picture);
        }
    
        return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_TREE', [
            'id' => $picture->getCatalog()->getId()
        ], Response::HTTP_SEE_OTHER);
        return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX', [], Response::HTTP_SEE_OTHER);
    }
}
