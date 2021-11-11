<?php
    
    namespace App\Repository\Catalog;
    
    use App\Entity\Catalog\Catalog;
    use Doctrine\ORM\EntityManagerInterface;
    use Doctrine\ORM\NonUniqueResultException;
    use Doctrine\ORM\Query\Expr\Join;
    use Doctrine\ORM\QueryBuilder;
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
        public function search(?string $query, ?Catalog $catalog)
        {
            $qb = $this->getBaseFrontQuery();
    
            if ($query) {
                $qb->andWhere('c.name LIKE :query')
                   ->setParameter('query', '%' . $query . '%')
                ;
            }
    
            if ($catalog) {
                $qb->andWhere('c.parent = :catalog')
                   ->setParameter('catalog', $catalog)
                ;
            }
    
            return $qb->getQuery()
                      ->getResult()
            ;
        }
    
        /**
         * @param int $id
         * @param bool $isFull
         * @return Catalog|null
         * @throws NonUniqueResultException
         */
        public function byIdFront(int $id, bool $isFull = false): ?Catalog
        {
            return $this->getBaseFrontQuery($isFull)
                        ->andWhere('c.id = :id')
                        ->setParameter('id', $id)
                        ->getQuery()
                        ->getOneOrNullResult()
            ;
        }
    
        /**
         * @param int $id
         * @return Catalog|null
         * @throws NonUniqueResultException
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
         * @return Catalog|null
         * @throws NonUniqueResultException
         */
        public function getRootFront(): ?Catalog
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
         * @throws NonUniqueResultException
         */
        public function getRootOne(string $name = Catalog::ROOT): ?Catalog
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
            return $this->createQueryBuilder('c')
                        ->addSelect('children')
                        ->leftJoin('c.children', 'children')
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
        public function getBaseFrontQuery(bool $isFull = false)
        {
            $qb = $this->createQueryBuilder('c')
                       ->addSelect('children', 'children_pictures', 'pictures')
                       ->andWhere('c.enabled = true')
                       ->leftJoin('c.children', 'children', Join::WITH, 'children.enabled = true')
                       ->leftJoin('children.pictures', 'children_pictures', Join::WITH, 'children_pictures.enabled = true')
                       ->leftJoin('c.pictures', 'pictures', Join::WITH, 'pictures.enabled = true')
                       ->addOrderBy('c.lft', 'ASC')
                       ->addOrderBy('children.lft', 'ASC')
            ;
        
            if ($isFull) {
                $qb->addSelect('pictures_file', 'pictures_validatedversion', 'pictures_validatedversion_exif')
                   ->leftJoin('pictures.file', 'pictures_file')
                   ->leftJoin('pictures.validatedVersion', 'pictures_validatedversion')
                   ->leftJoin('pictures_validatedversion.exif', 'pictures_validatedversion_exif')
                ;
            }
        
            return $qb;
        }
    
    }
