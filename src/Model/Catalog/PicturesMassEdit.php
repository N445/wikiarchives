<?php

namespace App\Model\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Entity\Catalog\Place;

class PicturesMassEdit
{
    /**
     * @var bool|null
     */
    private $enabled = true;
    /**
     * @var bool|null
     */
    private $isEditedByWikiarchives = false;
    /**
     * @var string|null
     */
    private $license;
    /**
     * @var Catalog|null
     */
    private $originalCatalog;
    
    /**
     * @var Catalog|null
     */
    private $newCatalog;
    
    /**
     * @var Place|null
     */
    private $place;
    /**
     * @var string|null
     */
    private $author;
    /**
     * @var \DateTime|null
     */
    private $creationdate;
    /**
     * @var string|null
     */
    private $credit;
    /**
     * @var string|null
     */
    private $source;
    
    /**
     * @var Picture[]
     */
    private $pictures = [];
    
    /**
     * @return bool|null
     */
    public function isEnabled(): ?bool
    {
        return $this->enabled;
    }
    
    /**
     * @param bool|null $enabled
     * @return PicturesMassEdit
     */
    public function setEnabled(?bool $enabled): PicturesMassEdit
    {
        $this->enabled = $enabled;
        return $this;
    }
    
    /**
     * @return bool|null
     */
    public function isEditedByWikiarchives(): ?bool
    {
        return $this->isEditedByWikiarchives;
    }
    
    /**
     * @param bool|null $isEditedByWikiarchives
     * @return PicturesMassEdit
     */
    public function setIsEditedByWikiarchives(?bool $isEditedByWikiarchives): PicturesMassEdit
    {
        $this->isEditedByWikiarchives = $isEditedByWikiarchives;
        return $this;
    }
    
    /**
     * @return string|null
     */
    public function getLicense(): ?string
    {
        return $this->license;
    }
    
    /**
     * @param string|null $license
     * @return PicturesMassEdit
     */
    public function setLicense(?string $license): PicturesMassEdit
    {
        $this->license = $license;
        return $this;
    }
    
    /**
     * @return Catalog|null
     */
    public function getOriginalCatalog(): ?Catalog
    {
        return $this->originalCatalog;
    }
    
    /**
     * @param Catalog|null $originalCatalog
     * @return PicturesMassEdit
     */
    public function setOriginalCatalog(?Catalog $originalCatalog): PicturesMassEdit
    {
        $this->originalCatalog = $originalCatalog;
        return $this;
    }
    
    /**
     * @return Catalog|null
     */
    public function getNewCatalog(): ?Catalog
    {
        return $this->newCatalog;
    }
    
    /**
     * @param Catalog|null $newCatalog
     * @return PicturesMassEdit
     */
    public function setNewCatalog(?Catalog $newCatalog): PicturesMassEdit
    {
        $this->newCatalog = $newCatalog;
        return $this;
    }
    
    /**
     * @return Place|null
     */
    public function getPlace(): ?Place
    {
        return $this->place;
    }
    
    /**
     * @param Place|null $place
     * @return PicturesMassEdit
     */
    public function setPlace(?Place $place): PicturesMassEdit
    {
        $this->place = $place;
        return $this;
    }
    
    /**
     * @return string|null
     */
    public function getAuthor(): ?string
    {
        return $this->author;
    }
    
    /**
     * @param string|null $author
     * @return PicturesMassEdit
     */
    public function setAuthor(?string $author): PicturesMassEdit
    {
        $this->author = $author;
        return $this;
    }
    
    /**
     * @return \DateTime|null
     */
    public function getCreationdate(): ?\DateTime
    {
        return $this->creationdate;
    }
    
    /**
     * @param \DateTime|null $creationdate
     * @return PicturesMassEdit
     */
    public function setCreationdate(?\DateTime $creationdate): PicturesMassEdit
    {
        $this->creationdate = $creationdate;
        return $this;
    }
    
    /**
     * @return string|null
     */
    public function getCredit(): ?string
    {
        return $this->credit;
    }
    
    /**
     * @param string|null $credit
     * @return PicturesMassEdit
     */
    public function setCredit(?string $credit): PicturesMassEdit
    {
        $this->credit = $credit;
        return $this;
    }
    
    /**
     * @return string|null
     */
    public function getSource(): ?string
    {
        return $this->source;
    }
    
    /**
     * @param string|null $source
     * @return PicturesMassEdit
     */
    public function setSource(?string $source): PicturesMassEdit
    {
        $this->source = $source;
        return $this;
    }
    
    /**
     * @return Picture[]
     */
    public function getPictures(): array
    {
        return $this->pictures;
    }
    
    /**
     * @param Picture[] $pictures
     * @return PicturesMassEdit
     */
    public function setPictures(array $pictures): PicturesMassEdit
    {
        $this->pictures = $pictures;
        return $this;
    }
}