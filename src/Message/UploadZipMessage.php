<?php

namespace App\Message;

final class UploadZipMessage
{
    private int $catalogId;
    private string $zipPath;
    
    public function __construct(int $catalogId, string $zipPath)
    {
        $this->catalogId = $catalogId;
        $this->zipPath = $zipPath;
    }
    
    /**
     * @return int
     */
    public function getCatalogId(): int
    {
        return $this->catalogId;
    }
    
    /**
     * @return string
     */
    public function getZipPath(): string
    {
        return $this->zipPath;
    }
}
