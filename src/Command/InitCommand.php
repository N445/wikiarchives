<?php

namespace App\Command;

use App\Entity\Catalog\Catalog;
use App\Repository\Catalog\CatalogRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'app:init', description: 'Init first data',)]
class InitCommand extends Command
{
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;
    private CatalogRepository $catalogRepository;
    
    public function __construct(
        EntityManagerInterface $em,
        CatalogRepository $catalogRepository
    )
    {
        $this->em = $em;
        $this->catalogRepository = $catalogRepository;
    }
    
    protected function configure(): void
    {
    }
    
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        
        if ($this->catalogRepository->getRootOne()){
            $io->success('Root existe deja');
            return Command::SUCCESS;
        }
        $catalog = (new Catalog())->setName(Catalog::ROOT);
        $this->em->persist($catalog);
        $this->em->flush();
        $io->success('Root créé');
        return Command::SUCCESS;
    }
}
