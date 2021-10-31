<?php

namespace App\Twig;

use App\Entity\User;
use App\Service\User\UserVersionsProvider;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class UserFilterExtension extends AbstractExtension
{
    private UserVersionsProvider $userVersionsProvider;
    
    public function __construct(UserVersionsProvider $userVersionsProvider)
    {
        $this->userVersionsProvider = $userVersionsProvider;
    }
    
    public function getFilters(): array
    {
        return [
            new TwigFilter('userRatio', [$this, 'userRatio']),
        ];
    }
    
    public function userRatio(User $user)
    {
        return $this->userVersionsProvider->getUserRatio($user);
    }
}
