<?php

    namespace App\DataFixtures;

    use App\Entity\Catalog\Picture;
    use App\Entity\Catalog\Picture\Version;
    use App\Service\Catalog\PictureLicenseHelper;
    use App\Service\Catalog\Version\PictureVersionHelper;
    use App\Service\Fake\FakeImageProvider;
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Common\DataFixtures\DependentFixtureInterface;
    use Doctrine\Persistence\ObjectManager;
    use Faker\Factory;
    use Symfony\Component\HttpKernel\KernelInterface;

    /**
     * @property \Faker\Generator $faker
     */
    class PictureFixtures extends Fixture implements DependentFixtureInterface
    {
        const LOOP = 8000;
    
        /**
         * @var \Symfony\Component\HttpKernel\KernelInterface
         */
        private KernelInterface $kernel;
        private FakeImageProvider $fakeImageProvider;
    
        public function __construct(KernelInterface $kernel, FakeImageProvider $fakeImageProvider)
        {
            $this->kernel = $kernel;
            $this->fakeImageProvider = $fakeImageProvider;
        }
    
        public function load(ObjectManager $manager): void
        {
            $this->faker = Factory::create();
        
            $this->fakeImageProvider->setFakeImages();
        
            foreach (range(1, self::LOOP) as $i) {
                $fakeImage = $this->faker->randomElement($this->fakeImageProvider->getFakeImages());
                $file = (new Picture\File())
                    ->setImageName($fakeImage['name'])
                    ->setImageSize($this->faker->numberBetween(50000, 80000000))
                    ->setImageMimeType($this->faker->mimeType())
                    ->setImageOriginalName($fakeImage['name'])
                    ->setImageDimensions(
                        [
                            $this->faker->numberBetween(1000, 5000),
                            $this->faker->numberBetween(1000, 5000),
                        ]
                    );


                $picture = (new Picture())
//                    ->setEnabled($this->faker->boolean())
                    ->setEnabled(true)
                    ->setLicense($this->faker->randomElement(PictureLicenseHelper::getLicensesChoices()))
                    ->setIsEditedByWikiarchives($this->faker->boolean(20))
                    ->setCatalog($this->getReference(sprintf(CatalogFixtures::REFERENCE, rand(1, CatalogFixtures::LOOP))))
                    ->setFile($file)
                    ->setCreatedBy($this->getReference(sprintf(UserFixtures::REFERENCE, rand(1, UserFixtures::LOOP))))
                    ->setCreatedAt($this->faker->dateTimeBetween('-10 month', 'now'));
    
                if ($this->faker->boolean()) {
                    $picture->setUpdatedBy($this->getReference(sprintf(UserFixtures::REFERENCE, rand(1, UserFixtures::LOOP))))
                            ->setUpdatedAt($this->faker->dateTimeBetween('-10 month', 'now'))
                    ;
                }
                
                $picture->removeVersion($picture->getValidatedVersion());
    
                $versions = $this->getVersions();
            
                foreach ($versions as $version) {
                    if (PictureVersionHelper::TYPE_FINAL === $version->getType()) {
                        $picture->addVersion($version);
                    } else {
                        $picture->addTmpVersion($version);
                    }
                }
            
                /** @var Version $validatedVersion */
                $validatedVersion = $this->faker->randomElement($versions);
                $validatedVersion
                    ->setStatus(PictureVersionHelper::STATUS_ACCEPTED)
                    ->setType(PictureVersionHelper::TYPE_FINAL)
                ;
                $picture
                    ->setValidatedVersion($validatedVersion)
                ;
            
                if ($this->faker->boolean()) {
                    $picture->setPlace($this->getReference(sprintf(PlaceFixtures::REFERENCE, rand(1, PlaceFixtures::LOOP))));
                }
    
                $manager->persist($picture);
    
               
                if ($i % 1000 === 0) {
                    echo ".";
                    $manager->flush();
                }
            }
    
            echo "\n";
            $manager->flush();
        }
    
        /**
         * @return Version[]
         */
        private function getVersions(): array
        {
            $versions = [];
            foreach (range(1, rand(1, 5)) as $i) {

                $version = (new Version())
                    ->setVersionNumber($i)
                    ->setStatus($this->faker->randomElement([
                        PictureVersionHelper::STATUS_PENDING,
                        PictureVersionHelper::STATUS_ACCEPTED,
                        PictureVersionHelper::STATUS_REJECTED,
                    ]))
                    ->setType($this->faker->randomElement([
                        PictureVersionHelper::TYPE_FINAL,
                        PictureVersionHelper::TYPE_TMP,
                    ]))
                    ->setBasedVersion($this->faker->randomElement($versions))
                    ->setName($this->faker->realText(50))
                    ->setDescription($this->faker->optional()->realText(500))
                    ->setCreatedBy($this->getReference(sprintf(UserFixtures::REFERENCE, rand(1, UserFixtures::LOOP))))
                    ->setCreatedAt($this->faker->dateTimeBetween('-10 month', 'now'));
    
                if ($this->faker->boolean()) {
                    $version->setType(PictureVersionHelper::TYPE_FINAL);
                } else if (count($versions) <= 0) {
                    $version->setType(PictureVersionHelper::TYPE_FINAL);
                } else {
                    $version->setType(PictureVersionHelper::TYPE_TMP);
                }
    
                if ($this->faker->boolean()) {
                    $version->setUpdatedBy($this->getReference(sprintf(UserFixtures::REFERENCE, rand(1, UserFixtures::LOOP))))
                            ->setUpdatedAt($this->faker->dateTimeBetween('-10 month', 'now'))
                    ;
                }
    
    
                $versions[] = $version;
            }
            return $versions;
        }

        public function getDependencies()
        {
            return [
                CatalogFixtures::class,
                UserFixtures::class,
            ];
        }
    }
