<?php

namespace App\Traits\User\Picture;

use App\Entity\Catalog\Picture\Version;
use Doctrine\Common\Collections\Collection;

trait VersionBlameableTrait
{
    /**
     * @ORM\OneToMany(targetEntity=Version::class, mappedBy="createdBy")
     */
    private $createdVersions;
    
    /**
     * @ORM\OneToMany(targetEntity=Version::class, mappedBy="updatedBy")
     */
    private $updatedVersions;
    
    /**
     * @return Collection|Version[]
     */
    public function getCreatedVersions(): Collection
    {
        return $this->createdVersions;
    }
    
    public function addCreatedVersion(Version $createdVersion): self
    {
        if (!$this->createdVersions->contains($createdVersion)) {
            $this->createdVersions[] = $createdVersion;
            $createdVersion->setCreatedBy($this);
        }
        
        return $this;
    }
    
    public function removeCreatedVersion(Version $createdVersion): self
    {
        if ($this->createdVersions->removeElement($createdVersion)) {
            // set the owning side to null (unless already changed)
            if ($createdVersion->getCreatedBy() === $this) {
                $createdVersion->setCreatedBy(null);
            }
        }
        
        return $this;
    }
    
    /**
     * @return Collection|Version[]
     */
    public function getUpdatedVersions(): Collection
    {
        return $this->updatedVersions;
    }
    
    public function addUpdatedVersion(Version $updatedVersion): self
    {
        if (!$this->updatedVersions->contains($updatedVersion)) {
            $this->updatedVersions[] = $updatedVersion;
            $updatedVersion->setUpdatedBy($this);
        }
        
        return $this;
    }
    
    public function removeUpdatedVersion(Version $updatedVersion): self
    {
        if ($this->updatedVersions->removeElement($updatedVersion)) {
            // set the owning side to null (unless already changed)
            if ($updatedVersion->getUpdatedBy() === $this) {
                $updatedVersion->setUpdatedBy(null);
            }
        }
        
        return $this;
    }
}