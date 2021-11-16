<?php


namespace App\Traits;


use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;


trait TimestampableTrait
{
    /**
     * @var \DateTime $created
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @var \DateTime $updated
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    private $updatedAt;
    
    public function getCreatedAt(): \DateTime|\DateTimeImmutable
    {
        return $this->createdAt;
    }
    
    /**
     * @param \DateTime $createdAt
     * @return \App\Entity\Catalog\Place|\App\Entity\Catalog\Catalog|\App\Entity\Catalog\Picture|\App\Entity\Catalog\Picture\Version|TimestampableTrait
     */
    public function setCreatedAt(\DateTime $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }
    
    public function getUpdatedAt(): \DateTime|\DateTimeImmutable
    {
        return $this->updatedAt;
    }
    
    /**
     * @param \DateTime $updatedAt
     * @return \App\Entity\Catalog\Place|\App\Entity\Catalog\Catalog|\App\Entity\Catalog\Picture|\App\Entity\Catalog\Picture\Version|TimestampableTrait
     */
    public function setUpdatedAt(\DateTime $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }
}