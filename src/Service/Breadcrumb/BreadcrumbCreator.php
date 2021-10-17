<?php

namespace App\Service\Breadcrumb;

use App\Entity\Catalog\Catalog;
use App\Entity\Catalog\Picture;
use App\Model\Breadcrumb\Breadcrumb;
use App\Model\Breadcrumb\BreadcrumbLink;
use Doctrine\Common\Util\ClassUtils;
use Symfony\Component\Routing\RouterInterface;

class BreadcrumbCreator
{
    private RouterInterface $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    /**
     * @param $object
     * @return Breadcrumb|void
     * @throws \Exception
     */
    public function getBreadcrumb($object): Breadcrumb
    {
        if (!in_array(ClassUtils::getClass($object), [Catalog::class, Picture::class])) {
            throw new \Exception(sprintf('La class "" n\'est pas valide', ClassUtils::getClass($object)));
        }
        if (Catalog::class === ClassUtils::getClass($object)) {
            return $this->getCatalogBreadcrumb($object);
        }
        if (Picture::class === ClassUtils::getClass($object)) {
            return $this->getPictureBreadcrumb($object);
        }
    }

    /**
     * @param Catalog $object
     * @return Breadcrumb
     */
    private function getCatalogBreadcrumb(Catalog $object): Breadcrumb
    {
        $breadcrumb = (new Breadcrumb())->addLink((new BreadcrumbLink())
            ->setTitle($object->getName())
            ->setLink($this->router->generate('CATALOG', ['id' => $object->getId()]))
            ->setIsActual(true)
        );

        if ($parent = $object->getParent()) {
            $this->addCatalogBreadcrumbLink($breadcrumb, $parent);
        }

        return $breadcrumb;
    }

    /**
     * @param Picture $object
     * @return Breadcrumb
     */
    private function getPictureBreadcrumb(Picture $object): Breadcrumb
    {
        $breadcrumb = (new Breadcrumb())->addLink((new BreadcrumbLink())
            ->setTitle($object->getName())
            ->setLink($this->router->generate('PICTURE', [
                'catalogId' => $object->getCatalog()->getId(),
                'id' => $object->getId(),
            ]))
            ->setIsActual(true)
        );

        if ($parent = $object->getCatalog()) {
            $this->addCatalogBreadcrumbLink($breadcrumb, $parent);
        }

        return $breadcrumb;
    }

    private function addCatalogBreadcrumbLink(Breadcrumb $breadcrumb, Catalog $object)
    {
        $breadcrumb->addLink((new BreadcrumbLink())
            ->setTitle($object->getName())
            ->setLink($this->router->generate('CATALOG', ['id' => $object->getId()]))
            ->setIsActual(false)
        );
        if ($parent = $object->getParent()) {
            $this->addCatalogBreadcrumbLink($breadcrumb, $parent);
        }
    }


}