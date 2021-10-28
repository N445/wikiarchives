<?php

namespace App\Controller;

use App\Repository\Catalog\PictureRepository;
use App\Repository\UserRepository;
use App\Service\User\UserVersionsProvider;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/profile'), IsGranted("ROLE_USER")]
class ProfileController extends AbstractController
{
    private UserRepository $userRepository;
    private PictureRepository $pictureRepository;
    
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    
    #[Route('/', name: 'PROFILE')]
    public function profile(UserVersionsProvider $versionsProvider)
    {
        if (!$user = $this->userRepository->byId($this->getUser()->getId())) {
            return $this->redirectToRoute('HOMEPAGE');
        }
    
        $pictures = $versionsProvider->getUserVersions($user);
        
        return $this->render('profile/index.html.twig', [
            'user' => $user,
            'pictures' => $pictures,
        ]);
    }
}
