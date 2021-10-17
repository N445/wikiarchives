<?php


namespace App\Service\Catalog;


use App\Entity\Catalog\Picture\Exif;
use App\Entity\Catalog\Picture;
use Symfony\Component\PropertyAccess\PropertyAccess;

class PictureExifPopulator
{
    public static function populate(Picture $picture)
    {
        if (!$uploadedFile = $picture->getFile()->getImageFile()) {
            return;
        }
        if (!$exif = $picture->getValidatedVersion()->getExif()) {
            $exif = new Exif();
        }

        // reader with Native adapter
        $reader = \PHPExif\Reader\Reader::factory(\PHPExif\Reader\Reader::TYPE_NATIVE);

        if (!$read = $reader->read($uploadedFile->getRealPath())) {
            $picture->getValidatedVersion()->setExif($exif);
            return;
        }

        $propertyAccessor = PropertyAccess::createPropertyAccessor();

        $exifData = $read->getData();
        foreach ($exifData as $label => $value) {
            if ($propertyAccessor->isWritable($exif, $label)) {
                $propertyAccessor->setValue($exif, $label, self::getFormatedValue($label, $value));
            }
        }

        $picture->getValidatedVersion()->setExif($exif);
    }

    private static function getFormatedValue($label, $value)
    {
        if ('gps' === strtolower($label) && !is_array($value)) {
            $value = explode(',', $value);
        }
        return $value;
    }
}