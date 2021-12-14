<?php

namespace App\Form\Catalog;

use App\Model\Catalog\PicturesDuplicateRemover;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PicturesDuplicateRemoverType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('keys', HiddenType::class, [
                'required' => false,
            ])
        ;
        
        $builder->get('keys')->addModelTransformer(new CallbackTransformer(
            function ($tagsAsArray) {
                // transform the array to a string
                return implode(',', $tagsAsArray);
            },
            function ($tagsAsString) {
                // transform the string back to an array
                return explode(',', $tagsAsString);
            }
        ));
    }
    
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PicturesDuplicateRemover::class,
        ]);
    }
}
