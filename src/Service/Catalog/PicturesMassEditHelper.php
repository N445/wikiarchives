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
    private PictureRemover $pictureRemover;
    
    public function __construct(
        EntityManagerInterface $em,
        PictureRemover $pictureRemover
    )
    {
        $this->em = $em;
        $this->cache = new TagAwareAdapter(
            new FilesystemAdapter(),
        );
        $this->pictureRemover = $pictureRemover;
    }
    
    public function massEdit(PicturesMassEdit $picturesMassEdit)
    {
        $this->cache->invalidateTags([sprintf(CacheHelper::TAG_CATALOG, $picturesMassEdit->getOriginalCatalog()->getId())]);
        if ($picturesMassEdit->getNewCatalog()) {
            $this->cache->invalidateTags([sprintf(CacheHelper::TAG_CATALOG, $picturesMassEdit->getNewCatalog()->getId())]);
        }
        if ($picturesMassEdit->isDelete()) {
            $this->delete($picturesMassEdit);
        } else {
            $this->edit($picturesMassEdit);
        }
    
    }
    
    private function delete(PicturesMassEdit $picturesMassEdit)
    {
        $chunkedArray = array_chunk($picturesMassEdit->getPictures(), 1000);
        foreach ($chunkedArray as $chunkedItem) {
            foreach ($chunkedItem as $picture) {
                $this->pictureRemover->remove($picture);
                $this->cache->invalidateTags([sprintf(CacheHelper::TAG_PICTURE, $picture->getId())]);
            }
            $this->em->flush();
        }
        $this->em->flush();
    }
    
    private function edit(PicturesMassEdit $picturesMassEdit)
    {
        $chunkedArray = array_chunk($picturesMassEdit->getPictures(), 1000);
        foreach ($chunkedArray as $chunkedItem) {
            foreach ($chunkedItem as $picture) {
                $this->setValues($picturesMassEdit, $picture);
                $this->em->persist($picture);
                $this->cache->invalidateTags([sprintf(CacheHelper::TAG_PICTURE, $picture->getId())]);
            }
            $this->em->flush();
        }
        $this->em->flush();
    }
    
    
    private function setValues(PicturesMassEdit $picturesMassEdit, Picture $picture)
    {
        $picture->setEnabled($picturesMassEdit->isEnabled())
                ->setIsEditedByWikiarchives($picturesMassEdit->isEditedByWikiarchives())
                ->setCatalog($picturesMassEdit->getNewCatalog() ?: $picture->getCatalog())
                ->setPlace($picturesMassEdit->getPlace() ?: $picture->getPlace())
                ->getValidatedVersion()
                ->setAuthor($picturesMassEdit->getAuthor() ?: $picture->getValidatedVersion()->getAuthor())
                ->setCreationdate($picturesMassEdit->getCreationdate() ?: $picture->getValidatedVersion()->getCreationdate())
                ->setCredit($picturesMassEdit->getCredit() ?: $picture->getValidatedVersion()->getCredit())
                ->setSource($picturesMassEdit->getSource() ?: $picture->getValidatedVersion()->getSource())
        ;
    }
}