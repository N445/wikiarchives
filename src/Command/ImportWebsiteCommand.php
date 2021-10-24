<?php

namespace App\Command;

use App\Service\Importator\ImportatorFromWebsite;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:import:website',
    description: 'Add a short description for your command',
)]
class ImportWebsiteCommand extends Command
{
    private ImportatorFromWebsite $importatorFromWebsite;
    
    public function __construct(string $name = null, ImportatorFromWebsite $importatorFromWebsite)
    {
        parent::__construct($name);
        $this->importatorFromWebsite = $importatorFromWebsite;
    }
    
    protected function configure(): void
    {
    }
    
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $this->importatorFromWebsite->import();
        
        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');
        
        return Command::SUCCESS;
    }
}
