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
            return $this->render('admin/index.html.twig', [
                'catalogs' => $catalogRepository->findAll(),
                'pictures' => $pictureRepository->findAll(),
                'versions' => $versionRepository->getByType(PictureVersionHelper::TYPE_TMP),
            ]);
        }
    }
