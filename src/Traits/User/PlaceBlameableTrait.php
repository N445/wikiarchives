<?php

namespace App\Traits\User;

use App\Entity\Catalog\Place;
use Doctrine\Common\Collections\Collection;

trait PlaceBlameableTrait
{
    /**
     * @ORM\OneToMany(targetEntity=Place::class, mappedBy="createdBy")
     */
    private $createdPlaces;
    
    /**
     * @ORM\OneToMany(targetEntity=Place::class, mappedBy="updatedBy")
     */
    private $updatedPlaces;
    
    /**
     * @return Collection|Place[]
     */
    public function getCreatedPlaces(): Collection
    {
        return $this->createdPlaces;
    }
    
    public function addCreatedPlace(Place $createdPlace): self
    {
        if (!$this->createdPlaces->contains($createdPlace)) {
            $this->createdPlaces[] = $createdPlace;
            $createdPlace->setCreatedBy($this);
        }
        
        return $this;
    }
    
    public function removeCreatedPlace(Place $createdPlace): self
    {
        if ($this->createdPlaces->removeElement($createdPlace)) {
            // set the owning side to null (unless already changed)
            if ($createdPlace->getCreatedBy() === $this) {
                $createdPlace->setCreatedBy(null);
            }
        }
        
        return $this;
    }
    
    /**
     * @return Collection|Place[]
     */
    public function getUpdatedPlaces(): Collection
    {
        return $this->updatedPlaces;
    }
    
    public function addUpdatedPlace(Place $updatedPlace): self
    {
        if (!$this->updatedPlaces->contains($updatedPlace)) {
            $this->updatedPlaces[] = $updatedPlace;
            $updatedPlace->setUpdatedBy($this);
        }
        
        return $this;
    }
    
    public function removeUpdatedPlace(Place $updatedPlace): self
    {
        if ($this->updatedPlaces->removeElement($updatedPlace)) {
            // set the owning side to null (unless already changed)
            if ($updatedPlace->getUpdatedBy() === $this) {
                $updatedPlace->setUpdatedBy(null);
            }
        }
        
        return $this;
    }
}