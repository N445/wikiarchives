<?php
    
    namespace App\Repository\Catalog;
    
    use App\Entity\Catalog\Catalog;
    use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
    use Doctrine\ORM\EntityManagerInterface;
    use Doctrine\ORM\Query\Expr\Join;
    use Doctrine\ORM\QueryBuilder;
    use Doctrine\Persistence\ManagerRegistry;
    use Gedmo\Tree\Entity\Repository\NestedTreeRepository;
    
    /**
     * @method Catalog|null find($id, $lockMode = null, $lockVersion = null)
     * @method Catalog|null findOneBy(array $criteria, array $orderBy = null)
     * @method Catalog[]    findAll()
     * @method Catalog[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class CatalogRepository extends NestedTreeRepository
    {
        public function __construct(EntityManagerInterface $manager)
        {
            parent::__construct($manager, $manager->getClassMetadata(Catalog::class));
        }

//        public function __construct(ManagerRegistry $registry)
//        {
//            parent::__construct($registry, Catalog::class);
//        }
        
        /**
         * @param string|null $query
         * @return Catalog[]
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
         * @return Catalog|null
         * @throws \Doctrine\ORM\NonUniqueResultException
         */
        public function byIdFront(int $id)
        {
            return $this->getBaseFrontQuery()
                        ->andWhere('c.id = :id')
                        ->setParameter('id', $id)
                        ->getQuery()
                        ->getOneOrNullResult()
            ;
        }
        
        /**
         * @param int $id
         * @return Catalog|null
         * @throws \Doctrine\ORM\NonUniqueResultException
         */
        public function byIdAdmin(int $id)
        {
            return $this->getBaseAdminQuery()
                        ->andWhere('c.id = :id')
                        ->setParameter('id', $id)
                        ->getQuery()
                        ->getOneOrNullResult()
            ;
        }
        
        /**
         * @return Catalog[]
         */
        public function getRootFront()
        {
            return $this->getBaseFrontQuery()
//                        ->andWhere('c.parent IS NULL')
                        ->andWhere('c.name = :rootName')
                        ->setParameter('rootName', Catalog::ROOT)
                        ->orderBy('c.lft', 'ASC')
                        ->getQuery()
                        ->getOneOrNullResult()
            ;
        }
        
        /**
         * @return Catalog|null
         */
        public function getRootOne(string $name = Catalog::ROOT)
        {
            return $this->getBaseAdminQuery()
                        ->where('c.name = :rootName')
                        ->setParameter('rootName', $name)
                        ->getQuery()
                        ->getOneOrNullResult()
            ;
        }
        
        /**
         * @return Catalog[]
         */
        public function getRootAdmin()
        {
            $this->getEntityManager()->getConfiguration()->addCustomHydrationMode('tree', 'Gedmo\Tree\Hydrator\ORM\TreeObjectHydrator');
            return $this->getBaseAdminQuery()
                        ->orderBy('c.lft', 'ASC')
                        ->getQuery()
                        ->setHint(\Doctrine\ORM\Query::HINT_INCLUDE_META_COLUMNS, true)
                        ->getResult('tree')
            ;
        }
        
        /**
         * @return QueryBuilder
         */
        public function getBaseAdminQuery()
        {
            return $this->createQueryBuilder('c')
                        ->addSelect('children', 'pictures', 'pictures_file', 'pictures_validatedversion', 'pictures_validatedversion_exif')
                        ->leftJoin('c.children', 'children')
                        ->leftJoin('c.pictures', 'pictures')
                        ->leftJoin('pictures.file', 'pictures_file')
                        ->leftJoin('pictures.validatedVersion', 'pictures_validatedversion')
                        ->leftJoin('pictures_validatedversion.exif', 'pictures_validatedversion_exif')
                        ->leftJoin('pictures.tmpVersions', 'pictures_tmpVersions')
            ;
        }
        
        /**
         * @return QueryBuilder
         */
        public function getBaseFrontQuery()
        {
            return $this->createQueryBuilder('c')
                        ->addSelect('children', 'children_pictures', 'pictures', 'pictures_file', 'pictures_validatedversion', 'pictures_validatedversion_exif')
                        ->leftJoin('c.children', 'children', Join::WITH, 'children.enabled = true')
                        ->leftJoin('children.pictures', 'children_pictures', Join::WITH, 'children_pictures.enabled = true')
                        ->leftJoin('c.pictures', 'pictures', Join::WITH, 'pictures.enabled = true')
                        ->leftJoin('pictures.file', 'pictures_file')
                        ->leftJoin('pictures.validatedVersion', 'pictures_validatedversion')
                        ->leftJoin('pictures_validatedversion.exif', 'pictures_validatedversion_exif')
                        ->andWhere('c.enabled = :enabled')
                        ->setParameter('enabled', true)
                        ->orderBy('c.name', 'ASC')
            ;
        }
        
        // /**
        //  * @return Catalog[] Returns an array of Catalog objects
        //  */
        /*
        public function findByExampleField($value)
        {
            return $this->createQueryBuilder('c')
                ->andWhere('c.exampleField = :val')
                ->setParameter('val', $value)
                ->orderBy('c.id', 'ASC')
                ->setMaxResults(10)
                ->getQuery()
                ->getResult()
            ;
        }
        */
        
        /*
        public function findOneBySomeField($value): ?Catalog
        {
            return $this->createQueryBuilder('c')
                ->andWhere('c.exampleField = :val')
                ->setParameter('val', $value)
                ->getQuery()
                ->getOneOrNullResult()
            ;
        }
        */
    }
