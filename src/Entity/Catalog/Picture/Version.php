<?php

namespace App\Entity\Catalog\Picture;

use App\Entity\Catalog\Picture;
use App\Entity\User;
use App\Repository\Catalog\Picture\VersionRepository;
use App\Service\Catalog\Version\PictureVersionHelper;
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

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Gedmo\Versioned
     */
    private $versionNumber;

    /**
     * @ORM\Column(type="string")
     * @Gedmo\Versioned
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Version::class, inversedBy="versions")
     * @Gedmo\Versioned
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
    private ?string $name = null;
    
    /**
     * @ORM\Column(type="text", nullable=true)
     * @Gedmo\Versioned
     */
    private ?string $description = null;
    
    /**
     * @ORM\Column(type="string",nullable=true)
     * @Gedmo\Versioned
     */
    private ?string $author = null;
    
    /**
     * @ORM\Column(type="string",nullable=true)
     * @Gedmo\Versioned
     */
    private ?string $copyright = null;
    
    /**
     * @ORM\Column(type="datetime",nullable=true)
     * @Gedmo\Versioned
     */
    private ?\DateTime $creationdate = null;
    
    /**
     * @ORM\Column(type="string",nullable=true)
     * @Gedmo\Versioned
     */
    private ?string $credit = null;
    
    /**
     * @ORM\Column(type="string",nullable=true)
     * @Gedmo\Versioned
     */
    private ?string $source = null;
    
    /**
     * @ORM\Column(type="float",nullable=true)
     * @Gedmo\Versioned
     */
    private ?float $lat = null;
    
    /**
     * @ORM\Column(type="float",nullable=true)
     * @Gedmo\Versioned
     */
    private ?float $lng = null;
    
    /**
     * @ORM\ManyToOne(targetEntity=Picture::class, inversedBy="versions")
     * @Gedmo\Versioned
     */
    private $picture;
    
    /**
     * @ORM\ManyToOne(targetEntity=Picture::class, inversedBy="tmpVersions")
     * @Gedmo\Versioned
     */
    private $tmpPicture;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Gedmo\Versioned
     */
    private $userComment;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Gedmo\Versioned
     */
    private $moderatorComment;

    /**
     * @Gedmo\Blameable(on="create")
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="createdVersions")
     * @Gedmo\Versioned
     */
    private $createdBy;

    /**
     * @Gedmo\Blameable(on="update")
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="updatedVersions")
     * @Gedmo\Versioned
     */
    private $updatedBy;

    /**
     * @ORM\Column(type="string", length=255)
     * @Gedmo\Versioned
     */
    private $type;
    
    /**
     *
     */
    public function __construct()
    {
        $this->versionNumber = 1;
        $this->status = PictureVersionHelper::STATUS_PENDING;
        $this->type = PictureVersionHelper::TYPE_FINAL;
        $this->versions = new ArrayCollection();
    }
    
    /**
     * @return int|null
     */
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
    
    /**
     * @return $this|null
     */
    public function getBasedVersion(): ?self
    {
        return $this->basedVersion;
    }
    
    /**
     * @param Version|null $basedVersion
     * @return $this
     */
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
    
    /**
     * @param Version $version
     * @return $this
     */
    public function addVersion(self $version): self
    {
        if (!$this->versions->contains($version)) {
            $this->versions[] = $version;
            $version->setBasedVersion($this);
        }

        return $this;
    }
    
    /**
     * @param Version $version
     * @return $this
     */
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
    
    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }
    
    /**
     * @param string $name
     * @return $this
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
    
    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }
    
    /**
     * @param string|null $description
     * @return $this
     */
    public function setDescription(?string $description): self
    {
        $this->description = $description;

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
     * @return $this
     */
    public function setAuthor(?string $author): self
    {
        $this->author = $author;
        return $this;
    }
    
    
    /**
     * @return string|null
     */
    public function getCopyright(): ?string
    {
        return $this->copyright;
    }
    
    /**
     * @param string|null $copyright
     * @return $this
     */
    public function setCopyright(?string $copyright): self
    {
        $this->copyright = $copyright;
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
     * @return $this
     */
    public function setCreationdate(?\DateTime $creationdate): self
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
     * @return $this
     */
    public function setCredit(?string $credit): self
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
     * @return $this
     */
    public function setSource(?string $source): self
    {
        $this->source = $source;
        return $this;
    }
    
    /**
     * @return float|null
     */
    public function getLat(): ?float
    {
        return $this->lat;
    }
    
    /**
     * @param float|null $lat
     * @return Version
     */
    public function setLat(?float $lat): Version
    {
        $this->lat = $lat;
        return $this;
    }
    
    /**
     * @return float|null
     */
    public function getLng(): ?float
    {
        return $this->lng;
    }
    
    /**
     * @param float|null $lng
     * @return Version
     */
    public function setLng(?float $lng): Version
    {
        $this->lng = $lng;
        return $this;
    }
    
    /**
     * @return Picture|null
     */
    public function getPicture(): ?Picture
    {
        return $this->picture;
    }
    
    /**
     * @param Picture|null $picture
     * @return $this
     */
    public function setPicture(?Picture $picture): self
    {
        $this->picture = $picture;

        return $this;
    }
    
    /**
     * @return Picture|null
     */
    public function getTmpPicture(): ?Picture
    {
        return $this->tmpPicture;
    }
    
    /**
     * @param Picture|null $picture
     * @return $this
     */
    public function setTmpPicture(?Picture $picture): self
    {
        $this->tmpPicture = $picture;

        return $this;
    }
    
    /**
     * @return string|null
     */
    public function getUserComment(): ?string
    {
        return $this->userComment;
    }
    
    /**
     * @param string|null $userComment
     * @return $this
     */
    public function setUserComment(?string $userComment): self
    {
        $this->userComment = $userComment;

        return $this;
    }
    
    /**
     * @return string|null
     */
    public function getModeratorComment(): ?string
    {
        return $this->moderatorComment;
    }
    
    /**
     * @param string|null $moderatorComment
     * @return $this
     */
    public function setModeratorComment(?string $moderatorComment): self
    {
        $this->moderatorComment = $moderatorComment;

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
    public function setCreatedBy(?User $user): Version
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
    public function setUpdatedBy(?User $user): Version
    {
        $this->updatedBy = $user;
        return $this;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return Version
     */
    public function setType(string $type): Version
    {
        $this->type = $type;
        return $this;
    }
}
