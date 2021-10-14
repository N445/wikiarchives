<?php

namespace App\Entity\Catalog;

use App\Entity\Catalog\Exif\Row;
use App\Repository\Catalog\ExifRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ExifRepository::class)
 * @ORM\Table(name="catalog_picture_exif")
 */
class Exif
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=Row::class, mappedBy="exif", orphanRemoval=true, cascade={"persist", "remove"})
     */
    private $rows;

    public function __construct()
    {
        $this->rows = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Row[]
     */
    public function getRows(): Collection
    {
        return $this->rows;
    }

    public function addRow(Row $row): self
    {
        if (!$this->rows->contains($row)) {
            $this->rows[] = $row;
            $row->setExif($this);
        }

        return $this;
    }

    public function removeRow(Row $row): self
    {
        if ($this->rows->removeElement($row)) {
            // set the owning side to null (unless already changed)
            if ($row->getExif() === $this) {
                $row->setExif(null);
            }
        }

        return $this;
    }

    public function clearRows()
    {
        foreach ($this->rows as $row) {
            $this->removeRow($row);
        }
    }
}
