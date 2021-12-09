<?php

namespace App\Form;

use App\Entity\Contact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname', TextType::class, [
                'label' => 'contact.properties.firstname',
                'attr' => [
                    'placeholder' => 'contact.properties.firstname',
                ],
                'required' => false,
                'row_attr' => [
                    'class' => 'form-floating',
                ]
            ])
            ->add('lastname', TextType::class, [
                'label' => 'contact.properties.lastname',
                'attr' => [
                    'placeholder' => 'contact.properties.lastname',
                ],
                'required' => false,
                'row_attr' => [
                    'class' => 'form-floating',
                ]
            ])
            ->add('email', EmailType::class, [
                'label' => 'contact.properties.email',
                'attr' => [
                    'placeholder' => 'contact.properties.email',
                ],
                'row_attr' => [
                    'class' => 'form-floating',
                ]
            ])
            ->add('message', TextareaType::class, [
                'label' => 'contact.properties.message',
                'attr' => [
                    'placeholder' => 'contact.properties.message',
                ],
                'row_attr' => [
                    'class' => 'form-floating',
                ]
            ])
        ;
    }
    
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Contact::class,
            'translation_domain' => 'front',
        ]);
    }
}
