<?php

    namespace App\DataFixtures;

    use App\Entity\Catalog\Picture;
    use App\Entity\Catalog\Picture\Exif;
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
            
                /** @var Exif $baseExif */
                $baseExif = $fakeImage['exif'];
                $exif = (new Exif())
                    ->setIsVerified($baseExif->isVerified())
                    ->setTitle($baseExif->getTitle())
                    ->setAuthor($baseExif->getAuthor())
                    ->setCamera($baseExif->getCamera())
                    ->setCaption($baseExif->getCaption())
                    ->setCopyright($baseExif->getCopyright())
                    ->setCreationdate($baseExif->getCreationdate())
                    ->setCredit($baseExif->getCredit())
                    ->setAperture($baseExif->getAperture())
                    ->setExposure($baseExif->getExposure())
                    ->setFocalLength($baseExif->getFocalLength())
                    ->setFocalDistance($baseExif->getFocalDistance())
                    ->setIso($baseExif->getIso())
                    ->setColorSpace($baseExif->getColorSpace())
                    ->setFileSize($baseExif->getFileSize())
                    ->setHeight($baseExif->getHeight())
                    ->setWidth($baseExif->getWidth())
                    ->setHorizontalResolution($baseExif->getHorizontalResolution())
                    ->setVerticalResolution($baseExif->getVerticalResolution())
                    ->setHeadline($baseExif->getHeadline())
                    ->setJobTitle($baseExif->getJobTitle())
                    ->setKeywords($baseExif->getKeywords())
                    ->setMimeType($baseExif->getMimeType())
                    ->setOrientation($baseExif->getOrientation())
                    ->setSoftware($baseExif->getSoftware())
                    ->setSource($baseExif->getSource())
                    ->setLat($baseExif->getLat())
                    ->setLng($baseExif->getLng());
            
                if (!$exif->getLat()) {
                    if ($this->faker->boolean) {
                        $exif->setLat($this->faker->latitude());
                        $exif->setLng($this->faker->longitude());
                    }
                }
            
                /** @var Version $validatedVersion */
                $validatedVersion = $this->faker->randomElement($versions);
                $validatedVersion
                    ->setStatus(PictureVersionHelper::STATUS_ACCEPTED)
                    ->setType(PictureVersionHelper::TYPE_FINAL)
                    ->setExif($exif)
                ;
                $picture->setValidatedVersion($validatedVersion);
            
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
                $exif = (new Exif())
                    ->setIsVerified($this->faker->boolean())
                    ->setTitle($this->faker->optional()->realText(50))
                    ->setAuthor($this->faker->optional()->realText(50))
                    ->setCamera($this->faker->optional()->realText(50))
                    ->setCaption($this->faker->optional()->realText(50))
                    ->setCopyright($this->faker->optional()->realText(50))
                    ->setCreationdate($this->faker->optional()->dateTimeBetween('-30 years', 'now'))
                    ->setCredit($this->faker->optional()->realText(50))
                    ->setAperture($this->faker->optional()->realText(50))
                    ->setExposure($this->faker->optional()->realText(50))
                    ->setFocalLength($this->faker->optional()->randomFloat(0, 800))
                    ->setFocalDistance($this->faker->optional()->realText(50))
                    ->setIso($this->faker->optional()->numberBetween(100, 1000))
                    ->setColorSpace($this->faker->optional()->realText(50))
                    ->setFileSize($this->faker->numberBetween(50000, 80000000))
                    ->setHeight($this->faker->optional()->numberBetween(1000, 5000))
                    ->setWidth($this->faker->optional()->numberBetween(1000, 5000))
                    ->setHorizontalResolution($this->faker->optional()->numberBetween(10, 100))
                    ->setVerticalResolution($this->faker->optional()->numberBetween(10, 100))
                    ->setHeadline($this->faker->optional()->realText(50))
                    ->setJobTitle($this->faker->optional()->realText(50))
                    ->setKeywords(explode(' ', $this->faker->optional()->realText(50)))
                    ->setMimeType($this->faker->optional()->mimeType())
                    ->setOrientation($this->faker->optional()->numberBetween(0, 7))
                    ->setSoftware($this->faker->optional()->realText(50))
                    ->setSource($this->faker->optional()->realText(50));

                if ($this->faker->boolean()) {
                    $exif->setLat($this->faker->latitude());
                    $exif->setLng($this->faker->longitude());
                }


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
                    ->setExif($exif)
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
