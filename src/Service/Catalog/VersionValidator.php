<?php
    
    namespace App\Service\Catalog;
    
    use App\Entity\Catalog\Picture;
    use App\Entity\Catalog\Picture\Version;
    use Doctrine\ORM\EntityManagerInterface;

    class VersionValidator
    {
        private EntityManagerInterface $em;
        
        public function __construct(EntityManagerInterface $em)
        {
            $this->em = $em;
        }
        
        public function valdiate(string $type, Picture $picture, Version $proposedVersion, Version $finalVersion)
        {
            if ($type === 'refused') {
                $this->refused($picture, $proposedVersion, $finalVersion);
            }
            if ($type === 'accepted') {
                $this->validated($picture, $proposedVersion, $finalVersion);
            }
    
    
        }
    
        public function refused(Picture $picture, Version $proposedVersion, Version $finalVersion)
        {
            $proposedVersion->setStatus(PictureVersionHelper::STATUS_REJECTED)->setType(PictureVersionHelper::TYPE_FINAL);
        
            $this->em->persist($proposedVersion);
            $this->em->persist($finalVersion);
            $this->em->persist($picture);
            $this->em->flush();
        }
    
        public function validated(Picture $picture, Version $proposedVersion, Version $finalVersion)
        {
            $proposedVersion->setStatus(PictureVersionHelper::STATUS_ACCEPTED);
            $finalVersion->setStatus(PictureVersionHelper::STATUS_ACCEPTED);
            $picture->addVersion($finalVersion)->setValidatedVersion($finalVersion);

            $this->em->persist($proposedVersion);
//            dump($proposedVersion);
//            $picture->removeTmpVersion($proposedVersion);
//            $basedVersion = $proposedVersion->getBasedVersion();
//            $basedVersion->removeVersion($proposedVersion);

            
//            $this->em->persist($basedVersion);
            $this->em->persist($finalVersion);
            $this->em->persist($picture);
            $this->em->flush();
        }
    }