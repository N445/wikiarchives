<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserBackOfficeType;
use App\Model\Breadcrumb\Breadcrumb;
use App\Model\Breadcrumb\BreadcrumbLink;
use App\Repository\UserRepository;
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
        $breadcrumb = new Breadcrumb([
            new BreadcrumbLink('Dashboard', $this->generateUrl('ADMIN')),
            new BreadcrumbLink('Utilisateurs', $this->generateUrl('ADMIN_USER_INDEX')),
        ]);
        return $this->render('user/index.html.twig', [
            'breadcrumb' => $breadcrumb,
            'users' => $userRepository->getUsers(),
        ]);
    }
    
    #[Route('/admin', name: 'ADMIN_USER_INDEX_ADMIN', methods: ['GET'])]
    public function admin(UserRepository $userRepository): Response
    {
        $breadcrumb = new Breadcrumb([
            new BreadcrumbLink('Dashboard', $this->generateUrl('ADMIN')),
            new BreadcrumbLink('Administrateurs', $this->generateUrl('ADMIN_USER_INDEX_ADMIN')),
        ]);
        return $this->render('user/index-admin.html.twig', [
            'users' => $userRepository->getAdmins(),
            'breadcrumb' => $breadcrumb,
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
    
        $breadcrumb = new Breadcrumb([
            new BreadcrumbLink('Dashboard', $this->generateUrl('ADMIN')),
            new BreadcrumbLink('Utilisateurs', $this->generateUrl('ADMIN_USER_INDEX')),
            new BreadcrumbLink('Ajout d\'un utilisateur', $this->generateUrl('ADMIN_USER_NEW')),
        ]);
    
        return $this->renderForm('user/new.html.twig', [
            'user' => $user,
            'form' => $form,
            'breadcrumb' => $breadcrumb,
        ]);
    }

    #[Route('/{id}', name: 'user_show', methods: ['GET'])]
    public function show(User $user): Response
    {
        $breadcrumb = new Breadcrumb([
            new BreadcrumbLink('Dashboard', $this->generateUrl('ADMIN')),
            new BreadcrumbLink('Utilisateurs', $this->generateUrl('ADMIN_USER_INDEX')),
            new BreadcrumbLink($user->getUserIdentifier(), $this->generateUrl('user_show', [
                'id' => $user->getId()
            ])),
        ]);
    
        return $this->render('user/show.html.twig', [
            'user' => $user,
            'breadcrumb' => $breadcrumb,
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
    
        $breadcrumb = new Breadcrumb([
            new BreadcrumbLink('Dashboard', $this->generateUrl('ADMIN')),
            new BreadcrumbLink('Utilisateurs', $this->generateUrl('ADMIN_USER_INDEX')),
            new BreadcrumbLink('Edition de ' . $user->getUserIdentifier(), $this->generateUrl('ADMIN_USER_EDIT', [
                'id' => $user->getId()
            ])),
        ]);
    
        return $this->renderForm('user/edit.html.twig', [
            'user' => $user,
            'form' => $form,
            'breadcrumb' => $breadcrumb,
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
