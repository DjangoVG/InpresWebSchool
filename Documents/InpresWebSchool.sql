-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 25 mai 2020 à 15:43
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `inpreswebschool`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

DROP TABLE IF EXISTS `administrateur`;
CREATE TABLE IF NOT EXISTS `administrateur` (
  `nomutilisateur` varchar(50) NOT NULL,
  `motdepasse` varchar(100) NOT NULL,
  PRIMARY KEY (`nomutilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `administrateur`
--

INSERT INTO `administrateur` (`nomutilisateur`, `motdepasse`) VALUES
('regis4d@hotmail.com', '$2y$10$kUp0MZJN0S2562wN.Y/TeeUSymckQMCuG4ZneWR9VIGrbWUZGUJw6');

-- --------------------------------------------------------

--
-- Structure de la table `assister`
--

DROP TABLE IF EXISTS `assister`;
CREATE TABLE IF NOT EXISTS `assister` (
  `AdresseMail` varchar(200) NOT NULL,
  `IdJournee` int(11) NOT NULL,
  `NomCours` varchar(100) NOT NULL,
  `HeureDebut` time NOT NULL,
  `HeureFin` time NOT NULL,
  `IdProfesseur` int(11) NOT NULL,
  PRIMARY KEY (`AdresseMail`,`IdJournee`,`NomCours`,`HeureDebut`,`HeureFin`,`IdProfesseur`),
  KEY `IdJournee` (`IdJournee`),
  KEY `NomCours` (`NomCours`),
  KEY `HeureDebut` (`HeureDebut`),
  KEY `HeureFin` (`HeureFin`),
  KEY `IdProfesseur` (`IdProfesseur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `assister`
--

INSERT INTO `assister` (`AdresseMail`, `IdJournee`, `NomCours`, `HeureDebut`, `HeureFin`, `IdProfesseur`) VALUES
('belgianair@gmail.com', 1, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
('belgianair@gmail.com', 1, 'Mathématiques appliquées au traitement d\'images', '10:30:00', '12:30:00', 4),
('belgianair@gmail.com', 1, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 5),
('belgianair@gmail.com', 3, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
('belgianair@gmail.com', 3, 'Data mining', '08:20:00', '10:20:00', 20),
('belgianair@gmail.com', 3, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20),
('belgianair@gmail.com', 3, 'Stat C++', '15:30:00', '17:00:00', 20),
('belgianair@gmail.com', 5, 'Analyse et gestion de données', '08:50:00', '10:20:00', 8),
('belgianair@gmail.com', 5, 'Analyse et gestion de données', '13:30:00', '15:00:00', 12),
('belgianair@gmail.com', 5, 'Thread', '10:30:00', '12:30:00', 20),
('isen0607@gmail.com', 1, 'Analyse et gestion de données', '08:50:00', '10:20:00', 6),
('isen0607@gmail.com', 1, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
('isen0607@gmail.com', 1, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
('isen0607@gmail.com', 1, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 8),
('manuela.lout@skynet.be', 3, 'Analyse et gestion de données', '10:30:00', '12:00:00', 12),
('manuela.lout@skynet.be', 3, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 9),
('manuela.lout@skynet.be', 4, 'Analyse et gestion de données', '13:30:00', '15:00:00', 17),
('manuela.lout@skynet.be', 4, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
('manuela.lout@skynet.be', 4, 'Logiciel de contrôle', '10:30:00', '13:00:00', 10),
('manuela.lout@skynet.be', 4, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 2),
('manuela.lout@skynet.be', 5, 'Analyse et gestion de données', '08:50:00', '10:20:00', 8),
('manuela.lout@skynet.be', 5, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 19),
('manuela.lout@skynet.be', 5, 'Réseau TCP/IP', '10:30:00', '12:30:00', 12),
('redggg@gmail.com', 1, 'Administration réseaux', '13:30:00', '15:30:00', 10),
('redggg@gmail.com', 1, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 9),
('redggg@gmail.com', 1, 'Logiciel de contrôle', '10:30:00', '13:00:00', 19),
('redggg@gmail.com', 1, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 5),
('regis.evrard.vg@gmail.com', 1, 'Analyse et gestion de données', '13:30:00', '15:00:00', 12),
('regis.evrard.vg@gmail.com', 1, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
('regis.evrard.vg@gmail.com', 1, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 9),
('regis.evrard.vg@gmail.com', 1, 'Logiciel de contrôle', '10:30:00', '13:00:00', 10),
('regis3d@hotmail.com', 1, 'Analyse et gestion de données', '08:50:00', '10:20:00', 6),
('regis3d@hotmail.com', 1, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
('regis3d@hotmail.com', 1, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
('regis3d@hotmail.com', 2, 'Analyse et gestion de données', '13:30:00', '15:00:00', 6),
('regis3d@hotmail.com', 2, 'Anglais technique', '09:20:00', '10:20:00', 11),
('regis3d@hotmail.com', 2, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 7),
('regis4d@hotmail.com', 1, 'Analyse et gestion des données', '08:50:00', '10:20:00', 6),
('regis4d@hotmail.com', 1, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
('regis4d@hotmail.com', 1, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
('regis4d@hotmail.com', 1, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 5),
('regis4dd@hotmail.com', 1, 'Analyse et gestion de données', '08:50:00', '10:20:00', 6),
('regis4dd@hotmail.com', 1, 'Présentation Stage - TFE par les étudiants de 3ème', '10:30:00', '12:00:00', 18),
('regis5d@hotmail.com', 2, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 7),
('regis5d@hotmail.com', 2, 'Logiciel de contrôle', '10:30:00', '13:00:00', 19),
('regis5d@hotmail.com', 2, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20),
('regis5d@hotmail.com', 2, 'Stat C++', '15:30:00', '17:00:00', 20),
('regis5d@hotmail.com', 3, 'Analyse et gestion de données', '10:30:00', '12:00:00', 8),
('regis5d@hotmail.com', 3, 'Data mining', '08:20:00', '10:20:00', 20),
('regis5d@hotmail.com', 3, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 9),
('regis5d@hotmail.com', 3, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20),
('regis5d@hotmail.com', 4, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
('regis5d@hotmail.com', 4, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
('regis5d@hotmail.com', 4, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20);

-- --------------------------------------------------------

--
-- Structure de la table `choisir`
--

DROP TABLE IF EXISTS `choisir`;
CREATE TABLE IF NOT EXISTS `choisir` (
  `AdresseMail` varchar(200) NOT NULL,
  `IdSection` int(11) NOT NULL,
  PRIMARY KEY (`AdresseMail`,`IdSection`),
  KEY `AdresseMail` (`AdresseMail`),
  KEY `IdSection` (`IdSection`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `choisir`
--

INSERT INTO `choisir` (`AdresseMail`, `IdSection`) VALUES
('belgianair@gmail.com', 1),
('belgianair@gmail.com', 2),
('isen0607@gmail.com', 1),
('manuela.lout@skynet.be', 2),
('manuela.lout@skynet.be', 3),
('redggg@gmail.com', 1),
('redggg@gmail.com', 2),
('redggg@gmail.com', 3),
('regis.evrard.vg@gmail.com', 1),
('regis.evrard.vg@gmail.com', 2),
('regis.evrard.vg@gmail.com', 3),
('regis3d@hotmail.com', 1),
('regis3d@hotmail.com', 2),
('regis4d@hotmail.com', 1),
('regis4dd@hotmail.com', 1),
('regis5d@hotmail.com', 1),
('regis5d@hotmail.com', 3);

-- --------------------------------------------------------

--
-- Structure de la table `composer`
--

DROP TABLE IF EXISTS `composer`;
CREATE TABLE IF NOT EXISTS `composer` (
  `IdJournee` int(11) NOT NULL,
  `NomCours` varchar(100) NOT NULL,
  `HeureDebut` time NOT NULL,
  `HeureFin` time NOT NULL,
  `IdProfesseur` int(11) NOT NULL,
  PRIMARY KEY (`IdJournee`,`NomCours`,`HeureDebut`,`HeureFin`,`IdProfesseur`),
  KEY `IdJournee` (`IdJournee`),
  KEY `NomCours` (`NomCours`),
  KEY `HeureDebut` (`HeureDebut`),
  KEY `IdProfesseur` (`IdProfesseur`),
  KEY `HeureFin` (`HeureFin`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `composer`
--

INSERT INTO `composer` (`IdJournee`, `NomCours`, `HeureDebut`, `HeureFin`, `IdProfesseur`) VALUES
(1, 'Administration réseaux', '13:30:00', '15:30:00', 10),
(1, 'Analyse et gestion de données', '08:50:00', '10:20:00', 6),
(1, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
(1, 'Anglais technique', '09:20:00', '10:20:00', 14),
(1, 'Anglais technique', '10:30:00', '11:30:00', 16),
(1, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
(1, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 1),
(1, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 8),
(1, 'Mathématiques appliquées au traitement d\'images', '10:30:00', '12:30:00', 4),
(1, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 5),
(1, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 5),
(1, 'Présentation Stage - TFE par les étudiants de 3ème', '10:30:00', '12:00:00', 18),
(1, 'Programmation web 2', '15:30:00', '17:30:00', 3),
(2, 'Analyse et gestion de données', '13:30:00', '15:00:00', 6),
(2, 'Anglais technique', '09:20:00', '10:20:00', 11),
(2, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 7),
(2, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 7),
(2, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 1),
(2, 'Logiciel de contrôle', '10:30:00', '13:00:00', 19),
(2, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 4),
(2, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 17),
(2, 'Présentation Stage - TFE par les étudiants de 3ème', '08:50:00', '10:20:00', 18),
(2, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20),
(2, 'Réseaux et programmation réseaux', '15:30:00', '17:00:00', 10),
(2, 'Sécurité réseau', '13:30:00', '15:30:00', 16),
(2, 'Stat C++', '15:30:00', '17:00:00', 20),
(3, 'Analyse de périphériques', '13:30:00', '15:00:00', 21),
(3, 'Analyse et gestion de données', '10:30:00', '12:00:00', 8),
(3, 'Analyse et gestion de données', '10:30:00', '12:00:00', 12),
(3, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
(3, 'Anglais technique', '10:30:00', '11:30:00', 11),
(3, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
(3, 'Data mining', '08:20:00', '10:20:00', 20),
(3, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 9),
(3, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 9),
(3, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 15),
(3, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 5),
(3, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20),
(3, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 2),
(3, 'Stat C++', '15:30:00', '17:00:00', 20),
(4, 'Analyse et gestion de données', '10:30:00', '12:00:00', 6),
(4, 'Analyse et gestion de données', '13:30:00', '15:00:00', 17),
(4, 'Anglais technique', '09:20:00', '10:20:00', 13),
(4, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
(4, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(4, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 1),
(4, 'Logiciel de contrôle', '10:30:00', '13:00:00', 10),
(4, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:30:00', 19),
(4, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 2),
(4, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20),
(4, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 24),
(4, 'Stat C++', '15:30:00', '17:00:00', 20),
(4, 'Technique des microprocesseurs', '08:50:00', '10:20:00', 16),
(5, 'Analyse et gestion de données', '08:50:00', '10:20:00', 8),
(5, 'Analyse et gestion de données', '13:30:00', '15:00:00', 12),
(5, 'Anglais technique', '10:30:00', '11:30:00', 14),
(5, 'Data mining', '08:20:00', '10:20:00', 20),
(5, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 9),
(5, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 3),
(5, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 19),
(5, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20),
(5, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 23),
(5, 'Réseau TCP/IP', '10:30:00', '12:30:00', 12),
(5, 'Réseau TCP/IP', '10:30:00', '12:30:00', 23),
(5, 'Stat C++', '15:30:00', '17:00:00', 20),
(5, 'Technique des microprocesseurs', '08:50:00', '10:20:00', 10),
(5, 'Thread', '10:30:00', '12:30:00', 20),
(7, 'Réseaux et programmation réseaux', '15:30:00', '17:00:00', 24);

-- --------------------------------------------------------

--
-- Structure de la table `concerner`
--

DROP TABLE IF EXISTS `concerner`;
CREATE TABLE IF NOT EXISTS `concerner` (
  `IdSection` int(11) NOT NULL,
  `NomCours` varchar(100) NOT NULL,
  `HeureDebut` time NOT NULL,
  `HeureFin` time NOT NULL,
  `IdProfesseur` int(11) NOT NULL,
  PRIMARY KEY (`IdSection`,`NomCours`,`HeureDebut`,`HeureFin`,`IdProfesseur`),
  KEY `NomCours` (`NomCours`),
  KEY `HeureDebut` (`HeureDebut`),
  KEY `HeureFin` (`HeureFin`),
  KEY `IdProfesseur` (`IdProfesseur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `concerner`
--

INSERT INTO `concerner` (`IdSection`, `NomCours`, `HeureDebut`, `HeureFin`, `IdProfesseur`) VALUES
(1, 'Analyse et gestion de données', '08:50:00', '10:20:00', 6),
(1, 'Analyse et gestion de données', '10:30:00', '12:00:00', 8),
(1, 'Analyse et gestion de données', '13:30:00', '15:00:00', 12),
(1, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
(1, 'Anglais technique', '09:20:00', '10:20:00', 14),
(1, 'Anglais technique', '10:30:00', '11:30:00', 11),
(1, 'Collectif', '08:20:00', '10:20:00', 3),
(1, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
(1, 'Data mining', '08:20:00', '10:20:00', 20),
(1, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(1, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 7),
(1, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 7),
(1, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 8),
(1, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 4),
(1, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 5),
(1, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 5),
(1, 'Présentation Stage - TFE par les étudiants de 3ème', '08:50:00', '10:20:00', 18),
(1, 'Présentation Stage - TFE par les étudiants de 3ème', '10:30:00', '12:00:00', 18),
(1, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20),
(1, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 2),
(1, 'Programmation web 2', '15:30:00', '17:30:00', 3),
(1, 'Stat C++', '15:30:00', '17:00:00', 20),
(1, 'Thread', '10:30:00', '12:30:00', 20),
(2, 'Analyse de périphériques', '13:30:00', '15:00:00', 21),
(2, 'Analyse et gestion de données', '08:50:00', '10:20:00', 8),
(2, 'Analyse et gestion de données', '10:30:00', '12:00:00', 12),
(2, 'Analyse et gestion de données', '13:30:00', '15:00:00', 6),
(2, 'Anglais technique', '09:20:00', '10:20:00', 11),
(2, 'Anglais technique', '10:30:00', '11:30:00', 16),
(2, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(2, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 1),
(2, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 1),
(2, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 1),
(2, 'Logiciel de contrôle', '10:30:00', '13:00:00', 10),
(2, 'Mathématiques appliquées au traitement d\'images', '10:30:00', '12:30:00', 4),
(2, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 15),
(2, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 17),
(2, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 2),
(2, 'Présentation Stage - TFE par les étudiants de 3ème', '08:50:00', '10:20:00', 18),
(2, 'Présentation Stage - TFE par les étudiants de 3ème', '10:30:00', '12:00:00', 18),
(2, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 24),
(2, 'Réseau TCP/IP', '10:30:00', '12:30:00', 12),
(2, 'Réseaux et programmation réseaux', '15:30:00', '17:00:00', 10),
(2, 'Technique des microprocesseurs', '08:50:00', '10:20:00', 16),
(3, 'Administration réseaux', '13:30:00', '15:30:00', 10),
(3, 'Analyse et gestion de données', '08:50:00', '10:20:00', 12),
(3, 'Analyse et gestion de données', '10:30:00', '12:00:00', 6),
(3, 'Analyse et gestion de données', '13:30:00', '15:00:00', 17),
(3, 'Anglais technique', '09:20:00', '10:20:00', 13),
(3, 'Anglais technique', '10:30:00', '11:30:00', 14),
(3, 'Collectif', '08:20:00', '10:20:00', 3),
(3, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(3, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 9),
(3, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 9),
(3, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 9),
(3, 'Logiciel de contrôle', '10:30:00', '13:00:00', 19),
(3, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 19),
(3, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 3),
(3, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 19),
(3, 'Présentation Stage - TFE par les étudiants de 3ème', '08:50:00', '10:20:00', 18),
(3, 'Présentation Stage - TFE par les étudiants de 3ème', '10:30:00', '12:00:00', 18),
(3, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 23),
(3, 'Réseau TCP/IP', '10:30:00', '12:30:00', 23),
(3, 'Réseaux et programmation réseaux', '15:30:00', '17:00:00', 24),
(3, 'Sécurité réseau', '13:30:00', '15:30:00', 16),
(3, 'Technique des microprocesseurs', '08:50:00', '10:20:00', 10);

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

DROP TABLE IF EXISTS `cours`;
CREATE TABLE IF NOT EXISTS `cours` (
  `NomCours` varchar(50) NOT NULL,
  `HeureDebut` time NOT NULL,
  `HeureFin` time NOT NULL,
  `ReprisDansListe` tinyint(4) NOT NULL,
  `IdProfesseur` int(11) NOT NULL,
  `IdType` int(11) NOT NULL,
  `NomLocal` varchar(10) NOT NULL,
  PRIMARY KEY (`NomCours`,`HeureDebut`,`HeureFin`,`IdProfesseur`),
  KEY `IdType` (`IdType`),
  KEY `NomLocal` (`NomLocal`),
  KEY `IdProfesseur` (`IdProfesseur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`NomCours`, `HeureDebut`, `HeureFin`, `ReprisDansListe`, `IdProfesseur`, `IdType`, `NomLocal`) VALUES
('Analyse et gestion de données', '08:50:00', '10:20:00', 1, 6, 2, 'B22'),
('Anglais technique', '09:20:00', '10:20:00', 0, 14, 2, 'LPO7'),
('Langage et logique de programmation 2', '08:20:00', '10:20:00', 1, 7, 2, 'B14'),
('Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 1, 4, 2, 'AN'),
('Analyse et gestion de données', '10:30:00', '12:00:00', 1, 8, 2, 'B22'),
('Anglais technique', '10:30:00', '11:30:00', 1, 11, 2, 'LPO7'),
('Comptabilité appliquée et langue', '10:30:00', '12:30:00', 1, 15, 1, 'AE'),
('Logiciel de contrôle', '10:30:00', '13:00:00', 1, 10, 2, 'L02'),
('Réseau TCP/IP', '10:30:00', '12:30:00', 1, 12, 2, 'L01'),
('Analyse et gestion de données', '13:30:00', '15:00:00', 1, 12, 2, 'PV2'),
('Administration réseaux', '13:30:00', '15:30:00', 1, 10, 2, 'B22'),
('Analyse orienté objet', '13:30:00', '15:00:00', 1, 8, 1, 'LPO1'),
('Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 1, 2, 1, 'AE'),
('Programmation web 2', '15:30:00', '17:30:00', 1, 3, 2, 'AN'),
('Organisation et exploitation des données', '08:20:00', '10:20:00', 1, 5, 2, 'LEO'),
('Technique des microprocesseurs', '08:50:00', '10:20:00', 1, 16, 2, 'BX'),
('Développement orienté objets java', '08:20:00', '10:20:00', 1, 2, 1, 'AE'),
('Analyse et gestion de données', '08:50:00', '10:20:00', 1, 8, 2, 'B02'),
('Présentation Stage - TFE par les étudiants de 3ème', '08:50:00', '10:20:00', 1, 18, 3, 'PV2'),
('Langage et logique de programmation 2', '10:30:00', '12:00:00', 1, 7, 2, 'B02'),
('Mathématiques appliquées au traitement d\'images', '10:30:00', '12:30:00', 1, 4, 1, 'B16'),
('Présentation Stage - TFE par les étudiants de 3ème', '10:30:00', '12:00:00', 1, 18, 3, 'PV2'),
('Sécurité réseau', '13:30:00', '15:30:00', 1, 16, 2, 'BX'),
('Langage et logique de programmation 2', '15:30:00', '17:00:00', 1, 8, 2, 'B01'),
('Organisation et exploitation des données', '15:00:00', '17:00:00', 1, 5, 2, 'LEO'),
('Réseaux et programmation réseaux', '15:30:00', '17:00:00', 1, 10, 2, 'B03'),
('Analyse et gestion de données', '08:50:00', '10:20:00', 1, 12, 2, 'B16'),
('Analyse et gestion de données', '10:30:00', '12:00:00', 1, 12, 2, 'PV3'),
('Analyse et gestion de données', '10:30:00', '12:00:00', 1, 6, 2, 'B03'),
('Analyse et gestion de données', '13:30:00', '15:00:00', 1, 6, 2, 'L01'),
('Analyse et gestion de données', '13:30:00', '15:00:00', 1, 17, 2, 'L02'),
('Anglais technique', '09:20:00', '10:20:00', 1, 11, 2, 'B16'),
('Anglais technique', '09:20:00', '10:20:00', 1, 13, 2, 'L02'),
('Anglais technique', '10:30:00', '11:30:00', 1, 16, 2, 'LEO'),
('Anglais technique', '10:30:00', '11:30:00', 1, 14, 2, 'B01'),
('Langage et logique de programmation 2', '08:20:00', '10:20:00', 1, 1, 2, 'LPO3'),
('Langage et logique de programmation 2', '08:20:00', '10:20:00', 1, 9, 2, 'LPO4'),
('Langage et logique de programmation 2', '10:30:00', '12:00:00', 1, 1, 2, 'LPO3'),
('Langage et logique de programmation 2', '10:30:00', '12:00:00', 1, 9, 2, 'LPO4'),
('Langage et logique de programmation 2', '15:30:00', '17:00:00', 1, 1, 2, 'LPO3'),
('Langage et logique de programmation 2', '15:30:00', '17:00:00', 1, 9, 2, 'LPO4'),
('Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 1, 15, 2, 'L01'),
('Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 1, 19, 2, 'PV11'),
('Organisation et exploitation des données', '08:20:00', '10:20:00', 1, 17, 2, 'B03'),
('Organisation et exploitation des données', '08:20:00', '10:20:00', 1, 3, 2, 'PV12'),
('Organisation et exploitation des données', '15:00:00', '17:00:00', 1, 2, 2, 'PV12'),
('Organisation et exploitation des données', '15:00:00', '17:00:00', 1, 19, 2, 'PV11'),
('Technique des microprocesseurs', '08:50:00', '10:20:00', 1, 10, 2, 'AX'),
('Logiciel de contrôle', '10:30:00', '13:00:00', 1, 19, 2, 'LPO1'),
('Réseau TCP/IP', '10:30:00', '12:30:00', 1, 23, 2, 'PV8'),
('Développement orientée objet - JAVA', '13:30:00', '15:30:00', 1, 24, 2, 'PV8'),
('Développement orientée objet - JAVA', '13:30:00', '15:30:00', 1, 23, 2, 'PV9'),
('Réseaux et programmation réseaux', '15:30:00', '17:00:00', 1, 24, 2, 'PV9'),
('Programmation orienté objet - C#', '13:30:00', '15:30:00', 1, 20, 2, 'B01'),
('Stat C++', '15:30:00', '17:00:00', 1, 20, 2, 'B01'),
('Data mining', '08:20:00', '10:20:00', 1, 20, 2, 'B01'),
('Thread', '10:30:00', '12:30:00', 1, 20, 2, 'B01'),
('Analyse de périphériques', '13:30:00', '15:00:00', 1, 21, 1, 'PV11'),
('Collectif', '08:20:00', '10:20:00', 1, 3, 1, 'AE'),
('qzdzqddz', '00:00:00', '00:00:01', 1, 2, 1, 'AX'),
('Aucun cours ne m\'intéresse', '16:00:00', '16:00:00', 1, 0, 0, '0');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

DROP TABLE IF EXISTS `etudiant`;
CREATE TABLE IF NOT EXISTS `etudiant` (
  `AdresseMail` varchar(100) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `EtablissementScolaire` varchar(50) DEFAULT NULL,
  `cle` varchar(150) NOT NULL DEFAULT '0',
  `validation` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`AdresseMail`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`AdresseMail`, `Nom`, `Prenom`, `EtablissementScolaire`, `cle`, `validation`) VALUES
('regis4d@hotmail.com', 'Evrard', 'Régis', 'Collège Saint-Louis', '1dqzdqzd5dq6s32d1854qzdqzsdz', 1),
('belgianair@gmail.com', 'Ansion', 'Raphael', '', 'c458f048aed04922db29a3cd881a58a6', 1),
('isen0607@gmail.com', 'Claes', 'Isen', '', '1baaa169ebda857860bfb944d8502fa4', 1),
('regis.evrard.vg@gmail.com', 'Manso', 'Léa', '', 'c19432a7adf1c250aa59268cf802d2f1', 1),
('regis4dd@hotmail.com', 'Evrard', 'Régis', '', '67a30a6bf9f5d246b2a13c50b5f7a8a4', 1),
('redggg@gmail.com', 'Courtois', 'Thibault', '', '076b265bf2c5dce79e4677fc4f86058a', 0),
('regis5d@hotmail.com', 'Froidmont', 'Louis', 'Collège du mélange', '489471272341d1902ba083fdc5881f3e', 1),
('manuela.lout@skynet.be', 'Loutin', 'Manuela', 'Institut du Pasteur', '187e81dc515821a3fc4c4b17cbf64e8b', 1);

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

DROP TABLE IF EXISTS `groupe`;
CREATE TABLE IF NOT EXISTS `groupe` (
  `IdGroupe` int(11) NOT NULL,
  `BlocGroupe` int(11) NOT NULL,
  `IdSection` int(11) NOT NULL,
  PRIMARY KEY (`IdGroupe`),
  KEY `IdSection` (`IdSection`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`IdGroupe`, `BlocGroupe`, `IdSection`) VALUES
(2102, 1, 1),
(2103, 1, 1),
(2104, 1, 1),
(2201, 2, 1),
(2202, 2, 1),
(2203, 2, 1),
(2301, 3, 1),
(2302, 3, 1),
(2122, 1, 2),
(2123, 1, 2),
(2125, 1, 2),
(2130, 1, 2),
(2131, 1, 2),
(2221, 2, 2),
(2222, 2, 2),
(2321, 3, 2),
(2225, 2, 3),
(2226, 2, 3),
(2227, 2, 3),
(2325, 3, 3),
(2326, 3, 3);

-- --------------------------------------------------------

--
-- Structure de la table `inscrire`
--

DROP TABLE IF EXISTS `inscrire`;
CREATE TABLE IF NOT EXISTS `inscrire` (
  `AdresseMail` varchar(200) NOT NULL,
  `IdJournee` int(11) NOT NULL,
  PRIMARY KEY (`AdresseMail`,`IdJournee`),
  KEY `IdJournee` (`IdJournee`),
  KEY `AdresseMail` (`AdresseMail`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `inscrire`
--

INSERT INTO `inscrire` (`AdresseMail`, `IdJournee`) VALUES
('belgianair@gmail.com', 1),
('belgianair@gmail.com', 3),
('belgianair@gmail.com', 5),
('isen0607@gmail.com', 1),
('manuela.lout@skynet.be', 3),
('manuela.lout@skynet.be', 4),
('manuela.lout@skynet.be', 5),
('redggg@gmail.com', 1),
('regis.evrard.vg@gmail.com', 1),
('regis3d@hotmail.com', 1),
('regis3d@hotmail.com', 2),
('regis4d@hotmail.com', 1),
('regis4dd@hotmail.com', 1),
('regis5d@hotmail.com', 2),
('regis5d@hotmail.com', 3),
('regis5d@hotmail.com', 4);

-- --------------------------------------------------------

--
-- Structure de la table `journee`
--

DROP TABLE IF EXISTS `journee`;
CREATE TABLE IF NOT EXISTS `journee` (
  `IdJournee` int(11) NOT NULL AUTO_INCREMENT,
  `Jour` varchar(10) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`IdJournee`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `journee`
--

INSERT INTO `journee` (`IdJournee`, `Jour`, `Date`) VALUES
(1, 'Lundi', '2020-06-15'),
(2, 'Mardi', '2020-06-16'),
(3, 'Mercredi', '2020-06-17'),
(4, 'Jeudi', '2020-06-18'),
(5, 'Vendredi', '2020-06-19');

-- --------------------------------------------------------

--
-- Structure de la table `local`
--

DROP TABLE IF EXISTS `local`;
CREATE TABLE IF NOT EXISTS `local` (
  `NomLocal` varchar(10) NOT NULL,
  PRIMARY KEY (`NomLocal`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `local`
--

INSERT INTO `local` (`NomLocal`) VALUES
('AE'),
('AN'),
('AX'),
('B01'),
('B02'),
('B03'),
('B16'),
('B19'),
('B20'),
('B22'),
('BX'),
('L01'),
('L02'),
('LEO'),
('LPO1'),
('LPO2'),
('LPO3'),
('LPO4'),
('LPO7'),
('PV11'),
('PV12'),
('PV2'),
('PV3'),
('PV8'),
('PV9');

-- --------------------------------------------------------

--
-- Structure de la table `minimumcours`
--

DROP TABLE IF EXISTS `minimumcours`;
CREATE TABLE IF NOT EXISTS `minimumcours` (
  `journee` int(11) NOT NULL,
  `journees` int(11) NOT NULL,
  PRIMARY KEY (`journee`,`journees`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `minimumcours`
--

INSERT INTO `minimumcours` (`journee`, `journees`) VALUES
(3, 2);

-- --------------------------------------------------------

--
-- Structure de la table `periode`
--

DROP TABLE IF EXISTS `periode`;
CREATE TABLE IF NOT EXISTS `periode` (
  `DebutPeriode` date NOT NULL,
  `FinPeriode` date NOT NULL,
  PRIMARY KEY (`DebutPeriode`,`FinPeriode`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `periode`
--

INSERT INTO `periode` (`DebutPeriode`, `FinPeriode`) VALUES
('2020-05-21', '2020-05-28');

-- --------------------------------------------------------

--
-- Structure de la table `prevoir`
--

DROP TABLE IF EXISTS `prevoir`;
CREATE TABLE IF NOT EXISTS `prevoir` (
  `IdGroupe` int(11) NOT NULL,
  `NomCours` varchar(50) NOT NULL,
  `HeureDebut` time NOT NULL,
  `HeureFin` time NOT NULL,
  `IdProfesseur` int(11) NOT NULL,
  PRIMARY KEY (`IdGroupe`,`NomCours`,`HeureDebut`,`HeureFin`,`IdProfesseur`),
  KEY `NomCours` (`NomCours`),
  KEY `HeureDebut` (`HeureDebut`),
  KEY `HeureFin` (`HeureFin`),
  KEY `IdProfesseur` (`IdProfesseur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `prevoir`
--

INSERT INTO `prevoir` (`IdGroupe`, `NomCours`, `HeureDebut`, `HeureFin`, `IdProfesseur`) VALUES
(2102, 'Collectif', '08:20:00', '10:20:00', 3),
(2103, 'Collectif', '08:20:00', '10:20:00', 3),
(2104, 'Collectif', '08:20:00', '10:20:00', 3),
(2202, 'Analyse et gestion de données', '08:50:00', '10:20:00', 6),
(2202, 'Analyse et gestion de données', '10:30:00', '12:00:00', 8),
(2202, 'Analyse et gestion de données', '13:30:00', '15:00:00', 12),
(2202, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
(2202, 'Anglais technique', '09:20:00', '10:20:00', 14),
(2202, 'Anglais technique', '10:30:00', '11:30:00', 11),
(2202, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
(2202, 'Data maning', '08:20:00', '10:20:00', 20),
(2202, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(2202, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 7),
(2202, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 7),
(2202, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 8),
(2202, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 4),
(2202, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 5),
(2202, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 5),
(2202, 'Programmation orienté objet - C#', '13:30:00', '15:30:00', 20),
(2202, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 2),
(2202, 'Programmation web 2', '15:30:00', '17:30:00', 3),
(2202, 'Stat C++', '15:30:00', '17:00:00', 20),
(2202, 'Thread', '10:30:00', '12:30:00', 20),
(2221, 'Analyse et gestion de données', '08:50:00', '10:20:00', 8),
(2221, 'Analyse et gestion de données', '10:30:00', '12:00:00', 12),
(2221, 'Analyse et gestion de données', '13:30:00', '15:00:00', 6),
(2221, 'Anglais technique', '09:20:00', '10:20:00', 11),
(2221, 'Anglais technique', '10:30:00', '11:30:00', 16),
(2221, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(2221, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 1),
(2221, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 1),
(2221, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 1),
(2221, 'Logiciel de contrôle', '10:30:00', '13:00:00', 10),
(2221, 'Mathématiques appliquées au traitement d\'images', '10:30:00', '12:30:00', 4),
(2221, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 15),
(2221, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 17),
(2221, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 2),
(2221, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 24),
(2221, 'Réseau TCP/IP', '10:30:00', '12:30:00', 12),
(2221, 'Réseaux et programmation réseaux', '15:30:00', '17:00:00', 10),
(2221, 'Technique des microprocesseurs', '08:50:00', '10:20:00', 16),
(2225, 'Administration réseaux', '13:30:00', '15:30:00', 10),
(2225, 'Analyse et gestion de données', '08:50:00', '10:20:00', 12),
(2225, 'Analyse et gestion de données', '10:30:00', '12:00:00', 6),
(2225, 'Analyse et gestion de données', '13:30:00', '15:00:00', 17),
(2225, 'Anglais technique', '09:20:00', '10:20:00', 13),
(2225, 'Anglais technique', '10:30:00', '11:30:00', 14),
(2225, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(2225, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 9),
(2225, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 9),
(2225, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 9),
(2225, 'Logiciel de contrôle', '10:30:00', '13:00:00', 19),
(2225, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 19),
(2225, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 3),
(2225, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 19),
(2225, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 23),
(2225, 'Réseau TCP/IP', '10:30:00', '12:30:00', 23),
(2225, 'Réseaux et programmation réseaux', '15:30:00', '17:00:00', 24),
(2225, 'Sécurité réseau', '13:30:00', '15:30:00', 16),
(2225, 'Technique des microprocesseurs', '08:50:00', '10:20:00', 10),
(2301, 'Présentation Stage - TFE par les étudiants de 3ème', '08:50:00', '10:20:00', 18),
(2301, 'Présentation Stage - TFE par les étudiants de 3ème', '10:30:00', '12:00:00', 18),
(2321, 'Analyse de périphériques', '13:30:00', '15:00:00', 21);

-- --------------------------------------------------------

--
-- Structure de la table `professeur`
--

DROP TABLE IF EXISTS `professeur`;
CREATE TABLE IF NOT EXISTS `professeur` (
  `IdProfesseur` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  PRIMARY KEY (`IdProfesseur`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `professeur`
--

INSERT INTO `professeur` (`IdProfesseur`, `Nom`, `Prenom`) VALUES
(1, 'Wagner', 'Jean-Marc'),
(2, 'Vilvens', 'Claude'),
(3, 'Thiernesse', 'Cédric'),
(4, 'Kuty', 'Ludovic'),
(5, 'Herbiet', 'Laurence'),
(6, 'Serrhini', 'Souad'),
(7, 'Leonard', 'Anne'),
(8, 'Costa', 'Corinne'),
(9, 'Sagot', 'Pierre'),
(10, 'Quettier', 'Patrick'),
(11, 'Yans', 'Barbara'),
(12, 'Colinet', 'Didier'),
(13, 'Giovanizzo', 'Florence'),
(14, 'Lefebvre', 'Sabine'),
(15, 'Taccogna', 'Angelo'),
(16, 'Matagne', 'Xavier'),
(17, 'Hazée', 'Claire'),
(18, 'Stage', 'TFE'),
(19, 'Borremans', 'Olivier'),
(20, 'Boudron', 'Thomas'),
(21, 'Lussardi', 'Anne'),
(23, 'Vyncke', 'Eric'),
(24, 'Schreurs', 'Daniel');

-- --------------------------------------------------------

--
-- Structure de la table `section`
--

DROP TABLE IF EXISTS `section`;
CREATE TABLE IF NOT EXISTS `section` (
  `IdSection` int(11) NOT NULL AUTO_INCREMENT,
  `NomSection` varchar(100) NOT NULL,
  PRIMARY KEY (`IdSection`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `section`
--

INSERT INTO `section` (`IdSection`, `NomSection`) VALUES
(1, 'Informatique de Gestion'),
(2, 'Informatique finalité : industrielle'),
(3, 'Informatique finalité : réseau et télécom');

-- --------------------------------------------------------

--
-- Structure de la table `typecours`
--

DROP TABLE IF EXISTS `typecours`;
CREATE TABLE IF NOT EXISTS `typecours` (
  `IdType` int(11) NOT NULL AUTO_INCREMENT,
  `NomType` varchar(15) NOT NULL,
  `NbPlaces` mediumint(9) NOT NULL,
  PRIMARY KEY (`IdType`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `typecours`
--

INSERT INTO `typecours` (`IdType`, `NomType`, `NbPlaces`) VALUES
(1, 'Théorie', 50),
(2, 'Laboratoire', 10),
(3, 'TFE', 30);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
