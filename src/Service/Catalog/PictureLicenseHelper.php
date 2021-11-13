<?php

namespace App\Service\Catalog;

class PictureLicenseHelper
{
    // https://fr.wikipedia.org/wiki/Licence_Creative_Commons
    // https://creativecommons.org/about/cclicenses/
    
    
    public const CC0 = 'cc0';
    public const CC_BY = 'cc-by';
    public const CC_BY_SA = 'cc-by-sa';
    public const CC_BY_ND = 'cc-by-nd';
    public const CC_BY_NC = 'cc-by-nc';
    public const CC_BY_NC_SA = 'cc-by-nc-sa';
    public const CC_BY_NC_ND = 'cc-by-nc-nd';
    
    public const NAME = 'name';
    public const DESCRIPTION = 'description';
    public const IMAGE = 'image';
    public const URL = 'url';
    
    public static function getLicensesChoices()
    {
        return [
            'CC0' => self::CC0,
            'CC-by' => self::CC_BY,
            'CC-by-sa' => self::CC_BY_SA,
            'CC-by-nd' => self::CC_BY_ND,
            'CC-by-nc' => self::CC_BY_NC,
            'CC-by-nc-sa' => self::CC_BY_NC_SA,
            'CC-by-nc-nd' => self::CC_BY_NC_ND,
        ];
    }
    
    public static function getLicense(string $key)
    {
        return self::getLicenses()[$key] ?? null;
    }
    
    public static function getLicenses()
    {
        return [
            self::CC0 => [
                self::NAME => 'CC0',
                self::DESCRIPTION => 'No Rights Reserved',
                self::IMAGE => 'cc0.svg',
                self::URL => 'https://creativecommons.org/publicdomain/zero/1.0/',
            ],
            self::CC_BY => [
                self::NAME => 'CC-by',
                self::DESCRIPTION => 'Attribution',
                self::IMAGE => 'cc-by.svg',
                self::URL => 'https://creativecommons.org/licenses/by/4.0/',
            ],
            self::CC_BY_SA => [
                self::NAME => 'CC-by-sa',
                self::DESCRIPTION => 'Attribution / Partage dans les mêmes conditions',
                self::IMAGE => 'cc-by-sa.svg',
                self::URL => 'https://creativecommons.org/licenses/by-sa/4.0/',
            ],
            self::CC_BY_ND => [
                self::NAME => 'CC-by-nd',
                self::DESCRIPTION => 'Attribution / Pas de Modification',
                self::IMAGE => 'cc-by-nd.svg',
                self::URL => 'https://creativecommons.org/licenses/by-nd/4.0/',
            ],
            self::CC_BY_NC => [
                self::NAME => 'CC-by-nc',
                self::DESCRIPTION => 'Attribution / Pas d’Utilisation Commerciale',
                self::IMAGE => 'cc-by-nc.svg',
                self::URL => 'https://creativecommons.org/licenses/by-nc/4.0/',
            ],
            self::CC_BY_NC_SA => [
                self::NAME => 'CC-by-nc-sa',
                self::DESCRIPTION => 'Attribution / Pas d’Utilisation Commerciale / Partage dans les mêmes conditions',
                self::IMAGE => 'cc-by-nc-sa.svg',
                self::URL => 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
            ],
            self::CC_BY_NC_ND => [
                self::NAME => 'CC-by-nc-nd',
                self::DESCRIPTION => 'Attribution / Pas d’Utilisation Commerciale / Pas de Modification',
                self::IMAGE => 'cc-by-nc-nd.svg',
                self::URL => 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
            ],
        ];
    }
}