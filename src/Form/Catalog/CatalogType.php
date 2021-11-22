<?php

namespace App\Form\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Place;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CatalogType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nom'
            ])
            ->add('description', TextareaType::class, [
                'label' => 'Description',
                'attr' => [
                    'class' => 'wysiwyg'
                ]
            ])
            ->add('recursivInfo', CheckboxType::class, [
                'label' => 'Zone recursif',
                'required' => false,
                'mapped' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('place', EntityType::class, [
                'label' => 'Zone',
                'class' => Place::class,
                'attr' => [
                    'class' => 'select2'
                ]
            ])
            ->add('imageFile', FileType::class, [
                'required' => !$builder->getData()->getImageName(),
            ])
        ;
    
        if (!$builder->getData()->getId()) {
            $builder->add('parent');
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Catalog::class,
        ]);
    }
}
