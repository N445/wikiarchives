<?php

namespace App\Event\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Service\Cache\CacheHelper;
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
        if($object instanceof Picture){
//            $catalog = $object->getCatalog();
            $this->clearPictureCache($object);
            return;
        }
        $this->clearCatalogCache($object);
    }
    
    public function clearCatalogCache(?Catalog $catalog)
    {
        if(!$catalog){
            return;
        }
        dump($catalog);
        $cache = new TagAwareAdapter(
            new FilesystemAdapter(),
        );
        $cache->invalidateTags([sprintf(CacheHelper::TAG_CATALOG, $catalog->getId())]);
        $this->clearCatalogCache($catalog->getParent());
        
        foreach ($catalog->getPictures() as $picture) {
            $this->clearPictureCache($picture);
        }
    }
    
    public function clearPictureCache(?Picture $picture)
    {
        if(!$picture){
            return;
        }
        $cache = new TagAwareAdapter(
            new FilesystemAdapter(),
        );
        $cache->invalidateTags([sprintf(CacheHelper::TAG_PICTURE, $picture->getId())]);
    }
}