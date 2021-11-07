<?php
    
    namespace App\Entity\Catalog\Picture;
    
    use App\Repository\Catalog\Picture\ExifRepository;
    use Doctrine\ORM\Mapping as ORM;
    use Gedmo\Mapping\Annotation as Gedmo;

    /**
     * @ORM\Entity(repositoryClass=ExifRepository::class)
     * @ORM\Table(name="catalog_picture_exif")
     * @Gedmo\Loggable
     */
    class Exif
    {
        /**
         * @ORM\Id
         * @ORM\GeneratedValue
         * @ORM\Column(type="integer")
         */
        private ?int $id;
        
        /**
         * @ORM\Column(type="boolean")
         * @Gedmo\Versioned
         */
        private bool $isVerified = false;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $title = null;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $author = null;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $camera = null;
        
        /**
         * @ORM\Column(type="text",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $caption = null;
        
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
        private ?string $aperture = null;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $exposure = null;
        
        /**
         * @ORM\Column(type="float",nullable=true)
         * @Gedmo\Versioned
         */
        private ?float $focalLength = null;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $focalDistance = null;
        
        /**
         * @ORM\Column(type="integer",nullable=true)
         * @Gedmo\Versioned
         */
        private ?int $iso = null;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $colorSpace = null;
        
        /**
         * @ORM\Column(type="integer",nullable=true)
         * @Gedmo\Versioned
         */
        private ?int $fileSize = null;
        
        /**
         * @ORM\Column(type="integer",nullable=true)
         * @Gedmo\Versioned
         */
        private ?int $height = null;
        
        /**
         * @ORM\Column(type="integer",nullable=true)
         * @Gedmo\Versioned
         */
        private ?int $width = null;
        
        /**
         * @ORM\Column(type="integer",nullable=true)
         * @Gedmo\Versioned
         */
        private ?int $horizontalResolution = null;
        
        /**
         * @ORM\Column(type="integer",nullable=true)
         * @Gedmo\Versioned
         */
        private ?int $verticalResolution = null;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $headline = null;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $jobTitle = null;
        
        /**
         * @ORM\Column(type="array",nullable=true)
         * @Gedmo\Versioned
         */
        private ?array $keywords = null;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $mimeType = null;
        
        /**
         * @ORM\Column(type="integer",nullable=true)
         * @Gedmo\Versioned
         */
        private ?int $orientation = null;
        
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $software = null;
    
        /**
         * @ORM\Column(type="string",nullable=true)
         * @Gedmo\Versioned
         */
        private ?string $source = null;
    
        /**
         * @Gedmo\Versioned
         * @ORM\Column(type="float", nullable=true)
         */
        private ?float $lat = null;
    
        /**
         * @Gedmo\Versioned
         * @ORM\Column(type="float", nullable=true)
         */
        private ?float $lng = null;
    
        public function __construct()
        {
            $this->setKeywords([]);
        }
    
        public function getId(): ?int
        {
            return $this->id;
        }
        
        /**
         * @return bool
         */
        public function isVerified(): bool
        {
            return $this->isVerified;
        }
        
        /**
         * @param bool $isVerified
         * @return Exif
         */
        public function setIsVerified(bool $isVerified): Exif
        {
            $this->isVerified = $isVerified;
            return $this;
        }
        
        public function toArray(): array
        {
            return [
                'title' => $this->getTitle(),
                'author' => $this->getAuthor(),
                'camera' => $this->getCamera(),
                'caption' => $this->getCaption(),
                'copyright' => $this->getCopyright(),
                'creationdate' => $this->getCreationdate(),
                'credit' => $this->getCredit(),
                'aperture' => $this->getAperture(),
                'exposure' => $this->getExposure(),
                'exposureMilliseconds' => $this->getExposureMilliseconds(),
                'focalLength' => $this->getFocalLength(),
                'focalDistance' => $this->getFocalDistance(),
                'iso' => $this->getIso(),
                'colorSpace' => $this->getColorSpace(),
                'fileSize' => $this->getFileSize(),
                'height' => $this->getHeight(),
                'width' => $this->getWidth(),
                'horizontalResolution' => $this->getHorizontalResolution(),
                'verticalResolution' => $this->getVerticalResolution(),
                'headline' => $this->getHeadline(),
                'jobTitle' => $this->getJobTitle(),
                'keywords' => $this->getKeywords(),
                'mimeType' => $this->getMimeType(),
                'orientation' => $this->getOrientation(),
                'software' => $this->getSoftware(),
                'source' => $this->getSource(),
                'lat' => $this->getLat(),
                'lng' => $this->getLng(),
            ];
        }
        
        public function isCompleted(): bool
        {
            return count(array_filter($this->toArray(), function ($a) {
                    return $a === null;
                })) <= 0;
        }
        
        /**
         * @return string|null
         */
        public function getTitle(): ?string
        {
            return $this->title;
        }
        
        /**
         * @param string|null $title
         * @return Exif
         */
        public function setTitle(?string $title): Exif
        {
            $this->title = $title;
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
         * @return Exif
         */
        public function setAuthor(?string $author): Exif
        {
            $this->author = $author;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getCamera(): ?string
        {
            return $this->camera;
        }
        
        /**
         * @param string|null $camera
         * @return Exif
         */
        public function setCamera(?string $camera): Exif
        {
            $this->camera = $camera;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getCaption(): ?string
        {
            return $this->caption;
        }
        
        /**
         * @param string|null $caption
         * @return Exif
         */
        public function setCaption(?string $caption): Exif
        {
            $this->caption = $caption;
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
         * @return Exif
         */
        public function setCopyright(?string $copyright): Exif
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
         * @return Exif
         */
        public function setCreationdate(?\DateTime $creationdate): Exif
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
         * @return Exif
         */
        public function setCredit(?string $credit): Exif
        {
            $this->credit = $credit;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getAperture(): ?string
        {
            return $this->aperture;
        }
        
        /**
         * @param string|null $aperture
         * @return Exif
         */
        public function setAperture(?string $aperture): Exif
        {
            $this->aperture = $aperture;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getExposure(): ?string
        {
            return $this->exposure;
        }
        
        /**
         * @param string|null $exposure
         * @return Exif
         */
        public function setExposure(?string $exposure): Exif
        {
            $this->exposure = $exposure;
            return $this;
        }
        
        /**
         * Returns the Exposure
         *
         * @return float|null
         */
        public function getExposureMilliseconds()
        {
            if (!$this->exposure) {
                return null;
            }
            
            if (is_numeric($this->exposure)) {
                return $this->exposure + 0;
            }
            
            $exposureParts = explode('/', $this->exposure);
            
            if (0 === (int)end($exposureParts)) {
                return null;
            }
            
            return (int)reset($exposureParts) / (int)end($exposureParts);
        }
        
        /**
         * @return float|null
         */
        public function getFocalLength(): ?float
        {
            return $this->focalLength;
        }
        
        /**
         * @param float|null $focalLength
         * @return Exif
         */
        public function setFocalLength(?float $focalLength): Exif
        {
            $this->focalLength = $focalLength;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getFocalDistance(): ?string
        {
            return $this->focalDistance;
        }
        
        /**
         * @param string|null $focalDistance
         * @return Exif
         */
        public function setFocalDistance(?string $focalDistance): Exif
        {
            $this->focalDistance = $focalDistance;
            return $this;
        }
        
        /**
         * @return int|null
         */
        public function getIso(): ?int
        {
            return $this->iso;
        }
        
        /**
         * @param int|null $iso
         * @return Exif
         */
        public function setIso(?int $iso): Exif
        {
            $this->iso = $iso;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getColorSpace(): ?string
        {
            return $this->colorSpace;
        }
        
        /**
         * @param string|null $colorSpace
         * @return Exif
         */
        public function setColorSpace(?string $colorSpace): Exif
        {
            $this->colorSpace = $colorSpace;
            return $this;
        }
        
        /**
         * @return int|null
         */
        public function getFileSize(): ?int
        {
            return $this->fileSize;
        }
        
        /**
         * @param int|null $fileSize
         * @return Exif
         */
        public function setFileSize(?int $fileSize): Exif
        {
            $this->fileSize = $fileSize;
            return $this;
        }
        
        /**
         * @return int|null
         */
        public function getHeight(): ?int
        {
            return $this->height;
        }
        
        /**
         * @param int|null $height
         * @return Exif
         */
        public function setHeight(?int $height): Exif
        {
            $this->height = $height;
            return $this;
        }
        
        /**
         * @return int|null
         */
        public function getWidth(): ?int
        {
            return $this->width;
        }
        
        /**
         * @param int|null $width
         * @return Exif
         */
        public function setWidth(?int $width): Exif
        {
            $this->width = $width;
            return $this;
        }
        
        /**
         * @return int|null
         */
        public function getHorizontalResolution(): ?int
        {
            return $this->horizontalResolution;
        }
        
        /**
         * @param int|null $horizontalResolution
         * @return Exif
         */
        public function setHorizontalResolution(?int $horizontalResolution): Exif
        {
            $this->horizontalResolution = $horizontalResolution;
            return $this;
        }
        
        /**
         * @return int|null
         */
        public function getVerticalResolution(): ?int
        {
            return $this->verticalResolution;
        }
        
        /**
         * @param int|null $verticalResolution
         * @return Exif
         */
        public function setVerticalResolution(?int $verticalResolution): Exif
        {
            $this->verticalResolution = $verticalResolution;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getHeadline(): ?string
        {
            return $this->headline;
        }
        
        /**
         * @param string|null $headline
         * @return Exif
         */
        public function setHeadline(?string $headline): Exif
        {
            $this->headline = $headline;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getJobTitle(): ?string
        {
            return $this->jobTitle;
        }
        
        /**
         * @param string|null $jobTitle
         * @return Exif
         */
        public function setJobTitle(?string $jobTitle): Exif
        {
            $this->jobTitle = $jobTitle;
            return $this;
        }
        
        /**
         * @return array|null
         */
        public function getKeywords(): ?array
        {
            return $this->keywords;
        }
        
        /**
         * @param array|null $keywords
         * @return Exif
         */
        public function setKeywords(mixed $keywords): Exif
        {
            if (is_string($keywords)) {
                $keywords = [$keywords];
            }
            $this->keywords = $keywords;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getMimeType(): ?string
        {
            return $this->mimeType;
        }
        
        /**
         * @param string|null $mimeType
         * @return Exif
         */
        public function setMimeType(?string $mimeType): Exif
        {
            $this->mimeType = $mimeType;
            return $this;
        }
        
        /**
         * @return int|null
         */
        public function getOrientation(): ?int
        {
            return $this->orientation;
        }
        
        /**
         * @param int|null $orientation
         * @return Exif
         */
        public function setOrientation(?int $orientation): Exif
        {
            $this->orientation = $orientation;
            return $this;
        }
        
        /**
         * @return string|null
         */
        public function getSoftware(): ?string
        {
            return $this->software;
        }
        
        /**
         * @param string|null $software
         * @return Exif
         */
        public function setSoftware(?string $software): Exif
        {
            $this->software = $software;
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
         * @return Exif
         */
        public function setSource(?string $source): Exif
        {
            $this->source = $source;
            return $this;
        }
    
    
        public function getGps(): ?string
        {
            if ($this->getLat() && $this->getLng()) {
                return sprintf('%s,%s', $this->getLat(), $this->getLng());
            }
            return null;
        }
    
    
        public function setGps(?array $gps): Exif
        {
            if (count($gps) !== 2) {
                $this->setLat(null);
                $this->setLng(null);
            }
        
            $this->setLat($gps[0]);
            $this->setLng($gps[1]);
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
         * @return Exif
         */
        public function setLat(?float $lat): Exif
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
         * @return Exif
         */
        public function setLng(?float $lng): Exif
        {
            $this->lng = $lng;
            return $this;
        }
    }
