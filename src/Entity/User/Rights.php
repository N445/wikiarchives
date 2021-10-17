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

    /**
     * @ORM\Column(type="boolean")
     */
    private $hasVersionValidator;

    public function __construct()
    {
        $this->hasVersionCreator = true;
        $this->hasVersionValidator = false;
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

    public function getHasVersionValidator(): ?bool
    {
        return $this->hasVersionValidator;
    }

    public function setHasVersionValidator(bool $hasVersionValidator): self
    {
        $this->hasVersionValidator = $hasVersionValidator;

        return $this;
    }
}