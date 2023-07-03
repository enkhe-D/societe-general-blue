<?php

namespace App\DataFixtures;

use App\Entity\Association;
use App\Entity\Filter;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $regions = [
            'Ile-de-France',
            'Normandie',
            'Nouvelle Aquitaine',
            'Occitanie',
            'Pays de La Loire',
            'Provence-Alpes-Côte d\'Azur',
        ];
        foreach ($regions as $i => $region) {
            $filter = new Filter();
            $filter->setType('region');
            $filter->setText($region);
            $manager->persist($filter);
            $this->addReference('region_' . $i, $filter);
        }

        $modesDeTravail = [
            'Uniquement à distance, depuis chez moi ou sur mon lieu de travail, la digitalisation ça a du bon',
            'En toute flexibilité, je peux me déplacer mais par téléphone ou visio cela me convient aussi',
            'Uniquement en présentiel, le contact humain c\'est plus sympa',
        ];
        foreach ($modesDeTravail as $i => $modeDeTravail) {
            $filter = new Filter();
            $filter->setType('mode-de-travail');
            $filter->setText($modeDeTravail);
            $manager->persist($filter);
            $this->addReference('modeDeTravail_' . $i, $filter);
        }

        $disponibilites = [
            'Pendant environ 6 mois, à raison de 4h/mois : un rdv hebdomadaire plutôt sympa',
            'Pendant quelques mois (2 à 6) à raison de 2h/mois : de la flexibilité pour m\'engager',
            'Sur toute une année scolaire, à raison d\'1h-2h/mois : la continuité c\'est la clé',
            'Pour 6 mois ou plus, à raison de 1h-3h/mois : de la flexibilité pour m\'engager',
            'Pour 6 mois ou plus, à raison de 4h/mois : la continuité c\'est la clé',
        ];
        foreach ($disponibilites as $i => $disponibilite) {
            $filter = new Filter();
            $filter->setType('disponibilite');
            $filter->setText($disponibilite);
            $manager->persist($filter);
            $this->addReference('disponibilite_' . $i, $filter);
        }

        $missions = [
            "En accompagnant un jeune dans sa scolarité pour favoriser sa réussite académique",
            "En accompagnant un jeune confié à l'Aide Sociale à l'Enfance pour l'aider à accéder au monde académique et professionnel",
            "En partageant mon expérience professionnelle avec des étudiants",
            "En cheminant avec un étudiant vers sa réussite académique et son insertion professionnelle",
            "En tant que collaboratrice, en accompagnant des jeunes filles vers leur réussite",
            "En tant que collaborateur ou collaboratrice, en mentorant un jeune de lycée professionnel pour l'aider dans son orientation",
            "En accompagnant un jeune diplomé dans son insertion professionnelle",
            "En échangeant avec des jeunes engagés pour les aider à valoriser leur parcours",
            "En accompagnant un jeune, collégien ou lycéen, dans son orientation et son insertion professionnelle",
            "Mon profil ne correspond pas à cette mission, je choisis un nouveau créneau d'engagement",
            "En accompagnant des personnes réfugiées dans leur insertion professionnelle et leur recherche d’emploi",
            "En mentorant un jeune de lycée professionnel pour l'aider dans son orientation",
            "En mettant à profit mes 25 ans d'expérience professionnelle pour accompagner un jeune issu de l'immigration vers l'emploi",
        ];

        foreach ($missions as $i => $mission) {
            $filter = new Filter();
            $filter->setType('mission');
            $filter->setText($mission);
            $manager->persist($filter);
            $this->addReference('mission_' . $i, $filter);
        }

        $asso = new Association();
        $asso->setName('Association 1');
        $asso->addFilter($this->getReference('region_0'));
        $asso->addFilter($this->getReference('modeDeTravail_0'));
        $asso->addFilter($this->getReference('disponibilite_0'));
        $asso->addFilter($this->getReference('mission_0'));

        $manager->persist($asso);

        $asso = new Association();
        $asso->setName('Association 2');
        $asso->addFilter($this->getReference('region_1'));
        $asso->addFilter($this->getReference('modeDeTravail_1'));
        $asso->addFilter($this->getReference('disponibilite_1'));
        $asso->addFilter($this->getReference('mission_1'));

        $manager->persist($asso);

        $asso = new Association();
        $asso->setName('Association 3');
        $asso->addFilter($this->getReference('region_0'));
        $asso->addFilter($this->getReference('modeDeTravail_2'));
        $asso->addFilter($this->getReference('disponibilite_0'));
        $asso->addFilter($this->getReference('mission_1'));

        $manager->persist($asso);

        $manager->flush();
    }
}
