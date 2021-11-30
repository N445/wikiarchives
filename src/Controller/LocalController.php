<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/locale')]
class LocalController extends AbstractController
{
    #[Route('/switch/{_locale}', name: 'LOCALE_SWITCH', methods: ['GET'])]
    public function index(Request $request): Response
    {
        return $this->redirect($request->headers->get('referer'));
    }
}
