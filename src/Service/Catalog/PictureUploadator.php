<?php
    
    namespace App\Service\Catalog;
    
    use App\Entity\Catalog\Catalog;
    use App\Entity\Catalog\Picture;
    use App\Service\Catalog\Version\PictureVersionHelper;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Component\HttpFoundation\File\UploadedFile;
    
    class PictureUploadator
    {
        private EntityManagerInterface $em;
        
        public function __construct(EntityManagerInterface $em)
        {
            $this->em = $em;
        }
        
        public function upload(Catalog $catalog, UploadedFile $uploadedFile)
        {
            $filename = $uploadedFile->getClientOriginalName();
            
            $picture = (new Picture())->setCatalog($catalog);
            $picture->getValidatedVersion()->setStatus(PictureVersionHelper::STATUS_ACCEPTED);
            $file = $picture->getFile()->setImageFile($uploadedFile);
            $picture->setFile($file);
            
            PictureExifPopulator::populate($picture);
            PictureContentPopulator::setContent($picture);
            $this->em->persist($picture);
            $this->em->flush();
        }
    }