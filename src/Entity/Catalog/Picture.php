<?php

namespace App\Entity\Catalog;

use App\Repository\Catalog\PictureRepository;
use App\Traits\BlameableTrait;
use App\Traits\TimestampableTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=PictureRepository::class)
 * @ORM\Table(name="catalog_picture")
 * @Vich\Uploadable
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
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @Gedmo\Versioned
     * @ORM\ManyToOne(targetEntity=Catalog::class, inversedBy="pictures")
     */
    private $catalog;

    /**
     * NOTE: This is not a mapped field of entity metadata, just a simple property.
     *
     * @Vich\UploadableField(mapping="catalog_picture",
     *     fileNameProperty="imageName",
     *     size="imageSize",
     *     mimeType="imageMimeType",
     *     originalName="imageOriginalName",
     *     dimensions="imageDimensions"
     * )
     *
     * @var File|null
     */
    private $imageFile;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="string")
     * @var string|null
     */
    private $imageName;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="integer")
     * @var int|null
     */
    private $imageSize;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="string")
     * @var string|null
     */
    private $imageMimeType;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="string")
     * @var string|null
     */
    private $imageOriginalName;

    /**
     * @Gedmo\Versioned
     * @ORM\Column(type="array")
     * @var array|null
     */
    private $imageDimensions;

    /**
     * @Gedmo\Versioned
     * @ORM\ManyToOne(targetEntity=Place::class, inversedBy="pictures")
     */
    private $place;

    /**
     * @Gedmo\Versioned
     * @ORM\OneToOne(targetEntity=Exif::class, cascade={"persist", "remove"})
     */
    private $exif;

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

    public function getCatalog(): ?Catalog
    {
        return $this->catalog;
    }

    public function setCatalog(?Catalog $catalog): self
    {
        $this->catalog = $catalog;

        return $this;
    }


    /**
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile
     */
    public function setImageFile(?File $imageFile = null): self
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }

        return $this;
    }

    public function getImageFile(): ?File
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
     * @return Picture
     */
    public function setImageSize(?int $imageSize): Picture
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
     * @return Picture
     */
    public function setImageMimeType(?string $imageMimeType): Picture
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
     * @return Picture
     */
    public function setImageOriginalName(?string $imageOriginalName): Picture
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
     * @return Picture
     */
    public function setImageDimensions(?array $imageDimensions): Picture
    {
        $this->imageDimensions = $imageDimensions;
        return $this;
    }

    public function getPlace(): ?Place
    {
        return $this->place;
    }

    public function getPlaceRecursive(): ?Place
    {
        if(!$this->place){
            return $this->getCatalog() ? $this->getCatalog()->getPlaceRecursive() : null;
        }
        return $this->place;
    }

    public function setPlace(?Place $place): self
    {
        $this->place = $place;

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



}
