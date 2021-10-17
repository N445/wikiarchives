<?php

namespace App\Entity\Catalog\Picture;

use App\Entity\Catalog\Picture;
use App\Repository\Catalog\Picture\PictureChangeRepository;
use App\Traits\BlameableTrait;
use App\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PictureChangeRepository::class)
 * @ORM\Table(name="catalog_picture_change")
 */
class PictureChange
{
    public const STATUS_PENDING = 'pending';
    public const STATUS_REFUSED = 'refused';
    public const STATUS_ACCEPTED = 'accepted';

    use TimestampableTrait;
    use BlameableTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Picture::class, inversedBy="pictureChanges")
     * @ORM\JoinColumn(nullable=false)
     */
    private $picture;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity=Field::class, mappedBy="pictureChange", orphanRemoval=true, cascade={"persist", "remove"})
     */
    private $fields;

    public function __construct()
    {
        $this->setStatus(self::STATUS_PENDING);
        $this->fields = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection|Field[]
     */
    public function getFields(): Collection
    {
        return $this->fields;
    }

    public function addField(Field $field): self
    {
        if (!$this->fields->contains($field)) {
            $this->fields[] = $field;
            $field->setPictureChange($this);
        }

        return $this;
    }

    public function removeField(Field $field): self
    {
        if ($this->fields->removeElement($field)) {
            // set the owning side to null (unless already changed)
            if ($field->getPictureChange() === $this) {
                $field->setPictureChange(null);
            }
        }

        return $this;
    }
}
