<?php
    
    namespace App\Command;
    
    use App\Entity\User;
    use App\Repository\UserRepository;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Component\Console\Attribute\AsCommand;
    use Symfony\Component\Console\Command\Command;
    use Symfony\Component\Console\Input\InputArgument;
    use Symfony\Component\Console\Input\InputInterface;
    use Symfony\Component\Console\Input\InputOption;
    use Symfony\Component\Console\Output\OutputInterface;
    use Symfony\Component\Console\Question\Question;
    use Symfony\Component\Console\Style\SymfonyStyle;
    use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
    
    #[AsCommand(
        name: 'user:change-password',
        description: 'Add a short description for your command',
    )]
    class UserChangePasswordCommand extends Command
    {
        /**
         * @var UserRepository
         */
        private UserRepository $userRepository;
        /**
         * @var EntityManagerInterface
         */
        private EntityManagerInterface $em;
        private UserPasswordHasherInterface $userPasswordHasher;
        
        public function __construct(
            UserRepository $userRepository,
            EntityManagerInterface $em,
            UserPasswordHasherInterface $userPasswordHasher
        )
        {
            $this->userRepository = $userRepository;
            $this->em = $em;
            $this->userPasswordHasher = $userPasswordHasher;
        }
        
        protected function configure(): void
        {
        }
        
        protected function execute(InputInterface $input, OutputInterface $output): int
        {
            $io = new SymfonyStyle($input, $output);
            $helper = $this->getHelper('question');
            
            $question = new Question('Entrez l\'identifiant de l\'utilisateur : ');
            
            $email = $helper->ask($input, $output, $question);
            
            if (!$user = $this->userRepository->getByEmail($email)) {
                $io->error('Utilisateur non trouvé');
                
                return Command::SUCCESS;
            }
            
            $question = new Question('Entrez le nouveau mot de passe : ');
            
            $password = $helper->ask($input, $output, $question);
            
            
            $user->setPassword($this->userPasswordHasher->hashPassword($user, $password));
            $this->em->flush();
            
            $io->success('Mot de pass changé');
            
            return Command::SUCCESS;
        }
    }
