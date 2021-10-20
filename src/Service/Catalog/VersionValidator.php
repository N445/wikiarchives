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
            $this->em->flush();
        }
        
        private function refused(Picture $picture, Version $proposedVersion, Version $finalVersion)
        {
            $proposedVersion->setStatus(PictureVersionHelper::STATUS_REJECTED);
        }
        
        private function validated(Picture $picture, Version $proposedVersion, Version $finalVersion)
        {
            $proposedVersion->setStatus(PictureVersionHelper::STATUS_ACCEPTED);
            $picture->addVersion($finalVersion)->setValidatedVersion($finalVersion);
        }
    }