<?php
    
    namespace App\Repository\Catalog\Picture;
    
    use App\Entity\Catalog\Picture\Version;
    use App\Entity\User;
    use App\Service\Catalog\Version\PictureVersionHelper;
    use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
    use Doctrine\Persistence\ManagerRegistry;

    /**
     * @method Version|null find($id, $lockMode = null, $lockVersion = null)
     * @method Version|null findOneBy(array $criteria, array $orderBy = null)
     * @method Version[]    findAll()
     * @method Version[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class VersionRepository extends ServiceEntityRepository
    {
        public function __construct(ManagerRegistry $registry)
        {
            parent::__construct($registry, Version::class);
        }
    
        /**
         * @param User $user
         * @return Version[]
         */
        public function getByUser(User $user)
        {
            return $this->createQueryBuilder('v')
                        ->andWhere('v.createdBy = :user')
                        ->setParameter('user', $user)
                        ->orderBy('v.createdAt', 'DESC')
                        ->getQuery()
                        ->getResult()
            ;
        }
    
        /**
         * @param User $user
         * @return Version[]
         */
        public function getTmpByUser(User $user)
        {
            return $this->createQueryBuilder('v')
                        ->addSelect('tmpPicture', 'validatedVersion')
                        ->leftJoin('v.tmpPicture', 'tmpPicture')
                        ->leftJoin('tmpPicture.validatedVersion', 'validatedVersion')
                        ->andWhere('v.createdBy = :user')
                        ->setParameter('user', $user)
                        ->andWhere('v.type = :type')
                        ->setParameter('type', PictureVersionHelper::TYPE_TMP)
                        ->orderBy('v.createdAt', 'DESC')
                        ->getQuery()
                        ->getResult()
            ;
        }
    
        /**
         * @param string $status
         * @return Version[]
         */
        public function getByStatus(string $status)
        {
            return $this->createQueryBuilder('v')
                        ->andWhere('v.status = :status')
                        ->setParameter('status', $status)
                        ->orderBy('v.createdAt', 'ASC')
                        ->getQuery()
                        ->getResult()
            ;
        }
    
        /**
         * @param string $type
         * @return Version[]
         */
        public function getByType(string $type)
        {
            return $this->createQueryBuilder('v')
                        ->addSelect('picture', 'tmpPicture', 'user')
                        ->leftJoin('v.picture', 'picture')
                        ->leftJoin('v.tmpPicture', 'tmpPicture')
                        ->leftJoin('v.createdBy', 'user')
                        ->andWhere('v.type = :type')
                        ->setParameter('type', $type)
                        ->orderBy('v.createdAt', 'ASC')
                        ->getQuery()
                        ->getResult()
            ;
        }
    
        /**
         * @param int $id
         * @return Version|null
         * @throws \Doctrine\ORM\NonUniqueResultException
         */
        public function tmpById(int $id)
        {
            return $this->createQueryBuilder('v')
                        ->addSelect('basedVersion', 'basedVersion_versions')
                        ->leftJoin('v.basedVersion', 'basedVersion')
                        ->leftJoin('basedVersion.versions', 'basedVersion_versions')
                        ->andWhere('v.status = :status')
                        ->setParameter('status', PictureVersionHelper::STATUS_PENDING)
                        ->andWhere('v.id = :id')
                        ->setParameter('id', $id)
                        ->getQuery()
                        ->getOneOrNullResult()
            ;
        }
        
        // /**
        //  * @return Version[] Returns an array of Version objects
        //  */
        /*
        public function findByExampleField($value)
        {
            return $this->createQueryBuilder('v')
                ->andWhere('v.exampleField = :val')
                ->setParameter('val', $value)
                ->orderBy('v.id', 'ASC')
                ->setMaxResults(10)
                ->getQuery()
                ->getResult()
            ;
        }
        */
        
        /*
        public function findOneBySomeField($value): ?Version
        {
            return $this->createQueryBuilder('v')
                ->andWhere('v.exampleField = :val')
                ->setParameter('val', $value)
                ->getQuery()
                ->getOneOrNullResult()
            ;
        }
        */
    }
