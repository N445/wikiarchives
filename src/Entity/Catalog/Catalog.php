<?php

    namespace App\Entity\Catalog;

    use App\Entity\User;
    use App\Repository\Catalog\CatalogRepository;
    use App\Traits\TimestampableTrait;
    use Doctrine\Common\Collections\ArrayCollection;
    use Doctrine\Common\Collections\Collection;
    use Doctrine\ORM\Mapping as ORM;
    use Doctrine\ORM\PersistentCollection;
    use Gedmo\Mapping\Annotation as Gedmo;

    /**
     * @ORM\Entity(repositoryClass=CatalogRepository::class)
     * @ORM\Table(name="catalog")
     * @Gedmo\Tree(type="nested")
     * @Gedmo\Loggable
     */
    class Catalog
    {
        public const ROOT = 'root';
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
         * @ORM\Column(type="string", length=255)
         */
        private $name;
    
        /**
         * @Gedmo\Versioned
         * @ORM\Column(type="text",nullable=true)
         */
        private $description;
    
        /**
         * @Gedmo\Versioned
         * @ORM\Column(type="boolean")
         */
        private $enabled = true;
    
        /**
         * @Gedmo\TreeLeft
         * @ORM\Column(name="lft", type="integer")
         */
        private $lft;

        /**
         * @Gedmo\TreeLevel
         * @ORM\Column(name="lvl", type="integer")
         */
        private $lvl;

        /**
         * @Gedmo\TreeRight
         * @ORM\Column(name="rgt", type="integer")
         */
        private $rgt;

        /**
         * @Gedmo\TreeRoot
         * @ORM\ManyToOne(targetEntity="Catalog")
         * @ORM\JoinColumn(name="tree_root", referencedColumnName="id", onDelete="CASCADE")
         */
        private $root;

        /**
         * @Gedmo\Versioned
         * @Gedmo\TreeParent
         * @ORM\ManyToOne(targetEntity="Catalog", inversedBy="children")
         * @ORM\JoinColumn(name="parent_id", referencedColumnName="id", onDelete="CASCADE")
         */
        private $parent;

        /**
         * @ORM\OneToMany(targetEntity="Catalog", mappedBy="parent", cascade={"persist", "remove"})
         * @ORM\OrderBy({"lft" = "ASC"})
         */
        private $children;

        /**
         * @ORM\OneToMany(targetEntity=Picture::class, mappedBy="catalog", cascade={"persist", "remove"})
         */
        private $pictures;

        /**
         * @Gedmo\Versioned
         * @ORM\ManyToOne(targetEntity=Place::class, inversedBy="catalogs")
         */
        private $place;

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
    
        /**
         * @ORM\ManyToOne(targetEntity=Picture::class, inversedBy="catalogsIllustrations", fetch="EAGER")
         */
        private $illustration;
    
        /**
         *
         */
        public function __construct()
        {
            $this->children = new ArrayCollection();
            $this->pictures = new ArrayCollection();
        }
    
        /**
         * @return string|null
         */
        public function __toString()
        {
            return $this->getName();
        }
    
        /**
         * @return int|null
         */
        public function getId(): ?int
        {
            return $this->id;
        }
    
        /**
         * @param mixed $id
         * @return Catalog
         */
        public function setId($id)
        {
            $this->id = $id;
            return $this;
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
         * @return Catalog
         */
        public function setPiwigoId($piwigoId)
        {
            $this->piwigoId = $piwigoId;
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
        public function getDescription()
        {
            return $this->description;
        }
    
        /**
         * @param string|null $description
         * @return Catalog
         */
        public function setDescription(?string $description)
        {
            $this->description = $description;
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
         * @return Catalog
         */
        public function setEnabled(bool $enabled): Catalog
        {
            $this->enabled = $enabled;
            return $this;
        }
    
        /**
         * @return mixed
         */
        public function getRoot()
        {
            return $this->root;
        }
    
        /**
         * @param Catalog|null $parent
         * @return $this
         */
        public function setParent(Catalog $parent = null): self
        {
            $this->parent = $parent;

            return $this;
        }
    
        /**
         * @return Catalog|null
         */
        public function getParent(): ?Catalog
        {
            return $this->parent;
        }

        /**
         * @return PersistentCollection|ArrayCollection
         */
        public function getChildren(): PersistentCollection|ArrayCollection
        {
            return $this->children;
        }
    
        /**
         * @param Catalog $child
         * @return $this
         */
        public function addChild(self $child): self
        {
            if (!$this->children->contains($child)) {
                $this->children[] = $child;
                $child->setParent($this);
            }

            return $this;
        }
    
        /**
         * @param Catalog $child
         * @return $this
         */
        public function removeChild(self $child): self
        {
            if ($this->children->removeElement($child)) {
                // set the owning side to null (unless already changed)
                if ($child->getParent() === $this) {
                    $child->setParent(null);
                }
            }

            return $this;
        }

        /**
         * @return Collection|ArrayCollection|Picture[]
         */
        public function getPictures(): Collection|ArrayCollection|array
        {
            return $this->pictures;
        }
    
        /**
         * @param Picture $picture
         * @return $this
         */
        public function addPicture(Picture $picture): self
        {
            if (!$this->pictures->contains($picture)) {
                $this->pictures[] = $picture;
                $picture->setCatalog($this);
            }

            return $this;
        }
    
        /**
         * @param Picture $picture
         * @return $this
         */
        public function removePicture(Picture $picture): self
        {
            if ($this->pictures->removeElement($picture)) {
                // set the owning side to null (unless already changed)
                if ($picture->getCatalog() === $this) {
                    $picture->setCatalog(null);
                }
            }

            return $this;
        }
    
        /**
         * @return Place|null
         */
        public function getPlace(): ?Place
        {
            return $this->place;
        }
    
    
        /**
         * @return Place|null
         */
        public function getPlaceRecursive(): ?Place
        {
            if (!$this->place) {
                return $this->getParent() ? $this->getParent()->getPlaceRecursive() : null;
            }
            return $this->place;
        }
    
        /**
         * @param Place|null $place
         * @return $this
         */
        public function setPlace(?Place $place): self
        {
            $this->place = $place;

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
    
        public function getIllustration(): ?Picture
        {
            if($this->illustration){
                return $this->illustration;
            }
            if($this->getPictures()->first()){
                return $this->getPictures()->first();
            }
            if($this->getChildren()->first()){
                return $this->getChildren()->first()->getIllustration();
            }
            return null;
        }
    
        public function setIllustration(?Picture $illustration): self
        {
            $this->illustration = $illustration;
        
            return $this;
        }
    }
