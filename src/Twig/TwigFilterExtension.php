<?php

namespace App\Twig;

use App\Entity\Catalog\Catalog;
use App\Service\Catalog\CatalogHelper;
use Symfony\Component\Intl\Locales;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\Markup;
use Twig\TwigFilter;

class TwigFilterExtension extends AbstractExtension
{
    private TranslatorInterface $translator;
    
    public function __construct(
        TranslatorInterface $translator
    )
    {
        $this->translator = $translator;
    }

    public function getFilters(): array
    {
        return [
            new TwigFilter('catalogTotalPictures', [$this, 'catalogTotalPictures']),
            new TwigFilter('humanFilesize', [$this, 'humanFilesize']),
            new TwigFilter('truncate', [$this, 'twig_truncate_filter'], ['needs_environment' => true]),
            new TwigFilter('yesNoHtml', [$this, 'yesNoHtml']),
            new TwigFilter('getLocalName', [Locales::class, 'getName']),
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
        $yes = $this->translator->trans('yes', [], 'admin');
        $no = $this->translator->trans('no', [], 'admin');
        if ($value) {
            return new Markup(sprintf('<span class="badge badge-pill bg-success">%s</span>', $yes), "utf-8");
        }
        return new Markup(sprintf('<span class="badge badge-pill bg-danger">%s</span>', $no), "utf-8");
    }
}
