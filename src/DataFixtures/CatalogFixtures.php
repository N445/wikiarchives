<?php
    
    namespace App\DataFixtures;
    
    use App\Entity\Catalog\Catalog;
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Common\DataFixtures\DependentFixtureInterface;
    use Doctrine\Persistence\ObjectManager;
    use Faker\Factory;
    use Symfony\Component\HttpKernel\KernelInterface;
    
    class CatalogFixtures extends Fixture implements DependentFixtureInterface
    {
        const REFERENCE = 'catalog_%d';
        const LOOP = 500;
        
        private $catalogs = [];
        private KernelInterface $kernel;
        
        public function __construct(KernelInterface $kernel)
        {
            $this->kernel = $kernel;
        }
        
        public function load(ObjectManager $manager): void
        {
            $faker = Factory::create();
            
            $images = [
                'image-1.jpg',
                'image-2.jpg',
                'image-3.jpg',
                'image-4.jpg',
                'image-5.jpg',
            ];
            foreach ($images as $image) {
                $from = $this->kernel->getProjectDir() . '/src/DataFixtures/images/' . $image;
                $to = $this->kernel->getProjectDir() . '/public/uploads/catalog/cover/' . $image;
                copy($from, $to);
            }
            
            foreach (range(1, self::LOOP) as $i) {
                $catalog = (new Catalog())
                    ->setName($faker->realText(50))
                    ->setEnabled($faker->boolean())
                    ->setImageName($faker->randomElement($images));
                
                if ($faker->boolean()) {
                    $catalog->setPlace($this->getReference(sprintf(PlaceFixtures::REFERENCE, rand(1, PlaceFixtures::LOOP))));
                }
                
                if (count($this->catalogs) > 0) {
                    $catalog->setParent($faker->randomElement($this->catalogs));
                }
                
                if ($faker->boolean(10)) {
                    $catalog->setParent(null);
                }
                
                $this->catalogs[] = $catalog;
                $manager->persist($catalog);
                $this->addReference(sprintf(self::REFERENCE, $i), $catalog);
            }
            
            $manager->flush();
        }
        
        public function getDependencies()
        {
            return [
                PlaceFixtures::class
            ];
        }
    }