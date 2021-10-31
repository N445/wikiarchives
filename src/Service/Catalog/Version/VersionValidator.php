<?php

namespace App\Service\Catalog\Version;

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
    
    public function refused(Picture $picture, Version $proposedVersion, Version $finalVersion, bool $blockUser = false)
    {
        $user = $proposedVersion->getCreatedBy();
        $user->getRights()->setHasVersionCreator(false);
        
        $proposedVersion
            ->setStatus(PictureVersionHelper::STATUS_REJECTED)
            ->setType(PictureVersionHelper::TYPE_FINAL)
        ;
        
        $picture->removeTmpVersion($proposedVersion);
        $picture->addVersion($proposedVersion);
        
        $this->em->persist($user);
        $this->em->persist($proposedVersion);
//            $this->em->persist($finalVersion);
        $this->em->persist($picture);
        $this->em->flush();
    }
    
        public function validated(Picture $picture, Version $proposedVersion, Version $finalVersion)
        {
            $proposedVersion->setStatus(PictureVersionHelper::STATUS_ACCEPTED);
            $finalVersion->setStatus(PictureVersionHelper::STATUS_ACCEPTED);
            $picture->addVersion($finalVersion)->setValidatedVersion($finalVersion);
    
            dump($proposedVersion);
            dump($finalVersion);
//            $this->em->persist($proposedVersion);
            $this->em->remove($proposedVersion);
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