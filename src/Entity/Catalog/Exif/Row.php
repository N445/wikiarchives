<?php

namespace App\Entity\Catalog\Exif;

use App\Entity\Catalog\Exif;
use App\Repository\Catalog\Exif\RowRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RowRepository::class)
 * @ORM\Table(name="catalog_picture_exif_row")
 */
class Row
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $label;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $value;

    /**
     * @ORM\ManyToOne(targetEntity=Exif::class, inversedBy="rows")
     * @ORM\JoinColumn(nullable=false)
     */
    private $exif;

    public function __construct(string $label, string $value)
    {
        $this->label = $label;
        $this->value = $value;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function getValueUnserialize()
    {
        return unserialize($this->value);
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

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
