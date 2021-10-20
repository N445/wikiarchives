<?php
    
    namespace App\Controller;
    
    use App\Repository\Catalog\CatalogRepository;
    use App\Repository\Catalog\Picture\VersionRepository;
    use App\Repository\Catalog\PictureRepository;
    use App\Service\Catalog\PictureVersionHelper;
    use FilesystemIterator;
    use RecursiveDirectoryIterator;
    use RecursiveIteratorIterator;
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
            
            $bytestotal = 0;
            $path = realpath($kernel->getProjectDir() . '/public/uploads/catalog/picture/');
            if ($path !== false && $path != '' && file_exists($path)) {
                foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path, FilesystemIterator::SKIP_DOTS)) as $object) {
                    $bytestotal += $object->getSize();
                }
            }
            
            return $this->render('admin/index.html.twig', [
                'catalogs' => $catalogRepository->findAll(),
                'pictures' => $pictureRepository->findAll(),
                'versions' => $versionRepository->getByStatus(PictureVersionHelper::STATUS_PENDING),
                'bytestotal' => $bytestotal,
            ]);
        }
    }
