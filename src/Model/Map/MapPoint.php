<?php

namespace App\Model\Map;

class MapPoint
{
    /**
     * @var float
     */
    private $lat;
    
    /**
     * @var float
     */
    private $lng;
    
    /**
     * @var string
     */
    private $title;
    
    /**
     * @var string|null
     */
    private $html;
    
    /**
     * @return float
     */
    public function getLat(): float
    {
        return $this->lat;
    }
    
    /**
     * @param float $lat
     * @return MapPoint
     */
    public function setLat(float $lat): MapPoint
    {
        $this->lat = $lat;
        return $this;
    }
    
    /**
     * @return float
     */
    public function getLng(): float
    {
        return $this->lng;
    }
    
    /**
     * @param float $lng
     * @return MapPoint
     */
    public function setLng(float $lng): MapPoint
    {
        $this->lng = $lng;
        return $this;
    }
    
    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }
    
    /**
     * @param string $title
     * @return MapPoint
     */
    public function setTitle(string $title): MapPoint
    {
        $this->title = $title;
        return $this;
    }
    
    /**
     * @return string|null
     */
    public function getHtml(): ?string
    {
        return $this->html;
    }
    
    /**
     * @param string|null $html
     * @return MapPoint
     */
    public function setHtml(?string $html): MapPoint
    {
        $this->html = $html;
        return $this;
    }
}