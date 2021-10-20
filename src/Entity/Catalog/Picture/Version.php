<?php

namespace App\Entity\Catalog\Picture;

use App\Entity\Catalog\Picture;
use App\Repository\Catalog\Picture\VersionRepository;
use App\Service\Catalog\PictureVersionHelper;
use App\Traits\BlameableTrait;
use App\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=VersionRepository::class)
 * @ORM\Table(name="catalog_picture_version")
 * @Gedmo\Loggable
 */
class Version
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
     * @ORM\Column(type="integer")
     */
    private $versionNumber;

    /**
     * @ORM\Column(type="string")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Version::class, inversedBy="versions", cascade={"persist", "remove"})
     */
    private $basedVersion;

    /**
     * @ORM\OneToMany(targetEntity=Version::class, mappedBy="basedVersion", orphanRemoval=true)
     */
    private $versions;

    /**
     * @ORM\Column(type="string", length=255)
     * @Gedmo\Versioned
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Gedmo\Versioned
     */
    private $description;

    /**
     * @ORM\OneToOne(targetEntity=Exif::class, cascade={"persist", "remove"})
     * @Gedmo\Versioned
     */
    private $exif;

    /**
     * @ORM\ManyToOne(targetEntity=Picture::class, inversedBy="versions")
     */
    private $picture;

    /**
     * @ORM\ManyToOne(targetEntity=Picture::class, inversedBy="tmpVersions")
     */
    private $tmpPicture;

    public function __construct()
    {
        $this->versionNumber = 1;
        $this->status = PictureVersionHelper::STATUS_PENDING;
        $this->versions = new ArrayCollection();
        $this->exif = new Exif();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return int
     */
    public function getVersionNumber(): int
    {
        return $this->versionNumber;
    }

    /**
     * @param int $versionNumber
     * @return Version
     */
    public function setVersionNumber(int $versionNumber): Version
    {
        $this->versionNumber = $versionNumber;
        return $this;
    }

    /**
     * @return string
     */
    public function getStatus(): string
    {
        return $this->status;
    }

    /**
     * @param string $status
     * @return Version
     */
    public function setStatus(string $status): Version
    {
        $this->status = $status;
        return $this;
    }

    public function getBasedVersion(): ?self
    {
        return $this->basedVersion;
    }

    public function setBasedVersion(?self $basedVersion): self
    {
        $this->basedVersion = $basedVersion;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getVersions(): Collection
    {
        return $this->versions;
    }

    public function addVersion(self $version): self
    {
        if (!$this->versions->contains($version)) {
            $this->versions[] = $version;
            $version->setBasedVersion($this);
        }

        return $this;
    }

    public function removeVersion(self $version): self
    {
        if ($this->versions->removeElement($version)) {
            // set the owning side to null (unless already changed)
            if ($version->getBasedVersion() === $this) {
                $version->setBasedVersion(null);
            }
        }

        return $this;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getExif(): ?Exif
    {
        return $this->exif;
    }

    public function setExif(?Exif $exif): self
    {
        $this->exif = $exif;

        return $this;
    }

    public function getPicture(): ?Picture
    {
        return $this->picture;
    }

    public function setPicture(?Picture $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getTmpPicture(): ?Picture
    {
        return $this->tmpPicture;
    }

    public function setTmpPicture(?Picture $picture): self
    {
        $this->tmpPicture = $picture;

        return $this;
    }
}
