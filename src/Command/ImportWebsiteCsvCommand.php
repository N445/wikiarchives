<?php

namespace App\Command;

use App\Service\Importator\ImportatorFromWebsite;
use App\Service\Importator\ImportatorFromWebsiteToCsv;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:import:website:csv',
    description: 'Add a short description for your command',
)]
class ImportWebsiteCsvCommand extends Command
{
    private ImportatorFromWebsiteToCsv $importatorFromWebsiteToCsv;
    
    public function __construct(string $name = null, ImportatorFromWebsiteToCsv $importatorFromWebsiteToCsv)
    {
        parent::__construct($name);
        $this->importatorFromWebsiteToCsv = $importatorFromWebsiteToCsv;
    }
    
    protected function configure(): void
    {
    }
    
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $this->importatorFromWebsiteToCsv->import();
        
        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');
        
        return Command::SUCCESS;
    }
}
