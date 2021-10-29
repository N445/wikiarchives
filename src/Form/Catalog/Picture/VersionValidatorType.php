<?php

namespace App\Form\Catalog\Picture;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

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
            ->add('accepted', SubmitType::class, [
                'label' => 'Accepter',
                'attr' => [
                    'class' => 'btn btn-outline-success w-100'
                ]
            ])
        ;
    }
    
    public function configureOptions(OptionsResolver|\Symfony\Component\OptionsResolver\OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'prexif' => Version::class,
        ]);
    }
//
//    public function getBlockPrefix()
//    {
//        return uniqid();
//    }
}
