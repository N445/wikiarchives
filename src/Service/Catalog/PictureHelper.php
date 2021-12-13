<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;

class PictureHelper
{
    public static function checkEnabledRecusively(Picture $picture, ?Catalog $catalog = null)
    {
        if (!$picture->isEnabled()) {
            return false;
        }
        if ($catalog) {
            return CatalogHelper::checkEnabledRecusively($catalog);
        }
        
        return false;
    }
}