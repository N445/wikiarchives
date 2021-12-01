<?php

namespace App\Form\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Entity\Catalog\Place;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CatalogType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('enabled', CheckboxType::class, [
                'label' => 'catalog.properties.enabled',
                'required' => false,
            ])
            ->add('name', TextType::class, [
                'label' => 'catalog.properties.name'
            ])
            ->add('description', TextareaType::class, [
                'label' => 'catalog.properties.description',
                'required' => false,
                'attr' => [
                    'class' => 'wysiwyg'
                ]
            ])
            ->add('recursivInfo', CheckboxType::class, [
                'label' => 'catalog.form.edit.recursive_zone',
                'required' => false,
                'mapped' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('place', EntityType::class, [
                'label' => 'catalog.properties.place',
                'class' => Place::class,
                'required' => false,
                'attr' => [
                    'class' => 'select2'
                ]
            ])
//            ->add('illustration', EntityType::class, [
//                'label' => 'Photo d\'illustration',
//                'class' => Picture::class,
//                'attr' => [
//                    'class' => 'select2'
//                ]
//            ])
        ;
    
        if (!$builder->getData()->getId()) {
            $builder->add('parent');
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Catalog::class,
            'translation_domain' => 'admin',
        ]);
    }
}
