<?php

namespace App\Twig;

use App\Entity\Catalog\Picture\Version;
use App\Service\Breadcrumb\BreadcrumbCreator;
use App\Service\Catalog\Version\PictureVersionHelper;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class PictureFilterExtension extends AbstractExtension
{
    private BreadcrumbCreator $breadcrumbCreator;
    
    public function __construct(BreadcrumbCreator $breadcrumbCreator)
    {
        $this->breadcrumbCreator = $breadcrumbCreator;
    }
    
    public function getFilters(): array
    {
        return [
            new TwigFilter('versionStatusLabel', [$this, 'versionStatusLabel']),
        ];
    }
    
    public function versionStatusLabel(Version $version)
    {
        $statusLabel = [
            PictureVersionHelper::STATUS_PENDING => 'Stand by',
            PictureVersionHelper::STATUS_ACCEPTED => 'Accepted',
            PictureVersionHelper::STATUS_REJECTED => 'Rejected',
        ];
        
        return $statusLabel[$version->getStatus()] ?? $version->getStatus();
    }
}
