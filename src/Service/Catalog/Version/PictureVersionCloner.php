<?php

namespace App\Service\Catalog\Version;

use App\Entity\Catalog\Picture;
use App\Entity\Catalog\Picture\Version;

class PictureVersionCloner
{
    /**
     * @param Picture $picture
     * @return Version
     */
    public static function cloneVersion(Picture $picture): Version
    {
        $clonedVersion = $picture->getValidatedVersion();

        $versionNumber=1;
        if($lastVersion = $picture->getVersions()->last()){
            $versionNumber = $lastVersion->getVersionNumber() + 1 ;
        }
        
        $newVersion = (new Version())
            ->setStatus(PictureVersionHelper::STATUS_PENDING)
            ->setType(PictureVersionHelper::TYPE_TMP)
            ->setVersionNumber($versionNumber)
            ->setBasedVersion($clonedVersion)
            ->setName($clonedVersion->getName())
            ->setDescription($clonedVersion->getDescription())
            ->setAuthor($clonedVersion->getAuthor())
            ->setCopyright($clonedVersion->getCopyright())
            ->setCreationdate($clonedVersion->getCreationdate())
            ->setCredit($clonedVersion->getCredit())
            ->setSource($clonedVersion->getSource())
        ;

        return $newVersion;
    }
}