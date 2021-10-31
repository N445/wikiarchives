<?php

namespace App\Command;

use App\Repository\Catalog\Picture\VersionRepository;
use App\Service\Catalog\Version\PictureVersionHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'picture:version:remove-tmp',
    description: 'Add a short description for your command',
)]
class PictureVersionRemoveTmpCommand extends Command
{
    private VersionRepository $versionRepository;
    private EntityManagerInterface $em;
    
    public function __construct(string $name = null, VersionRepository $versionRepository, EntityManagerInterface $em)
    {
        parent::__construct($name);
        $this->versionRepository = $versionRepository;
        $this->em = $em;
    }
    
    protected function configure(): void
    {
    
    }
    
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        
        $versions = $this->versionRepository->getByType( PictureVersionHelper::TYPE_TMP);
        
        foreach ($versions as $version) {
            $this->em->remove($version);
            $this->em->flush();
        }
        $this->em->flush();
        
        
        $io->success(sprintf('%d versions supprimées', count($versions)));
        
        return Command::SUCCESS;
    }
}
