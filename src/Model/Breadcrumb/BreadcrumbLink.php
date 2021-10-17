<?php

namespace App\Model\Breadcrumb;

class BreadcrumbLink
{
    /**
     * @var string
     */
    private $title;
    /**
     * @var string
     */
    private $link;
    /**
     * @var bool
     */
    private $isActual;

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return BreadcrumbLink
     */
    public function setTitle(string $title): BreadcrumbLink
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string
     */
    public function getLink(): string
    {
        return $this->link;
    }

    /**
     * @param string $link
     * @return BreadcrumbLink
     */
    public function setLink(string $link): BreadcrumbLink
    {
        $this->link = $link;
        return $this;
    }

    /**
     * @return bool
     */
    public function isActual(): bool
    {
        return $this->isActual;
    }

    /**
     * @param bool $isActual
     * @return BreadcrumbLink
     */
    public function setIsActual(bool $isActual): BreadcrumbLink
    {
        $this->isActual = $isActual;
        return $this;
    }
}