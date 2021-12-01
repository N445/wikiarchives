<?php

namespace App\Service\Language;

use Symfony\Component\Intl\Locales;

class LanguageHelper
{
    public const EN = 'en';
    public const FR = 'fr';
    
    public const AVAIABLE_LANGUAGES = [
        self::EN,
        self::FR,
    ];
    
    public static function getLanguageLabel(string $code)
    {
        return Locales::getName($code);
    }
}