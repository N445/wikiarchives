<?php

namespace App\Service\Catalog\Row;

use Doctrine\Common\Util\ClassUtils;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class RowHelper
{
    const STRING = 'string';
    const DATE_TIME = 'DateTime';

    /**
     * @param $value
     * @return string
     */
    public static function getType($value)
    {
        if ('object' === gettype($value)) {
            return ClassUtils::getClass($value);
        }
        return self::STRING;
    }

    public static function getFormType(string $type)
    {
        if (\DateTime::class === $type) {
            return DateType::class;
        }
        return TextType::class;
//        switch ($type) {
//            case 'integer':
//                return NumberType::class;
//            case 'string':
//                return TextType::class;
//            case 'double':
//                return ;
//        }
    }
}