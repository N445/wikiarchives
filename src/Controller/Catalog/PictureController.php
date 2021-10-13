<?php

namespace App\Controller\Catalog;

use App\Entity\Catalog\Picture;
use App\Form\Catalog\PictureType;
use App\Repository\Catalog\PictureRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/catalog/picture')]
class PictureController extends AbstractController
{
    #[Route('/', name: 'ADMIN_CATALOG_PICTURE_INDEX', methods: ['GET'])]
    public function index(PictureRepository $pictureRepository): Response
    {
        return $this->render('catalog/picture/index.html.twig', [
            'pictures' => $pictureRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'ADMIN_CATALOG_PICTURE_NEW', methods: ['GET','POST'])]
    public function new(Request $request): Response
    {
        $picture = new Picture();
        $form = $this->createForm(PictureType::class, $picture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
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
    public function show(Picture $picture): Response
    {
        return $this->render('catalog/picture/show.html.twig', [
            'picture' => $picture,
        ]);
    }

    #[Route('/{id}/edit', name: 'ADMIN_CATALOG_PICTURE_EDIT', methods: ['GET','POST'])]
    public function edit(Request $request, Picture $picture): Response
    {
        $form = $this->createForm(PictureType::class, $picture);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('catalog/picture/edit.html.twig', [
            'picture' => $picture,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'ADMIN_CATALOG_PICTURE_DELETE', methods: ['POST'])]
    public function delete(Request $request, Picture $picture): Response
    {
        if ($this->isCsrfTokenValid('delete'.$picture->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($picture);
            $entityManager->flush();
        }

        return $this->redirectToRoute('ADMIN_CATALOG_PICTURE_INDEX', [], Response::HTTP_SEE_OTHER);
    }
}
