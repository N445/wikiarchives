<?php

namespace App\Command;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\User\UserRoles;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name:'user:promote',description: 'Add a short description for your command',)]
class UserPromoteCommand extends Command
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;

    public function __construct(
        UserRepository $userRepository,
        EntityManagerInterface $em
    )
    {
        $this->userRepository = $userRepository;
        $this->em = $em;
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

        if (in_array(UserRoles::ROLE_ADMIN, $user->getRoles())) {
            $io->info('Utilisateur déja admin');

            return Command::SUCCESS;
        }

        $user->addRole(UserRoles::ROLE_ADMIN);
        $this->em->flush();

        $io->success('Utilisateur promu');

        return Command::SUCCESS;
    }
}
