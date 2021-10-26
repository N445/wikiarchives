<?php

namespace App\Command;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[AsCommand(
    name: 'user:create',
    description: 'Add a short description for your command',
)]
class UserCreateCommand extends Command
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
    private ValidatorInterface $validator;
    
    public function __construct(
        string                      $name = null,
        UserRepository              $userRepository,
        EntityManagerInterface      $em,
        UserPasswordHasherInterface $userPasswordHasher,
        ValidatorInterface          $validator
    )
    {
        parent::__construct($name);
        $this->userRepository = $userRepository;
        $this->em = $em;
        $this->userPasswordHasher = $userPasswordHasher;
        $this->validator = $validator;
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
        
        if ($this->userRepository->getByEmail($email)) {
            $io->error('Utilisateur Déja existant');
            
            return Command::FAILURE;
        }
        
        $user = (new User())->setEmail($email);
        
        $question = new ConfirmationQuestion('Administrateur (y/N) : ', false);
        
        $isAdmin = $helper->ask($input, $output, $question);
        
        if ($isAdmin) {
            $user->setRoles([User::ROLE_ADMIN]);
        }
        
        $question = new Question('Entrez le mot de passe : ');
        
        $password = $helper->ask($input, $output, $question);
        
        
        $user->setPassword($this->userPasswordHasher->hashPassword($user, $password));
        
        $errors = $this->validator->validate($user);
        
        if (count($errors) > 0) {
            $io->error((string)$errors);
            return Command::FAILURE;
        }
        
        
        $this->em->persist($user);
        $this->em->flush();
        
        $table = new Table($output);
        $table
            ->setRows([
                ['Id', $user->getId()],
                ['User Identifier', $user->getUserIdentifier()],
                ['Email', $user->getEmail()],
                ['Roles', implode(',', $user->getRoles())],
                ['Password', $password],
            ])
        ;
        $table->render();
        
        $io->success('Utilisateur crée avec succès');
        
        return Command::SUCCESS;
    }
}