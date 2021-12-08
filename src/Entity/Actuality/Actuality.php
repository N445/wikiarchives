<?php

namespace App\Entity\Actuality;

use App\Entity\Catalog\Catalog;
use App\Entity\User;
use App\Repository\Actuality\ActualityRepository;
use App\Traits\TimestampableTrait;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=ActualityRepository::class)
 * @ORM\Table(name="actuality")
 * @Gedmo\Loggable
 */
class Actuality
{
    use TimestampableTrait;
    
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;
    
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;
    
    /**
     * @ORM\Column(type="text")
     */
    private $content;
    
    /**
     * @ORM\Column(type="boolean")
     */
    private $isVisible;
    
    /**
     * @Gedmo\Blameable(on="create")
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="createdCatalogs")
     */
    private $createdBy;
    
    /**
     * @Gedmo\Blameable(on="update")
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="updatedCatalogs")
     */
    private $updatedBy;
    
    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getTitle(): ?string
    {
        return $this->title;
    }
    
    public function setTitle(string $title): self
    {
        $this->title = $title;
        
        return $this;
    }
    
    public function getContent(): ?string
    {
        return $this->content;
    }
    
    public function getResume(int $length = 100, string $prepend = '...'): ?string
    {
        return substr(strip_tags($this->content), 0, $length - strlen($prepend)) . $prepend;
    }
    
    public function setContent(string $content): self
    {
        $this->content = $content;
        
        return $this;
    }
    
    public function getIsVisible(): ?bool
    {
        return $this->isVisible;
    }
    
    public function setIsVisible(bool $isVisible): self
    {
        $this->isVisible = $isVisible;
        
        return $this;
    }
    
    /**
     * @return User|null
     */
    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }
    
    /**
     * @param User|null $user
     * @return $this
     */
    public function setCreatedBy(?User $user): Catalog
    {
        $this->createdBy = $user;
        return $this;
    }
    
    /**
     * @return User|null
     */
    public function getUpdatedBy(): ?User
    {
        return $this->updatedBy;
    }
    
    /**
     * @param User|null $user
     * @return $this
     */
    public function setUpdatedBy(?User $user): Catalog
    {
        $this->updatedBy = $user;
        return $this;
    }
}
