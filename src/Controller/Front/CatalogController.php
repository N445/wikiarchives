<?php

namespace App\Controller\Front;

use App\Provider\CatalogProvider;
use App\Provider\PictureProvider;
use App\Service\Catalog\PictureDownloadProvider;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/catalog')]
class CatalogController extends AbstractController
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
    
    #[Route('/{id}', name: 'CATALOG')]
    public function catalog(int $id, Request $request): Response
    {
        if (!$catalog = $this->catalogProvider->byId($id, false)) {
            return $this->redirectToRoute('HOMEPAGE');
        }
        
        return $this->render('default/catalog.html.twig', [
            'catalog' => $catalog,
            'pagination' => $this->pictureProvider->byCatalogPaginated($catalog, $request->get('page', 1), 12 * 5),
        ]);
    }
    
    #[Route('/{id}/download/', name: 'CATALOG_DOWNLOAD')]
    public function catalogDownload(int $id, PictureDownloadProvider $pictureDownloadProvider)
    {
        if (!$catalog = $this->catalogProvider->byId($id, false)) {
            return $this->redirectToRoute('HOMEPAGE');
        }

//            return $this->redirect($pictureDownloadProvider->getResizedPicture($picture, $size));
        return $pictureDownloadProvider->catalog($catalog);
    }
}