<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Catalog;
use App\Repository\Catalog\CatalogRepository;
use Doctrine\ORM\EntityManagerInterface;

class CatalogRemover
{
    private CatalogRepository $catalogRepository;
    private EntityManagerInterface $em;
    private PictureRemover $pictureRemover;
    
    public function __construct(
        CatalogRepository      $catalogRepository,
        EntityManagerInterface $em,
        PictureRemover $pictureRemover
    )
    {
        $this->catalogRepository = $catalogRepository;
        $this->em = $em;
        $this->pictureRemover = $pictureRemover;
    }
    
    public function remove(Catalog $catalog, bool $isRecursive = true)
    {
        foreach ($catalog->getPictures() as $picture) {
            $this->pictureRemover->remove($picture);
        }
        foreach ($catalog->getChildren() as $child) {
            $this->remove($child);
            }
        $this->em->remove($catalog);
        $this->em->flush();
    }
}