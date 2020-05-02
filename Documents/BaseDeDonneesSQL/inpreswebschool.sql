-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 02 mai 2020 à 00:43
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
-- Structure de la table `cours`
--

DROP TABLE IF EXISTS `cours`;
CREATE TABLE IF NOT EXISTS `cours` (
  `Nom` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `Professeur` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `Type` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `Jour` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `HeureDebut` int(11) NOT NULL,
  `HeureFin` int(11) NOT NULL,
  `Local` varchar(10) COLLATE latin1_general_ci NOT NULL,
  `Finalité` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `Groupe` varchar(10) COLLATE latin1_general_ci NOT NULL,
  `BoolListePropose` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

DROP TABLE IF EXISTS `etudiant`;
CREATE TABLE IF NOT EXISTS `etudiant` (
  `AdresseMail` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `Nom` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `Prenom` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `EtablissementScolaire` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `SectionS` varchar(300) COLLATE latin1_general_ci NOT NULL,
  `EnsembleCours` varchar(300) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`AdresseMail`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`AdresseMail`, `Nom`, `Prenom`, `EtablissementScolaire`, `SectionS`, `EnsembleCours`) VALUES
('regis4d@hotmail.com', 'Evrard', 'Regis', 'Collège Saint-Louis', 'Informatique de Gestion', 'XX');

-- --------------------------------------------------------

--
-- Structure de la table `horaire`
--

DROP TABLE IF EXISTS `horaire`;
CREATE TABLE IF NOT EXISTS `horaire` (
  `PlageHoraire` int(11) NOT NULL,
  `TypeCours` varchar(50) COLLATE latin1_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inscriptions`
--

DROP TABLE IF EXISTS `inscriptions`;
CREATE TABLE IF NOT EXISTS `inscriptions` (
  `NomEtudiant` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `PrenomEtudiant` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `EmailEtudiant` varchar(100) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`NomEtudiant`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `typecours`
--

DROP TABLE IF EXISTS `typecours`;
CREATE TABLE IF NOT EXISTS `typecours` (
  `NomCours` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `TypeCours` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `PlacesMaximum` int(11) NOT NULL,
  PRIMARY KEY (`NomCours`,`TypeCours`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
