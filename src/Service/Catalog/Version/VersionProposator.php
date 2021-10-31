<?php

namespace App\Service\Catalog\Version;

use App\Entity\Catalog\Picture;
use App\Entity\Catalog\Picture\Version;
use App\Form\Catalog\Picture\VersionType;
use App\Service\Catalog\Version\PictureVersionCloner;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;

class VersionProposator
{
    private FormFactoryInterface $formFactory;
    private FormInterface $form;
    private EntityManagerInterface $em;
    
    public function __construct(
        FormFactoryInterface   $formFactory,
        EntityManagerInterface $em
    )
    {
        $this->formFactory = $formFactory;
        $this->em = $em;
    }
    
    /**
     * @param Picture $picture
     * @return array
     */
    public function getNewVersion(Picture $picture): array
    {
        $newVersion = PictureVersionCloner::cloneVersion($picture);
        
        $this->form = $this->formFactory->create(VersionType::class, $newVersion);
        
        return [
            'form' => $this->form,
            'newVersion' => $newVersion,
        ];
    }
    
    public function proposeVersion(Version $version, Picture $picture)
    {
        $picture->addTmpVersion($version);
        $this->em->flush();
    }
}