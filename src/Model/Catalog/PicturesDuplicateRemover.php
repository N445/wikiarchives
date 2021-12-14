<?php

namespace App\Model\Catalog;

class PicturesDuplicateRemover
{
    /**
     * @var array
     */
    private $keys = [];

    /**
     * @return array
     */
    public function getKeys(): array
    {
        return $this->keys;
    }
    
    /**
     * @param array $keys
     * @return PicturesDuplicateRemover
     */
    public function setKeys(array $keys): PicturesDuplicateRemover
    {
        $this->keys = $keys;
        return $this;
    }
    
    
}