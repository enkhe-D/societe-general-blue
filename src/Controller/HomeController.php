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
            'filterPictos' => $this->getFilterPictos(),
            'associations' => $associations,
        ]);
    }

    private function getFilterPictos(): array
    {
        return [
            7 => 'fa-laptop-file',
            8 => 'fa-building',
            9 => 'fa-house-user',

            11 => 'fa-calendar-check',
            10 => 'fa-calendar-check',
            12 => 'fa-calendar-check',
            13 => 'fa-calendar-check',
            14 => 'fa-calendar-check',

            15 => 'fa-graduation-cap',
            16 => 'fa-hands-holding-child',
            17 => 'fa-book-open-reader',
            18 => 'fa-graduation-cap',
            19 => 'fa-child-dress',
            20 => 'fa-people-carry-box',
            21 => 'fa-user-graduate',
            22 => 'fa-comments',
            23 => 'fa-graduation-cap',
            24 => 'fa-user-clock',
            25 => 'fa-person-walking-luggage',
            26 => 'fa-graduation-cap',
            27 => 'fa-book-open-reader',

        ];
    }
}
