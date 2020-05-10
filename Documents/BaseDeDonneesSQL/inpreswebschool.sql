-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Dim 10 Mai 2020 à 22:22
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `inpreswebschool`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

CREATE TABLE IF NOT EXISTS `administrateur` (
  `nomutilisateur` varchar(50) NOT NULL,
  `motdepasse` varchar(100) NOT NULL,
  PRIMARY KEY (`nomutilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `administrateur`
--

INSERT INTO `administrateur` (`nomutilisateur`, `motdepasse`) VALUES
('admin', '1234');

-- --------------------------------------------------------

--
-- Structure de la table `assister`
--

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

-- --------------------------------------------------------

--
-- Structure de la table `choisir`
--

CREATE TABLE IF NOT EXISTS `choisir` (
  `AdresseMail` varchar(200) NOT NULL,
  `IdSection` int(11) NOT NULL,
  PRIMARY KEY (`AdresseMail`,`IdSection`),
  KEY `AdresseMail` (`AdresseMail`),
  KEY `IdSection` (`IdSection`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `choisir`
--

INSERT INTO `choisir` (`AdresseMail`, `IdSection`) VALUES
('regis4d@hotmail.com', 1),
('regisqzd4d@hotmail.com', 1),
('regisqzd4d@hotmail.com', 2);

-- --------------------------------------------------------

--
-- Structure de la table `composer`
--

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
-- Contenu de la table `composer`
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
(1, 'Mathématiques appliquées au traitement d''images', '10:30:00', '12:30:00', 4),
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
(2, 'Réseaux et programmation réseaux', '15:30:00', '17:00:00', 10),
(2, 'Sécurité réseau', '13:30:00', '15:30:00', 16),
(3, 'Analyse et gestion de données', '10:30:00', '12:00:00', 8),
(3, 'Analyse et gestion de données', '10:30:00', '12:00:00', 12),
(3, 'Anglais technique', '10:30:00', '11:30:00', 11),
(3, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
(3, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 9),
(3, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 9),
(3, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 15),
(3, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 2),
(4, 'Analyse et gestion de données', '10:30:00', '12:00:00', 6),
(4, 'Analyse et gestion de données', '13:30:00', '15:00:00', 17),
(4, 'Anglais technique', '09:20:00', '10:20:00', 13),
(4, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
(4, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(4, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 1),
(4, 'Logiciel de contrôle', '10:30:00', '13:00:00', 10),
(4, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:30:00', 19),
(4, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 2),
(4, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 24),
(4, 'Technique des microprocesseurs', '08:50:00', '10:20:00', 16),
(5, 'Analyse et gestion de données', '08:50:00', '10:20:00', 8),
(5, 'Analyse et gestion de données', '13:30:00', '15:00:00', 12),
(5, 'Anglais technique', '10:30:00', '11:30:00', 14),
(5, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 9),
(5, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 3),
(5, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 19),
(5, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 23),
(5, 'Réseau TCP/IP', '10:30:00', '12:30:00', 12),
(5, 'Réseau TCP/IP', '10:30:00', '12:30:00', 23),
(5, 'Technique des microprocesseurs', '08:50:00', '10:20:00', 10),
(7, 'Réseaux et programmation réseaux', '15:30:00', '17:00:00', 24);

-- --------------------------------------------------------

--
-- Structure de la table `concerner`
--

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
-- Contenu de la table `concerner`
--

INSERT INTO `concerner` (`IdSection`, `NomCours`, `HeureDebut`, `HeureFin`, `IdProfesseur`) VALUES
(1, 'Analyse et gestion de données', '08:50:00', '10:20:00', 6),
(1, 'Analyse et gestion de données', '10:30:00', '12:00:00', 8),
(1, 'Analyse et gestion de données', '13:30:00', '15:00:00', 12),
(1, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
(1, 'Anglais technique', '09:20:00', '10:20:00', 14),
(1, 'Anglais technique', '10:30:00', '11:30:00', 11),
(1, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
(1, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(1, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 7),
(1, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 7),
(1, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 8),
(1, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 4),
(1, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 5),
(1, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 5),
(1, 'Présentation Stage - TFE par les étudiants de 3ème', '08:50:00', '10:20:00', 18),
(1, 'Présentation Stage - TFE par les étudiants de 3ème', '10:30:00', '12:00:00', 18),
(1, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 2),
(1, 'Programmation web 2', '15:30:00', '17:30:00', 3),
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
(2, 'Mathématiques appliquées au traitement d''images', '10:30:00', '12:30:00', 4),
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
-- Contenu de la table `cours`
--

INSERT INTO `cours` (`NomCours`, `HeureDebut`, `HeureFin`, `ReprisDansListe`, `IdProfesseur`, `IdType`, `NomLocal`) VALUES
('Analyse et gestion de données', '08:50:00', '10:20:00', 1, 6, 2, 'B22'),
('Anglais technique', '09:20:00', '10:20:00', 1, 14, 2, 'LPO7'),
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
('Mathématiques appliquées au traitement d''images', '10:30:00', '12:30:00', 1, 4, 1, 'B16'),
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
('Réseaux et programmation réseaux', '15:30:00', '17:00:00', 1, 24, 2, 'PV9');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE IF NOT EXISTS `etudiant` (
  `AdresseMail` varchar(100) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `EtablissementScolaire` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`AdresseMail`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `etudiant`
--

INSERT INTO `etudiant` (`AdresseMail`, `Nom`, `Prenom`, `EtablissementScolaire`) VALUES
('regis4d@hotmail.com', 'Evrard', 'Régis', 'Collège Saint-Louis'),
('isen.claes@gmail.com', 'Claes', 'Isen', 'Collège du Sartay'),
('belgianair@gmail.com', 'Belgian', 'Air', 'Institut de Notre-Dames de Paris'),
('regis4d@hotdmail.com', 'Evrard', 'Régis', 'd'),
('regisqzdqzdzq4d@hotmail.com', 'Evrard', 'Régis', 'qzd'),
('regisqzd4d@hotmail.com', 'Evrard', 'Régis', 'qzd');

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE IF NOT EXISTS `groupe` (
  `IdGroupe` int(11) NOT NULL,
  `BlocGroupe` int(11) NOT NULL,
  `IdSection` int(11) NOT NULL,
  PRIMARY KEY (`IdGroupe`),
  KEY `IdSection` (`IdSection`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `groupe`
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

CREATE TABLE IF NOT EXISTS `inscrire` (
  `AdresseMail` varchar(200) NOT NULL,
  `IdJournee` int(11) NOT NULL,
  PRIMARY KEY (`AdresseMail`,`IdJournee`),
  KEY `IdJournee` (`IdJournee`),
  KEY `AdresseMail` (`AdresseMail`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `journee`
--

CREATE TABLE IF NOT EXISTS `journee` (
  `IdJournee` int(11) NOT NULL AUTO_INCREMENT,
  `Jour` varchar(10) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`IdJournee`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `journee`
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

CREATE TABLE IF NOT EXISTS `local` (
  `NomLocal` varchar(10) NOT NULL,
  PRIMARY KEY (`NomLocal`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `local`
--

INSERT INTO `local` (`NomLocal`) VALUES
('AE'),
('AN'),
('AX'),
('B01'),
('B02'),
('B03'),
('B16'),
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
-- Structure de la table `prevoir`
--

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
-- Contenu de la table `prevoir`
--

INSERT INTO `prevoir` (`IdGroupe`, `NomCours`, `HeureDebut`, `HeureFin`, `IdProfesseur`) VALUES
(2202, 'Analyse et gestion de données', '08:50:00', '10:20:00', 6),
(2202, 'Analyse et gestion de données', '10:30:00', '12:00:00', 8),
(2202, 'Analyse et gestion de données', '13:30:00', '15:00:00', 12),
(2202, 'Analyse orienté objet', '13:30:00', '15:00:00', 8),
(2202, 'Anglais technique', '09:20:00', '10:20:00', 14),
(2202, 'Anglais technique', '10:30:00', '11:30:00', 11),
(2202, 'Comptabilité appliquée et langue', '10:30:00', '12:30:00', 15),
(2202, 'Développement orienté objets java', '08:20:00', '10:20:00', 2),
(2202, 'Langage et logique de programmation 2', '08:20:00', '10:20:00', 7),
(2202, 'Langage et logique de programmation 2', '10:30:00', '12:00:00', 7),
(2202, 'Langage et logique de programmation 2', '15:30:00', '17:00:00', 8),
(2202, 'Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 4),
(2202, 'Organisation et exploitation des données', '08:20:00', '10:20:00', 5),
(2202, 'Organisation et exploitation des données', '15:00:00', '17:00:00', 5),
(2202, 'Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 2),
(2202, 'Programmation web 2', '15:30:00', '17:30:00', 3),
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
(2221, 'Mathématiques appliquées au traitement d''images', '10:30:00', '12:30:00', 4),
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
(2301, 'Présentation Stage - TFE par les étudiants de 3ème', '10:30:00', '12:00:00', 18);

-- --------------------------------------------------------

--
-- Structure de la table `professeur`
--

CREATE TABLE IF NOT EXISTS `professeur` (
  `IdProfesseur` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  PRIMARY KEY (`IdProfesseur`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- Contenu de la table `professeur`
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

CREATE TABLE IF NOT EXISTS `section` (
  `IdSection` int(11) NOT NULL AUTO_INCREMENT,
  `NomSection` varchar(100) NOT NULL,
  PRIMARY KEY (`IdSection`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `section`
--

INSERT INTO `section` (`IdSection`, `NomSection`) VALUES
(1, 'Informatique de Gestion'),
(2, 'Informatique finalité : industrielle'),
(3, 'Informatique finalité : réseau et télécom');

-- --------------------------------------------------------

--
-- Structure de la table `typecours`
--

CREATE TABLE IF NOT EXISTS `typecours` (
  `IdType` int(11) NOT NULL AUTO_INCREMENT,
  `NomType` varchar(15) NOT NULL,
  `NbPlaces` mediumint(9) NOT NULL,
  PRIMARY KEY (`IdType`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `typecours`
--

INSERT INTO `typecours` (`IdType`, `NomType`, `NbPlaces`) VALUES
(1, 'Théorie', 50),
(2, 'Laboratoire', 10),
(3, 'TFE', 30);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
