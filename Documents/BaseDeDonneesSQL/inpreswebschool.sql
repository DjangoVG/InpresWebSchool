-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 07 mai 2020 à 20:02
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

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
('admin', '1234');

-- --------------------------------------------------------

--
-- Structure de la table `choisir`
--

DROP TABLE IF EXISTS `choisir`;
CREATE TABLE IF NOT EXISTS `choisir` (
  `AdresseMail` varchar(200) NOT NULL,
  `IdSection` int(11) NOT NULL,
  KEY `AdresseMail` (`AdresseMail`),
  KEY `IdSection` (`IdSection`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `choisir`
--

INSERT INTO `choisir` (`AdresseMail`, `IdSection`) VALUES
('regis4d@hotmail.com', 1);

-- --------------------------------------------------------

--
-- Structure de la table `composer`
--

DROP TABLE IF EXISTS `composer`;
CREATE TABLE IF NOT EXISTS `composer` (
  `IdJournee` int(11) NOT NULL,
  `IdCours` int(11) NOT NULL,
  KEY `IdJournee` (`IdJournee`),
  KEY `IdCours` (`IdCours`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `concerner`
--

DROP TABLE IF EXISTS `concerner`;
CREATE TABLE IF NOT EXISTS `concerner` (
  `IdCours` int(11) NOT NULL,
  `IdSection` int(11) NOT NULL,
  KEY `IdCours` (`IdCours`),
  KEY `IdSection` (`IdSection`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
  `IdGroupe` int(11) NOT NULL,
  `NomLocal` varchar(10) NOT NULL,
  PRIMARY KEY (`NomCours`,`HeureDebut`,`HeureFin`,`IdGroupe`),
  KEY `IdType` (`IdType`),
  KEY `IdGroupe` (`IdGroupe`),
  KEY `NomLocal` (`NomLocal`),
  KEY `IdProfesseur` (`IdProfesseur`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`NomCours`, `HeureDebut`, `HeureFin`, `ReprisDansListe`, `IdProfesseur`, `IdType`, `IdGroupe`, `NomLocal`) VALUES
('Analyse et gestion des données', '08:50:00', '10:20:00', 1, 6, 2, 2102, 'B22'),
('Anglais technique', '09:20:00', '10:20:00', 1, 14, 2, 2104, 'LPO7'),
('Langage et logique de programmation 2', '08:20:00', '10:20:00', 1, 7, 2, 2101, 'B14'),
('Mathématiques et statistiques appliquées 2', '08:20:00', '10:20:00', 1, 4, 2, 2105, 'AN'),
('Analyse et gestion des données', '10:30:00', '12:00:00', 1, 8, 2, 2104, 'B22'),
('Anglais technique', '10:30:00', '11:30:00', 1, 11, 2, 2101, 'LPO7'),
('Comptabilité appliquée et langue', '10:30:00', '12:30:00', 1, 15, 1, 2102, 'AE'),
('Logiciel de contrôle', '10:30:00', '13:00:00', 1, 10, 2, 2122, 'L02'),
('Réseau TCP/IP', '10:30:00', '12:30:00', 1, 12, 2, 2123, 'L01'),
('Analyse et gestion de données', '13:30:00', '15:00:00', 1, 6, 2, 2103, 'PV2'),
('Administration réseaux', '13:30:00', '15:30:00', 1, 10, 2, 2225, 'B22'),
('Analyse orienté objet', '13:30:00', '15:00:00', 1, 8, 1, 2201, 'LPO1'),
('Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 1, 2, 1, 2202, 'AE'),
('Programmation orienté objet - JAVA', '13:30:00', '15:30:00', 1, 2, 1, 2203, 'AE'),
('Programmation web 2', '15:30:00', '17:30:00', 1, 3, 2, 2201, 'AN');

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
  PRIMARY KEY (`AdresseMail`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`AdresseMail`, `Nom`, `Prenom`, `EtablissementScolaire`) VALUES
('regis4d@hotmail.com', 'Evrard', 'Régis', 'Collège Saint-Louis'),
('isen.claes@gmail.com', 'Claes', 'Isen', 'Collège du Sartay'),
('belgianair@gmail.com', 'Belgian', 'Air', 'Institut de Notre-Dames de Paris');

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
(2105, 1, 1),
(2201, 2, 1),
(2202, 2, 1),
(2203, 2, 1),
(2301, 3, 1),
(2302, 3, 1),
(2122, 1, 2),
(2123, 1, 2),
(2125, 1, 2),
(2129, 1, 2),
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
  KEY `IdJournee` (`IdJournee`),
  KEY `AdresseMail` (`AdresseMail`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
('B01'),
('B02'),
('B03'),
('B16'),
('B22'),
('L01'),
('L02'),
('LPO1'),
('LPO2'),
('LPO7'),
('PV11'),
('PV12'),
('PV2'),
('PV3');

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
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

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
(7, 'Lenoard', 'Anne'),
(8, 'Costa', 'Corinne'),
(9, 'Sagot', 'Pierre'),
(10, 'Quettier', 'Eric'),
(11, 'Yans', 'Barbara'),
(12, 'Colinet', 'Didier'),
(13, 'Giovanizzo', 'Florence'),
(14, 'Lefebvre', 'Sabine'),
(15, 'Taccogna', 'Angelo'),
(16, 'Matagne', 'Xavier'),
(17, 'Hazée', 'Claire');

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
