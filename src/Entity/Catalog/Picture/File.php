<?php

    namespace App\Entity\Catalog\Picture;


    use App\Entity\Catalog\Picture;
    use Doctrine\ORM\Mapping as ORM;
    use Gedmo\Mapping\Annotation as Gedmo;
    use Symfony\Component\HttpFoundation\File\File as SymfonyFile;
    use Vich\UploaderBundle\Mapping\Annotation as Vich;

    /**
     * @property \DateTimeImmutable $updatedAt
     * @ORM\Entity
     * @ORM\Table(name="catalog_picture_file")
     * @Vich\Uploadable
     * @Gedmo\Loggable
     */
    class File
    {
        /**
         * @ORM\Id
         * @ORM\GeneratedValue
         * @ORM\Column(type="integer")
         */
        private $id;

        /**
         * @Vich\UploadableField(mapping="catalog_picture",
         *     fileNameProperty="imageName",
         *     size="imageSize",
         *     mimeType="imageMimeType",
         *     originalName="imageOriginalName",
         *     dimensions="imageDimensions"
         * )
         */
        private $imageFile;

        /**
         * @Gedmo\Versioned
         * @ORM\Column(type="string")
         */
        private ?string $imageName = null;

        /**
         * @Gedmo\Versioned
         * @ORM\Column(type="integer")
         */
        private ?int $imageSize = null;

        /**
         * @Gedmo\Versioned
         * @ORM\Column(type="string")
         */
        private ?string $imageMimeType = null;

        /**
         * @Gedmo\Versioned
         * @ORM\Column(type="string")
         */
        private ?string $imageOriginalName = null;

        /**
         * @Gedmo\Versioned
         * @ORM\Column(type="array")
         */
        private ?array $imageDimensions = null;

        /**
         * @ORM\OneToOne(targetEntity=Picture::class, mappedBy="file", cascade={"persist", "remove"})
         */
        private $picture;

        public function getId(): ?int
        {
            return $this->id;
        }

        /**
         * @param SymfonyFile|null $imageFile
         * @return File
         */
        public function setImageFile(?SymfonyFile $imageFile = null): self
        {
            $this->imageFile = $imageFile;
            if (null !== $imageFile) {
                $this->updatedAt = new \DateTimeImmutable();
            }

            return $this;
        }

        public function getImageFile(): ?SymfonyFile
        {
            return $this->imageFile;
        }

        public function setImageName(?string $imageName): self
        {
            $this->imageName = $imageName;

            return $this;
        }

        public function getImageName(): ?string
        {
            return $this->imageName;
        }

        /**
         * @return int|null
         */
        public function getImageSize(): ?int
        {
            return $this->imageSize;
        }

        /**
         * @param int|null $imageSize
         * @return self
         */
        public function setImageSize(?int $imageSize): self
        {
            $this->imageSize = $imageSize;
            return $this;
        }

        /**
         * @return string|null
         */
        public function getImageMimeType(): ?string
        {
            return $this->imageMimeType;
        }

        /**
         * @param string|null $imageMimeType
         * @return self
         */
        public function setImageMimeType(?string $imageMimeType): self
        {
            $this->imageMimeType = $imageMimeType;
            return $this;
        }

        /**
         * @return string|null
         */
        public function getImageOriginalName(): ?string
        {
            return $this->imageOriginalName;
        }

        /**
         * @param string|null $imageOriginalName
         * @return self
         */
        public function setImageOriginalName(?string $imageOriginalName): self
        {
            $this->imageOriginalName = $imageOriginalName;
            return $this;
        }

        /**
         * @return array|null
         */
        public function getImageDimensions(): ?array
        {
            return $this->imageDimensions;
        }

        /**
         * @param array|null $imageDimensions
         * @return self
         */
        public function setImageDimensions(?array $imageDimensions): self
        {
            $this->imageDimensions = $imageDimensions;
            return $this;
        }

        public function getPicture(): ?Picture
        {
            return $this->picture;
        }

        public function setPicture(?Picture $picture): self
        {
            // unset the owning side of the relation if necessary
            if ($picture === null && $this->picture !== null) {
                $this->picture->setFile(null);
            }

            // set the owning side of the relation if necessary
            if ($picture !== null && $picture->getFile() !== $this) {
                $picture->setFile($this);
            }

            $this->picture = $picture;

            return $this;
        }
    }
