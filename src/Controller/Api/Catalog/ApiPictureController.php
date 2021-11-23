<?php


namespace App\Controller\Api\Catalog;

use App\DataTransformer\Catalog\CatalogDataTransformer;
use App\Entity\Catalog\Picture;
use App\Repository\Catalog\CatalogRepository;
use App\Repository\Catalog\CatalogTreeRepository;
use App\Repository\UserRepository;
use App\Service\Catalog\PictureContentPopulator;
use App\Service\Catalog\PictureExifPopulator;
use App\Service\Catalog\PictureLicenseHelper;
use App\Service\Catalog\Version\PictureVersionHelper;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class ApiPictureController extends AbstractController
{
    private CatalogRepository $catalogRepository;
    private CatalogTreeRepository $catalogTreeRepository;
    private EntityManagerInterface $em;
    private CatalogDataTransformer $catalogDataTransformer;
    private UserRepository $userRepository;

    public function __construct(
        CatalogRepository $catalogRepository,
        CatalogTreeRepository $catalogTreeRepository,
        EntityManagerInterface $em,
        CatalogDataTransformer $catalogDataTransformer,
        UserRepository $userRepository
    )
    {
        $this->catalogRepository = $catalogRepository;
        $this->catalogTreeRepository = $catalogTreeRepository;
        $this->em = $em;
        $this->catalogDataTransformer = $catalogDataTransformer;
        $this->userRepository = $userRepository;
    }

    #[Route('/api/catalog/{id}/picture', name: "API_CREATE_PICTURE", methods: ["POST"])]
    public function create(int $id, Request $request)
    {
        $catalog = $this->catalogRepository->find($id);

        $author = $this->userRepository->findAll()[0];

        $file = (new Picture\File())
            ->setImageFile($request->files->get('file'))
            ->setImageName('random name')
            ->setImageSize(20)
            ->setImageMimeType('image/jpeg')
            ->setImageOriginalName('original.jpg')
            ->setImageDimensions([
                100, 100
            ]);

        $picture = (new Picture())
            ->setEnabled(true)
            ->setLicense(PictureLicenseHelper::CC0)
            ->setIsEditedByWikiarchives(false)
            ->setCatalog($catalog)
            ->setFile($file)
            ->setCreatedBy($author)
            ->setCreatedAt(new DateTime());
        PictureExifPopulator::populate($picture);
        PictureContentPopulator::setContent($picture);

        $picture->getValidatedVersion()->setStatus(PictureVersionHelper::STATUS_ACCEPTED);

        $this->em->persist($picture);
        $this->em->flush();

        return $this->json([
            'success' => true,
            'data' => []
        ]);
    }

}
