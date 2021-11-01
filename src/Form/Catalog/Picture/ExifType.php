<?php
    
    namespace App\Form\Catalog\Picture;
    
    use App\Entity\Catalog\Picture\Exif;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\CallbackTransformer;
    use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
    use Symfony\Component\Form\Extension\Core\Type\DateType;
    use Symfony\Component\Form\Extension\Core\Type\NumberType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;

    class ExifType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options): void
        {
            $builder
                ->add('title', TextType::class, [
                    'required' => false,
                ])
                ->add('author', TextType::class, [
                    'required' => false,
                ])
                ->add('camera', TextType::class, [
                    'required' => false,
                ])
                ->add('caption', TextType::class, [
                    'required' => false,
                ])
                ->add('copyright', TextType::class, [
                    'required' => false,
                ])
                ->add('creationdate', DateType::class, [
                    'required' => false,
                    'widget' => 'single_text',
                ])
                ->add('credit', TextType::class, [
                    'required' => false,
                ])
                ->add('aperture', TextType::class, [
                    'required' => false,
                ])
                ->add('exposure', TextType::class, [
                    'required' => false,
                ])
                ->add('focalLength', NumberType::class, [
                    'required' => false,
                ])
                ->add('focalDistance', TextType::class, [
                    'required' => false,
                ])
                ->add('iso', NumberType::class, [
                    'required' => false,
                    'scale' => 0
                ])
                ->add('colorSpace', TextType::class, [
                    'required' => false,
                ])
                ->add('fileSize', NumberType::class, [
                    'required' => false,
                    'scale' => 0
                ])
                ->add('height', NumberType::class, [
                    'required' => false,
                    'scale' => 0
                ])
                ->add('width', NumberType::class, [
                    'required' => false,
                    'scale' => 0
                ])
                ->add('horizontalResolution', NumberType::class, [
                    'required' => false,
                    'scale' => 0
                ])
                ->add('verticalResolution', NumberType::class, [
                    'required' => false,
                    'scale' => 0
                ])
                ->add('headline', TextType::class, [
                    'required' => false,
                ])
                ->add('jobTitle', TextType::class, [
                    'required' => false,
                ])
                ->add('keywords', TextareaType::class, [
                    'required' => false,
                    'help' => 'Separate by comma'
                ])
                ->add('mimeType', TextType::class, [
                    'required' => false,
                ])
                ->add('orientation', ChoiceType::class, [
                    'required' => false,
                    'choices' => [
                        'normal(top to bottom, left to right)' => 0,
                        'flipped horizontally(top to botom, right to left)' => 1,
                        'rotated 180°(bottom to top, right to left)' => 2,
                        'flipped vertically(bottom to top, left to right)' => 3,
                        'transposed(left to right, top to bottom)' => 4,
                        'rotated 90° clockwise(right to left, top to bottom)' => 5,
                        'transverse(right to left, bottom to top)' => 6,
                        'rotated 90° counter - clockwise(left to right, bottom to top)' => 7,
                    ]
                ])
                ->add('software', TextType::class, [
                    'required' => false,
                ])
                ->add('source', TextType::class, [
                    'required' => false,
                ])
                ->add('gps', TextType::class, [
                    'required' => false,
                    'help' => 'Separate by comma'
                ])
            ;
            
            
            $builder->get('keywords')
                    ->addModelTransformer(new CallbackTransformer(
                        function ($tagsAsArray) {
                            // transform the array to a string
                            return implode(',', $tagsAsArray);
                        },
                        function ($tagsAsString) {
                            // transform the string back to an array
                            return explode(',', $tagsAsString);
                        }
                    ))
            ;
            $builder->get('gps')
                    ->addModelTransformer(new CallbackTransformer(
                        function ($gpsAsArray) {
                            // transform the array to a string
                            return implode(',', $gpsAsArray);
                        },
                        function ($gpsAsString) {
                            // transform the string back to an array
                            return explode(',', $gpsAsString);
                        }
                    ))
            ;
        }
        
        public function configureOptions(OptionsResolver $resolver): void
        {
            $resolver->setDefaults([
                'data_class' => Exif::class,
            ]);
        }
    }