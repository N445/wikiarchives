<?php

namespace App\DataFixtures;

use App\Entity\Catalog\Picture;
use App\Service\Catalog\PictureVersionHelper;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

/**
 * @property \Faker\Generator $faker
 */
class PictureFixtures extends Fixture implements DependentFixtureInterface
{
    const LOOP = 10000;

    public function load(ObjectManager $manager): void
    {
        $this->faker = Factory::create();

        $images = [
            'image-1.jpg',
            'image-2.jpg',
            'image-3.jpg',
            'image-4.jpg',
            'image-5.jpg',
        ];
        foreach ($images as $image) {
            copy(__DIR__ . '/images/' . $image, __DIR__ . '/../../public/uploads/catalog/picture/' . $image);
        }

        foreach (range(1, self::LOOP) as $i) {
            $file = (new Picture\File())
                ->setImageName($this->faker->randomElement($images))
                ->setImageSize($this->faker->numberBetween(50000, 80000000))
                ->setImageMimeType($this->faker->mimeType())
                ->setImageOriginalName($this->faker->filePath())
                ->setImageDimensions(
                    [
                        $this->faker->numberBetween(1000, 5000),
                        $this->faker->numberBetween(1000, 5000),
                    ]
                );


            $picture = (new Picture())
                ->setEnabled($this->faker->boolean())
                ->setCatalog($this->getReference(sprintf(CatalogFixtures::REFERENCE, rand(1, CatalogFixtures::LOOP))))
                ->setFile($file);

            $picture->removeVersion($picture->getValidatedVersion());

            $versions = $this->getVersions();

            foreach ($versions as $version) {
                $picture->addVersion($version);
            }

            $picture->setValidatedVersion($this->faker->randomElement($versions));

            if ($this->faker->boolean()) {
                $picture->setPlace($this->getReference(sprintf(PlaceFixtures::REFERENCE, rand(1, PlaceFixtures::LOOP))));
            }

            $manager->persist($picture);
            if ($i % 1000 === 0) {
                $manager->flush();
            }
        }

        $manager->flush();
    }

    private function getVersions()
    {
        $versions = [];
        foreach (range(1, rand(1, 5)) as $i) {
            $exif = (new Picture\Exif())
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
                $exif->setGps([
                    $this->faker->latitude(),
                    $this->faker->longitude(),
                ]);
            }


            $version = (new Picture\Version())
                ->setVersionNumber($i)
                ->setStatus($this->faker->randomElement([
                    PictureVersionHelper::STATUS_PENDING,
                    PictureVersionHelper::STATUS_ACCEPTED,
                    PictureVersionHelper::STATUS_REJECTED,
                ]))
//                ->setBasedVersion()
                ->setName($this->faker->realText(50))
                ->setDescription($this->faker->optional()->realText(500))
                ->setExif($exif);
            $versions[] = $version;
        }
        return $versions;
    }

    public function getDependencies()
    {
        return [
            CatalogFixtures::class
        ];
    }
}
