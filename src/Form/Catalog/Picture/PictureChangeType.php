<?php

namespace App\Form\Catalog\Picture;

use App\Entity\Catalog\Picture\PictureChange;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PictureChangeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('avaiableFields', ChoiceType::class, [
                'mapped' => false,
                'expanded' => true,
                'multiple' => true,
                'choices' => [
                    'Nom' => 'name'
                ]
            ])
            ->add('fields', CollectionType::class, [
                // each entry in the array will be an "email" field
                'entry_type' => FieldType::class,
                'allow_add' => true,
                'allow_delete' => true,
                // these options are passed to each "email" type
                'entry_options' => [
                    'attr' => ['class' => 'field-row'],
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PictureChange::class,
        ]);
    }
}
