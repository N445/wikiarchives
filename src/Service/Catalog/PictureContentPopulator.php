<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Picture;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class PictureContentPopulator
{
    public static function setContent(Picture $picture)
    {
        self::setTitle($picture);
        self::setGps($picture);
    
        $picture->getValidatedVersion()->setDescription($picture->getExif()['caption'] ?? null);
        $picture->getValidatedVersion()->setAuthor($picture->getExif()['author'] ?? null);
        $picture->getValidatedVersion()->setCopyright($picture->getExif()['copyright'] ?? null);
        $picture->getValidatedVersion()->setCreationdate($picture->getExif()['creationdate'] ?? null);
        $picture->getValidatedVersion()->setCredit($picture->getExif()['credit'] ?? null);
        $picture->getValidatedVersion()->setSource($picture->getExif()['source'] ?? null);
    }

    public static function setTitle(Picture $picture)
    {
        if ($picture->getValidatedVersion()->getName()) {
            return;
        }
        if ($title = $picture->getExif()['title'] ?? null) {
            $picture->getValidatedVersion()->setName($title);
            return;
        }

        if ($uploadedfile = $picture->getFile()->getImageFile()) {
            /** @var UploadedFile $uploadedfile */
            $filename = $uploadedfile->getClientOriginalName();
            $picture->getValidatedVersion()->setName(pathinfo($filename)['filename'] ?? $filename);
            return;
        }
    }
    
    private static function setGps(Picture $picture)
    {
        if (!$gps = $picture->getExif()['gps'] ?? null) {
            return;
        }
        $gps = explode(',', $gps);
        $picture->getValidatedVersion()
                ->setLat($gps[0])
                ->setLng($gps[1])
        ;
    }
}
