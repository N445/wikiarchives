<?php

namespace App\MessageHandler;

use App\Entity\Catalog\Picture;
use App\Message\ImageDownload;
use App\Repository\Catalog\PictureRepository;
use App\Service\Catalog\PictureContentPopulator;
use App\Service\Catalog\PictureExifPopulator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class ImageDownloadHandler implements MessageHandlerInterface
{
    private PictureRepository $pictureRepository;
    private EntityManagerInterface $em;
    
    public function __construct(PictureRepository $pictureRepository, EntityManagerInterface $em)
    {
        $this->pictureRepository = $pictureRepository;
        $this->em = $em;
    }
    
    public function __invoke(ImageDownload $message)
    {
        if (!$picture = $this->getPicture($message->getPiwigoId())) {
            return;
        }
        
        $this->setRealImage($picture, $message);
//        $this->setFakeImage($picture, $message);
        
        $this->em->persist($picture);
        $this->em->flush();
        // do something with your message
    }
    
    /**
     * @param int $piwigoId
     * @return Picture|null
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    private function getPicture(int $piwigoId): ?Picture
    {
        return $this->pictureRepository->createQueryBuilder('p')
                                       ->where('p.piwigoId = :piwigoId')
                                       ->setParameter('piwigoId', $piwigoId)
                                       ->getQuery()
                                       ->getOneOrNullResult()
        ;
    }
    
    /**
     * @param Picture $picture
     * @param ImageDownload $message
     */
    private function setRealImage(Picture $picture, ImageDownload $message)
    {
        $imageUrl = $message->getImageUrl();
        
        $tmpFile = (new Filesystem())->tempnam(sys_get_temp_dir(), 'message-download');
        copy($imageUrl, $tmpFile);
        $uploadedfile = new UploadedFile($tmpFile, basename($imageUrl), null, null, true);
        
        $file = $picture->getFile();
        $file->setImageFile($uploadedfile);
        
        $exif = PictureExifPopulator::getExifFromFile($uploadedfile);
        
        $picture->setFile($file);
        $picture->setExif($exif);
        PictureContentPopulator::setContent($picture);
    }
    
    private function setFakeImage(Picture $picture)
    {
        $pictureFake = $this->getFakeImages()[array_rand($this->getFakeImages())];
        
        $picture->getFile()->setImageName($pictureFake['name']);
        $picture->setExif($pictureFake['exif']);
    }
    
    /**
     * @return array
     */
    public function getFakeImages(): array
    {
        $finder = new Finder();
// find all files in the current directory
        $finder->files()
               ->in(__DIR__ . '/../../public/uploads/picture/')
               ->name('aaa-test-image-*')
        ;
        
        $fakeImages = [];
        
        /** @var SplFileInfo $image */
        foreach ($finder as $image) {
            $fakeImages[] = [
                'name' => $image->getRelativePathname(),
                'exif' => PictureExifPopulator::getExifFromFile($image->getPathname())
            ];
        }
        return $fakeImages;
    }
}
