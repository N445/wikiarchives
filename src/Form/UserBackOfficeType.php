<?php

namespace App\Form;

use App\Entity\User;
use App\Form\User\InfoType;
use App\Form\User\RightsType;
use App\Service\User\UserRoles;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserBackOfficeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email')
            ->add('isVerified')
            ->add('roles', ChoiceType::class, [
                'multiple' => true,
                'expanded' => true,
                'choices' => [
//                    'Utilisateur' => UserRoles::ROLE_USER,
                    'Administrateur' => UserRoles::ROLE_ADMIN,
                    'Modérateur' => UserRoles::ROLE_MODERATOR,
                    'Contributeur' => UserRoles::ROLE_CONTRIBUTOR,
                ]
            ])
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
