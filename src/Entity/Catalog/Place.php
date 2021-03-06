<?php

namespace App\Entity\Catalog;

use App\Entity\User;
use App\Repository\Catalog\PlaceRepository;
use App\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=PlaceRepository::class)
 * @ORM\Table(name="catalog_place")
 * @Gedmo\Loggable
 */
class Place
{
    use TimestampableTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="string", length=255)
     */
    private $location;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="float", nullable=true)
     */
    private $lat;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="float", nullable=true)
     */
    private $lng;

    /**
     * @ORM\OneToMany(targetEntity=Catalog::class, mappedBy="place")
     */
    private $catalogs;

    /**
     * @ORM\OneToMany(targetEntity=Picture::class, mappedBy="place")
     */
    private $pictures;

    /**
     * @Gedmo\Blameable(on="create")
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="createdPlaces")
     */
    private $createdBy;

    /**
     * @Gedmo\Blameable(on="update")
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="updatedPlaces")
     */
    private $updatedBy;

    public function __construct()
    {
        $this->catalogs = new ArrayCollection();
        $this->pictures = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->getName();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(?float $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLng(): ?float
    {
        return $this->lng;
    }
    
    public function setLng(?float $lng): self
    {
        $this->lng = $lng;
        
        return $this;
    }
    
    public function getLatLng()
    {
        return [
            'lat' => $this->getLat(),
            'lng' => $this->getLng(),
        ];
    }
    
    /**
     * @return Collection|Catalog[]
     */
    public function getCatalogs(): Collection
    {
        return $this->catalogs;
    }
    
    public function addCatalog(Catalog $catalog): self
    {
        if (!$this->catalogs->contains($catalog)) {
            $this->catalogs[] = $catalog;
            $catalog->setPlace($this);
        }

        return $this;
    }

    public function removeCatalog(Catalog $catalog): self
    {
        if ($this->catalogs->removeElement($catalog)) {
            // set the owning side to null (unless already changed)
            if ($catalog->getPlace() === $this) {
                $catalog->setPlace(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Picture[]
     */
    public function getPictures(): Collection
    {
        return $this->pictures;
    }

    public function addPicture(Picture $picture): self
    {
        if (!$this->pictures->contains($picture)) {
            $this->pictures[] = $picture;
            $picture->setPlace($this);
        }

        return $this;
    }

    public function removePicture(Picture $picture): self
    {
        if ($this->pictures->removeElement($picture)) {
            // set the owning side to null (unless already changed)
            if ($picture->getPlace() === $this) {
                $picture->setPlace(null);
            }
        }

        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $user): Place
    {
        $this->createdBy = $user;
        return $this;
    }

    public function getUpdatedBy(): ?User
    {
        return $this->updatedBy;
    }

    public function setUpdatedBy(?User $user): Place
    {
        $this->updatedBy = $user;
        return $this;
    }
}
