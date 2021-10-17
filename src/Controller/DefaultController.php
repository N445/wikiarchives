<?php

namespace App\Controller;


use App\Form\Catalog\Picture\VersionType;
use App\Repository\Catalog\CatalogRepository;
use App\Repository\Catalog\PictureRepository;
use App\Service\Breadcrumb\BreadcrumbCreator;
use App\Service\Catalog\PictureVersionCloner;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    private CatalogRepository $catalogRepository;
    private PictureRepository $pictureRepository;
    private BreadcrumbCreator $breadcrumbCreator;

    public function __construct(
        CatalogRepository $catalogRepository,
        PictureRepository $pictureRepository,
        BreadcrumbCreator $breadcrumbCreator
    )
    {
        $this->catalogRepository = $catalogRepository;
        $this->pictureRepository = $pictureRepository;
        $this->breadcrumbCreator = $breadcrumbCreator;
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
    public function pictureChange(?int $catalogId = null, ?int $id = null, Request $request): Response
    {
        if (!$this->getUser()) {
            $this->addFlash('info', 'You must be connected to propose a new version');
            return $this->redirectToRoute('APP_LOGIN');
        }
        if (!$id) {
            return $this->redirectToRoute('HOMEPAGE');
        }
        if (!$picture = $this->pictureRepository->byId($id)) {
            return $this->redirectToRoute('HOMEPAGE');
        }

        $newVersion = PictureVersionCloner::cloneVersion($picture);

        $form = $this->createForm(VersionType::class, $newVersion);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $picture->addVersion($newVersion);
            $em->flush();
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
