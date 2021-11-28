<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Picture;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class PictureContentPopulator
{
    public static function setContent(Picture $picture)
    {
        self::setTitle($picture);
        self::setDescription($picture);
    }

    public static function setTitle(Picture $picture)
    {
        if ($picture->getValidatedVersion()->getName()) {
            return;
        }
        if ($title = $picture->getExif()->getTitle()) {
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

    public static function setDescription(Picture $picture)
    {

    }
}
