<?php

namespace App\Form\Catalog;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Entity\Catalog\Place;
use App\Form\Catalog\Picture\VersionMassType;
use App\Model\Catalog\PicturesMassEdit;
use App\Service\Catalog\PictureLicenseHelper;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PictureMassEditType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $catalog = $builder->getData()->getOriginalCatalog();
        
        $builder
            ->add('enabled', CheckboxType::class, [
                'label' => 'Visible',
                'required' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('isEditedByWikiarchives', CheckboxType::class, [
                'label' => 'Modifié par Wikiarchives',
                'required' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('license', ChoiceType::class, [
                'label' => 'License',
                'required' => false,
                'choices' => PictureLicenseHelper::getLicensesChoices()
            ])
            ->add('author', TextType::class, [
                'label' => 'Auteur',
                'required' => false,
            ])
            ->add('creationdate', DateType::class, [
                'label' => 'Date de prise de vue',
                'required' => false,
                'widget' => 'single_text',
            ])
            ->add('credit', TextType::class, [
                'label' => 'Credit',
                'required' => false,
            ])
            ->add('source', TextType::class, [
                'label' => 'Source',
                'required' => false,
            ])
            ->add('newCatalog', EntityType::class, [
                'class' => Catalog::class,
                'required' => false,
                'attr' => [
                    'class' => 'select2'
                ],
                'query_builder' => function (EntityRepository $er) use ($catalog) {
                    return $er->createQueryBuilder('c')
                              ->andWhere('c.name != :name')
                              ->setParameter('name', 'root')
                    ;
                },
            ])
            ->add('place', EntityType::class, [
                'class' => Place::class,
                'required' => false,
                'attr' => [
                    'class' => 'select2'
                ]
            ])
            ->add('pictures', EntityType::class, [
                'class' => Picture::class,
                'multiple' => true,
                'required' => false,
                'query_builder' => function (EntityRepository $er) use ($catalog) {
                    return $er->createQueryBuilder('p')
                              ->andWhere('p.catalog = :catalog')
                              ->setParameter('catalog', $catalog)
                    ;
                },
            ])
        ;
    }
    
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PicturesMassEdit::class,
        ]);
    }
}
