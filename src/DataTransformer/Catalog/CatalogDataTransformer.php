<?php


namespace App\DataTransformer\Catalog;


use App\Entity\Catalog\Catalog;

class CatalogDataTransformer
{
    public function toArray(Catalog $catalog)
    {
        return [
            'id' => $catalog->getId(),
            'name' => $catalog->getName(),
//            'root' => $catalog->getRoot(),
//            'parent' => $catalog->getParent(),
        ];
    }
}