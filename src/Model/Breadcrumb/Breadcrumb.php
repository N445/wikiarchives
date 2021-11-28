<?php

namespace App\Model\Breadcrumb;

class Breadcrumb
{
    /**
     * @var BreadcrumbLink[]
     */
    private $links = [];
    
    public function __construct(?array $links = [])
    {
        $this->links = array_filter($links);
    }
    
    /**
     * @return BreadcrumbLink[]
     */
    public function getLinks(): array
    {
        return $this->links;
    }
    
    /**
     * @return BreadcrumbLink[]
     */
    public function getLinksReversed(): array
    {
        return array_reverse($this->links);
    }

    /**
     * @param BreadcrumbLink[] $links
     * @return Breadcrumb
     */
    public function setLinks(array $links): Breadcrumb
    {
        $this->links = $links;
        return $this;
    }

    /**
     * @param BreadcrumbLink $link
     * @return Breadcrumb
     */
    public function addLink(BreadcrumbLink $link): Breadcrumb
    {
        $this->links[] = $link;
        return $this;
    }

}