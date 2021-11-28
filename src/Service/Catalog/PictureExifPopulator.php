<?php


namespace App\Service\Catalog;


use App\Entity\Catalog\Picture;
use App\Entity\Catalog\Picture\Exif;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\PropertyAccess\PropertyAccess;

class PictureExifPopulator
{
    public static function getExifFromUrl($url, ?Exif $exif = null)
    {
        if (!$exif) {
            $exif = new Exif();
        }
        
        // reader with Native adapter
        $reader = \PHPExif\Reader\Reader::factory(\PHPExif\Reader\Reader::TYPE_NATIVE);
        
        $read = $reader->read($url);
        
        $propertyAccessor = PropertyAccess::createPropertyAccessor();
        
        $exifData = $read->getData();
        foreach ($exifData as $label => $value) {
            if ($propertyAccessor->isWritable($exif, $label)) {
                $propertyAccessor->setValue($exif, $label, self::getFormatedValue($label, $value));
            }
        }
        return $exif;
    }
    
    public static function getExifFromFile($file, ?Exif $exif = null)
    {
        if (!$file instanceof UploadedFile) {
            $file = new UploadedFile($file, $file, null, null, true);
        }
        if (!$exif) {
            $exif = new Exif();
        }
        
        // reader with Native adapter
        $reader = \PHPExif\Reader\Reader::factory(\PHPExif\Reader\Reader::TYPE_NATIVE);
        
        $read = $reader->read($file->getRealPath());
        
        $propertyAccessor = PropertyAccess::createPropertyAccessor();
        
        $exifData = $read->getData();
        foreach ($exifData as $label => $value) {
            if ($propertyAccessor->isWritable($exif, $label)) {
                $propertyAccessor->setValue($exif, $label, self::getFormatedValue($label, $value));
            }
        }
        return $exif;
    }
    
    public static function populate(Picture $picture)
    {
        if (!$uploadedFile = $picture->getFile()->getImageFile()) {
            return;
        }
        if (!$exif = $picture->getExif()) {
            $exif = new Exif();
        }
        
        $picture->setExif(self::getExifFromFile($uploadedFile, $exif));
    }

    private static function getFormatedValue($label, $value)
    {
        if ('gps' === strtolower($label) && !is_array($value)) {
            $value = explode(',', $value);
        }
        return $value;
    }
}