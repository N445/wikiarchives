<?php

namespace App\Model\Importator\Website;

class Catalog
{
    private $isParsed;
    private $id;
    private $name;
    private $url;
    private $parentId;
    private $children = [];
    private $pictures = [];
    
    /**
     * @return mixed
     */
    public function getIsParsed()
    {
        return $this->isParsed;
    }
    
    /**
     * @param mixed $isParsed
     * @return Catalog
     */
    public function setIsParsed($isParsed)
    {
        $this->isParsed = $isParsed;
        return $this;
    }
    
    /**
     * @return mixed
     */
    public function getParentId()
    {
        return $this->parentId;
    }
    
    /**
     * @param mixed $parentId
     * @return Catalog
     */
    public function setParentId($parentId)
    {
        $this->parentId = $parentId;
        return $this;
    }
    
    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }
    
    /**
     * @param mixed $id
     * @return Catalog
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    
    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }
    
    /**
     * @param mixed $name
     * @return Catalog
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }
    
    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }
    
    /**
     * @param mixed $url
     * @return Catalog
     */
    public function setUrl($url)
    {
        $this->url = $url;
        return $this;
    }
    
    /**
     * @return array
     */
    public function getChildren(): array
    {
        return $this->children;
    }
    
    /**
     * @param array $children
     * @return Catalog
     */
    public function setChildren(array $children): Catalog
    {
        $this->children = $children;
        return $this;
    }
    
    /**
     * @return array
     */
    public function getPictures(): array
    {
        return $this->pictures;
    }
    
    /**
     * @param array $pictures
     * @return Catalog
     */
    public function setPictures(array $pictures): Catalog
    {
        $this->pictures = $pictures;
        return $this;
    }
}