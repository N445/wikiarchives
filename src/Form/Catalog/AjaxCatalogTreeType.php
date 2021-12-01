<?php
    
    namespace App\Form\Catalog;
    
    use App\Entity\Catalog\Catalog;
    use App\Entity\Catalog\Place;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    
    class AjaxCatalogTreeType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options): void
        {
            $builder
                ->add('name', TextType::class, [
                    'label' => 'catalog.properties.name'
                ])
                ->add('description', TextareaType::class, [
                    'label' => 'catalog.properties.description',
                    'required' => false,
                    'attr' => [
                        'class' => 'wysiwyg'
                    ]
                ])
                ->add('enabled', CheckboxType::class, [
                    'label' => 'catalog.properties.enabled',
                    'required' => false,
                ])
                ->add('parent', EntityType::class, [
                    'label' => 'catalog.properties.parent',
                    'class' => Catalog::class,
                    'required' => false,
                    'choice_label' => 'name',
                ])
                ->add('place', EntityType::class, [
                    'label' => 'catalog.properties.place',
                    'class' => Place::class,
                    'required' => false,
                    'choice_label' => 'name',
                ])
            ;
        }
        
        public function configureOptions(OptionsResolver $resolver): void
        {
            $resolver->setDefaults([
                'data_class' => Catalog::class,
                'translation_domain' => 'admin',
            ]);
        }
    }
