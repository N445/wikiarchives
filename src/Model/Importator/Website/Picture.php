<?php

namespace App\Model\Importator\Website;

class Picture
{
    private $isParsed;
    private $id;
    private $name;
    private $url;
    private $catalogId;
    
    /**
     * @return mixed
     */
    public function getIsParsed()
    {
        return $this->isParsed;
    }
    
    /**
     * @param mixed $isParsed
     * @return Picture
     */
    public function setIsParsed($isParsed)
    {
        $this->isParsed = $isParsed;
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
     * @return Picture
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
     * @return Picture
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
     * @return Picture
     */
    public function setUrl($url)
    {
        $this->url = $url;
        return $this;
    }
    
    /**
     * @return mixed
     */
    public function getCatalogId()
    {
        return $this->catalogId;
    }
    
    /**
     * @param mixed $catalogId
     * @return Picture
     */
    public function setCatalogId($catalogId)
    {
        $this->catalogId = $catalogId;
        return $this;
    }
    
    
}