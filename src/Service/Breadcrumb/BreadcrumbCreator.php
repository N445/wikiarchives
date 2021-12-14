<?php

namespace App\Service\Breadcrumb;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Model\Breadcrumb\Breadcrumb;
use App\Model\Breadcrumb\BreadcrumbLink;
use App\Repository\Catalog\CatalogTreeRepository;
use Symfony\Component\Routing\RouterInterface;

class BreadcrumbCreator
{
    private RouterInterface $router;
    private CatalogTreeRepository $catalogTreeRepository;
    
    public function __construct(
        RouterInterface       $router,
        CatalogTreeRepository $catalogTreeRepository
    )
    {
        $this->router = $router;
        $this->catalogTreeRepository = $catalogTreeRepository;
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
    
        $path = array_reverse($this->catalogTreeRepository->getPath($catalog));
        foreach ($path as $item) {
            if (Catalog::ROOT === $item->getName()) {
                continue;
            }
            $breadcrumb->addLink(new BreadcrumbLink($item->getName(), $this->router->generate('CATALOG', ['id' => $item->getId()])));
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
    
        $path = array_reverse($this->catalogTreeRepository->getPath($catalog));
        foreach ($path as $item) {
            if (Catalog::ROOT === $item->getName()) {
                continue;
            }
            $breadcrumb->addLink(new BreadcrumbLink($item->getName(), $this->router->generate('CATALOG', ['id' => $item->getId()])));
        }
        
        $this->addHome($breadcrumb);
    
        return $breadcrumb;
    }
    
    /**
     * @param Breadcrumb $breadcrumb
     */
    private function addHome(Breadcrumb $breadcrumb)
    {
        $breadcrumb->addLink(new BreadcrumbLink('Home', $this->router->generate('HOMEPAGE')));
    }


}
