<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Catalog;
use App\Model\Catalog\CatalogCounter as CatalogCounterModel;
use App\Service\Cache\CacheHelper;
use Symfony\Contracts\Cache\ItemInterface;

class CatalogCounter
{
//    public static function getCountChildren(Catalog $catalog, int $count = 0)
//    {
//        foreach ($catalog->getChildren() as $child) {
//            if ($child->isEnabled()) {
//                $count++;
//                $count = self::getCountChildren($child, $count);
//            }
//        }
//
//        return $count;
//    }
    
//    public static function getCountPictures(Catalog $catalog, int $count = 0)
//    {
//        foreach ($catalog->getPictures() as $picture) {
//            $count++;
//            $ids[] = $picture->getId();
//        }
//
//        foreach ($catalog->getChildren() as $child) {
//            $data = self::getCountPictures($child, $count, $ids);
//
//            $count = $count + $data['count'];
//            $ids = array_merge($ids, $data['ids']);
//        }
//
//        return [
//            'count' => $count,
//            'ids' => $ids
//        ];
//    }


//    =====
    
    public static function countAll(Catalog $catalog, CatalogCounterModel $catalogCounter, ItemInterface $item)
    {
        foreach ($catalog->getPictures() as $picture) {
            CacheHelper::setTagsFromPicture($item, $picture);
            if ($picture->isEnabled()) {
                $catalogCounter->addNbPictures();
            }
        }
        foreach ($catalog->getChildren() as $child) {
            CacheHelper::setTagsFromCatalog($item, $child);
            if ($child->isEnabled()) {
                $catalogCounter->addNbChildren();
                self::countAll($child, $catalogCounter, $item);
            }
        }
    }
    
}