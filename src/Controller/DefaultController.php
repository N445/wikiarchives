<?php
    
    namespace App\Controller;


    use App\Form\Catalog\Picture\VersionType;
    use App\Provider\CatalogProvider;
    use App\Provider\PictureProvider;
    use App\Security\Voter\PictureVersionVoter;
    use App\Service\Catalog\PictureDownloadProvider;
    use App\Service\Catalog\PictureVersionCloner;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    class DefaultController extends AbstractController
    {
        private CatalogProvider $catalogProvider;
        private PictureProvider $pictureProvider;
    
        public function __construct(
            CatalogProvider   $catalogProvider,
            PictureProvider   $pictureProvider
        )
        {
            $this->catalogProvider = $catalogProvider;
            $this->pictureProvider = $pictureProvider;
        }
    
        #[Route('/', name: 'HOMEPAGE')]
        public function index(): Response
        {
            return $this->render('default/index.html.twig', [
                'root' => $this->catalogProvider->root(),
            ]);
        }
    
        #[Route('/search', name: 'SEARCH')]
        public function search(Request $request): Response
        {
            $query = $request->get('q');
            return $this->render('default/search.html.twig', [
                'catalogs' => $this->catalogProvider->search($query),
                'pictures' => $this->pictureProvider->search($query),
                'query' => $query,
            ]);
        }
    
        #[Route('/catalog/{id}', name: 'CATALOG')]
        public function catalog(?int $id = null): Response
        {
            if (!$id) {
                return $this->redirectToRoute('HOMEPAGE');
            }
            if (!$catalog = $this->catalogProvider->byId($id)) {
                return $this->redirectToRoute('HOMEPAGE');
            }
    
            return $this->render('default/catalog.html.twig', [
                'catalog' => $catalog,
            ]);
        }
    
        #[Route('/catalog/{catalogId}/picture/{id}', name: 'PICTURE')]
        public function picture(?int $catalogId = null, ?int $id = null): Response
        {
            if (!$id) {
                return $this->redirectToRoute('HOMEPAGE');
            }
            if (!$picture = $this->pictureProvider->byId($id)) {
                return $this->redirectToRoute('HOMEPAGE');
            }
    
            return $this->render('default/picture.html.twig', [
                'picture' => $picture,
            ]);
        }
    
        #[Route('/catalog/{catalogId}/picture/{id}/download/{size}', name: 'PICTURE_DOWNLOAD')]
        public function pictureDownload(?int $catalogId = null, ?int $id = null, ?string $size, Request $request, PictureDownloadProvider $pictureDownloadProvider)
        {
            if (!$id) {
                return $this->redirectToRoute('HOMEPAGE');
            }
            if (!$picture = $this->pictureProvider->byId($id)) {
                return $this->redirectToRoute('HOMEPAGE');
            }

//            return $this->redirect($pictureDownloadProvider->getResizedPicture($picture, $size));
            return$pictureDownloadProvider->getResizedPicture($picture, $size);
        }
    
    
        #[Route('/catalog/{catalogId}/picture/{id}/change', name: 'PICTURE_CHANGE')]
        public function pictureChange(?int $catalogId = null, ?int $id = null, Request $request): Response
        {
            if (!$this->getUser()) {
                $this->addFlash('info', 'You must be connected to propose a new version');
                return $this->redirectToRoute('APP_LOGIN');
            }
    
    
            if (!$id) {
                return $this->redirectToRoute('HOMEPAGE');
            }
            if (!$picture = $this->pictureProvider->byId($id)) {
                return $this->redirectToRoute('HOMEPAGE');
            }
    
            if (!$this->isGranted(PictureVersionVoter::PICTURE_VERSION_CREATE, $this->getUser())) {
                return $this->redirectToRoute('PICTURE', [
                    'catalogId' => $picture->getCatalog()->getId(),
                    'id' => $picture->getId(),
                ]);
            }
    
            $newVersion = PictureVersionCloner::cloneVersion($picture);
    
            $form = $this->createForm(VersionType::class, $newVersion);
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                $picture->addTmpVersion($newVersion);
                $em->flush();
                $this->addFlash('success', 'Thanks for your participation');
                return $this->redirectToRoute('PICTURE', [
                    'catalogId' => $picture->getCatalog()->getId(),
                    'id' => $picture->getId(),
                ]);
            }
    
            return $this->render('default/change.html.twig', [
                'picture' => $picture,
                'newVersion' => $newVersion,
                'form' => $form->createView(),
            ]);
        }
    }
