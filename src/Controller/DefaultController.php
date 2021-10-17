<?php

namespace App\Controller;

use App\Entity\Catalog\Picture\PictureChange;
use App\Form\Catalog\Picture\PictureChangeType;
use App\Repository\Catalog\CatalogRepository;
use App\Repository\Catalog\PictureRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    private CatalogRepository $catalogRepository;
    private PictureRepository $pictureRepository;

    public function __construct(CatalogRepository $catalogRepository, PictureRepository $pictureRepository)
    {
        $this->catalogRepository = $catalogRepository;
        $this->pictureRepository = $pictureRepository;
    }

    #[Route('/', name: 'HOMEPAGE')]
    public function index(): Response
    {
        return $this->render('default/index.html.twig', [
            'roots' => $this->catalogRepository->getRoot(),
        ]);
    }

    #[Route('/search', name: 'SEARCH')]
    public function search(Request $request): Response
    {
        $query = $request->get('q');
        return $this->render('default/search.html.twig', [
            'catalogs' => $this->catalogRepository->search($query),
            'pictures' => $this->pictureRepository->search($query),
            'query' => $query,
        ]);
    }

    #[Route('/catalog/{id}', name: 'CATALOG')]
    public function catalog(?int $id = null): Response
    {
        if (!$id) {
            return $this->redirectToRoute('HOMEPAGE');
        }
        if (!$catalog = $this->catalogRepository->byId($id)) {
            return $this->redirectToRoute('HOMEPAGE');
        }
        return $this->render('default/catalog.html.twig', [
            'catalog' => $catalog,
        ]);
    }

    #[Route('/catalog/{catalogId}/picture/{id}', name: 'PICTURE')]
    public function picture(?int $catalogId = null, ?int $id = null): Response
    {
        if (!$id) {
            return $this->redirectToRoute('HOMEPAGE');
        }
        if (!$picture = $this->pictureRepository->byId($id)) {
            return $this->redirectToRoute('HOMEPAGE');
        }
        return $this->render('default/picture.html.twig', [
            'picture' => $picture,
        ]);
    }

    #[Route('/catalog/{catalogId}/picture/{id}/change', name: 'PICTURE_CHANGE')]
    public function pictureChange(?int $catalogId = null, ?int $id = null): Response
    {
        if (!$id) {
            return $this->redirectToRoute('HOMEPAGE');
        }
        if (!$picture = $this->pictureRepository->byId($id)) {
            return $this->redirectToRoute('HOMEPAGE');
        }

        $pictureChange = (new PictureChange())->setPicture($picture);
        $pictureChangeForm = $this->createForm(PictureChangeType::class, $pictureChange);

        return $this->render('default/change.html.twig', [
            'picture' => $picture,
            'pictureChange' => $pictureChange,
            'pictureChangeForm' => $pictureChangeForm->createView(),
        ]);
    }
}
