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

class TwigFilterExtension extends AbstractExtension
{
    private CatalogProvider $catalogProvider;
    private PictureProvider $pictureProvider;
    
    public function __construct(
        CatalogProvider $catalogProvider,
        PictureProvider $pictureProvider
    )
    {
        $this->catalogProvider = $catalogProvider;
        $this->pictureProvider = $pictureProvider;
    }

    public function getFilters(): array
    {
        return [
            new TwigFilter('catalogTotalPictures', [$this, 'catalogTotalPictures']),
            new TwigFilter('humanFilesize', [$this, 'humanFilesize']),
            new TwigFilter('getBreadcrumb', [$this, 'getBreadcrumb']),
            new TwigFilter('truncate', [$this, 'twig_truncate_filter'], ['needs_environment' => true]),
            new TwigFilter('yesNoHtml', [$this, 'yesNoHtml']),
        ];
    }

    public function catalogTotalPictures(Catalog $catalog)
    {
        return CatalogHelper::getAllPictures($catalog);
    }


    public function humanFilesize(int $bytes, int $dec = 2)
    {
        $size = array('B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
        $factor = floor((strlen((string)$bytes) - 1) / 3);

        return sprintf("%.{$dec}f", $bytes / pow(1024, $factor)) . @$size[$factor];
    }

    /**
     * @param object $object
     * @return Breadcrumb|null
     * @throws \Exception
     */
    public function getBreadcrumb(object $object)
    {
        if (!in_array(ClassUtils::getClass($object), [Catalog::class, Picture::class])) {
            throw new \Exception(sprintf('La class "%s" n\'est pas valide', ClassUtils::getClass($object)));
        }
    
        if (Catalog::class === ClassUtils::getClass($object)) {
            return $this->catalogProvider->getBreadCrumb($object);
        }
        if (Picture::class === ClassUtils::getClass($object)) {
            return $this->pictureProvider->getBreadCrumb($object);
        }
        return null;
    }


    public function twig_truncate_filter(Environment $env, $value, $length = 30, $preserve = false, $separator = '...')
    {
        if (mb_strlen($value, $env->getCharset()) > $length) {
            if ($preserve) {
                // If breakpoint is on the last word, return the value without separator.
                if (false === ($breakpoint = mb_strpos($value, ' ', $length, $env->getCharset()))) {
                    return $value;
                }

                $length = $breakpoint;
            }

            return rtrim(mb_substr($value, 0, $length, $env->getCharset())) . $separator;
        }

        return $value;
    }

    public function yesNoHtml(bool $value)
    {
        if ($value) {
            return new Markup('<span class="badge badge-pill bg-success">Yes</span>', "utf-8");
        }
        return new Markup('<span class="badge badge-pill bg-danger">No</span>', "utf-8");
    }
}
