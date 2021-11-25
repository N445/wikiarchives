<?php
    
    namespace App\Controller\Catalog;
    
    use App\Repository\Catalog\CatalogRepository;
    use App\Service\Catalog\PictureUploadator;
    use Doctrine\ORM\EntityManagerInterface;
    use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\File\UploadedFile;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\Routing\Annotation\Route;

    #[Route("/admin/ajax/catalog/picture", options: ["expose" => true]), IsGranted('ROLE_CONTRIBUTOR')]
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
    
        #[Route("/new-filepond/{catalogId}", name: "AJAX_CATALOG_PICTURE_FILEPOND", methods: ["POST"], options: ['expose' => true])]
        public function ajaxMediaNewFilepond(int $catalogId, Request $request, PictureUploadator $pictureUploadator)
        {
            if (!$catalog = $this->catalogRepository->byIdAdmin($catalogId)) {
                return $this->json([
                    'text' => 'directory not found',
                ], 500);
            }
        
            /** @var UploadedFile $uploadedFile */
            $uploadedFile = $request->files->get('filepond');
        
            $pictureUploadator->upload($catalog, $uploadedFile);
        
            return $this->json([
                'success' => true,
            ]);
        }
    }
