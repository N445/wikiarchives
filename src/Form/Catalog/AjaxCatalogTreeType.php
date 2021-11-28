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
                    'label' => 'Nom'
                ])
                ->add('description', TextareaType::class, [
                    'label' => 'Description',
                    'required' => false,
                    'attr' => [
                        'class' => 'wysiwyg'
                    ]
                ])
                ->add('enabled', CheckboxType::class, [
                    'label' => 'Visible',
                    'required' => false,
                ])
                ->add('parent', EntityType::class, [
                    'label' => 'Catalog parent',
                    'class' => Catalog::class,
                    'required' => false,
                    'choice_label' => 'name',
                ])
                ->add('place', EntityType::class, [
                    'label' => 'Zone',
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
            ]);
        }
    }
