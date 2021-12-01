<?php

namespace App\Form\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Entity\Catalog\Place;
use App\Form\Catalog\Picture\PictureFileType;
use App\Form\Catalog\Picture\VersionType;
use App\Service\Catalog\PictureLicenseHelper;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PictureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('enabled', CheckboxType::class, [
                'label' => 'picture.properties.enabled',
                'required' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('isEditedByWikiarchives', CheckboxType::class, [
                'label' => 'picture.properties.isEditedByWikiarchives',
                'required' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('license', ChoiceType::class, [
                'label' => 'picture.properties.license',
                'choices' => PictureLicenseHelper::getLicensesChoices(),
                'attr' => [
                    'class' => 'select2'
                ]
            ])
            ->add('validatedVersion', VersionType::class, [
                'label' => false
            ])
            ->add('file', PictureFileType::class, [
                'label' => false,
                'data' => $builder->getData()->getfile()
            ])
            ->add('catalog', EntityType::class, [
                'label'=>'picture.properties.catalog',
                'class' => Catalog::class,
                'attr' => [
                    'class' => 'select2'
                ]
            ])
            ->add('catalogsIllustrations', EntityType::class, [
                'label'=>'picture.properties.catalogsIllustrations',
                'class' => Catalog::class,
                'multiple' => true,
                'required' => false,
                'attr' => [
                    'class' => 'select2'
                ]
            ])
            ->add('place', EntityType::class, [
                'label'=>'picture.properties.place',
                'class' => Place::class,
                'attr' => [
                    'class' => 'select2'
                ]
            ])
        ;
    }
    
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Picture::class,
            'translation_domain' => 'admin',
        ]);
    }
}
