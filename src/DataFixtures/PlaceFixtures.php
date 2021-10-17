<?php

namespace App\DataFixtures;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Place;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class PlaceFixtures extends Fixture
{
    const REFERENCE = 'place_%d';
    const LOOP = 50;

    private array $catalogs;

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        foreach (range(1, self::LOOP) as $i) {
            $place = (new Place())
                ->setName($faker->realText(50))
                ->setLocation($faker->realText(50))
                ->setLat($faker->latitude())
                ->setLng($faker->longitude());
            $manager->persist($place);
            $this->addReference(sprintf(self::REFERENCE, $i), $place);
        }

        $manager->flush();
    }


}
