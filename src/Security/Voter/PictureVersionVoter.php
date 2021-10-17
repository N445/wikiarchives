<?php
    
    namespace App\Security\Voter;
    
    use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
    use Symfony\Component\Security\Core\Authorization\Voter\Voter;
    use Symfony\Component\Security\Core\User\UserInterface;
    
    class PictureVersionVoter extends Voter
    {
        public const PICTURE_VERSION_CREATE = 'PICTURE_VERSION_CREATE';
        public const PICTURE_VERSION_VALIDATOR = 'PICTURE_VERSION_VALIDATOR';
        
        protected function supports(string $attribute, $subject): bool
        {
            // replace with your own logic
            // https://symfony.com/doc/current/security/voters.html
            return in_array($attribute, [self::PICTURE_VERSION_CREATE, self::PICTURE_VERSION_VALIDATOR])
                && $subject instanceof UserInterface;
        }
        
        protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
        {
    
            /** @var User $user */
            $user = $token->getUser();
            // if the user is anonymous, do not grant access
    
    
            
            if (!$user instanceof UserInterface) {
                return false;
            }
    
            // ... (check conditions and return true to grant permission) ...
            switch ($attribute) {
                case self::PICTURE_VERSION_CREATE:
                    return $user->getRights()->getHasVersionCreator();
                case self::PICTURE_VERSION_VALIDATOR:
                    return $user->getRights()->getHasVersionValidator();
            }
        }
    }
