<?php

namespace App\Repository\Catalog\Picture;

use App\Entity\Catalog\Picture\PictureChange;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PictureChange|null find($id, $lockMode = null, $lockVersion = null)
 * @method PictureChange|null findOneBy(array $criteria, array $orderBy = null)
 * @method PictureChange[]    findAll()
 * @method PictureChange[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PictureChangeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PictureChange::class);
    }

    // /**
    //  * @return PictureChange[] Returns an array of PictureChange objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PictureChange
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
