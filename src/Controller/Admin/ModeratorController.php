<?php

namespace App\Controller\Admin;

use App\Form\Catalog\Picture\VersionValidatorType;
use App\Model\Catalog\Picture\Version\PictureVersionSorter;
use App\Repository\Catalog\Picture\VersionRepository;
use App\Repository\Catalog\PictureRepository;
use App\Service\Catalog\Version\PictureVersionHelper;
use App\Service\Catalog\Version\VersionValidator;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/moderation'), IsGranted('ROLE_MODERATOR')]
class ModeratorController extends AbstractController
{
    private VersionRepository $versionRepository;
    private PictureRepository $pictureRepository;
    
    public function __construct(
        VersionRepository $versionRepository,
        PictureRepository $pictureRepository
    )
    {
        $this->versionRepository = $versionRepository;
        $this->pictureRepository = $pictureRepository;
    }
    
    /**
     * Création de la route "moderation"
     */
    #[Route('/', name: 'ADMIN_MODERATION')]
    public function moderation()
    {
        $versions = $this->versionRepository->getByType(PictureVersionHelper::TYPE_TMP);
        $versionsSorted = [];
        
        foreach ($versions as $version) {
            if (array_key_exists($version->getTmpPicture()->getId(), $versionsSorted)) {
                $versionsSorted[$version->getTmpPicture()->getId()]->addVersion($version);
                continue;
            }
            $versionsSorted[$version->getTmpPicture()->getId()] = new PictureVersionSorter($version);
        }
        
        return $this->render('admin/moderation/moderation.html.twig', [
            'versionsSorted' => $versionsSorted,
        ]);
    }
    
    #[Route('/picture/{id}/', name: 'ADMIN_MODERATION_PICTURE_TMP_VERSIONS')]
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
    #[Route('/picture/{id}/versions/{versionId}', name: 'ADMIN_MODERATION_PICTURE_TMP_VERSIONS_SHOW')]
    public function tmpVersionsShow(int $id, int $versionId, Request $request, VersionValidator $versionValidator): Response
    {
        if (!$picture = $this->pictureRepository->byIdAdmin($id)) {
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX');
        }
        if (!$version = $this->versionRepository->tmpById($versionId)) {
            return $this->redirectToRoute('ADMIN_MODERATION_PICTURE_TMP_VERSIONS', [
                'id' => $picture->getId()
            ]);
        }
        
        if (PictureVersionHelper::STATUS_ACCEPTED === $version->getStatus()) {
            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_SHOW', [
                'id' => $picture->getId()
            ]);
        }
        
        $finalVersion = PictureVersionHelper::getFinalVersion($version->getBasedVersion(), $version);
        $finalVersion2 = PictureVersionHelper::getFinalVersion($picture->getValidatedVersion(), $version);
        
        $validationForm = $this->get('form.factory')->createNamed('version_validator_1', VersionValidatorType::class);
        $validationForm->handleRequest($request);
        
        if ($validationForm->isSubmitted() && $validationForm->isValid()) {
            
            if ($validationForm->get('refused')->isClicked()) {
                $versionValidator->refused($picture, $version, $finalVersion);
            } elseif ($validationForm->get('refusedAndBlockUser')->isClicked()) {
                $versionValidator->refused($picture, $version, $finalVersion, true);
            } elseif ($validationForm->get('accepted')->isClicked()) {
                $versionValidator->validated($picture, $version, $finalVersion);
            } elseif ($validationForm->get('accepted2')->isClicked()) {
                $versionValidator->validated($picture, $version, $finalVersion2);
            }
            
            return $this->redirectToRoute('ADMIN_MODERATION_PICTURE_TMP_VERSIONS', [
                'id' => $picture->getId()
            ]);
        }
        
        return $this->render('catalog/picture/tmp-versions-show.html.twig', [
                'picture' => $picture,
                'version' => $version,
                'finalVersion' => $finalVersion,
                'validationForm' => $validationForm->createView(),
                'finalVersion2' => $finalVersion2,
            ]
        );
    }
}