<?php

namespace App\Controller\Catalog;

use App\Entity\Catalog\Place;
use App\Form\Catalog\PlaceType;
use App\Repository\Catalog\PlaceRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/catalog/place'), IsGranted('ROLE_CONTRIBUTOR')]
class PlaceController extends AbstractController
{
    #[Route('/', name: 'ADMIN_CATALOG_PLACE_INDEX', methods: ['GET'])]
    public function index(PlaceRepository $placeRepository): Response
    {
        return $this->render('catalog/place/index.html.twig', [
            'places' => $placeRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'ADMIN_CATALOG_PLACE_NEW', methods: ['GET','POST'])]
    public function new(Request $request): Response
    {
        $place = new Place();
        $form = $this->createForm(PlaceType::class, $place);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($place);
            $entityManager->flush();

            return $this->redirectToRoute('ADMIN_CATALOG_PLACE_INDEX', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('catalog/place/new.html.twig', [
            'place' => $place,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'ADMIN_CATALOG_PLACE_SHOW', methods: ['GET'])]
    public function show(Place $place): Response
    {
        return $this->render('catalog/place/show.html.twig', [
            'place' => $place,
        ]);
    }

    #[Route('/{id}/edit', name: 'ADMIN_CATALOG_PLACE_EDIT', methods: ['GET','POST'])]
    public function edit(Request $request, Place $place): Response
    {
        $form = $this->createForm(PlaceType::class, $place);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('ADMIN_CATALOG_PLACE_INDEX', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('catalog/place/edit.html.twig', [
            'place' => $place,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'ADMIN_CATALOG_PLACE_DELETE', methods: ['POST'])]
    public function delete(Request $request, Place $place): Response
    {
        if ($this->isCsrfTokenValid('delete'.$place->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($place);
            $entityManager->flush();
        }

        return $this->redirectToRoute('ADMIN_CATALOG_PLACE_INDEX', [], Response::HTTP_SEE_OTHER);
    }
}
