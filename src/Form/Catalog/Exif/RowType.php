<?php

namespace App\Form\Catalog\Exif;

use App\Entity\Catalog\Exif\Row;
use Doctrine\Common\Util\ClassUtils;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RowType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {

        $builder
            ->add('label');

        $builder->addEventListener(FormEvents::POST_SET_DATA, function (FormEvent $event) {

            $form = $event->getForm();
            /** @var Row $row */
            $row = $event->getData();
            if ($row) {
                $this->setType($row, $form);
            } else {
                $form->add('value');
            }
        });
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Row::class,
        ]);
    }

    private function setType(Row $row, $form)
    {
        $valueUnserialize = $row->getValueUnserialize();
        if ('object' !== gettype($valueUnserialize)) {
            $form->add('value', TextType::class, [
                'data' => $row->getValueUnserialize()
            ]);
            return;
        }


        if (ClassUtils::getClass($valueUnserialize) === \DateTime::class) {
            $form->add('value', DateType::class, [
                'data' => $row->getValueUnserialize(),
                'widget' => 'single_text'
            ]);
            return;
        }

        $form->add('value', TextType::class, [
            'data' => $row->getValueUnserialize()
        ]);
        return;
    }
}
