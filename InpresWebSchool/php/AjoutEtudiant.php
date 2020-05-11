<?php
    include('ConnexionBD.php');

    $stmt = $bdd->prepare("insert into etudiant(AdresseMail,Nom,Prenom,EtablissementScolaire) values(?,?,?,?)"); // J'AJOUTE L'ETUDIANT DANS LA TABLE
    $stmt->bind_param("ssss",$_POST['mailetudiant'],$_POST['nometudiant'],$_POST['prenometudiant'],$_POST['etablissementetudiant']);
    if($stmt->execute())
        $return['erreur'] = false;
    else
    {
        $return['erreur'] = true;
        $return['message'] = "Problème d'ajout dans la table étudiant";
    }

    $tableausections = $_POST['sections'];
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

    $journeechoisie = $_POST['journeeschoisies'];
    $plageschoisies = $_POST['plagechoisies'];
    $cpt = 0;
    foreach ($journeechoisie as &$jour)  // J'AJOUTE UN TUPLE PAR SECTION CHOISIES
    {
        if (strpos($jour,"Lundi 15 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                $nomcours = "";
                $nomcoursnotyet = "";
                for ($k = 0; $k < sizeof($recup); $k++)
                {
                    if ($recup[$k] != '|')
                    {
                        $nomcoursnotyet .= $recup[$k];
                        if ($recup[$k+1] != "|")
                            $nomcoursnotyet .= ' ';                        
                    }
                    else
                    {
                        $nomcours = $nomcoursnotyet;

                        $heuredebut = $recup[$k+1];
                        $heurefin = $recup[$k+3];
                    }
                    
                    if ($recup[$k] == "->")
                    {
                        $nomprof = $recup[$k+1];
                        $prenomprof = $recup[$k+2];
                        // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                        $select = 'SELECT IdProfesseur FROM professeur WHERE Nom = ';
                        $select .= $nomprof;
                        $select .= " AND Prenom = ";
                        $select .= $prenomprof;
                        $stmt = $bdd->query($select);

                        if ($stmt->num_rows > 0)
                        {
                            $results = array();
                            $i = 0;
                            while($row = $stmt->fetch_assoc()) 
                            {
                                $results[$i]=$row;
                                $i++;
                            }
                            $idprof = $results;
                        } 
                        else 
                        {
                            $return['erreur'] = true;
                            echo json_encode($return);
                        }
                    }
                }
                $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,1,?,?,?,?)");
                $stmt->bind_param("ssssi",$_POST['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                if($stmt->execute())
                $return['erreur'] = false;
                else
                {
                    $return['erreur'] = true;
                    $return['message'] = "1/ Problème d'ajout dans la table inscrire";
                } 
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,1)");
            $stmt->bind_param("s",$_POST['mailetudiant']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "1/ Problème d'ajout dans la table inscrire";
            } 
        }
        else if (strpos($jour,"Mardi 16 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                $nomcours = "";
                for ($k = 0; $k < sizeof($recup); $k++)
                {
                    if ($recup[$k] != '|')
                    {
                        $nomcoursnotyet .= $recup[$k];
                        if ($recup[$k+1] != "|")
                            $nomcoursnotyet .= ' ';                        
                    }
                    else
                    {
                        $nomcours = $nomcoursnotyet;

                        $heuredebut = $recup[$k+1];
                        $heurefin = $recup[$k+3];
                    }
                    
                    if ($recup[$k] == "->")
                    {
                        $nomprof = $recup[$k+1];
                        $prenomprof = $recup[$k+2];
                        // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                        $select = 'SELECT IdProfesseur FROM professeur WHERE Nom = ';
                        $select .= $nomprof;
                        $select .= " AND Prenom = ";
                        $select .= $prenomprof;
                        $stmt = $bdd->query($select);

                        if ($stmt->num_rows > 0)
                        {
                            $results = array();
                            $i = 0;
                            while($row = $stmt->fetch_assoc()) 
                            {
                            $results[$i]=$row;
                            $i++;
                            }
                            $idprof = $results;
                        } 
                        else 
                        {
                            $return['erreur'] = true;
                            echo json_encode($return);
                        }
                    }
                }

                $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,2,?,?,?,?)");
                $stmt->bind_param("ssssi",$_POST['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                if($stmt->execute())
                $return['erreur'] = false;
                else
                {
                    $return['erreur'] = true;
                    $return['message'] = "2/ Problème d'ajout dans la table inscrire";
                } 
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,2)");
            $stmt->bind_param("s",$_POST['mailetudiant']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "1/ Problème d'ajout dans la table inscrire";
            }         
        }
        else if (strpos($jour,"Mercredi 17 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                $nomcours = "";
                for ($k = 0; $k < sizeof($recup); $k++)
                {
                    if ($recup[$k] != '|')
                    {
                        $nomcoursnotyet .= $recup[$k];
                        if ($recup[$k+1] != "|")
                            $nomcoursnotyet .= ' ';                        
                    }
                    else
                    {
                        $nomcours = $nomcoursnotyet;

                        $heuredebut = $recup[$k+1];
                        $heurefin = $recup[$k+3];
                    }
                    
                    if ($recup[$k] == "->")
                    {
                        $nomprof = $recup[$k+1];
                        $prenomprof = $recup[$k+2];
                        // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                        $select = 'SELECT IdProfesseur FROM professeur WHERE Nom = ';
                        $select .= $nomprof;
                        $select .= " AND Prenom = ";
                        $select .= $prenomprof;
                        $stmt = $bdd->query($select);

                        if ($stmt->num_rows > 0)
                        {
                            $results = array();
                            $i = 0;
                            while($row = $stmt->fetch_assoc()) 
                            {
                            $results[$i]=$row;
                            $i++;
                            }
                            $idprof = $results;
                        } 
                        else 
                        {
                            $return['erreur'] = true;
                            echo json_encode($return);
                        }
                    }
                }

                $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,3,?,?,?,?)");
                $stmt->bind_param("ssssi",$_POST['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                if($stmt->execute())
                $return['erreur'] = false;
                else
                {
                    $return['erreur'] = true;
                    $return['message'] = "3/ Problème d'ajout dans la table inscrire";
                } 
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,3)");
            $stmt->bind_param("s",$_POST['mailetudiant']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "1/ Problème d'ajout dans la table inscrire";
            }               
        }
        else if (strpos($jour,"Jeudi 18 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                $nomcours = "";
                for ($k = 0; $k < sizeof($recup); $k++)
                {
                    if ($recup[$k] != '|')
                    {
                        $nomcoursnotyet .= $recup[$k];
                        if ($recup[$k+1] != "|")
                            $nomcoursnotyet .= ' ';                        
                    }
                    else
                    {
                        $nomcours = $nomcoursnotyet;

                        $heuredebut = $recup[$k+1];
                        $heurefin = $recup[$k+3];
                    }
                    
                    if ($recup[$k] == "->")
                    {
                        $nomprof = $recup[$k+1];
                        $prenomprof = $recup[$k+2];
                        // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                        $select = 'SELECT IdProfesseur FROM professeur WHERE Nom = ';
                        $select .= $nomprof;
                        $select .= " AND Prenom = ";
                        $select .= $prenomprof;
                        $stmt = $bdd->query($select);

                        if ($stmt->num_rows > 0)
                        {
                            $results = array();
                            $i = 0;
                            while($row = $stmt->fetch_assoc()) 
                            {
                            $results[$i]=$row;
                            $i++;
                            }
                            $idprof = $results;
                        } 
                        else 
                        {
                            $return['erreur'] = true;
                            echo json_encode($return);
                        }
                    }
                }

                $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,4,?,?,?,?)");
                $stmt->bind_param("ssssi",$_POST['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                if($stmt->execute())
                $return['erreur'] = false;
                else
                {
                    $return['erreur'] = true;
                    $return['message'] = "1/ Problème d'ajout dans la table inscrire";
                } 
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,4)");
            $stmt->bind_param("s",$_POST['mailetudiant']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "4/ Problème d'ajout dans la table inscrire";
            }              
        }
        else if (strpos($jour,"Vendredi 19 juin 2020"))
        {
            for ($j = 0; $j < 4; $j++, $cpt++)
            {
                // JE VAIS RECHERCHER LE COURS DANS LA BDD EN FONCTION DU COURS
                $recup = explode(" ", $plageschoisies[$cpt]);
                $nomcours = "";
                for ($k = 0; $k < sizeof($recup); $k++)
                {
                    if ($recup[$k] != '|')
                    {
                        $nomcoursnotyet .= $recup[$k];
                        if ($recup[$k+1] != "|")
                            $nomcoursnotyet .= ' ';                        
                    }
                    else
                    {
                        $nomcours = $nomcoursnotyet;

                        $heuredebut = $recup[$k+1];
                        $heurefin = $recup[$k+3];
                    }
                    
                    if ($recup[$k] == "->")
                    {
                        $nomprof = $recup[$k+1];
                        $prenomprof = $recup[$k+2];
                        // JE RECUPERE LE PROF GRACE A SON NOM ET PRENOM
                        $select = 'SELECT IdProfesseur FROM professeur WHERE Nom = ';
                        $select .= $nomprof;
                        $select .= " AND Prenom = ";
                        $select .= $prenomprof;
                        $stmt = $bdd->query($select);

                        if ($stmt->num_rows > 0)
                        {
                            $results = array();
                            $i = 0;
                            while($row = $stmt->fetch_assoc()) 
                            {
                            $results[$i]=$row;
                            $i++;
                            }
                            $idprof = $results;
                        } 
                        else 
                        {
                            $return['erreur'] = true;
                            echo json_encode($return);
                        }
                    }
                }

                $stmt = $bdd->prepare("insert into assister(AdresseMail,IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) values(?,5,?,?,?,?)");
                $stmt->bind_param("ssssi",$_POST['mailetudiant'],$nomcours, $heuredebut, $heurefin, $idprof);
                if($stmt->execute())
                $return['erreur'] = false;
                else
                {
                    $return['erreur'] = true;
                    $return['message'] = "1/ Problème d'ajout dans la table inscrire";
                } 
            }
            $stmt = $bdd->prepare("insert into inscrire(AdresseMail,IdJournee) values(?,5)");
            $stmt->bind_param("s",$_POST['mailetudiant']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "1/ Problème d'ajout dans la table inscrire";
            }              
        }
    }

    // J'AJOUTE DANS ASSISTER (ETUDIANT->COURS->JOURNEE)


    echo json_encode($return);
?>