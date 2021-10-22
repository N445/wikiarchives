<?php

namespace App\Controller\Catalog;

use App\Entity\Catalog\Picture;
use App\Form\Catalog\PictureType;
use App\Repository\Catalog\Picture\VersionRepository;
use App\Repository\Catalog\PictureRepository;
use App\Service\Catalog\PictureContentPopulator;
use App\Service\Catalog\PictureExifPopulator;
use App\Service\Catalog\PictureRemover;
use App\Service\Catalog\PictureVersionHelper;
use App\Service\Catalog\VersionValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/catalog/picture')]
class PictureController extends AbstractController
{
    /**
     * @var PictureRepository
     */
    private $pictureRepository;
    private VersionRepository $versionRepository;
    
    public function __construct(PictureRepository $pictureRepository, VersionRepository $versionRepository)
    {
        $this->pictureRepository = $pictureRepository;
        $this->versionRepository = $versionRepository;
    }
    
    #[Route('/', name: 'ADMIN_CATALOG_PICTURE_INDEX', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('catalog/picture/index.html.twig', [
            'pictures' => $this->pictureRepository->findAll(),
        ]);
    }
    
    #[Route('/new', name: 'ADMIN_CATALOG_PICTURE_NEW', methods: ['GET', 'POST'])]
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
            
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX', [], Response::HTTP_SEE_OTHER);
        }
        
        return $this->renderForm('catalog/picture/edit.html.twig', [
            'picture' => $picture,
            'form' => $form,
        ]);
    }
    
    /**
     * Création de la route "picture tmp versions"
     */
    #[Route('/{id}/picture-tmp-versions', name: 'ADMIN_CATALOG_PICTURE_TMP_VERSIONS')]
    public function tmpVersions(int $id): Response
    {
        if (!$picture = $this->pictureRepository->byIdAdmin($id)) {
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX');
        }
        return $this->render('catalog/picture/tmp-versions.html.twig', [
                'picture' => $picture
            ]
        );
    }
    
    /**
     * Création de la route "picture tmp versions"
     */
    #[Route('/{id}/picture-tmp-versions/{versionId}', name: 'ADMIN_CATALOG_PICTURE_TMP_VERSIONS_SHOW')]
    public function tmpVersionsShow(int $id, int $versionId, Request $request, VersionValidator $versionValidator): Response
    {
        if (!$picture = $this->pictureRepository->byIdAdmin($id)) {
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX');
        }
        if (!$version = $this->versionRepository->tmpById($versionId)) {
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_TMP_VERSIONS', [
                'id' => $picture->getId()
            ]);
        }
        $finalVersion = PictureVersionHelper::getFinalVersion($picture->getValidatedVersion(), $version);
        
        if ($request->getMethod() === 'POST') {
            $submittedToken = $request->request->get('token');
            if ($type = $request->get('type')) {
                if ($this->isCsrfTokenValid($type . '-version', $submittedToken)) {
                    $versionValidator->valdiate($type, $picture, $version, $finalVersion);
                    return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_TMP_VERSIONS', [
                        'id' => $picture->getId()
                    ]);
                }
            }
        }
        
        
        return $this->render('catalog/picture/tmp-versions-show.html.twig', [
                'picture' => $picture,
                'version' => $version,
                'finalVersion' => $finalVersion,
            ]
        );
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
        
        return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX', [], Response::HTTP_SEE_OTHER);
    }
}
