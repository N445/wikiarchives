<?php

namespace App\Twig;

use App\Entity\Catalog\Catalog;
use App\Provider\CatalogProvider;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class CatalogFilterExtension extends AbstractExtension
{
    private CatalogProvider $catalogProvider;
    
    public function __construct(CatalogProvider $catalogProvider)
    {
        $this->catalogProvider = $catalogProvider;
    }
    
    public function getFilters(): array
    {
        return [
            new TwigFilter('countChildren', [$this, 'countChildren']),
            new TwigFilter('countPictures', [$this, 'countPictures']),
        ];
    }
    
    public function countChildren(Catalog $catalog)
    {
        return $this->catalogProvider->countAll($catalog)->getNbChildren();
    }
    
    public function countPictures(Catalog $catalog)
    {
        return $this->catalogProvider->countAll($catalog)->getNbPictures();
    }
}
