<?php
    
    namespace App\Repository\Catalog;
    
    use App\Entity\Catalog\Picture;
    use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
    use Doctrine\ORM\NonUniqueResultException;
    use Doctrine\ORM\Query\Expr\Join;
    use Doctrine\ORM\QueryBuilder;
    use Doctrine\Persistence\ManagerRegistry;
    
    /**
     * @method Picture|null find($id, $lockMode = null, $lockVersion = null)
     * @method Picture|null findOneBy(array $criteria, array $orderBy = null)
     * @method Picture[]    findAll()
     * @method Picture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class PictureRepository extends ServiceEntityRepository
    {
        public function __construct(ManagerRegistry $registry)
        {
            parent::__construct($registry, Picture::class);
        }
        
        /**
         * @param string|null $query
         * @return Picture[]
         */
        public function search(?string $query)
        {
            $qb = $this->getBaseFrontQuery();
            
            
            if ($query) {
                $qb->andWhere('c.name LIKE :query')
                   ->setParameter('query', '%' . $query . '%')
                ;
            }
            
            return $qb->getQuery()
                      ->getResult()
            ;
        }
        
        /**
         * @param int $id
         * @return Picture|null
         * @throws NonUniqueResultException
         */
        public function byIdFront(int $id): ?Picture
        {
            return $this->getBaseFrontQuery()
                        ->andWhere('p.id = :id')
                        ->setParameter('id', $id)
                        ->getQuery()
                        ->getOneOrNullResult()
            ;
        }
        
        public function byIdAdmin(int $id): ?Picture
        {
            return $this->getBaseAdminQuery()
                        ->orderBy('pictures_versions.versionNumber', 'DESC')
                        ->andWhere('p.id = :id')
                        ->setParameter('id', $id)
                        ->getQuery()
                        ->getOneOrNullResult()
            ;
        }
        
        /**
         * @return QueryBuilder
         */
        public function getBaseAdminQuery()
        {
            return $this->createQueryBuilder('p')
                        ->addSelect('catalog', 'pictures_file', 'pictures_versions', 'pictures_validatedversion', 'pictures_validatedversion_exif')
                        ->leftJoin('p.catalog', 'catalog')
                        ->leftJoin('p.file', 'pictures_file')
                        ->leftJoin('p.versions', 'pictures_versions')
                        ->leftJoin('p.validatedVersion', 'pictures_validatedversion')
                        ->leftJoin('pictures_validatedversion.exif', 'pictures_validatedversion_exif')
            ;
        }
        
        /**
         * @return QueryBuilder
         */
        public function getBaseFrontQuery()
        {
            return $this->createQueryBuilder('p')
                        ->addSelect('catalog', 'catalog_parent', 'pictures_file', 'pictures_validatedversion', 'pictures_validatedversion_exif')
                        ->leftJoin('p.catalog', 'catalog')
                        ->leftJoin('catalog.parent', 'catalog_parent')
                        ->leftJoin('p.file', 'pictures_file')
                        ->leftJoin('p.validatedVersion', 'pictures_validatedversion')
                        ->leftJoin('pictures_validatedversion.exif', 'pictures_validatedversion_exif')
                        ->andWhere('p.enabled = :enabled')
                        ->setParameter('enabled', true)
            ;
        }
        
        // /**
        //  * @return Picture[] Returns an array of Picture objects
        //  */
        /*
        public function findByExampleField($value)
        {
            return $this->createQueryBuilder('p')
                ->andWhere('p.exampleField = :val')
                ->setParameter('val', $value)
                ->orderBy('p.id', 'ASC')
                ->setMaxResults(10)
                ->getQuery()
                ->getResult()
            ;
        }
        */
        
        /*
        public function findOneBySomeField($value): ?Picture
        {
            return $this->createQueryBuilder('p')
                ->andWhere('p.exampleField = :val')
                ->setParameter('val', $value)
                ->getQuery()
                ->getOneOrNullResult()
            ;
        }
        */
    }
