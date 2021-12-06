<?php


namespace App\Service\Catalog;


use App\Entity\Catalog\Picture;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class PictureExifPopulator
{
    /**
     * @param $file
     * @return array
     */
    public static function getExifFromFile($file)
    {
        if (!$file instanceof UploadedFile) {
            $file = new UploadedFile($file, $file, null, null, true);
        }
        
        // reader with Native adapter
        $reader = \PHPExif\Reader\Reader::factory(\PHPExif\Reader\Reader::TYPE_NATIVE);
        
        $read = $reader->read($file->getRealPath());
        
        return $read->getData();
    }
    
    public static function populate(Picture $picture)
    {
        if (!$uploadedFile = $picture->getFile()->getImageFile()) {
            return;
        }
        $picture->setExif(self::getExifFromFile($uploadedFile));
    }
}