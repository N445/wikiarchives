<?php

namespace App\Event\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use Doctrine\Bundle\DoctrineBundle\EventSubscriber\EventSubscriberInterface;
use Doctrine\Common\Util\ClassUtils;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Cache\Adapter\TagAwareAdapter;

class CatalogSubscriber implements EventSubscriberInterface
{
    public function getSubscribedEvents(): array
    {
        return [
            Events::postPersist,
            Events::postRemove,
            Events::postUpdate,
        ];
    }
    
    public function postPersist(LifecycleEventArgs $args)
    {
        $object = $args->getObject();
        if (!in_array(ClassUtils::getClass($object), [Picture::class, Catalog::class])) {
            return;
        }
        $catalog = $object;
        if($object instanceof Picture){
            $catalog = $object->getCatalog();
        }
        $this->clearCatalogCache($catalog);
    }
    
    public function postRemove(LifecycleEventArgs $args)
    {
        $object = $args->getObject();
        if (!in_array(ClassUtils::getClass($object), [Picture::class, Catalog::class])) {
            return;
        }
        $catalog = $object;
        if($object instanceof Picture){
            $catalog = $object->getCatalog();
        }
        $this->clearCatalogCache($catalog);
    }
    
    public function postUpdate(LifecycleEventArgs $args)
    {
        $object = $args->getObject();
        if (!in_array(ClassUtils::getClass($object), [Picture::class, Catalog::class])) {
            return;
        }
        $catalog = $object;
        if($object instanceof Picture){
            $catalog = $object->getCatalog();
            $this->clearPictureCache($object);
        }
        $this->clearCatalogCache($catalog);
    }
    
    public function clearCatalogCache(?Catalog $catalog)
    {
        if(!$catalog){
            return;
        }
        $cache = new TagAwareAdapter(
            new FilesystemAdapter(),
        );
        $cache->invalidateTags(['catalog_' . $catalog->getId()]);
        $this->clearCatalogCache($catalog->getParent());
        
        foreach ($catalog->getPictures() as $picture) {
            $this->clearPictureCache($picture);
        }
        
//        foreach ($catalog->getChildren() as $child) {
//            $this->clearCatalogCache($child);
//        }
    }
    
    public function clearPictureCache(?Picture $picture)
    {
        if(!$picture){
            return;
        }
        $cache = new TagAwareAdapter(
            new FilesystemAdapter(),
        );
        dump($picture);
        $cache->invalidateTags(['catalog_' . $picture->getCatalog()->getId()]);
        $cache->invalidateTags(['picture_' . $picture->getId()]);
        $cache->delete('picture_map');
    }
}