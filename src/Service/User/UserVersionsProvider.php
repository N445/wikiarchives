<?php

namespace App\Service\User;

use App\Entity\User;
use App\Repository\Catalog\Picture\VersionRepository;

class UserVersionsProvider
{
    private VersionRepository $versionRepository;
    
    public function __construct(VersionRepository $versionRepository)
    {
        $this->versionRepository = $versionRepository;
    }
    
    public function getUserVersions(User $user)
    {
        $userVersions = $this->versionRepository->getTmpByUser($user);
        
        $pictures = [];
        
        dump($userVersions);
        foreach ($userVersions as $userVersion) {
            if (array_key_exists($userVersion->getTmpPicture()->getId(), $pictures)) {
                $pictures[$userVersion->getTmpPicture()->getId()]['versions'][] = $userVersion;
                continue;
            }
            $pictures[$userVersion->getTmpPicture()->getId()] = [
                'picture' => $userVersion->getTmpPicture(),
                'versions' => [
                    $userVersion
                ],
            ];
        }
        
        return $pictures;
    }
}