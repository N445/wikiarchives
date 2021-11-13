<?php

namespace App\Form\Catalog;

use App\Entity\Catalog\Picture;
use App\Form\Catalog\Picture\PictureFileType;
use App\Form\Catalog\Picture\VersionType;
use App\Service\Catalog\PictureLicenseHelper;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PictureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('enabled', CheckboxType::class, [
                'label' => 'Visible',
                'required' => false,
            ])
            ->add('isEditedByWikiarchives', CheckboxType::class, [
                'label' => 'Modifié par Wikiarchives',
                'required' => false,
            ])
            ->add('license', ChoiceType::class, [
                'label' => 'License',
                'choices' => PictureLicenseHelper::getLicensesChoices()
            ])
            ->add('validatedVersion', VersionType::class)
            ->add('file', PictureFileType::class,[
                'data'=>   $builder->getData()->getfile()
            ])
            ->add('catalog');
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Picture::class,
        ]);
    }
}
