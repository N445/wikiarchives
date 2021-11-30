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
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PictureMassEditType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $catalog = $builder->getData()->getOriginalCatalog();
        
        $builder
            ->add('delete', CheckboxType::class, [
                'label' => 'catalog.form.mass_edit.delete',
                'required' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('enabled', CheckboxType::class, [
                'label' => 'catalog.form.mass_edit.enabled',
                'required' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('isEditedByWikiarchives', CheckboxType::class, [
                'label' => 'catalog.form.mass_edit.isEditedByWikiarchives',
                'required' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('license', ChoiceType::class, [
                'label' => 'catalog.form.mass_edit.license',
                'required' => false,
                'choices' => PictureLicenseHelper::getLicensesChoices(),
                'attr' => [
                    'class' => 'select2'
                ]
            ])
            ->add('author', TextType::class, [
                'label' => 'catalog.form.mass_edit.author',
                'required' => false,
            ])
            ->add('creationdate', TextType::class, [
                'label' => 'catalog.form.mass_edit.creationdate',
                'required' => false,
                'attr' => [
                    'class' => 'flatpikr-taken-at'
                ],
            ])
            ->add('credit', TextType::class, [
                'label' => 'catalog.form.mass_edit.credit',
                'required' => false,
            ])
            ->add('source', TextType::class, [
                'label' => 'catalog.form.mass_edit.source',
                'required' => false,
            ])
            ->add('newCatalog', EntityType::class, [
                'label' => 'catalog.form.mass_edit.newCatalog',
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
                'label' => 'catalog.form.mass_edit.place',
                'class' => Place::class,
                'required' => false,
                'attr' => [
                    'class' => 'select2'
                ]
            ])
            ->add('pictures', EntityType::class, [
                'label' => 'catalog.form.mass_edit.pictures',
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
    
        $builder->get('creationdate')->addModelTransformer(new CallbackTransformer(
            function (?\DateTime $objectToString) {
                return $objectToString?->format('Y-m-d H:i:s');
            },
            function (?string $stringToObject) {
                return $stringToObject ? new \DateTime($stringToObject) : null;
            }
        ));
    }
    
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PicturesMassEdit::class,
            'translation_domain' => 'admin',
        ]);
    }
}
