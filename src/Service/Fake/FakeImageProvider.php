<?php

namespace App\Service\Fake;

use App\Service\Catalog\PictureExifPopulator;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class FakeImageProvider
{
    /**
     * @var array
     */
    private array $fakeImages = [];
    
    /**
     * @return array
     */
    public function getFakeImages(): array
    {
        return $this->fakeImages;
    }
    
    public function setFakeImages(): self
    {
        $finder = new Finder();
// find all files in the current directory
        $finder->files()
               ->in(__DIR__ . '/../../../public/uploads/picture/')
               ->name('aaa-test-image-*')
        ;
        
        
        /** @var SplFileInfo $image */
        foreach ($finder as $image) {
            $this->fakeImages[] = [
                'name' => $image->getRelativePathname(),
                'exif' => PictureExifPopulator::getExifFromFile($image->getPathname())
            ];
        }
        
        return $this;
    }
}