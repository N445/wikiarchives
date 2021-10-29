<?php

namespace App\Controller\Front;

use App\Provider\CatalogProvider;
use App\Provider\PictureProvider;
use App\Security\Voter\PictureVersionVoter;
use App\Service\Catalog\PictureDownloadProvider;
use App\Service\Catalog\Version\VersionProposator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/catalog/{catalogId}/picture')]
class PictureController extends AbstractController
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
    
    #[Route('/{id}', name: 'PICTURE')]
    public function picture(int $catalogId, int $id): Response
    {
        if (!$picture = $this->pictureProvider->byId($id)) {
            return $this->redirectToRoute('HOMEPAGE');
        }
        
        return $this->render('default/picture.html.twig', [
            'picture' => $picture,
        ]);
    }
    
    #[Route('/{id}/download/{size}', name: 'PICTURE_DOWNLOAD')]
    public function pictureDownload(int $catalogId, int $id, ?string $size, Request $request, PictureDownloadProvider $pictureDownloadProvider)
    {
        if (!$picture = $this->pictureProvider->byId($id)) {
            return $this->redirectToRoute('HOMEPAGE');
        }

//            return $this->redirect($pictureDownloadProvider->getResizedPicture($picture, $size));
        return $pictureDownloadProvider->getResizedPicture($picture, $size);
    }
    
    /**
     * @param int $catalogId
     * @param int $id
     * @param VersionProposator $versionProposator
     * @return Response
     */
    #[Route('/{id}/change', name: 'PICTURE_CHANGE')]
    public function pictureChange(int $catalogId, int $id, VersionProposator $versionProposator, Request $request): Response
    {
        if (!$this->getUser()) {
            $this->addFlash('info', 'You must be connected to propose a new version');
            return $this->redirectToRoute('APP_LOGIN');
        }
        
        if (!$picture = $this->pictureProvider->byId($id)) {
            return $this->redirectToRoute('HOMEPAGE');
        }
        
        if (!$this->isGranted(PictureVersionVoter::PICTURE_VERSION_CREATE, $this->getUser())) {
            return $this->redirectToRoute('PICTURE', [
                'catalogId' => $picture->getCatalog()->getId(),
                'id' => $picture->getId(),
            ]);
        }
        
        
        $data = $versionProposator->getNewVersion($picture);
        $form = $data['form'];
        $newVersion = $data['newVersion'];
        
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $versionProposator->proposeVersion($newVersion, $picture);
            $this->addFlash('success', 'Thanks for your participation');
            return $this->redirectToRoute('PICTURE', [
                'catalogId' => $picture->getCatalog()->getId(),
                'id' => $picture->getId(),
            ]);
        }
        
        return $this->render('default/change.html.twig', [
            'picture' => $picture,
            'newVersion' => $newVersion,
            'form' => $form->createView(),
        ]);
    }
}