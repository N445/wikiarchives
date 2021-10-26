<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Picture;

class PictureVersionCloner
{
    public static function cloneVersion(Picture $picture)
    {
        $clonedVersion = $picture->getValidatedVersion();
        $clonedExif = $clonedVersion->getExif();

        $newExif = (new Picture\Exif())
            ->setIsVerified($clonedExif->isVerified())
            ->setTitle($clonedExif->getTitle())
            ->setAuthor($clonedExif->getAuthor())
            ->setCamera($clonedExif->getCamera())
            ->setCaption($clonedExif->getCaption())
            ->setCopyright($clonedExif->getCopyright())
            ->setCreationdate($clonedExif->getCreationdate())
            ->setCredit($clonedExif->getCredit())
            ->setAperture($clonedExif->getAperture())
            ->setExposure($clonedExif->getExposure())
            ->setFocalLength($clonedExif->getFocalLength())
            ->setFocalDistance($clonedExif->getFocalDistance())
            ->setIso($clonedExif->getIso())
            ->setColorSpace($clonedExif->getColorSpace())
            ->setFileSize($clonedExif->getFileSize())
            ->setHeight($clonedExif->getHeight())
            ->setWidth($clonedExif->getWidth())
            ->setHorizontalResolution($clonedExif->getHorizontalResolution())
            ->setVerticalResolution($clonedExif->getVerticalResolution())
            ->setHeadline($clonedExif->getHeadline())
            ->setJobTitle($clonedExif->getJobTitle())
            ->setKeywords($clonedExif->getKeywords())
            ->setMimeType($clonedExif->getMimeType())
            ->setOrientation($clonedExif->getOrientation())
            ->setSoftware($clonedExif->getSoftware())
            ->setSource($clonedExif->getSource())
            ->setGps($clonedExif->getGps());

        $newVersion = (new Picture\Version())
            ->setVersionNumber($picture->getVersions()->last()->getVersionNumber() + 1)
            ->setBasedVersion($clonedVersion)
            ->setName($clonedVersion->getName())
            ->setDescription($clonedVersion->getDescription())
            ->setExif($newExif)
        ;

        return $newVersion;
    }
}