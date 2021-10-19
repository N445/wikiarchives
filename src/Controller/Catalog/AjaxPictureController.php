<?php
    
    namespace App\Controller\Catalog;
    
    use App\Entity\Catalog\Picture;
    use App\Form\Catalog\PictureType;
    use App\Repository\Catalog\CatalogRepository;
    use App\Repository\Catalog\PictureRepository;
    use App\Service\Catalog\PictureContentPopulator;
    use App\Service\Catalog\PictureExifPopulator;
    use App\Service\Catalog\PictureUploadator;
    use App\Service\Catalog\PictureVersionHelper;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\File\UploadedFile;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    
    /**
     * @Route("/admin/ajax/catalog/picture",options={"expose":true})
     */
    class AjaxPictureController extends AbstractController
    {
        /**
         * @var CatalogRepository
         */
        private CatalogRepository $catalogRepository;
        /**
         * @var EntityManagerInterface
         */
        private EntityManagerInterface $em;
        
        public function __construct(
            CatalogRepository      $catalogRepository,
            EntityManagerInterface $em
        )
        {
            $this->catalogRepository = $catalogRepository;
            $this->em = $em;
        }
        
        /**
         * Création de la route "ajax media new"
         * @Route("/new-filepond/{directoryId}", name="AJAX_CATALOG_PICTURE_FILEPOND", methods={"POST"})
         */
        public function ajaxMediaNewFilepond(int $directoryId, Request $request, PictureUploadator $pictureUploadator)
        {
            if (!$catalog = $this->catalogRepository->byIdAdmin($directoryId)) {
                return $this->json([
                    'text' => 'directory not found',
                ]);
            }
            
            /** @var UploadedFile $uploadedFile */
            $uploadedFile = $request->files->get('filepond');
            
            $pictureUploadator->upload($catalog, $uploadedFile);
            
            return $this->json([
                'success' => true,
            ]);
        }
    }
