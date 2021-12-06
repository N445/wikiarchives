<?php
    
    namespace App\Service\Catalog\Version;
    
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
        
            foreach ($propertiesVersion as $property) {
                $baseValue = $propertyAccessor->getValue($baseVersion, $property);
                $currentValue = $propertyAccessor->getValue($currentVersion, $property);
                $proposedValue = $propertyAccessor->getValue($proposedVersion, $property);
                
                    $propertyAccessor->setValue($finalVersion, $property, self::getValue2(
                        $baseValue,
                        $currentValue,
                        $proposedValue,
                        $currentVersion,
                        $proposedVersion
                    ));
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