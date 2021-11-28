<?php
    
    namespace App\Form\Catalog\Picture;
    
    use App\Entity\Catalog\Picture\Version;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\CallbackTransformer;
    use Symfony\Component\Form\Extension\Core\Type\DateType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;

    class VersionType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options): void
        {
            $builder
                ->add('name', TextType::class, [
                    'label' => 'Nom',
                    'required' => false
                ])
                ->add('description', TextareaType::class, [
                    'label' => 'Description',
                    'required' => false,
                    'attr' => [
                        'class' => 'wysiwyg',
                    ]
                ])
                ->add('author', TextType::class, [
                    'label' => 'Auteur',
                    'required' => false,
                ])
                ->add('creationdate', TextType::class, [
                    'label' => 'Date de prise de vue',
                    'required' => false,
                    'attr' => [
                        'class' => 'flatpikr-taken-at'
                    ],
                ])
                ->add('credit', TextType::class, [
                    'label' => 'Credit',
                    'required' => false,
                ])
                ->add('source', TextType::class, [
                    'label' => 'Source',
                    'required' => false,
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
                'data_class' => Version::class,
            ]);
        }
    }
