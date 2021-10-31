<?php

namespace App\Entity\User;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="user_rights")
 */
class Rights
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     */
    private $hasVersionCreator;

    public function __construct()
    {
        $this->hasVersionCreator = true;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHasVersionCreator(): ?bool
    {
        return $this->hasVersionCreator;
    }

    public function setHasVersionCreator(bool $hasVersionCreator): self
    {
        $this->hasVersionCreator = $hasVersionCreator;

        return $this;
    }
}