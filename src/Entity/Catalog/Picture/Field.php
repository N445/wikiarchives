<?php

namespace App\Entity\Catalog\Picture;

use App\Entity\Catalog\Picture;
use App\Repository\Catalog\Picture\PictureChangeRepository;
use App\Traits\BlameableTrait;
use App\Traits\TimestampableTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="catalog_picture_change_field")
 */
class Field
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
    private $type;

    /**
     * @ORM\Column(type = "string")
     */
    private $label;

    /**
     * @ORM\Column(type = "string")
     */
    private $value;

    /**
     * @ORM\ManyToOne(targetEntity=PictureChange::class, inversedBy="fields")
     * @ORM\JoinColumn(nullable=false)
     */
    private $pictureChange;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type): self
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * @param mixed $label
     * @return Field
     */
    public function setLabel($label)
    {
        $this->label = $label;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @param mixed $value
     * @return Field
     */
    public function setValue($value)
    {
        $this->value = $value;
        return $this;
    }

    public function getPictureChange(): ?PictureChange
    {
        return $this->pictureChange;
    }

    public function setPictureChange(?PictureChange $exif): self
    {
        $this->pictureChange = $exif;

        return $this;
    }
}
