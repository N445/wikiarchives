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
        if ($picture->getName()) {
            return;
        }
        if ($title = $picture->getExif()->getTitle()) {
            $picture->setName($title);
            return;
        }
        if ($uploadedfile = $picture->getImageFile()) {
            $filename = $uploadedfile->getClientOriginalName();
            $picture->setName(pathinfo($filename)['filename'] ?? $filename);
            return;
        }
    }

    public static function setDescription(Picture $picture)
    {

    }
}