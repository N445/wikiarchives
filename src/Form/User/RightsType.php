<?php

namespace App\Form\User;

use App\Entity\User\Rights;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RightsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('hasVersionCreator', CheckboxType::class, [
                'label' => 'Droit de proposer une version',
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Rights::class,
        ]);
    }
}
