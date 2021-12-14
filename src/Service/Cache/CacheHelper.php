<?php

namespace App\Service\Cache;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use Psr\Cache\CacheException;
use Psr\Cache\InvalidArgumentException;
use Symfony\Contracts\Cache\ItemInterface;

class CacheHelper
{
    public const PREFIX = "12345678910111213141516171819202122";
    
    public const CATALOG_BREADCRUMB_BY_ID = self::PREFIX . '_catalog_by_id_%d';
    public const CATALOG_BY_ID = self::PREFIX . '_catalog_by_id_%d_%s';
    public const CATALOG_COUNT_PICTURES = self::PREFIX . '_catalog_count_pictures_%d';
    public const CATALOG_COUNT_CHILDREN = self::PREFIX . '_catalog_count_children_%d';
    public const CATALOG_COUNT_ALL = self::PREFIX . '_catalog_count_all_%d';
    public const CATALOG_DOWNLOAD = self::PREFIX . '_catalog_download_%d';
    
    public const PICTURE_BREADCRUMB_BY_ID = self::PREFIX . '_picture_by_id_%d_%d';
    public const PICTURE_ID = self::PREFIX . '_picture_%d_%d';
    public const PICTURE_PAGINATION = self::PREFIX . '_picture_pagination_%d_%d_%d';
    public const PICTURE_MAP = self::PREFIX . '_picture_map';
    public const PICTURE_DOWNLOAD = self::PREFIX . '_picture_download_%d_%s';
    
    public const TAG_CATALOG = 'tag_catalog_%d';
    public const TAG_PICTURE = 'tag_picture_%d';

//    CATALOG TAG
    
    /**
     * @param ItemInterface $item
     * @param Catalog $catalog
     * @throws CacheException
     * @throws InvalidArgumentException
     */
    public static function setTagsFromCatalogWithParent(ItemInterface $item, Catalog $catalog)
    {
        $item->tag(sprintf(self::TAG_CATALOG, $catalog->getId()));
        if ($parent = $catalog->getParent()) {
            self::setTagsFromCatalogWithParent($item, $parent);
        }
    }
    
    /**
     * @param ItemInterface $item
     * @param Catalog $catalog
     * @throws CacheException
     * @throws InvalidArgumentException
     */
    public static function setTagsFromCatalogWithChildren(ItemInterface $item, Catalog $catalog)
    {
        $item->tag(sprintf(self::TAG_CATALOG, $catalog->getId()));
        foreach ($catalog->getChildren() as $child) {
            self::setTagsFromCatalogWithChildren($item, $child);
        }
    }
    
    /**
     * @param ItemInterface $item
     * @param Catalog $catalog
     * @throws CacheException
     * @throws InvalidArgumentException
     */
    public static function setTagsFromCatalog(ItemInterface $item, Catalog $catalog)
    {
        $item->tag(sprintf(self::TAG_CATALOG, $catalog->getId()));
    }
    
    /**
     * @param ItemInterface $item
     * @param array $catalogIds
     * @throws CacheException
     * @throws InvalidArgumentException
     */
    public static function setTagsFromCatalogIds(ItemInterface $item, array $catalogIds)
    {
        $item->tag(array_map(function (int $id) {
            return sprintf(self::TAG_CATALOG, $id);
        }, $catalogIds));
    }
    
    /**
     * @param ItemInterface $item
     * @param int $catalogId
     * @throws CacheException
     * @throws InvalidArgumentException
     */
    public static function setTagsFromCatalogId(ItemInterface $item, int $catalogId)
    {
        $item->tag(sprintf(self::TAG_CATALOG, $catalogId));
    }

//    PICTURE TAG
    
    /**
     * @param ItemInterface $item
     * @param Picture $picture
     * @throws CacheException
     * @throws InvalidArgumentException
     */
    public static function setTagsFromPicture(ItemInterface $item, Picture $picture)
    {
        $item->tag(sprintf(self::TAG_PICTURE, $picture->getId()));
        foreach ($picture->getCatalogs() as $catalog) {
            self::setTagsFromCatalog($item, $catalog);
        }
    }
    
    /**
     * @param ItemInterface $item
     * @param array $pictureIds
     * @throws CacheException
     * @throws InvalidArgumentException
     */
    public static function setTagsFromPictureIds(ItemInterface $item, array $pictureIds)
    {
        $item->tag(array_map(function (int $id) {
            return sprintf(self::TAG_PICTURE, $id);
        }, $pictureIds));
    }
    
    /**
     * @param ItemInterface $item
     * @param int $pictureId
     * @throws CacheException
     * @throws InvalidArgumentException
     */
    public static function setTagsFromPictureId(ItemInterface $item, int $pictureId)
    {
        $item->tag(sprintf(self::TAG_PICTURE, $pictureId));
    }
}