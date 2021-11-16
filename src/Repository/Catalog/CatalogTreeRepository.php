<?php
    
    namespace App\Repository\Catalog;
    
    use App\Entity\Catalog\Catalog;
    use Doctrine\ORM\EntityManagerInterface;
    use Gedmo\Tree\Entity\Repository\NestedTreeRepository;

    /**
     * @method Catalog|null find($id, $lockMode = null, $lockVersion = null)
     * @method Catalog|null findOneBy(array $criteria, array $orderBy = null)
     * @method Catalog[]    findAll()
     * @method Catalog[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class CatalogTreeRepository extends NestedTreeRepository
    {
        public function __construct(EntityManagerInterface $manager)
        {
            parent::__construct($manager, $manager->getClassMetadata(Catalog::class));
        }
    }
