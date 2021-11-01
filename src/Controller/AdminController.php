<?php
    
    namespace App\Controller;
    
    use App\Repository\Catalog\CatalogRepository;
    use App\Repository\Catalog\Picture\VersionRepository;
    use App\Repository\Catalog\PictureRepository;
    use App\Service\Catalog\Version\PictureVersionHelper;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpKernel\KernelInterface;
    use Symfony\Component\Routing\Annotation\Route;

    class AdminController extends AbstractController
    {
        #[Route('/admin', name: 'ADMIN')]
        public function index(
            CatalogRepository $catalogRepository,
            PictureRepository $pictureRepository,
            VersionRepository $versionRepository,
            KernelInterface   $kernel
        ): Response
        {
            $nbCatalog = $catalogRepository->createQueryBuilder('c')->select('count(c.id)')->getQuery()->getResult()[0][1] ?? 0;
            $nbPicture = $pictureRepository->createQueryBuilder('p')->select('count(p.id)')->getQuery()->getResult()[0][1] ?? 0;
            return $this->render('admin/index.html.twig', [
                'nbCatalog' => $nbCatalog,
                'nbPicture' => $nbPicture,
                'versions' => $versionRepository->getByType(PictureVersionHelper::TYPE_TMP),
            ]);
        }
    }
