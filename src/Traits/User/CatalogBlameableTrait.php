<?php

namespace App\Traits\User;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Catalog\Catalog;

trait CatalogBlameableTrait
{
    /**
     * @ORM\OneToMany(targetEntity=Catalog::class, mappedBy="createdBy")
     */
    private $createdCatalogs;
    
    /**
     * @ORM\OneToMany(targetEntity=Catalog::class, mappedBy="updatedBy")
     */
    private $updatedCatalogs;
    
    /**
     * @return Collection|Catalog[]
     */
    public function getCreatedCatalogs(): Collection
    {
        return $this->createdCatalogs;
    }
    
    public function addCreatedCatalog(Catalog $createdCatalog): self
    {
        if (!$this->createdCatalogs->contains($createdCatalog)) {
            $this->createdCatalogs[] = $createdCatalog;
            $createdCatalog->setCreatedBy($this);
        }
        
        return $this;
    }
    
    public function removeCreatedCatalog(Catalog $createdCatalog): self
    {
        if ($this->createdCatalogs->removeElement($createdCatalog)) {
            // set the owning side to null (unless already changed)
            if ($createdCatalog->getCreatedBy() === $this) {
                $createdCatalog->setCreatedBy(null);
            }
        }
        
        return $this;
    }
    
    /**
     * @return Collection|Catalog[]
     */
    public function getUpdatedCatalogs(): Collection
    {
        return $this->updatedCatalogs;
    }
    
    public function addUpdatedCatalog(Catalog $updatedCatalog): self
    {
        if (!$this->updatedCatalogs->contains($updatedCatalog)) {
            $this->updatedCatalogs[] = $updatedCatalog;
            $updatedCatalog->setUpdatedBy($this);
        }
        
        return $this;
    }
    
    public function removeUpdatedCatalog(Catalog $updatedCatalog): self
    {
        if ($this->updatedCatalogs->removeElement($updatedCatalog)) {
            // set the owning side to null (unless already changed)
            if ($updatedCatalog->getUpdatedBy() === $this) {
                $updatedCatalog->setUpdatedBy(null);
            }
        }
        
        return $this;
    }
}