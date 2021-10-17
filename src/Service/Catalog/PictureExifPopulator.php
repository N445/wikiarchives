<?php


namespace App\Service\Catalog;


use App\Entity\Catalog\Picture\Exif;
use App\Entity\Catalog\Picture;
use Doctrine\Common\Util\ClassUtils;
use Symfony\Component\PropertyAccess\PropertyAccess;

class PictureExifPopulator
{
    public static function populate(Picture $picture)
    {
        if (!$uploadedFile = $picture->getImageFile()) {
            return;
        }
        if (!$exif = $picture->getExif()) {
            $exif = new Exif();
        }

        // reader with Native adapter
        $reader = \PHPExif\Reader\Reader::factory(\PHPExif\Reader\Reader::TYPE_NATIVE);

        if (!$read = $reader->read($picture->getImageFile()->getRealPath())) {
            $picture->setExif($exif);
            return;
        }

        $propertyAccessor = PropertyAccess::createPropertyAccessor();

        $exifData = $read->getData();
        foreach ($exifData as $label => $value) {
            if ($propertyAccessor->isWritable($exif, $label)) {
                $propertyAccessor->setValue($exif, $label, self::getFormatedValue($label, $value));
            }
        }

        $picture->setExif($exif);
    }

    private static function getFormatedValue($label, $value)
    {
        if ('gps' === strtolower($label) && !is_array($value)) {
            $value = explode(',', $value);
        }
        return $value;
    }
}