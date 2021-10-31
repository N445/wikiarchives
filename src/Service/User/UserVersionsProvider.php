<?php

namespace App\Service\User;

use App\Entity\Catalog\Picture\Version;
use App\Entity\User;
use App\Model\User\UserStats;
use App\Repository\Catalog\Picture\VersionRepository;
use App\Service\Catalog\Version\PictureVersionHelper;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Contracts\Cache\ItemInterface;

class UserVersionsProvider
{
    private VersionRepository $versionRepository;
    
    public function __construct(VersionRepository $versionRepository)
    {
        $this->versionRepository = $versionRepository;
    }
    
    public function getUserVersions(User $user)
    {
        $cache = new FilesystemAdapter();
        
        return $cache->get(sprintf('3user_version_%d', $user->getId()), function (ItemInterface $item) use ($user) {
            $item->expiresAfter(3600);
//        $userVersions = $this->versionRepository->getTmpByUser($user);
            $userVersions = $user->getCreatedVersions()->toArray();
       
            $stats = new UserStats();
            $pictures = [];
            
            $versions = array_filter($userVersions, function (Version $version) {
                return PictureVersionHelper::TYPE_FINAL === $version->getType();
            });
            
            foreach ($versions as $userVersion) {
                PictureVersionHelper::STATUS_ACCEPTED === $userVersion->getStatus()
                    ? $stats->addAccepted()
                    : $stats->addRefused();
                
                $stats->addTotal();
                
                $picture = $userVersion->getPicture() ?: $userVersion->getTmpPicture();
                if (!$picture) {
                    continue;
                }
                if (array_key_exists($picture->getId(), $pictures)) {
                    $pictures[$picture->getId()]['versions'][] = $userVersion;
                    continue;
                }
                $pictures[$picture->getId()] = [
                    'picture' => $picture,
                    'versions' => [
                        $userVersion
                    ],
                ];
            }
            
            dump($stats);
            
            return $pictures;
        });
        
    }
    
    public function getUserRatio(User $user)
    {
        $versions = array_filter($user->getCreatedVersions()->toArray(), function (Version $version) {
            return PictureVersionHelper::TYPE_FINAL === $version->getType();
        });
        
        $stats = new UserStats();
        
        foreach ($versions as $userVersion) {
            
            PictureVersionHelper::STATUS_ACCEPTED === $userVersion->getStatus()
                ? $stats->addAccepted()
                : $stats->addRefused();
            
            $stats->addTotal();
        }

        return $stats;
    }
}