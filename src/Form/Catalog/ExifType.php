<?php

namespace App\Form\Catalog;

use App\Entity\Catalog\Exif;
use App\Entity\Catalog\Exif\Row;
use App\Form\Catalog\Exif\RowType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ExifType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('rows', CollectionType::class, [
            // each entry in the array will be an "email" field
            'entry_type' => RowType::class,
            'allow_add' => true,
            'allow_delete' => true,
            // these options are passed to each "email" type
            'entry_options' => [
                'attr' => ['class' => 'picture-exif-row'],
            ],
        ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Exif::class,
        ]);
    }
}
