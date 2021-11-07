<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Picture;
use Doctrine\ORM\EntityManagerInterface;

class PictureRemover
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function remove(Picture $picture)
    {
        $picture->setValidatedVersion(null);
        foreach ($picture->getVersions() as $version) {
            $this->em->remove($version);
            $this->em->flush();
        }
        $this->em->flush();
        $this->em->remove($picture);
        $this->em->flush();
    }
}