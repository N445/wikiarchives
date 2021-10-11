<?php

namespace App\Controller\Catalog;

use App\DataTransformer\Catalog\CatalogDataTransformer;
use App\Entity\Catalog\Catalog;
use App\Form\Catalog\AjaxCatalogTreeType;
use App\Form\Catalog\CatalogType;
use App\Repository\Catalog\CatalogRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/ajax/catalog')]
class AjaxCatalogController extends AbstractController
{
    /**
     * @var CatalogRepository
     */
    private CatalogRepository $catalogRepository;
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;
    /**
     * @var CatalogDataTransformer
     */
    private CatalogDataTransformer $catalogDataTransformer;

    public function __construct(
        CatalogRepository $catalogRepository,
        EntityManagerInterface $em,
        CatalogDataTransformer $catalogDataTransformer
    )
    {
        $this->catalogRepository = $catalogRepository;
        $this->em = $em;
        $this->catalogDataTransformer = $catalogDataTransformer;
    }


    /**
     * Création de la route "add"
     * @Route("/add", name="ADMIN_AJAX_ADMIN_CATALOG_CATALOG_ADD", methods={"POST"},options={"expose":true})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function add(Request $request)
    {
        $newcatalog = new Catalog();

        $newDirectoryForm = $this->createForm(AjaxCatalogTreeType::class, $newcatalog);

        $newDirectoryForm->handleRequest($request);

        if ($newDirectoryForm->isSubmitted() && $newDirectoryForm->isValid()) {
            $this->em->persist($newcatalog);
            $this->em->flush();
            return $this->json([
                'success' => true,
                'directory' => $this->catalogDataTransformer->toArray($newcatalog),
//                'nb_laws' => $newcatalog->getLaws()->count(),
//                'html' => $this->renderView('law/directory/ajax/open.html.twig', [
//                    'directory' => $newcatalog,
//                ]),
            ]);
        }
        return $this->json([
            'success' => false,
            'message' => 'Forumlaire invalid',
            'html' => $this->renderView('catalog/catalog/includes/_modal-new-catalog.html.twig', [
                'newDirectoryForm' => $newDirectoryForm->createView(),
            ]),
        ]);
    }

    /**
     * Création de la route "add"
     * @Route("/{id}/edit", name="ADMIN_AJAX_ADMIN_CATALOG_CATALOG_EDIT", methods={"GET","POST"},options={"expose":true})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function edit(int $siteid, int $id, Request $request)
    {
        $site = $this->siteProvider->get($siteid);

        if (!$directory = $this->directoryRepository->byId($site, $id)) {
            return $this->json([
                'success' => false,
                'message' => 'Pas de dossier trouvé',
            ]);
        }

        $editDirectoryForm = $this->createForm(AjaxDirectoryTreeType::class, $directory, [
            DirectoryType::PARENT_CHOICES => $this->directoryRepository->getSiteData($site),
            DirectoryType::STATE => DirectoryType::STATE_EDIT,
        ]);

        $editDirectoryForm->handleRequest($request);

        if ($editDirectoryForm->isSubmitted() && $editDirectoryForm->isValid()) {
            $directory->getFile()->setDirectory($directory);
            $this->em->persist($directory);
            $this->em->flush();
            return $this->json([
                'success' => true,
                'directory' => $this->directoryDataTransformer->toArray($directory),
                'nb_laws' => $directory->getLaws()->count(),
                'html' => $this->renderView('law/directory/ajax/open.html.twig', [
                    'site' => $site,
                    'directory' => $directory,
                ]),
            ]);
        }
        return $this->json([
            'success' => true,
            'html' => $this->renderView('law/directory/tree/_edit-directory-modal.html.twig', [
                'editDirectoryForm' => $editDirectoryForm->createView(),
                'directory' => $directory,
            ]),
        ]);
    }


    /**
     * Création de la route "add"
     * @Route("/{id}/remove", name="ADMIN_AJAX_ADMIN_CATALOG_CATALOG_REMOVE", methods={"POST"},options={"expose":true})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function remove(int $siteid, int $id, Request $request)
    {
        $site = $this->siteProvider->get($siteid);

        if (!$directory = $this->directoryRepository->byId($site, $id)) {
            return $this->json([
                'success' => false,
                'message' => 'Pas de dossier trouvé',
            ]);
        }

        $this->em->remove($directory);
        $this->em->flush();

        return $this->json([
            'success' => true,
        ]);
    }


    /**
     * Création de la route "add"
     * @Route("/{id}/set-parent/{parentId}", name="ADMIN_AJAX_ADMIN_CATALOG_CATALOG_SET_PARENT",
     *                                       methods={"POST"},options={"expose":true})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function setParent(int $siteid, int $id, ?int $parentId = null, Request $request)
    {
        $site = $this->siteProvider->get($siteid);

        if (!$directory = $this->directoryRepository->byId($site, $id)) {
            return $this->json([
                'success' => false,
                'message' => 'Pas de dossier trouvé',
            ]);
        }

        if (!$parentId) {
            $directory->setParent(null);

            $this->em->persist($directory);
            $this->em->flush();
            return $this->json([
                'success' => true,
            ]);
        }

        if (!$parentDirectory = $this->directoryRepository->byId($site, $parentId)) {
            return $this->json([
                'success' => false,
                'message' => 'Pas de dossier trouvé',
            ]);
        }

        $directory->setParent($parentDirectory);

        $this->em->persist($directory);
        $this->em->flush();

        return $this->json([
            'success' => true,
        ]);
    }


    /**
     * @Route("/{id}", name="ADMIN_AJAX_ADMIN_CATALOG_CATALOG_OPEN", methods={"GET"},options={"expose":true})
     */
    public function show(int $siteid, int $id, Request $request): Response
    {
        $site = $this->siteProvider->get($siteid);

        if (!$directory = $this->directoryRepository->byId($site, $id)) {
            return $this->json([
                'success' => false,
                'message' => 'Pas de dossier trouvé',
            ]);
        }

        return $this->json([
            'success' => true,
            'directory' => $this->directoryDataTransformer->toArray($directory),
            'nb_laws' => $directory->getLaws()->count(),
            'html' => $this->renderView($request->get('issmall')
                ? 'law/directory/ajax/open-small.html.twig'
                : 'law/directory/ajax/open.html.twig', [
                'site' => $site,
                'directory' => $directory,
            ]),
        ]);
    }
}
