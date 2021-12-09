<?php

namespace App\Controller\Actuality;

use App\Entity\Actuality\Actuality;
use App\Form\Actuality\ActualityType;
use App\Repository\Actuality\ActualityRepository;
use App\Service\User\UserRoles;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/actuality'), IsGranted(UserRoles::ROLE_ADMIN)]
class ActualityController extends AbstractController
{
    #[Route('/', name: 'ACTUALITY_ACTUALITY_INDEX', methods: ['GET'])]
    public function index(ActualityRepository $actualityRepository): Response
    {
        return $this->render('actuality/actuality/index.html.twig', [
            'actualities' => $actualityRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'ACTUALITY_ACTUALITY_NEW', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $actuality = new Actuality();
        $form = $this->createForm(ActualityType::class, $actuality);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($actuality);
            $entityManager->flush();

            return $this->redirectToRoute('ACTUALITY_ACTUALITY_INDEX', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('actuality/actuality/new.html.twig', [
            'actuality' => $actuality,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'ACTUALITY_ACTUALITY_SHOW', methods: ['GET'])]
    public function show(Actuality $actuality): Response
    {
        return $this->render('actuality/actuality/show.html.twig', [
            'actuality' => $actuality,
        ]);
    }

    #[Route('/{id}/edit', name: 'ACTUALITY_ACTUALITY_EDIT', methods: ['GET', 'POST'])]
    public function edit(Request $request, Actuality $actuality, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ActualityType::class, $actuality);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('ACTUALITY_ACTUALITY_INDEX', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('actuality/actuality/edit.html.twig', [
            'actuality' => $actuality,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'ACTUALITY_ACTUALITY_DELETE', methods: ['POST'])]
    public function delete(Request $request, Actuality $actuality, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$actuality->getId(), $request->request->get('_token'))) {
            $entityManager->remove($actuality);
            $entityManager->flush();
        }

        return $this->redirectToRoute('ACTUALITY_ACTUALITY_INDEX', [], Response::HTTP_SEE_OTHER);
    }
}
