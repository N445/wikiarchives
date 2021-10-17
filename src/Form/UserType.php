<?php
    
    namespace App\Form;
    
    use App\Entity\User;
    use App\Form\User\InfoType;
    use App\Form\User\RightsType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    
    class UserType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options): void
        {
            $builder
                ->add('email')
                ->add('isVerified')
                ->add('info', InfoType::class)
                ->add('rights', RightsType::class)
            ;
        }
        
        public function configureOptions(OptionsResolver $resolver): void
        {
            $resolver->setDefaults([
                'data_class' => User::class,
            ]);
        }
    }
