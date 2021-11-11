<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Catalog;

class CatalogHelper
{
    public static function checkEnabledRecusively(Catalog $catalog)
    {
        if (!$catalog->isEnabled()) {
            return false;
        }
        
        if($parent = $catalog->getParent()){
            return self::checkEnabledRecusively($parent);
        }
        
        return true;
    }
    
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
    
    /**
     * @param Catalog $catalog
     * @return bool
     */
    public static function checkIfParentsIsEnabled(Catalog $catalog): bool
    {
        if ($catalog->getName() === Catalog::ROOT) {
            return true;
        }
        if ($catalog->isEnabled()) {
            return self::checkIfParentsIsEnabled($catalog->getParent());
        }
        
        return false;
    }
}