<?php

namespace App\Model\Breadcrumb;

class BreadcrumbLink
{
    /**
     * @var string
     */
    private $title;
    
    /**
     * @var string|null
     */
    private $link;
    
    public function __construct(string $title, ?string $link = null)
    {
        $this->title = $title;
        $this->link = $link;
    }
    
    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @return string|null
     */
    public function getLink(): ?string
    {
        return $this->link;
    }
}