<?php
    include('ConnexionBD.php');

    $email = $_POST['mailetudiant'];

    $cle = md5(microtime(TRUE)*100000);

    $destinataire = $_POST['mailetudiant'];
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
    $stmt->bind_param("sssss",$_POST['mailetudiant'],$_POST['nometudiant'],$_POST['prenometudiant'],$_POST['etablissementetudiant'], $cle);
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
            $stmt->bind_param("s",$_POST['mailetudiant']);
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
            $stmt->bind_param("s",$_POST['mailetudiant']);
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
            $stmt->bind_param("s",$_POST['mailetudiant']);
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
        $journeechoisie = array("15 juin 2020");
        echo $journeechoisie[0];
    }

    if (isset($_POST['plagechoisies']))
        $plageschoisies = $_POST['plagechoisies'];
    else
    {
        $plageschoisies = array();
        for ($j = 0; $j < 4; $j++)
        {
            if ($j == 1) // COURS OBLIGATOIRE
            {
                $select = 'SELECT cours.NomCours, cours.HeureDebut, cours.HeureFin, professeur.Nom, professeur.Prenom FROM cours, professeur WHERE cours.IdProfesseur = professeur.IdProfesseur AND ReprisDansListe = 1 AND HeureFin <= \'11:00:00\' AND IdType != 0 ORDER BY RAND() LIMIT 1';
            }
            else if ($j == 2) // COURS NON-OBLIGATOIRE (PLAGE 4)
            {
                $select = 'SELECT cours.NomCours, cours.HeureDebut, cours.HeureFin, professeur.Nom, professeur.Prenom FROM cours, professeur WHERE cours.IdProfesseur = professeur.IdProfesseur AND ReprisDansListe = 1 AND HeureDebut >= \'10:00:00\' AND HeureFin <= \'13:00:00\' AND IdType != 0 ORDER BY RAND() LIMIT 1';
            }
            else if ($j == 3)
            {
                $select = 'SELECT cours.NomCours, cours.HeureDebut, cours.HeureFin, professeur.Nom, professeur.Prenom FROM cours, professeur WHERE cours.IdProfesseur = professeur.IdProfesseur AND ReprisDansListe = 1 AND HeureDebut >= \'13:00:00\' AND HeureFin <= \'16:00:00\' AND IdType != 0 ORDER BY RAND() LIMIT 1';
            }
            else // PLAGE 4 NON OBLIGATOIRE
            {
                $select = 'SELECT cours.NomCours, cours.HeureDebut, cours.HeureFin, professeur.Nom, professeur.Prenom FROM cours, professeur WHERE cours.IdProfesseur = professeur.IdProfesseur AND ReprisDansListe = 1 AND HeureDebut >= \'15:00:00\' ORDER BY RAND() LIMIT 1';
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
            array_push($plageschoisies, $string);
        }
        
    }
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
                    $stmt->bind_param("ssssi",$_POST ['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                    {
                        $return['erreur'] = true;
                        $return['message'] = "1/ Problème d'ajout dans la table assister";
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "1/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,1)");
            $stmt->bind_param("s",$_POST ['mailetudiant']);
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
                    $stmt->bind_param("ssssi",$_POST ['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                    {
                        $return['erreur'] = true;
                        $return['message'] = "1/ Problème d'ajout dans la table assister";
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "1/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,2)");
            $stmt->bind_param("s",$_POST ['mailetudiant']);
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
                    $stmt->bind_param("ssssi",$_POST ['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                    {
                        $return['erreur'] = true;
                        $return['message'] = "3/ Problème d'ajout dans la table assister";
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "3/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,3)");
            $stmt->bind_param("s",$_POST ['mailetudiant']);
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
                    $stmt->bind_param("ssssi",$_POST ['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                    {
                        $return['erreur'] = true;
                        $return['message'] = "4/ Problème d'ajout dans la table assister";
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "4/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,4)");
            $stmt->bind_param("s",$_POST ['mailetudiant']);
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
                    $stmt->bind_param("ssssi",$_POST ['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                    if($stmt->execute())
                    {
                        $return['erreur'] = true;
                        $return['message'] = "5/ Problème d'ajout dans la table assister";
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "5/ Problème d'ajout dans la table assister";
                    }
                }
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,5)");
            $stmt->bind_param("s",$_POST ['mailetudiant']);
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