<?php

namespace App\Twig;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Model\Breadcrumb\Breadcrumb;
use App\Provider\CatalogProvider;
use App\Provider\PictureProvider;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Extension\AbstractExtension;
use Twig\Markup;
use Twig\TwigFunction;

class TwigFunctionExtension extends AbstractExtension
{
    private TranslatorInterface $translator;
    private CatalogProvider $catalogProvider;
    private PictureProvider $pictureProvider;
    
    public function __construct(
        TranslatorInterface $translator,
        CatalogProvider     $catalogProvider,
        PictureProvider     $pictureProvider,
    )
    {
        $this->translator = $translator;
        $this->catalogProvider = $catalogProvider;
        $this->pictureProvider = $pictureProvider;
    }
    
    public function getFunctions(): array
    {
        return [
            new TwigFunction('isVisiblePastille', [$this, 'isVisiblePastille']),
            new TwigFunction('getBreadcrumbCatalog', [$this, 'getBreadcrumbCatalog']),
            new TwigFunction('getBreadcrumbPicture', [$this, 'getBreadcrumbPicture']),
        ];
    }
    
    public function isVisiblePastille(bool $isVisible)
    {
        $visible = $this->translator->trans('visible', [], 'admin');
        $not_visible = $this->translator->trans('not_visible', [], 'admin');
        $html = sprintf('<div class="element-visible" data-bs-toggle="tooltip" data-bs-placement="top" title="%s"></div>', $visible);
        if (!$isVisible) {
            $html = sprintf('<div class="element-not-visible" data-bs-toggle="tooltip" data-bs-placement="top" title="%s"></div>', $not_visible);
        }
        return new Markup($html, "utf-8");
    }
    
    /**
     * @param Catalog $catalog
     * @return Breadcrumb|null
     */
    public function getBreadcrumbCatalog(Catalog $catalog)
    {
        return $this->catalogProvider->getBreadCrumb($catalog);
    }
    
    /**
     * @param Catalog $catalog
     * @param Picture $picture
     * @return Breadcrumb|null
     */
    public function getBreadcrumbPicture(Catalog $catalog, Picture $picture)
    {
        return $this->pictureProvider->getBreadCrumb($catalog, $picture);
    }
}
