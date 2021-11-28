<?php

namespace App\MessageHandler;

use App\Entity\Catalog\Picture;
use App\Message\ImageDownload;
use App\Message\UploadZipMessage;
use App\Repository\Catalog\CatalogRepository;
use App\Service\Catalog\PictureExifPopulator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

final class UploadZipMessageHandler implements MessageHandlerInterface
{
    private CatalogRepository $catalogRepository;
    private EntityManagerInterface $em;
    
    public function __construct(CatalogRepository $catalogRepository, EntityManagerInterface $em)
    {
        $this->catalogRepository = $catalogRepository;
        $this->em = $em;
    }
    
    public function __invoke(UploadZipMessage $message)
    {
        if (!$catalogId = $this->getPicture($message->getCatalogId())) {
            return;
        }
        
        if(!is_file($message->getZipPath())){
            return;
        }
        
        $catalog = $this->catalogRepository->byIdAdmin($catalogId);
    }
}
