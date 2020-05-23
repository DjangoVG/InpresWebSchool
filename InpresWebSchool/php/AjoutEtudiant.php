<?php

    function CheckPlacesDispo ($nomducours, $heurededebut, $heuredefin, $idprof) 
    {
        $verifcount =  'SELECT   NomCours, HeureDebut, HeureFin, IdProfesseur, IdJournee ,COUNT(*) As PlacesOccupees
        FROM     Assister
        WHERE assister.NomCours = \'' . $nomducours . '\' AND assister.HeureDebut = \'' . $heurededebut . '\' AND assister.HeureFin = \'' . $heuredefin . '\' AND assister.IdProfesseur = ' . $idprof . 
        ' GROUP BY NomCours, HeureDebut, HeureFin, IdProfesseur, IdJournee;';
        $stmt = $bdd->query($verifcount);
        $row = $stmt->fetch_assoc();
        $placesoccupees = $row['PlacesOccupees'];

        $nbplaces = 'SELECT TypeCours.NbPlaces FROM typecours LEFT JOIN cours ON cours.IdType = typecours.IdType AND cours.NomCours = \'' . $nomducours . '\' AND cours.HeureDebut = \'' . $heurededebut . '\' AND cours.HeureFin = \'' . $heuredefin . '\' AND cours.IdProfesseur = ' . $idprof;
        $stmt = $bdd->query($nbplaces);
        $row = $stmt->fetch_assoc();
        $placesmax = $row['NbPlaces'];
   

        if ($placesoccupees < $nbplaces)
            return false;
        else 
            return true;
    }




    include('ConnexionBD.php');

    $email = $_POST['mailetudiant'];
    $cle = md5(microtime(TRUE)*100000);

    $destinataire = $email;
    $sujet = "Validation d'inscription à la semaine d'immersion !" ;
    $entete = "From: contact@regisevrard.be" ;
    $message = 'Votre demande d\'inscription est bien validée,
     
    Pour visualiser votre horaire, veuillez cliquer sur le lien ci-dessous
    ou copier/coller ce lien dans votre navigateur Internet.
     
    http://localhost/InpresWebSchool/InpresWebSchool/php/horaire.php?email='.urlencode($email).'&cle='.urlencode($cle).'
     
    ---------------
    Ceci est un mail automatique, Merci de ne pas y répondre.';
     
     
    mail($destinataire, $sujet, $message, $entete) ; // Envoi du mail


    $stmt = $bdd->prepare("insert into etudiant(AdresseMail,Nom,Prenom,EtablissementScolaire, cle) values(?,?,?,?,?)"); // J'AJOUTE L'ETUDIANT DANS LA TABLE
    $stmt->bind_param("sssss",$email,$_POST['nometudiant'],$_POST['prenometudiant'],$_POST['etablissementetudiant'], $cle);
    if($stmt->execute())
        $return['erreur'] = false;
    else
    {
        $return['erreur'] = true;
        $return['message'] = "Problème d'ajout dans la table étudiant";
    }

    if (isset($_POST['sections']))
        $tableausections = $_POST['sections'];
    else // J'AJOUTE TOUTES LES SECTIONS CAR JE SUIS EN RANDOM PROGRAMME
        $tableausections = array("Informatique de Gestion", "Informatique finalité : Industrielle", "Informatique finalité : Réseau et télécom");


    foreach ($tableausections as &$value)  // J'AJOUTE UN TUPLE PAR SECTION CHOISIES
    {
        if ($value == "Informatique de Gestion")
        {
            $stmt = $bdd->prepare("insert into choisir(AdresseMail,IdSection) values(?,1)");
            $stmt->bind_param("s",$email);
            if($stmt->execute())
                $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "1/ Problème d'ajout dans la table choisir";
            }              
        }
        else if ($value == "Informatique finalité : Industrielle")
        {
            $stmt = $bdd->prepare("insert into choisir(AdresseMail,IdSection) values(?,2)");
            $stmt->bind_param("s",$email);
            if($stmt->execute())
                $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "2/ Problème d'ajout dans la table choisir";
            }             
        }
        else if ($value == "Informatique finalité : Réseau et télécom")
        {
            $stmt = $bdd->prepare("insert into choisir(AdresseMail,IdSection) values(?,3)");
            $stmt->bind_param("s",$email);
            if($stmt->execute())
                $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "3/ Problème d'ajout dans la table choisir";
            }                
        }
    }

    // J'AJOUTE DANS LA TABLE INSCRIRE (ETUDIANT->JOURNEE)
    if (isset($_POST['journeeschoisies']))
        $journeechoisie = $_POST['journeeschoisies'];
    else
    {
        date_default_timezone_set('UTC'); 
        setlocale (LC_TIME, 'fr_FR.utf8','fra');
        //$journeechoisie = array(strftime('%d %B %Y'));
        $journeechoisie = array("Lundi 15 juin 2020"); // A MODIFIER LE JOUR DE LA VRAI SEMAINE D'IMMERSION
    }

    if (isset($_POST['plagechoisies']))
        $plageschoisies = $_POST['plagechoisies'];
    else
    {
        $plageschoisies = array();
        for ($j = 0; $j < 4; $j++)
        {
            $bool = false;
            while ($bool == false)
            {
                if ($j == 1) // COURS OBLIGATOIRE
                {
                    $select = 'SELECT cours.NomCours, cours.HeureDebut, cours.HeureFin, professeur.Nom, professeur.Prenom, professeur.IdProfesseur FROM cours, professeur WHERE cours.IdProfesseur = professeur.IdProfesseur AND ReprisDansListe = 1 AND HeureFin <= \'11:00:00\' AND IdType != 0 ORDER BY RAND() LIMIT 1';
                }
                else if ($j == 2) // COURS NON-OBLIGATOIRE (PLAGE 4)
                {
                    $select = 'SELECT cours.NomCours, cours.HeureDebut, cours.HeureFin, professeur.Nom, professeur.Prenom, professeur.IdProfesseur FROM cours, professeur WHERE cours.IdProfesseur = professeur.IdProfesseur AND ReprisDansListe = 1 AND HeureDebut >= \'10:00:00\' AND HeureFin <= \'13:00:00\' AND IdType != 0 ORDER BY RAND() LIMIT 1';
                }
                else if ($j == 3)
                {
                    $select = 'SELECT cours.NomCours, cours.HeureDebut, cours.HeureFin, professeur.Nom, professeur.Prenom, professeur.IdProfesseur FROM cours, professeur WHERE cours.IdProfesseur = professeur.IdProfesseur AND ReprisDansListe = 1 AND HeureDebut >= \'13:00:00\' AND HeureFin <= \'16:00:00\' AND IdType != 0 ORDER BY RAND() LIMIT 1';
                }
                else // PLAGE 4 NON OBLIGATOIRE
                {
                    $select = 'SELECT cours.NomCours, cours.HeureDebut, cours.HeureFin, professeur.Nom, professeur.Prenom, professeur.IdProfesseur FROM cours, professeur WHERE cours.IdProfesseur = professeur.IdProfesseur AND ReprisDansListe = 1 AND HeureDebut >= \'15:00:00\' ORDER BY RAND() LIMIT 1';
                }
            
                $stmt = $bdd->query($select);
                $row = $stmt->fetch_assoc();
                $string = $row['NomCours'];
                $string .= " | [";
                $string .= $row['HeureDebut'];
                $string .= " - ";
                $string .= $row['HeureFin'];
                $string .= "] -> ";
                $string .= $row['Prenom'];
                $string .= " ";
                $string .= $row['Nom'];
                
                
                if (CheckPlacesDispo($row['NomCours'], $row['HeureDebut'], $row['HeureFin'], $row['IdProfesseur']))
                    $bool = true;
            }
            array_push($plageschoisies, $string);
        }
    }
    echo $plageschoisies[0];
    echo $plageschoisies[1];
    echo $plageschoisies[2];
    echo $plageschoisies[3];
    $cpt = 0;
    foreach ($journeechoisie as &$jour)  // J'AJOUTE DES TUPLES PAR JOURNEE CHOISIES
    {
        if (strpos($jour,"15 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                if ($recup[0] != "Aucun" && $recup[1] != "cours")
                {
                    $nomcours = "";
                    $nomcoursnotyet = "";

                    for ($k = 0; $k < sizeof($recup); $k++)
                    {
                        if ($recup[$k] != '|')
                        {
                            $nomcoursnotyet .= $recup[$k];
                            if ($k < sizeof($recup) - 1)
                            {
                                if ($recup[$k+1] != "|")
                                    $nomcoursnotyet .= ' ';                     
                            }
                        }
                        else
                        {
                            $nomcours = $nomcoursnotyet;

                            $heuredebut = $recup[$k+1];
                            $heuredebut = substr($heuredebut,1, -1);
                            $heurefin = $recup[$k+3];
                            $heurefin = substr($heurefin,0, -1);
                        }
                        
                        if ($recup[$k] == "->")
                        {
                            $nomprof = $recup[$k+1];
                            $prenomprof = $recup[$k+2];
                            // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                            $select = 'SELECT IdProfesseur FROM professeur WHERE Prenom = \'';
                            $select .= $nomprof;
                            $select .= '\' AND Nom = \'';
                            $select .= $prenomprof;
                            $select .= '\'';
                            echo $select;
                            $stmt = $bdd->query($select);
                            if ($stmt->num_rows > 0)
                            {
                                $results = array();
                                $i = 0;
                                while($row = $stmt->fetch_assoc()) 
                                {
                                    $idprof = $row['IdProfesseur'];
                                    $i++;
                                }
                            } 
                            else 
                            {
                                $return['erreur'] = true;
                                echo json_encode($return);
                            }
                        }
                    }
                    $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,1,?,?,?,?)");
                    $stmt->bind_param("ssssi",$email,$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                    {
                        $return['erreur'] = false;
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "1/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,1)");
            $stmt->bind_param("s",$email);
            if($stmt->execute())
                $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "1/ Problème d'ajout dans la table inscrire";
            }
        }
        else if (strpos($jour,"16 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                if ($recup[0] != "Aucun" && $recup[1] != "cours")
                {
                    $nomcours = "";
                    $nomcoursnotyet = "";
                    for ($k = 0; $k < sizeof($recup); $k++)
                    {
                        if ($recup[$k] != '|')
                        {
                            $nomcoursnotyet .= $recup[$k];
                            if ($k < sizeof($recup) - 1)
                            {
                                if ($recup[$k+1] != "|")
                                    $nomcoursnotyet .= ' ';                     
                            }
                                
                        }
                        else
                        {
                            $nomcours = $nomcoursnotyet;

                            $heuredebut = $recup[$k+1];
                            $heuredebut = substr($heuredebut,1, -1);
                            $heurefin = $recup[$k+3];
                            $heurefin = substr($heurefin,0, -1);
                        }
                        
                        if ($recup[$k] == "->")
                        {
                            $nomprof = $recup[$k+1];
                            $prenomprof = $recup[$k+2];
                            // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                            $select = 'SELECT IdProfesseur FROM professeur WHERE Prenom = \'';
                            $select .= $nomprof;
                            $select .= '\' AND Nom = \'';
                            $select .= $prenomprof;
                            $select .= '\'';
                            echo $select;
                            $stmt = $bdd->query($select);
                            if ($stmt->num_rows > 0)
                            {
                                $results = array();
                                $i = 0;
                                while($row = $stmt->fetch_assoc()) 
                                {
                                    $idprof = $row['IdProfesseur'];
                                    $i++;
                                }
                            } 
                            else 
                            {
                                $return['erreur'] = true;
                                echo json_encode($return);
                            }
                        }
                    }
                    $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,2,?,?,?,?)");
                    $stmt->bind_param("ssssi",$email,$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                    {
                        $return['erreur'] = false;
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "1/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,2)");
            $stmt->bind_param("s",$email);
            if($stmt->execute())
                $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "1/ Problème d'ajout dans la table inscrire";
            }         
        }
        else if (strpos($jour,"17 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                if ($recup[0] != "Aucun" && $recup[1] != "cours")
                {
                    $nomcours = "";
                    $nomcoursnotyet = "";
                    for ($k = 0; $k < sizeof($recup); $k++)
                    {
                        if ($recup[$k] != '|')
                        {
                            $nomcoursnotyet .= $recup[$k];
                            if ($k < sizeof($recup) - 1)
                            {
                                if ($recup[$k+1] != "|")
                                    $nomcoursnotyet .= ' ';                     
                            }
                                
                        }
                        else
                        {
                            $nomcours = $nomcoursnotyet;

                            $heuredebut = $recup[$k+1];
                            $heuredebut = substr($heuredebut,1, -1);
                            $heurefin = $recup[$k+3];
                            $heurefin = substr($heurefin,0, -1);
                        }
                        
                        if ($recup[$k] == "->")
                        {
                            $nomprof = $recup[$k+1];
                            $prenomprof = $recup[$k+2];
                            // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                            $select = 'SELECT IdProfesseur FROM professeur WHERE Prenom = \'';
                            $select .= $nomprof;
                            $select .= '\' AND Nom = \'';
                            $select .= $prenomprof;
                            $select .= '\'';
                            echo $select;
                            $stmt = $bdd->query($select);
                            if ($stmt->num_rows > 0)
                            {
                                $results = array();
                                $i = 0;
                                while($row = $stmt->fetch_assoc()) 
                                {
                                    $idprof = $row['IdProfesseur'];
                                    $i++;
                                }
                            } 
                            else 
                            {
                                $return['erreur'] = true;
                                echo json_encode($return);
                            }
                        }
                    }
                    $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,3,?,?,?,?)");
                    $stmt->bind_param("ssssi",$email,$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                    {
                        $return['erreur'] = false;
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "3/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,3)");
            $stmt->bind_param("s",$email);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "3/ Problème d'ajout dans la table inscrire";
            }             
        }
        else if (strpos($jour,"18 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                if ($recup[0] != "Aucun" && $recup[1] != "cours")
                {
                    $nomcours = "";
                    $nomcoursnotyet = "";
                    for ($k = 0; $k < sizeof($recup); $k++)
                    {
                        if ($recup[$k] != '|')
                        {
                            $nomcoursnotyet .= $recup[$k];
                            if ($k < sizeof($recup) - 1)
                            {
                                if ($recup[$k+1] != "|")
                                    $nomcoursnotyet .= ' ';                     
                            }
                                
                        }
                        else
                        {
                            $nomcours = $nomcoursnotyet;

                            $heuredebut = $recup[$k+1];
                            $heuredebut = substr($heuredebut,1, -1);
                            $heurefin = $recup[$k+3];
                            $heurefin = substr($heurefin,0, -1);
                        }
                        
                        if ($recup[$k] == "->")
                        {
                            $nomprof = $recup[$k+1];
                            $prenomprof = $recup[$k+2];
                            // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                            $select = 'SELECT IdProfesseur FROM professeur WHERE Prenom = \'';
                            $select .= $nomprof;
                            $select .= '\' AND Nom = \'';
                            $select .= $prenomprof;
                            $select .= '\'';
                            echo $select;
                            $stmt = $bdd->query($select);
                            if ($stmt->num_rows > 0)
                            {
                                $results = array();
                                $i = 0;
                                while($row = $stmt->fetch_assoc()) 
                                {
                                    $idprof = $row['IdProfesseur'];
                                    $i++;
                                }
                            } 
                            else 
                            {
                                $return['erreur'] = true;
                                echo json_encode($return);
                            }
                        }
                    }
                    $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,4,?,?,?,?)");
                    $stmt->bind_param("ssssi",$email,$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                    {
                        $return['erreur'] = false;
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "4/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,4)");
            $stmt->bind_param("s",$email);
            if($stmt->execute())
                $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "4/ Problème d'ajout dans la table inscrire";
            }                
        }
        else if (strpos($jour,"19 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                if ($recup[0] != "Aucun" && $recup[1] != "cours")
                {
                    $nomcours = "";
                    $nomcoursnotyet = "";
                    for ($k = 0; $k < sizeof($recup); $k++)
                    {
                        if ($recup[$k] != '|')
                        {
                            $nomcoursnotyet .= $recup[$k];
                            if ($k < sizeof($recup) - 1)
                            {
                                if ($recup[$k+1] != "|")
                                    $nomcoursnotyet .= ' ';                     
                            }
                                
                        }
                        else
                        {
                            $nomcours = $nomcoursnotyet;

                            $heuredebut = $recup[$k+1];
                            $heuredebut = substr($heuredebut,1, -1);
                            $heurefin = $recup[$k+3];
                            $heurefin = substr($heurefin,0, -1);
                        }
                        
                        if ($recup[$k] == "->")
                        {
                            $nomprof = $recup[$k+1];
                            $prenomprof = $recup[$k+2];
                            // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                            $select = 'SELECT IdProfesseur FROM professeur WHERE Prenom = \'';
                            $select .= $nomprof;
                            $select .= '\' AND Nom = \'';
                            $select .= $prenomprof;
                            $select .= '\'';
                            echo $select;
                            $stmt = $bdd->query($select);
                            if ($stmt->num_rows > 0)
                            {
                                $results = array();
                                $i = 0;
                                while($row = $stmt->fetch_assoc()) 
                                {
                                    $idprof = $row['IdProfesseur'];
                                    $i++;
                                }
                            } 
                            else 
                            {
                                $return['erreur'] = true;
                                echo json_encode($return);
                            }
                        }
                    }
                    $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,5,?,?,?,?)");
                    $stmt->bind_param("ssssi",$email,$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                        $return['erreur'] = false;
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "5/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,5)");
            $stmt->bind_param("s",$email);
            if($stmt->execute())
                $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "5/ Problème d'ajout dans la table inscrire";
            }               
        }
    }
    echo json_encode($return);
?>