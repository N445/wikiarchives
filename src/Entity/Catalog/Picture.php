<?php

namespace App\Entity\Catalog;

use App\Entity\Catalog\Picture\Exif;
use App\Entity\Catalog\Picture\File;
use App\Entity\Catalog\Picture\Version;
use App\Repository\Catalog\PictureRepository;
use App\Traits\BlameableTrait;
use App\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=PictureRepository::class)
 * @ORM\Table(name="catalog_picture")
 * @Gedmo\Loggable
 */
class Picture
{
    use TimestampableTrait;
    use BlameableTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="boolean")
     */
    private $enabled = true;

    /**
     * @Gedmo\Versioned
     * @ORM\ManyToOne(targetEntity=Catalog::class, inversedBy="pictures")
     */
    private $catalog;

    /**
     * @Gedmo\Versioned
     * @ORM\ManyToOne(targetEntity=Place::class, inversedBy="pictures")
     */
    private $place;

    /**
     * @ORM\OneToOne(targetEntity=Version::class, cascade={"persist", "remove"})
     */
    private $validatedVersion;

    /**
     * @ORM\OneToMany(targetEntity=Version::class, mappedBy="picture", orphanRemoval=true, cascade={"persist", "remove"})
     */
    private $versions;

    /**
     * @ORM\OneToOne(targetEntity=File::class, inversedBy="picture", cascade={"persist", "remove"})
     */
    private $file;

    public function __construct()
    {
        $this->file = new File();
        $this->versions = new ArrayCollection();
        $this->validatedVersion = new Version();
        $this->addVersion($this->validatedVersion);
    }

    public function __toString()
    {
        return $this->getName();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    /**
     * @param bool $enabled
     * @return Picture
     */
    public function setEnabled(bool $enabled): Picture
    {
        $this->enabled = $enabled;
        return $this;
    }

    public function getName()
    {
        return $this->getValidatedVersion()?->getName();
    }

    public function getDescription()
    {
        return $this->getValidatedVersion()?->getDescription();
    }

    public function getExif()
    {
        return $this->getValidatedVersion()?->getExif();
    }

    public function getCatalog(): ?Catalog
    {
        return $this->catalog;
    }

    public function setCatalog(?Catalog $catalog): self
    {
        $this->catalog = $catalog;

        return $this;
    }

    public function getPlace(): ?Place
    {
        return $this->place;
    }

    public function getPlaceRecursive(): ?Place
    {
        if (!$this->place) {
            return $this->getCatalog() ? $this->getCatalog()->getPlaceRecursive() : null;
        }
        return $this->place;
    }

    public function setPlace(?Place $place): self
    {
        $this->place = $place;

        return $this;
    }

    public function getValidatedVersion(): ?Version
    {
        return $this->validatedVersion;
    }

    public function setValidatedVersion(?Version $validatedVersion): self
    {
        $this->validatedVersion = $validatedVersion;

        return $this;
    }

    /**
     * @return Collection|Version[]
     */
    public function getVersions(): Collection
    {
        return $this->versions;
    }

    public function addVersion(Version $version): self
    {
        if (!$this->versions->contains($version)) {
            $this->versions[] = $version;
            $version->setPicture($this);
        }

        return $this;
    }

    public function removeVersion(Version $version): self
    {
        if ($this->versions->removeElement($version)) {
            // set the owning side to null (unless already changed)
            if ($version->getPicture() === $this) {
                $version->setPicture(null);
            }
        }

        return $this;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): self
    {
        $this->file = $file;

        return $this;
    }
}
