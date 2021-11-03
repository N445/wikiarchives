<?php

namespace App\Form\Catalog\Picture;

use App\Entity\Catalog\Picture\Version;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class VersionValidatorType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('refused', SubmitType::class, [
                'label' => 'Refuser',
                'attr' => [
                    'class' => 'btn btn-outline-danger w-100'
                ]
            ])
            ->add('refusedAndBlockUser', SubmitType::class, [
                'label' => 'Refuser et bloquer l\'utilisateur',
                'attr' => [
                    'class' => 'btn btn-outline-danger w-100'
                ]
            ])
            ->add('accepted', SubmitType::class, [
                'label' => 'Accepter',
                'attr' => [
                    'class' => 'btn btn-outline-success w-100'
                ]
            ])
            ->add('accepted2', SubmitType::class, [
                'label' => 'Accepter',
                'attr' => [
                    'class' => 'btn btn-outline-success w-100'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Version::class,
        ]);
    }
}
