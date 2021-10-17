<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Picture;

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
        if ($title = $picture->getValidatedVersion()->getExif()->getTitle()) {
            $picture->getValidatedVersion()->setName($title);
            return;
        }
        if ($uploadedfile = $picture->getFile()->getImageFile()) {
            $filename = $uploadedfile->getClientOriginalName();
            $picture->getValidatedVersion()->setName(pathinfo($filename)['filename'] ?? $filename);
            return;
        }
    }

    public static function setDescription(Picture $picture)
    {

    }
}