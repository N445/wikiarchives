<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserBackOfficeType;
use App\Repository\UserRepository;
use App\Service\User\UserRoles;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/user'), IsGranted('ROLE_ADMIN')]
class UserController extends AbstractController
{
    #[Route('/', name: 'ADMIN_USER_INDEX', methods: ['GET'])]
    public function index(UserRepository $userRepository): Response
    {
        return $this->render('user/index.html.twig', [
            'users' => array_filter($userRepository->findAll(), function (User $user) {
                return count(array_intersect([UserRoles::ROLE_ADMIN, UserRoles::ROLE_CONTRIBUTOR, UserRoles::ROLE_MODERATOR], $user->getRoles())) <= 0;
            }),
        ]);
    }
    
    #[Route('/admin', name: 'ADMIN_USER_INDEX_ADMIN', methods: ['GET'])]
    public function admin(UserRepository $userRepository): Response
    {
        return $this->render('user/index-admin.html.twig', [
            'users' => array_filter($userRepository->findAll(), function (User $user) {
                return count(array_intersect([UserRoles::ROLE_ADMIN, UserRoles::ROLE_CONTRIBUTOR, UserRoles::ROLE_MODERATOR], $user->getRoles())) > 0;
            }),
        ]);
    }
    
    #[Route('/new', name: 'ADMIN_USER_NEW', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $user = new User();
        $form = $this->createForm(UserBackOfficeType::class, $user);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute('ADMIN_USER_INDEX', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/new.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'user_show', methods: ['GET'])]
    public function show(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }

    #[Route('/{id}/edit', name: 'ADMIN_USER_EDIT', methods: ['GET','POST'])]
    public function edit(Request $request, User $user): Response
    {
        $form = $this->createForm(UserBackOfficeType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('ADMIN_USER_INDEX', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/edit.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'ADMIN_USER_DELETE', methods: ['POST'])]
    public function delete(Request $request, User $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('ADMIN_USER_INDEX', [], Response::HTTP_SEE_OTHER);
    }
}
