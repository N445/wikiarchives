<?php

namespace App\Message;

final class ImageDownload
{
    /*
     * Add whatever properties & methods you need to hold the
     * data for this message class.
     */
    
    
    private int $piwigoId;
    private string $imageUrl;
    
    public function __construct(int $piwigoId, string $imageUrl)
    {
        $this->piwigoId = $piwigoId;
        $this->imageUrl = $imageUrl;
    }
    
    /**
     * @return int
     */
    public function getPiwigoId(): int
    {
        return $this->piwigoId;
    }
    
    /**
     * @return string
     */
    public function getImageUrl(): string
    {
        return $this->imageUrl;
    }
}
