<?php

namespace App\Repository\Catalog\Picture;

use App\Entity\Catalog\Picture\Exif;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Exif|null find($id, $lockMode = null, $lockVersion = null)
 * @method Exif|null findOneBy(array $criteria, array $orderBy = null)
 * @method Exif[]    findAll()
 * @method Exif[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExifRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Exif::class);
    }

    // /**
    //  * @return Exif[] Returns an array of Exif objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Exif
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
