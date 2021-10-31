<?php

namespace App\Model\Catalog\Picture\Version;

use App\Entity\Catalog\Picture;
use App\Entity\Catalog\Picture\Version;

class PictureVersionSorter
{
    /**
     * @var Picture
     */
    private $picture;
    
    /**
     * @var Version[]
     */
    private $versions = [];
    
    public function __construct(Version $version)
    {
        $this->picture = $version->getPicture() ?: $version->getTmpPicture();
        $this->versions[] = $version;
    }
    
    /**
     * @return Picture
     */
    public function getPicture(): Picture
    {
        return $this->picture;
    }
    
    /**
     * @param Picture $picture
     * @return PictureVersionSorter
     */
    public function setPicture(Picture $picture): PictureVersionSorter
    {
        $this->picture = $picture;
        return $this;
    }
    
    /**
     * @return Version[]
     */
    public function getVersions(): array
    {
        return $this->versions;
    }
    
    /**
     * @param Version[] $versions
     * @return PictureVersionSorter
     */
    public function setVersions(array $versions): PictureVersionSorter
    {
        $this->versions = $versions;
        return $this;
    }
    
    /**
     * @param Version $version
     * @return PictureVersionSorter
     */
    public function addVersion(Version $version): PictureVersionSorter
    {
        $this->versions[] = $version;
        return $this;
    }
    
    
}