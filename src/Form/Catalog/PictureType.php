<?php

namespace App\Form\Catalog;

use App\Entity\Catalog\Picture;
use App\Form\Catalog\Picture\ExifType;
use App\Form\Catalog\Picture\PictureFileType;
use App\Form\Catalog\Picture\VersionType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PictureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('enabled', CheckboxType::class, [
                'label' => 'Visible',
                'required' => false,
            ])
            ->add('validatedVersion', VersionType::class)
            ->add('file', PictureFileType::class,[
                'data'=>   $builder->getData()->getfile()
            ])
            ->add('catalog');
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Picture::class,
        ]);
    }
}
