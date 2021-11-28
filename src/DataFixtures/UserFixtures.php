<?php
    
    namespace App\DataFixtures;
    
    use App\Entity\User;
    use App\Service\User\UserRoles;
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Persistence\ObjectManager;
    use Faker\Factory;
    use Symfony\Component\Intl\Countries;
    use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

    class UserFixtures extends Fixture
    {
        const REFERENCE = 'user_%d';
        const LOOP = 50;
        private UserPasswordHasherInterface $userPasswordHasher;
        
        public function __construct(UserPasswordHasherInterface $userPasswordHasher)
        {
            $this->userPasswordHasher = $userPasswordHasher;
        }
        
        
        public function load(ObjectManager $manager): void
        {
            $faker = Factory::create();
            
            $email = 'admin@wikiarchives.com';
            
            $rights = (new User\Rights())->setHasVersionCreator(true);
            
            $user = (new User())
                ->setEmail($email)
                ->setRoles(['ROLE_SUPER_ADMIN'])
                ->setIsVerified(true);
            
            $user->setPassword($this->userPasswordHasher->hashPassword($user, $email));
            $manager->persist($user);
            $this->addReference(sprintf(self::REFERENCE, 1), $user);
            
            
            foreach (range(2, self::LOOP) as $i) {
                
                $rights = (new User\Rights())
                    ->setHasVersionCreator($faker->boolean());
                
                $info = (new User\Info())
                    ->setLastname($faker->optional->lastName())
                    ->setFirstname($faker->optional->firstName())
                    ->setCountry($faker->optional->country())
                    ->setCountry($faker->optional->randomElement(array_keys(Countries::getNames())))
                    ->setCity($faker->optional->city())
                    ->setAddress($faker->optional->address());
                
                $email = $faker->email();
                
                $user = (new User())
                    ->setEmail($email)
                    ->setRoles($faker->randomElements([UserRoles::ROLE_SUPER_ADMIN, UserRoles::ROLE_ADMIN, UserRoles::ROLE_MODERATOR, UserRoles::ROLE_CONTRIBUTOR,], rand(1, 4)))
                    ->setIsVerified($faker->boolean())
                    ->setInfo($info)
                    ->setRights($rights);
                
                $user->setPassword($this->userPasswordHasher->hashPassword($user, $email));
                $this->addReference(sprintf(self::REFERENCE, $i), $user);
                $manager->persist($user);
            }
            
            $manager->flush();
        }
        
        
    }
