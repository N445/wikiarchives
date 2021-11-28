<?php
    
    namespace App\Service\Catalog;
    
    use App\Entity\Catalog\Catalog;
    use App\Entity\Catalog\Picture;
    use App\Service\Catalog\Version\PictureVersionHelper;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Component\Filesystem\Filesystem;
    use Symfony\Component\Finder\Finder;
    use Symfony\Component\HttpFoundation\File\UploadedFile;
    use Symfony\Component\HttpKernel\KernelInterface;
    use ZipArchive;

    class PictureUploadator
    {
        public const SUPPORTED_PICTURES_EXTENSIONS = ['bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp'];
    
        private EntityManagerInterface $em;
        private KernelInterface $kernel;
    
        public function __construct(
            EntityManagerInterface $em,
            KernelInterface        $kernel
        )
        {
            $this->em = $em;
            $this->kernel = $kernel;
        }
    
        public function upload(Catalog $catalog, UploadedFile $uploadedFile)
        {
            if ('application/zip' !== $uploadedFile->getClientMimeType()) {
                $this->uploadPicturefile($catalog, $uploadedFile, true);
                return;
            }
        
            $zip = new ZipArchive();
            $tmp = $this->kernel->getProjectDir() . '/var/tmp/' . uniqid('', true);
            $finder = new Finder();
        
            if ($zip->open($uploadedFile->getRealPath()) === TRUE) {
                $zip->extractTo($tmp);
                $zip->close();
                $finder->files()->in($tmp);
    
                $i = 0;
                foreach ($finder as $file) {
                    if (!in_array($file->getExtension(), self::SUPPORTED_PICTURES_EXTENSIONS)) {
                        continue;
                    }
                    $uploadedFile = new UploadedFile($file->getPathname(), $file->getFilename(), null, null, true);
                    $this->uploadPicturefile($catalog, $uploadedFile, false);
                    $i++;
                    if ($i % 1000 === 0) {
                        $this->em->flush();
                    }
                }
            }
            $this->em->flush();
            (new Filesystem())->remove($tmp);
        }
    
        public function uploadPicturefile(Catalog $catalog, UploadedFile $uploadedFile, bool $isFlush = true)
        {
            $picture = (new Picture())->setCatalog($catalog);
            $picture->getValidatedVersion()->setStatus(PictureVersionHelper::STATUS_ACCEPTED);
            $file = $picture->getFile()->setImageFile($uploadedFile);
            $picture->setFile($file);
        
            PictureExifPopulator::populate($picture);
            PictureContentPopulator::setContent($picture);
            $this->em->persist($picture);
            if ($isFlush) {
                $this->em->flush();
            }
        }
    }