<?php

namespace App\Repository;

use App\Entity\User;
use App\Service\User\UserRoles;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Role\RoleHierarchyInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    private RoleHierarchyInterface $roleHierarchy;
    
    public function __construct(ManagerRegistry $registry, RoleHierarchyInterface $roleHierarchy)
    {
        parent::__construct($registry, User::class);
        $this->roleHierarchy = $roleHierarchy;
    }
    
    /**
     * @param int $id
     * @return User|null
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function byId(int $id)
    {
        return $this->createQueryBuilder('u')
                    ->addSelect('info', 'createdCatalogs', 'updatedCatalogs')
                    ->leftJoin('u.info', 'info')
                    ->leftJoin('u.createdCatalogs', 'createdCatalogs')
                    ->leftJoin('u.updatedCatalogs', 'updatedCatalogs')
                    ->where('u.id = :id')
                    ->setParameter('id', $id)
                    ->getQuery()
                    ->getOneOrNullResult()
        ;
    }
    
    /**
     * @param string $email
     * @return User|null
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function getByEmail(string $email)
    {
        return $this->createQueryBuilder('u')
                    ->addSelect('info', 'createdCatalogs', 'updatedCatalogs')
                    ->leftJoin('u.info', 'info')
                    ->leftJoin('u.createdCatalogs', 'createdCatalogs')
                    ->leftJoin('u.updatedCatalogs', 'updatedCatalogs')
                    ->where('u.email = :email')
                    ->setParameter('email', $email)
                    ->getQuery()
                    ->getOneOrNullResult()
        ;
    }
    
    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }
    
        $user->setPassword($newHashedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }
    
    public function getUsers()
    {
        $users = $this->createQueryBuilder('u')
                      ->getQuery()
                      ->getResult();
        
        return array_filter($users, function ($user) {
            return !in_array(UserRoles::ROLE_ADMIN, $this->roleHierarchy->getReachableRoleNames($user->getRoles()));
        });
    }
    
    public function getAdmins()
    {
        $users = $this->createQueryBuilder('u')
                      ->getQuery()
                      ->getResult();
        
        return array_filter($users, function ($user) {
            return in_array(UserRoles::ROLE_ADMIN, $this->roleHierarchy->getReachableRoleNames($user->getRoles()));
        });
    }
}
