<?php

namespace App\Twig;

use App\Service\Breadcrumb\BreadcrumbCreator;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class TwigFilterExtension extends AbstractExtension
{
    private BreadcrumbCreator $breadcrumbCreator;

    public function __construct(BreadcrumbCreator $breadcrumbCreator)
    {
        $this->breadcrumbCreator = $breadcrumbCreator;
    }

    public function getFilters(): array
    {
        return [
            new TwigFilter('humanFilesize', [$this, 'humanFilesize']),
            new TwigFilter('getBreadcrumb', [$this, 'getBreadcrumb']),
        ];
    }

    public function humanFilesize(int $bytes, int $dec = 2)
    {
        $size = array('B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
        $factor = floor((strlen($bytes) - 1) / 3);

        return sprintf("%.{$dec}f", $bytes / pow(1024, $factor)) . @$size[$factor];
    }

    /**
     * @param $object
     * @return \App\Model\Breadcrumb\Breadcrumb|void
     * @throws \Exception
     */
    public function getBreadcrumb($object)
    {
        return $this->breadcrumbCreator->getBreadcrumb($object);
    }
}
