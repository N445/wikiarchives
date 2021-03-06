<?php
    
    namespace App\DataFixtures;
    
    use App\Entity\Catalog\Catalog;
    use App\Service\Fake\FakeImageProvider;
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Common\DataFixtures\DependentFixtureInterface;
    use Doctrine\Persistence\ObjectManager;
    use Faker\Factory;
    use Symfony\Component\Filesystem\Filesystem;
    use Symfony\Component\HttpKernel\KernelInterface;

    class CatalogFixtures extends Fixture implements DependentFixtureInterface
    {
        const REFERENCE = 'catalog_%d';
        const LOOP = 100;
        
        private $catalogs = [];
        private KernelInterface $kernel;
        private FakeImageProvider $fakeImageProvider;
    
        public function __construct(KernelInterface $kernel, FakeImageProvider $fakeImageProvider)
        {
            $this->kernel = $kernel;
            $this->fakeImageProvider = $fakeImageProvider;
        }
        
        public function load(ObjectManager $manager): void
        {
            $faker = Factory::create();
    
            $this->fakeImageProvider->setFakeImages();
            
            
            $root = (new Catalog())
                ->setName(Catalog::ROOT)
                ->setEnabled(true);
    
            $this->addReference(sprintf(self::REFERENCE, 0), $root);
            $this->catalogs[] = $root;
    
            $manager->persist($root);
    
            foreach (range(1, self::LOOP) as $i) {
                $catalog = (new Catalog())
                    ->setName($faker->realText(50))
//                    ->setEnabled($faker->boolean())
                    ->setEnabled(true)
                    ->setCreatedBy($this->getReference(sprintf(UserFixtures::REFERENCE, rand(1, UserFixtures::LOOP))))
                    ->setCreatedAt($faker->dateTimeBetween('-10 month', 'now'));
        
        
                if ($faker->boolean()) {
                    $catalog->setPlace($this->getReference(sprintf(PlaceFixtures::REFERENCE, rand(1, PlaceFixtures::LOOP))));
                }
        
                if ($faker->boolean(1)) {
                    $catalog->setParent($this->getReference(sprintf(self::REFERENCE, 0)));
//                    $root->addChild($catalog);
                } else {
                    $catalog->setParent($faker->randomElement($this->catalogs));
//                    /** @var Catalog $parent */
//                    $parent = $faker->randomElement($this->catalogs);
//                    $parent->addChild($catalog);
                }
        
                if ($faker->boolean()) {
                    $catalog
                        ->setUpdatedBy($this->getReference(sprintf(UserFixtures::REFERENCE, rand(1, UserFixtures::LOOP))))
                        ->setUpdatedAt($faker->dateTimeBetween('-10 month', 'now'))
                    ;
                }
        
                $this->catalogs[] = $catalog;
                $manager->persist($catalog);
                $this->addReference(sprintf(self::REFERENCE, $i), $catalog);
        
//                echo ".";
//                if ($i % 10 === 0) {
//                    echo ".";
//                    $manager->flush();
//                }
            }
            echo "Flush";
            $manager->flush();
            $manager->clear();
        }
        
        public function getDependencies()
        {
            return [
                PlaceFixtures::class,
                UserFixtures::class,
            ];
        }
    }
