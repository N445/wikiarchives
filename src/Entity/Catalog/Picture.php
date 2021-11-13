<?php

    namespace App\Entity\Catalog;

    use App\Entity\Catalog\Picture\File;
    use App\Entity\Catalog\Picture\Version;
    use App\Entity\User;
    use App\Repository\Catalog\PictureRepository;
    use App\Service\Catalog\PictureLicenseHelper;
    use App\Traits\TimestampableTrait;
    use Doctrine\Common\Collections\ArrayCollection;
    use Doctrine\Common\Collections\Collection;
    use Doctrine\ORM\Mapping as ORM;
    use Gedmo\Mapping\Annotation as Gedmo;

    /**
     * @ORM\Entity(repositoryClass=PictureRepository::class)
     * @ORM\Table(name="catalog_picture")
     * @Gedmo\Loggable
     * @ORM\HasLifecycleCallbacks()
     */
    class Picture
    {
        use TimestampableTrait;

        /**
         * @ORM\Id
         * @ORM\GeneratedValue
         * @ORM\Column(type="integer")
         */
        private $id;

        /**
         * @ORM\Column(type="integer",nullable=true)
         */
        private $piwigoId;

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
         * @ORM\OneToMany(targetEntity=Version::class, mappedBy="tmpPicture", orphanRemoval=true, cascade={"persist", "remove"})
         */
        private $tmpVersions;

        /**
         * @ORM\OneToOne(targetEntity=File::class, inversedBy="picture", cascade={"persist", "remove"})
         */
        private $file;

        /**
         * @Gedmo\Blameable(on="create")
         * @ORM\ManyToOne(targetEntity=User::class, inversedBy="createdPictures")
         */
        private $createdBy;
    
        /**
         * @Gedmo\Blameable(on="update")
         * @ORM\ManyToOne(targetEntity=User::class, inversedBy="updatedPictures")
         */
        private $updatedBy;
    
        /**
         * @ORM\Column(type="string", length=255)
         */
        private $license;
    
        /**
         * @ORM\Column(type="boolean")
         */
        private $isEditedByWikiarchives;
    
        public function __construct()
        {
            $this->file = new File();
            $this->versions = new ArrayCollection();
            $this->tmpVersions = new ArrayCollection();
            $this->validatedVersion = new Version();
            $this->addVersion($this->validatedVersion);
            $this->setLicense(PictureLicenseHelper::CC_BY);
            $this->setIsEditedByWikiarchives(false);
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
         * @return mixed
         */
        public function getPiwigoId()
        {
            return $this->piwigoId;
        }

        /**
         * @param mixed $piwigoId
         * @return Picture
         */
        public function setPiwigoId($piwigoId)
        {
            $this->piwigoId = $piwigoId;
            return $this;
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

        /**
         * @return Collection|Version[]
         */
        public function getTmpVersions(): Collection
        {
            return $this->tmpVersions;
        }

        public function addTmpVersion(Version $version): self
        {
            if (!$this->tmpVersions->contains($version)) {
                $this->tmpVersions[] = $version;
                $version->setTmpPicture($this);
            }

            return $this;
        }

        public function removeTmpVersion(Version $version): self
        {
            if ($this->tmpVersions->removeElement($version)) {
                // set the owning side to null (unless already changed)
                if ($version->getTmpPicture() === $this) {
                    $version->setTmpPicture(null);
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


        public function getCreatedBy(): ?User
        {
            return $this->createdBy;
        }

        public function setCreatedBy(?User $user): Picture
        {
            $this->createdBy = $user;
            return $this;
        }
    
        public function getUpdatedBy(): ?User
        {
            return $this->updatedBy;
        }
    
        public function setUpdatedBy(?User $user): Picture
        {
            $this->updatedBy = $user;
            return $this;
        }
    
        public function getLicense(): ?string
        {
            return $this->license;
        }
    
        public function setLicense(string $license): self
        {
            $this->license = $license;
        
            return $this;
        }
    
        public function getIsEditedByWikiarchives(): ?bool
        {
            return $this->isEditedByWikiarchives;
        }
    
        public function setIsEditedByWikiarchives(bool $isEditedByWikiarchives): self
        {
            $this->isEditedByWikiarchives = $isEditedByWikiarchives;
        
            return $this;
        }
    }
