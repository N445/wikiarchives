<?php

namespace App\Service\Catalog;

use App\Entity\Catalog\Picture;
use App\Model\Catalog\PicturesMassEdit;
use App\Service\Cache\CacheHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Cache\Adapter\TagAwareAdapter;

class PicturesMassEditHelper
{
    private EntityManagerInterface $em;
    private TagAwareAdapter $cache;
    
    public function __construct(
        EntityManagerInterface $em,
    )
    {
        $this->em = $em;
        $this->cache = new TagAwareAdapter(
            new FilesystemAdapter(),
        );
    }
    
    public function massEdit(PicturesMassEdit $picturesMassEdit)
    {
        dump($picturesMassEdit);
        $this->cache->invalidateTags([sprintf(CacheHelper::TAG_CATALOG, $picturesMassEdit->getOriginalCatalog()->getId())]);
        if($picturesMassEdit->getNewCatalog()){
            $this->cache->invalidateTags([sprintf(CacheHelper::TAG_CATALOG, $picturesMassEdit->getNewCatalog()->getId())]);
        }
        foreach ($picturesMassEdit->getPictures() as $picture) {
            $this->setValues($picturesMassEdit, $picture);
            $this->em->persist($picture);
            $this->cache->invalidateTags([sprintf(CacheHelper::TAG_PICTURE, $picture->getId())]);
        }
        dump($picturesMassEdit);
//    die;
        $this->em->flush();
    }
    
    private function setValues(PicturesMassEdit $picturesMassEdit, Picture $picture)
    {
        $picture->setEnabled($picturesMassEdit->isEnabled())
                ->setIsEditedByWikiarchives($picturesMassEdit->isEditedByWikiarchives())
                ->setCatalog($picturesMassEdit->getNewCatalog() ?: $picture->getCatalog())
                ->setPlace($picturesMassEdit->getPlace() ?: $picture->getPlace())
                ->getValidatedVersion()
                ->getExif()
                ->setAuthor($picturesMassEdit->getAuthor() ?: $picture->getValidatedVersion()->getExif()->getAuthor())
                ->setCreationdate($picturesMassEdit->getCreationdate() ?: $picture->getValidatedVersion()->getExif()->getCreationdate())
                ->setCredit($picturesMassEdit->getCredit() ?: $picture->getValidatedVersion()->getExif()->getCredit())
                ->setSource($picturesMassEdit->getSource() ?: $picture->getValidatedVersion()->getExif()->getSource())
        ;
    }
}