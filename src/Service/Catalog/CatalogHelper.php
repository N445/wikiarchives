<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Catalog;

class CatalogHelper
{
    public static function getAllPictures(Catalog $catalog)
    {
        $pictures = $catalog->getPictures()->toArray();
        foreach ($catalog->getChildren() as $child) {
            self::addChildPictures($child, $pictures);
        }
    }
    
    private static function addChildPictures(Catalog $catalog, &$pictures)
    {
        $pictures = array_merge($pictures, $catalog->getPictures()->toArray());
        foreach ($catalog->getChildren() as $child) {
            self::addChildPictures($child, $pictures);
        }
    }
}