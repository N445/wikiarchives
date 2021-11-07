<?php

    namespace App\Repository\Catalog;

    use App\Entity\Catalog\Catalog;
    use App\Entity\Catalog\Picture;
    use App\Entity\User;
    use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
    use Doctrine\ORM\NonUniqueResultException;
    use Doctrine\ORM\QueryBuilder;
    use Doctrine\Persistence\ManagerRegistry;
    use Knp\Component\Pager\Pagination\PaginationInterface;
    use Knp\Component\Pager\PaginatorInterface;

    /**
     * @method Picture|null find($id, $lockMode = null, $lockVersion = null)
     * @method Picture|null findOneBy(array $criteria, array $orderBy = null)
     * @method Picture[]    findAll()
     * @method Picture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class PictureRepository extends ServiceEntityRepository
    {
        private PaginatorInterface $paginator;

        public function __construct(ManagerRegistry $registry, PaginatorInterface $paginator)
        {
            parent::__construct($registry, Picture::class);
            $this->paginator = $paginator;
        }

        /**
         * @param string|null $query
         * @param Catalog|null $catalog
         * @param int $page
         * @param int $nbPerPage
         * @return PaginationInterface
         */
        public function search(?string $query, ?Catalog $catalog, int $page, int $nbPerPage = 10)
        {
            $qb = $this->getBaseFrontQuery();


            if ($query) {
                $qb->andWhere('picture_validatedversion.name LIKE :query')
                   ->setParameter('query', '%' . $query . '%')
                ;
            }

            if ($catalog) {
                $qb->andWhere('p.catalog = :catalog')
                   ->setParameter('catalog', $catalog)
                ;
            }
            return $this->paginator->paginate(
                $qb->getQuery(), /* query NOT result */
                $page, /*page number*/
                $nbPerPage /*limit per page*/
            );
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

        /**
         * @param User $user
         * @return array
         */
        public function getUserVersions(User $user): array
        {
            return $this->createQueryBuilder('p')
                        ->addSelect('pictures_versions')
                        ->leftJoin('p.versions', 'pictures_versions')
                        ->andWhere('pictures_versions.createdBy = :user')
                        ->setParameter('user', $user)
                        ->getQuery()
                        ->getResult()
            ;
        }

        /**
         * @param User $user
         * @return array
         */
        public function getUserTmpVersions(User $user): array
        {
            return $this->createQueryBuilder('p')
                        ->addSelect('pictures_versions')
                        ->leftJoin('p.tmpVersions', 'pictures_versions')
                        ->andWhere('pictures_versions.createdBy = :user')
                        ->setParameter('user', $user)
                        ->getQuery()
                        ->getResult()
            ;
        }

        /**
         * @param Catalog $catalog
         * @param int $page
         * @return PaginationInterface
         */
        public function byCatalogPaginatedFront(Catalog $catalog, int $page, int $nbPerPage = 10)
        {
            $query = $this->getBaseFrontQuery()
                          ->andWhere('p.catalog = :catalog')
                          ->setParameter('catalog', $catalog)
                          ->getQuery();
    
            return $this->paginator->paginate(
                $query, /* query NOT result */
                $page, /*page number*/
                $nbPerPage /*limit per page*/
            );
        }
    
        public function getGpsPointsFront()
        {
            return $this->createQueryBuilder('p')
                        ->addSelect('file', 'validatedVersion', 'exif')
                        ->leftJoin('p.file', 'file')
                        ->leftJoin('p.validatedVersion', 'validatedVersion')
                        ->leftJoin('validatedVersion.exif', 'exif')
                        ->andWhere('exif.lat IS NOT NULL')
                        ->andWhere('exif.lng IS NOT NULL')
                        ->andWhere('p.enabled = :enabled')
                        ->setParameter('enabled', true)
                        ->getQuery()
                        ->getResult()
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
                ->addSelect('catalog', 'catalog_parent', 'pictures_file', 'picture_validatedversion', 'picture_validatedversion_exif')
                ->leftJoin('p.catalog', 'catalog')
                ->leftJoin('catalog.parent', 'catalog_parent')
                ->leftJoin('p.file', 'pictures_file')
                ->leftJoin('p.validatedVersion', 'picture_validatedversion')
                ->leftJoin('picture_validatedversion.exif', 'picture_validatedversion_exif')
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
