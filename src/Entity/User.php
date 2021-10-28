<?php
    
    namespace App\Entity;
    
    use App\Entity\User\Info;
    use App\Entity\User\Rights;
    use App\Repository\UserRepository;
    use App\Traits\User\CatalogBlameableTrait;
    use App\Traits\User\Picture\VersionBlameableTrait;
    use App\Traits\User\PictureBlameableTrait;
    use App\Traits\User\PlaceBlameableTrait;
    use Doctrine\Common\Collections\ArrayCollection;
    use Doctrine\ORM\Mapping as ORM;
    use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
    use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
    use Symfony\Component\Security\Core\User\UserInterface;

    /**
     * @ORM\Entity(repositoryClass=UserRepository::class)
     * @UniqueEntity(fields={"email"}, message="There is already an account with this email")
     */
    class User implements UserInterface, PasswordAuthenticatedUserInterface, \Serializable
    {
        const ROLE_USER = 'ROLE_USER';
        const ROLE_ADMIN = 'ROLE_ADMIN';
    
        use CatalogBlameableTrait;
        use PictureBlameableTrait;
        use PlaceBlameableTrait;
        use VersionBlameableTrait;
    
        /**
         * @ORM\Id
         * @ORM\GeneratedValue
         * @ORM\Column(type="integer")
         */
        private $id;
    
        /**
         * @ORM\Column(type="string", length=180, unique=true)
         */
        private $email;
        
        /**
         * @ORM\Column(type="json")
         */
        private $roles = [];
        
        /**
         * @var string The hashed password
         * @ORM\Column(type="string")
         */
        private $password;
        
        /**
         * @ORM\Column(type="boolean")
         */
        private $isVerified = false;
        
        /**
         * @ORM\OneToOne(targetEntity=Info::class, cascade={"persist", "remove"}, fetch="EAGER")
         * @ORM\JoinColumn(nullable=false)
         */
        private $info;
        
        /**
         * @ORM\OneToOne(targetEntity=Rights::class, cascade={"persist", "remove"}, fetch="EAGER")
         * @ORM\JoinColumn(nullable=false)
         */
        private $rights;
        
        public function __construct()
        {
            $this->info = new Info();
            $this->rights = new Rights();
            $this->createdCatalogs = new ArrayCollection();
            $this->updatedCatalogs = new ArrayCollection();
            $this->createdPictures = new ArrayCollection();
            $this->updatedPictures = new ArrayCollection();
            $this->createdPlaces = new ArrayCollection();
            $this->updatedPlaces = new ArrayCollection();
            $this->createdVersions = new ArrayCollection();
            $this->updatedVersions = new ArrayCollection();
        }
        
        public function __toString(): string
        {
            return $this->getEmail();   // TODO: Implement __toString() method.
        }
        
        public function getId(): ?int
        {
            return $this->id;
        }
        
        public function getEmail(): ?string
        {
            return $this->email;
        }
        
        public function setEmail(string $email): self
        {
            $this->email = $email;
            
            return $this;
        }
        
        /**
         * A visual identifier that represents this user.
         *
         * @see UserInterface
         */
        public function getUserIdentifier(): string
        {
            return (string)$this->email;
        }
        
        /**
         * @deprecated since Symfony 5.3, use getUserIdentifier instead
         */
        public function getUsername(): string
        {
            return (string)$this->email;
        }
        
        /**
         * @see UserInterface
         */
        public function getRoles(): array
        {
            $roles = $this->roles;
            // guarantee every user at least has ROLE_USER
            $roles[] = self::ROLE_USER;
            
            return array_unique($roles);
        }
        
        public function setRoles(array $roles): self
        {
            $this->roles = $roles;
            
            return $this;
        }
        
        public function addRole(string $role): self
        {
            if (!in_array($role, $this->roles)) {
                $this->roles[] = $role;
            }
            return $this;
        }
        
        /**
         * @see PasswordAuthenticatedUserInterface
         */
        public function getPassword(): string
        {
            return $this->password;
        }
        
        public function setPassword(string $password): self
        {
            $this->password = $password;
            
            return $this;
        }
        
        /**
         * Returning a salt is only needed, if you are not using a modern
         * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
         *
         * @see UserInterface
         */
        public function getSalt(): ?string
        {
            return null;
        }
        
        /**
         * @see UserInterface
         */
        public function eraseCredentials()
        {
            // If you store any temporary, sensitive data on the user, clear it here
            // $this->plainPassword = null;
        }
        
        public function isVerified(): bool
        {
            return $this->isVerified;
        }
        
        public function setIsVerified(bool $isVerified): self
        {
            $this->isVerified = $isVerified;
            
            return $this;
        }
        
        public function getInfo(): ?Info
        {
            return $this->info;
        }
        
        public function setInfo(Info $info): self
        {
            $this->info = $info;
            
            return $this;
        }
        
        public function getRights(): ?Rights
        {
            return $this->rights;
        }
    
        public function setRights(Rights $rights): self
        {
            $this->rights = $rights;
        
            return $this;
        }
    
        public function serialize()
        {
            return serialize(array(
                $this->id,
                $this->email,
                $this->password,
                // see section on salt below
                // $this->salt,
            ));
        }
    
        public function unserialize($serialized)
        {
            list (
                $this->id,
                $this->email,
                $this->password,
                // see section on salt below
                // $this->salt
                ) = unserialize($serialized);
        }
    }
