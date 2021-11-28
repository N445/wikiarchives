<?php

namespace App\Form;

use App\Entity\User;
use App\Form\User\InfoType;
use App\Form\User\RightsType;
use App\Service\User\UserRoles;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Security;

class UserBackOfficeType extends AbstractType
{
    private Security $security;
    
    public function __construct(Security $security)
    {
        $this->security = $security;
    }
    
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('isVerified', CheckboxType::class, [
                'label' => 'Compte vérifié',
                'required' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('isBlocked', CheckboxType::class, [
                'label' => 'Compte bloqué',
                'required' => false,
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email'
            ])
            ->add('roles', ChoiceType::class, [
                'multiple' => true,
                'expanded' => true,
                'choices' => $this->getRolesChoices(),
                'label_attr' => [
                    'class' => 'checkbox-switch',
                ],
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
    
    private function getRolesChoices()
    {
        if ($this->security->isGranted(UserRoles::ROLE_SUPER_ADMIN)) {
            return [
                'Super Administrateur' => UserRoles::ROLE_SUPER_ADMIN,
                'Administrateur' => UserRoles::ROLE_ADMIN,
                'Modérateur' => UserRoles::ROLE_MODERATOR,
                'Contributeur' => UserRoles::ROLE_CONTRIBUTOR,
            ];
        }
        if ($this->security->isGranted(UserRoles::ROLE_ADMIN)) {
            return [
                'Administrateur' => UserRoles::ROLE_ADMIN,
                'Modérateur' => UserRoles::ROLE_MODERATOR,
                'Contributeur' => UserRoles::ROLE_CONTRIBUTOR,
            ];
        }
        return [
            'Modérateur' => UserRoles::ROLE_MODERATOR,
            'Contributeur' => UserRoles::ROLE_CONTRIBUTOR,
        ];
    }
}
