<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Picture;

class PictureHelper
{
    public static function checkEnabledRecusively(Picture $picture)
    {
        if (!$picture->isEnabled()) {
            return false;
        }
        if ($catalog = $picture->getCatalog()) {
            return CatalogHelper::checkEnabledRecusively($catalog);
        }
        
        return false;
    }
}