<?php

namespace App\Form\Catalog;

use App\Entity\Catalog\Place;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PlaceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'zone.properties.name',
            ])
            ->add('location', TextType::class, [
                'label' => 'zone.properties.front_name',
                'required' => false
            ])
            ->add('lat', TextType::class, [
                'label' => 'zone.properties.lat',
                'attr' => [
                    'class' => 'place-map-lat'
                ]
            ])
            ->add('lng', TextType::class, [
                'label' => 'zone.properties.lng',
                'attr' => [
                    'class' => 'place-map-lng'
                ]
            ])
            ->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) {
                if(!$event->getData()->getLocation()){
                    $event->getData()->setLocation($event->getData()->getName());
                }
            })
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Place::class,
            'translation_domain' => 'admin',
        ]);
    }
}
