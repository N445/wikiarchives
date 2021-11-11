<?php

namespace App\Model\Catalog;

use App\Entity\Catalog\Catalog;

class CatalogCounter
{
    private int $nbChildren = 0;
    private int $nbPictures = 0;
    
    /**
     * @return int
     */
    public function getNbChildren(): int
    {
        return $this->nbChildren;
    }
    
    /**
     * @return CatalogCounter
     */
    public function addNbChildren(): CatalogCounter
    {
        $this->nbChildren++;
        return $this;
    }
    
    /**
     * @return int
     */
    public function getNbPictures(): int
    {
        return $this->nbPictures;
    }
    
    /**
     * @return CatalogCounter
     */
    public function addNbPictures(): CatalogCounter
    {
        $this->nbPictures++;
        return $this;
    }
}