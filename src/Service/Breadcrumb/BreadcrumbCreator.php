<?php

namespace App\Service\Breadcrumb;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Model\Breadcrumb\Breadcrumb;
use App\Model\Breadcrumb\BreadcrumbLink;
use Symfony\Component\Routing\RouterInterface;

class BreadcrumbCreator
{
    private RouterInterface $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    /**
     * @param Catalog $catalog
     * @return Breadcrumb
     */
    public function getCatalogBreadcrumb(Catalog $catalog): Breadcrumb
    {
        $breadcrumb = (new Breadcrumb());
        if (Catalog::ROOT === $catalog->getName()) {
            $this->addHome($breadcrumb);
            return $breadcrumb;
        }
        $breadcrumb->addLink(new BreadcrumbLink($catalog->getName()));

        if ($parent = $catalog->getParent()) {
            $this->addCatalogBreadcrumbLink($breadcrumb, $parent);
        }

        $this->addHome($breadcrumb);

        return $breadcrumb;
    }
    
    /**
     * @param Catalog $catalog
     * @param Picture $picture
     * @return Breadcrumb
     */
    public function getPictureBreadcrumb(Catalog $catalog, Picture $picture): Breadcrumb
    {
        $breadcrumb = (new Breadcrumb())->addLink(new BreadcrumbLink($picture->getName()));
    
        $this->addCatalogBreadcrumbLink($breadcrumb, $catalog);
        $this->addHome($breadcrumb);
    
        dump($breadcrumb);
        return $breadcrumb;
    }
    
    /**
     * @param Breadcrumb $breadcrumb
     * @param Catalog $catalog
     */
    private function addCatalogBreadcrumbLink(Breadcrumb $breadcrumb, Catalog $catalog)
    {
        if (Catalog::ROOT === $catalog->getName()) {
            return;
        }
    
        dump($catalog);
        $breadcrumb->addLink(new BreadcrumbLink($catalog->getName(), $this->router->generate('CATALOG', ['id' => $catalog->getId()])));
        if ($parent = $catalog->getParent()) {
            $this->addCatalogBreadcrumbLink($breadcrumb, $parent);
        }
    }
    
    /**
     * @param Breadcrumb $breadcrumb
     */
    private function addHome(Breadcrumb $breadcrumb)
    {
        $breadcrumb->addLink(new BreadcrumbLink('Home', $this->router->generate('HOMEPAGE')));
    }


}
