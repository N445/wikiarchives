<?php

namespace App\Form\Actuality;

use App\Entity\Actuality\Actuality;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ActualityType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'actuality.properties.title'
            ])
            ->add('content', TextareaType::class, [
                'label' => 'actuality.properties.content',
                'attr' => [
                    'class' => 'wysiwyg'
                ]
            ])
            ->add('isVisible', CheckboxType::class, [
                'label' => 'actuality.properties.isVisible'
            ])
        ;
    }
    
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Actuality::class,
            'translation_domain' => 'admin'
        ]);
    }
}
