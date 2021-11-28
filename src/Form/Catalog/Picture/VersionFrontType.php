<?php
    
    namespace App\Form\Catalog\Picture;
    
    use App\Entity\Catalog\Picture\Version;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\DateType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    
    class VersionFrontType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options): void
        {
            $builder
                ->add('name', TextType::class, [
                    'required' => false
                ])
                ->add('description', TextareaType::class, [
                    'required' => false,
                    'attr' => [
                        'class' => 'wysiwyg',
                    ]
                ])
                ->add('userComment', TextareaType::class, [
                    'required' => false,
                    'attr' => [
                        'class' => 'wysiwyg',
                    ]
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
                ->add('lat', TextType::class, [
                    'required' => false,
                    'attr' => [
                        'class' => 'place-map-lat'
                    ]
                ])
                ->add('lng', TextType::class, [
                    'required' => false,
                    'attr' => [
                        'class' => 'place-map-lng'
                    ]
                ])
            ;
        }
        
        public function configureOptions(OptionsResolver $resolver): void
        {
            $resolver->setDefaults([
                'data_class' => Version::class,
            ]);
        }
    }
