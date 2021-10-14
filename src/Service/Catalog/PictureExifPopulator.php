<?php


namespace App\Service\Catalog;


use App\Entity\Catalog\Exif;
use App\Entity\Catalog\Picture;
use Doctrine\Common\Util\ClassUtils;

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

        $exif->clearRows();

        // reader with Native adapter
        $reader = \PHPExif\Reader\Reader::factory(\PHPExif\Reader\Reader::TYPE_NATIVE);

        if(!$read = $reader->read($picture->getImageFile()->getRealPath())){
            $picture->setExif($exif);
            return;
        }

        $exifData = $read->getData();
        foreach ($exifData as $label => $value) {
            $exif->addRow(new Exif\Row($label, serialize($value)));
        }
        $picture->setExif($exif);
    }

    private static function getValueType($value)
    {
        return serialize($value);
        $type = gettype($value);
        if ("object" === $type) {
            return ClassUtils::getClass($value);
        }
        return $type;
    }
}