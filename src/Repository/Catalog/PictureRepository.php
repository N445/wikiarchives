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
        public function search(?string $query, ?Catalog $catalog, int $page, int $nbPerPage = 10): PaginationInterface
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
        public function byCatalogPaginatedFront(Catalog $catalog, int $page, int $nbPerPage = 10): PaginationInterface
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
    
        /**
         * @return Picture[]
         */
        public function getGpsPointsFront(): array
        {
            return $this->createQueryBuilder('p')
                        ->addSelect( 'catalog', 'catalog_parent','exif')
                        ->leftJoin('p.catalog', 'catalog')
                        ->leftJoin('p.exif', 'exif')
                        ->leftJoin('catalog.parent', 'catalog_parent')
                        ->andWhere('exif.lat IS NOT NULL')
                        ->andWhere('exif.lng IS NOT NULL')
                        ->andWhere('p.enabled = true')
                        ->andWhere('catalog.enabled = true')
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
                        ->addSelect('catalog', 'pictures_versions')
                        ->leftJoin('p.catalog', 'catalog')
                        ->leftJoin('p.versions', 'pictures_versions')
            ;
        }

        /**
         * @return QueryBuilder
         */
        public function getBaseFrontQuery()
        {
            return $this->createQueryBuilder('p')
                        ->addSelect('catalog', 'catalog_parent')
                        ->leftJoin('p.catalog', 'catalog')
                        ->leftJoin('catalog.parent', 'catalog_parent')
                        ->andWhere('p.enabled = true')
            ;
        }
    }
