<?php

namespace App\Twig;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Model\Breadcrumb\Breadcrumb;
use App\Provider\CatalogProvider;
use App\Provider\PictureProvider;
use App\Service\Breadcrumb\BreadcrumbCreator;
use App\Service\Catalog\CatalogHelper;
use Doctrine\Common\Util\ClassUtils;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\Markup;
use Twig\TwigFilter;
use Twig\TwigFunction;

class TwigFunctionExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('isVisiblePastille', [$this, 'isVisiblePastille']),
        ];
    }

    public function isVisiblePastille(bool $isVisible)
    {
        $html = '<div class="element-visible" data-bs-toggle="tooltip" data-bs-placement="top" title="Visible"></div>';
        if(!$isVisible){
            $html = '<div class="element-not-visible" data-bs-toggle="tooltip" data-bs-placement="top" title="Non Visible"></div>';
        }
        return new Markup($html, "utf-8");
    }
}
