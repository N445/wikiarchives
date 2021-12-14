<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Model\Catalog\PicturesDuplicateRemover;
use App\Repository\Catalog\PictureRepository;
use Doctrine\ORM\EntityManagerInterface;

class PictureDoublonManager
{
    private PictureRepository $pictureRepository;
    private EntityManagerInterface $em;
    private PictureRemover $pictureRemover;
    
    public function __construct(
        PictureRepository $pictureRepository,
        PictureRemover $pictureRemover
    )
    {
        $this->pictureRepository = $pictureRepository;
        $this->pictureRemover = $pictureRemover;
    }
    
    public function find(Catalog $catalog)
    {
        $doublons = [];
        foreach ($catalog->getPictures() as $picture) {
            $identifier = $this->getidentifierKey($picture);
            if (array_key_exists($identifier, $doublons)) {
                $doublons[$identifier][] = $picture;
                continue;
            }
            $doublons[$identifier] = [$picture];
        }
        
        $doublons = array_filter($doublons, function ($var) {
            return count($var) > 1;
        });
        
        return $doublons;
    }
    
    public function clearDuplicateByKeys(Catalog $catalog, PicturesDuplicateRemover $picturesDuplicateRemover)
    {
        $doublons = [];
        foreach ($catalog->getPictures() as $picture) {
            $identifier = $this->getidentifierKey($picture);
            if (!in_array($identifier, $picturesDuplicateRemover->getKeys())) {
                continue;
            }
            if (array_key_exists($identifier, $doublons)) {
                $doublons[$identifier][] = $picture;
                continue;
            }
            $doublons[$identifier] = [$picture];
        }
        
        $doublons = array_filter($doublons, function ($var) {
            return count($var) > 1;
        });
        
        foreach ($doublons as $key => $doublon) {
            array_shift($doublon);
            $this->pictureRemover->removeMultiple($doublon);
        }
    }
    
    private function getidentifierKey(Picture $picture)
    {
        return $picture->getFile()->getImageSize() . $picture->getFile()->getImageOriginalName();
    }
    
    
}