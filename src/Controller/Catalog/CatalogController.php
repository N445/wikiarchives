<?php

namespace App\Controller\Catalog;

use App\Entity\Catalog\Catalog;
use App\Form\Catalog\AjaxCatalogTreeType;
use App\Form\Catalog\CatalogType;
use App\Repository\Catalog\CatalogRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/catalog/catalog')]
class CatalogController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;
    /**
     * @var CatalogRepository
     */
    private CatalogRepository $catalogRepository;

    public function __construct(
        EntityManagerInterface $em,
        CatalogRepository $catalogRepository
    )
    {
        $this->em = $em;
        $this->catalogRepository = $catalogRepository;
    }

    #[Route('/{id}', name: 'ADMIN_CATALOG_CATALOG_INDEX', methods: ['GET'])]
    public function index(?int $id = null): Response
    {
        $trees = $this->catalogRepository->getRoot();

        $catalog = (new Catalog())->setName('Non classé');

        if ($id) {
            if (!$catalog = $this->catalogRepository->byId($id)) {
                $catalog = (new Catalog())->setName('Non classé');
            }
        }

        return $this->render('catalog/catalog/index.html.twig', [
            'trees' => $trees,
            'catalog' => $catalog,
        ]);
    }

    #[Route('/new', name: 'ADMIN_CATALOG_CATALOG_NEW', methods: ['GET','POST'])]
    public function new(Request $request): Response
    {
        $catalog = new Catalog();
        $form = $this->createForm(CatalogType::class, $catalog);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($catalog);
            $entityManager->flush();

            return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_INDEX', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('catalog/catalog/new.html.twig', [
            'catalog' => $catalog,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'ADMIN_CATALOG_CATALOG_SHOW', methods: ['GET'])]
    public function show(Catalog $catalog): Response
    {
        return $this->render('catalog/catalog/show.html.twig', [
            'catalog' => $catalog,
        ]);
    }

    #[Route('/{id}/edit', name: 'ADMIN_CATALOG_CATALOG_EDIT', methods: ['GET','POST'])]
    public function edit(Request $request, Catalog $catalog): Response
    {
        $form = $this->createForm(CatalogType::class, $catalog);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_INDEX', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('catalog/catalog/edit.html.twig', [
            'catalog' => $catalog,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'ADMIN_CATALOG_CATALOG_DELETE', methods: ['POST'])]
    public function delete(Request $request, Catalog $catalog): Response
    {
        if ($this->isCsrfTokenValid('delete' . $catalog->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($catalog);
            $entityManager->flush();
        }

        return $this->redirectToRoute('ADMIN_CATALOG_CATALOG_INDEX', [], Response::HTTP_SEE_OTHER);
    }
}
