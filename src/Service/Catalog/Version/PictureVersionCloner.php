<?php

namespace App\Service\Catalog\Version;

use App\Entity\Catalog\Picture;
use App\Entity\Catalog\Picture\Exif;
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
//        $clonedExif = $picture->getExif();
        
//        $newExif = (new Exif())
//            ->setIsVerified($clonedExif->isVerified())
//            ->setTitle($clonedExif->getTitle())
//            ->setAuthor($clonedExif->getAuthor())
//            ->setCamera($clonedExif->getCamera())
//            ->setCaption($clonedExif->getCaption())
//            ->setCopyright($clonedExif->getCopyright())
//            ->setCreationdate($clonedExif->getCreationdate())
//            ->setCredit($clonedExif->getCredit())
//            ->setAperture($clonedExif->getAperture())
//            ->setExposure($clonedExif->getExposure())
//            ->setFocalLength($clonedExif->getFocalLength())
//            ->setFocalDistance($clonedExif->getFocalDistance())
//            ->setIso($clonedExif->getIso())
//            ->setColorSpace($clonedExif->getColorSpace())
//            ->setFileSize($clonedExif->getFileSize())
//            ->setHeight($clonedExif->getHeight())
//            ->setWidth($clonedExif->getWidth())
//            ->setHorizontalResolution($clonedExif->getHorizontalResolution())
//            ->setVerticalResolution($clonedExif->getVerticalResolution())
//            ->setHeadline($clonedExif->getHeadline())
//            ->setJobTitle($clonedExif->getJobTitle())
//            ->setKeywords($clonedExif->getKeywords())
//            ->setMimeType($clonedExif->getMimeType())
//            ->setOrientation($clonedExif->getOrientation())
//            ->setSoftware($clonedExif->getSoftware())
//            ->setSource($clonedExif->getSource())
//            ->setLat($clonedExif->getLat())
//            ->setLng($clonedExif->getLng())
//        ;
        
        $newVersion = (new Version())
            ->setStatus(PictureVersionHelper::STATUS_PENDING)
            ->setType(PictureVersionHelper::TYPE_TMP)
            ->setVersionNumber($picture->getVersions()->last()->getVersionNumber() + 1)
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