<?php

namespace App\Controller;

use App\Entity\Association;
use App\Entity\Filter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(EntityManagerInterface $entityManager, Request $request): Response
    {
        $filters = $entityManager->getRepository(Filter::class)->findAll();

        $associations = $entityManager->getRepository(Association::class)->findAll();

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'filters' => $filters,
            'associations' => $associations,
        ]);
    }
}
