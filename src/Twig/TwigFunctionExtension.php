<?php

namespace App\Twig;

use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Extension\AbstractExtension;
use Twig\Markup;
use Twig\TwigFunction;

class TwigFunctionExtension extends AbstractExtension
{
    private TranslatorInterface $translator;
    
    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }
    
    public function getFunctions(): array
    {
        return [
            new TwigFunction('isVisiblePastille', [$this, 'isVisiblePastille']),
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
}
