<?php
    
    namespace App\Service\Catalog\Version;
    
    use App\Entity\Catalog\Picture\Exif;
    use App\Entity\Catalog\Picture\Version;
    use Symfony\Component\PropertyAccess\PropertyAccess;

    class PictureVersionHelper
    {
        const TYPE_FINAL = 'final';
        const TYPE_TMP = 'tmp';
    
        const STATUS_PENDING = 'pending';
        const STATUS_ACCEPTED = 'accepted';
        const STATUS_REJECTED = 'rejected';
    
        public static function getFinalVersion(Version $currentVersion, Version $proposedVersion)
        {
            $baseVersion = $proposedVersion->getBasedVersion();
            $propertyAccessor = PropertyAccess::createPropertyAccessor();
            $finalVersion = (new Version())
                ->setType(PictureVersionHelper::TYPE_FINAL)
                ->setVersionNumber($proposedVersion->getVersionNumber())
                ->setBasedVersion($currentVersion);
        
            $propertiesVersion = self::getVersionGetters();
            $propertiesExif = self::getExifGetters();
        
            foreach ($propertiesVersion as $property) {
                $baseValue = $propertyAccessor->getValue($baseVersion, $property);
                $currentValue = $propertyAccessor->getValue($currentVersion, $property);
                $proposedValue = $propertyAccessor->getValue($proposedVersion, $property);
                if (!$currentValue instanceof Exif) {
                    $propertyAccessor->setValue($finalVersion, $property, self::getValue2(
                        $baseValue,
                        $currentValue,
                        $proposedValue,
                        $currentVersion,
                        $proposedVersion
                    ));
                    continue;
                }
                
                $finalExif = $finalVersion->getExif();
                foreach ($propertiesExif as $propertyExif) {
                    $baseValueExif = $propertyAccessor->getValue($baseValue, $propertyExif);
                    $currentValueExif = $propertyAccessor->getValue($currentValue, $propertyExif);
                    $proposedValueExif = $propertyAccessor->getValue($proposedValue, $propertyExif);
    
                    $propertyAccessor->setValue($finalExif, $propertyExif, self::getValue2(
                        $baseValueExif,
                        $currentValueExif,
                        $proposedValueExif,
                        $currentVersion,
                        $proposedVersion
                    ));
                }
                $finalVersion->setExif($finalExif);
            }
            
            return $finalVersion;
        }
        
        private static function getVersionGetters()
        {
            $blacklistMethodVersion = [
                "getId",
                "getVersionNumber",
                "getStatus",
                "getType",
                "getBasedVersion",
                "getVersions",
                "getPicture",
                "getTmpPicture",
                "getCreatedAt",
                "getUpdatedAt",
                "getCreatedBy",
                "getUpdatedBy",
            ];
            $getters = array_filter(get_class_methods(new Version()), function ($method) use ($blacklistMethodVersion) {
                if (in_array($method, $blacklistMethodVersion)) {
                    return false;
                }
                return str_starts_with($method, 'get');
            });
    
            return array_map(function ($getter) {
                return substr($getter, 3);
            }, $getters);
        }
        
        private static function getExifGetters()
        {
            $blacklistMethodExif = [
                "getId",
                "getExposureMilliseconds",
            ];
            
            $getters = array_filter(get_class_methods(new Exif()), function ($method) use ($blacklistMethodExif) {
                if (in_array($method, $blacklistMethodExif)) {
                    return false;
                }
                return str_starts_with($method, 'get');
            });
    
            return array_map(function ($getter) {
                return substr($getter, 3);
            }, $getters);
        }
    
        private static function getValue2(mixed $baseValue, mixed $currentValue, mixed $proposedValue, Version $currentVersion, Version $proposedVersion)
        {
            if (!$proposedValue) {
                return $currentValue;
            }
        
            if ($baseValue !== $proposedValue) {
                return $proposedValue;
            }
        
            if ($currentVersion->getCreatedAt() > $proposedVersion->getCreatedAt()) {
                return $currentValue;
            }
            return $proposedValue;
        }
    }