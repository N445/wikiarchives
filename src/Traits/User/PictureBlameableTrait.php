<?php

namespace App\Traits\User;

use App\Entity\Catalog\Picture;
use Doctrine\Common\Collections\Collection;

trait PictureBlameableTrait
{
    /**
     * @ORM\OneToMany(targetEntity=Picture::class, mappedBy="createdBy")
     */
    private $createdPictures;
    
    /**
     * @ORM\OneToMany(targetEntity=Picture::class, mappedBy="updatedBy")
     */
    private $updatedPictures;
    
    /**
     * @return Collection|Picture[]
     */
    public function getCreatedPictures(): Collection
    {
        return $this->createdPictures;
    }
    
    public function addCreatedPicture(Picture $createdPicture): self
    {
        if (!$this->createdPictures->contains($createdPicture)) {
            $this->createdPictures[] = $createdPicture;
            $createdPicture->setCreatedBy($this);
        }
        
        return $this;
    }
    
    public function removeCreatedPicture(Picture $createdPicture): self
    {
        if ($this->createdPictures->removeElement($createdPicture)) {
            // set the owning side to null (unless already changed)
            if ($createdPicture->getCreatedBy() === $this) {
                $createdPicture->setCreatedBy(null);
            }
        }
        
        return $this;
    }
    
    /**
     * @return Collection|Picture[]
     */
    public function getUpdatedPictures(): Collection
    {
        return $this->updatedPictures;
    }
    
    public function addUpdatedPicture(Picture $updatedPicture): self
    {
        if (!$this->updatedPictures->contains($updatedPicture)) {
            $this->updatedPictures[] = $updatedPicture;
            $updatedPicture->setUpdatedBy($this);
        }
        
        return $this;
    }
    
    public function removeUpdatedPicture(Picture $updatedPicture): self
    {
        if ($this->updatedPictures->removeElement($updatedPicture)) {
            // set the owning side to null (unless already changed)
            if ($updatedPicture->getUpdatedBy() === $this) {
                $updatedPicture->setUpdatedBy(null);
            }
        }
        
        return $this;
    }
}