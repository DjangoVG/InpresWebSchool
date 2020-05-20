<?php
    include('ConnexionBD.php');

    $typestring = $_POST['type'];
    if ($typestring == "Theorie")
        $type = 1;
    else if ($typestring == "Laboratoire")
        $type = 2;
    else
        $type = 3;
    
    $profs = explode(" ", $_POST["prof"]);
    $idprof = $profs[0];

    $sections = $_POST['section'];
    
    // Uncaught Error: Cannot pass parameter 2 by reference
    $select = 'SELECT * FROM cours WHERE NomCours = \'';
    $select .= $_POST['nomcours'];
    $select .= '\' AND HeureDebut = \'';
    $select .= $_POST['heuredebut'];
    $select .= '\' AND HeureFin = \'';
    $select .= $_POST['heurefin'];
    $select .= '\' AND IdProfesseur = ';
    $select .= $idprof;
    $select .= ' AND IdType = ';
    $select .= $type;
    $select .= ' AND NomLocal = \'';
    $select .= $_POST['local'];
    $select .= '\'';

    
    $stmt = $bdd->query($select);
    if ($stmt->num_rows > 0)
    {
        $return['erreur'] = true;      
        $return['message'] = "1/ Cours non-unique";
        echo json_encode($return); 
    }
    else // CE COURS N'EXISTE PAS
    {
        $stmt = $bdd->prepare('INSERT INTO cours (NomCours, HeureDebut, HeureFin, ReprisDansListe, IdProfesseur, IdType, NomLocal) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param("sssiiis",$_POST['nomcours'],$_POST['heuredebut'], $_POST['heurefin'], $_POST['repris'], $idprof, $type, $_POST['local']);
        if($stmt->execute())
        {
            if ($_POST['commun'] == "Oui")
            {
                for ($j = 0; $j < count($sections); $j++)
                {
                    $stmt = $bdd->prepare('INSERT INTO concerner (IdSection, NomCours, HeureDebut, HeureFin, IdProfesseur) VALUES (?, ?, ?, ?, ?)');
                    $stmt->bind_param("isssi",$sections[$j], $_POST['nomcours'],$_POST['heuredebut'], $_POST['heurefin'], $idprof);
                    if($stmt->execute())
                    {
                        $select = 'SELECT IdGroupe FROM groupe WHERE IdSection = '; $select .= $sections[$j]; $select .= ' AND BlocGroupe = '; $select .= $_POST['bloc'];
                        $stmt2 = $bdd->query($select);

                        while ($row = $stmt2->fetch_assoc())
                        {
                            $stmt3 = $bdd->prepare('INSERT INTO prevoir (IdGroupe, NomCours, HeureDebut, HeureFin, IdProfesseur) VALUES (?, ?, ?, ?, ?)');
                            $stmt3->bind_param("isssi",$row['IdGroupe'], $_POST['nomcours'],$_POST['heuredebut'], $_POST['heurefin'], $idprof);
                            if($stmt3->execute())
                            {
                                $stmt = $bdd->prepare('INSERT INTO composer (IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) VALUES (?, ?, ?, ?, ?)');
                                $stmt->bind_param("isssi",$_POST['jour'], $_POST['nomcours'],$_POST['heuredebut'], $_POST['heurefin'], $idprof);
                                if($stmt->execute())
                                {
                                    $return['erreur'] = false;
                                    $return['message'] = "1/ Probleme dinsertion dans prevoir";
                                    echo json_encode($return);
                                }
                                else
                                {
                                    $return['erreur'] = true;
                                    $return['message'] = "1/ Probleme dinsertion dans prevoir";
                                    echo json_encode($return);
                                }
                            }
                            else
                            {
                                $return['erreur'] = true;
                                $return['message'] = "1/ Probleme dinsertion dans prevoir";
                                echo json_encode($return);
                            }  
                        }                       
                    }        
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "1/ Probleme dinsertion dans concerner";
                        echo json_encode($return);
                    }
                }
            }
            else
            {
                $stmt = $bdd->prepare('INSERT INTO concerner (IdSection, NomCours, HeureDebut, HeureFin, IdProfesseur) VALUES (?, ?, ?, ?, ?)');
                $stmt->bind_param("isssi",$sections[0], $_POST['nomcours'],$_POST['heuredebut'], $_POST['heurefin'], $idprof);
                if($stmt->execute())
                {
                    $stmt2 = $bdd->prepare('INSERT INTO prevoir (IdGroupe, NomCours, HeureDebut, HeureFin, IdProfesseur) VALUES (?, ?, ?, ?, ?)');
                    $stmt2->bind_param("isssi", $_POST['groupe'], $_POST['nomcours'],$_POST['heuredebut'], $_POST['heurefin'], $idprof);
                    if($stmt2->execute())
                    {
                        $stmt = $bdd->prepare('INSERT INTO composer (IdJournee, NomCours, HeureDebut, HeureFin, IdProfesseur) VALUES (?, ?, ?, ?, ?)');
                        $stmt->bind_param("isssi",$_POST['jour'], $_POST['nomcours'],$_POST['heuredebut'], $_POST['heurefin'], $idprof);
                        if($stmt->execute())
                        {
                            $return['erreur'] = false;
                            $return['message'] = "1/ Probleme dinsertion dans prevoir";
                            echo json_encode($return);
                        }
                        else
                        {
                            $return['erreur'] = true;
                            $return['message'] = "1/ Probleme dinsertion dans prevoir";
                            echo json_encode($return);
                        }
                    }
                    else
                    {
                        $return['erreur'] = true;
                        $return['message'] = "2/ Probleme dinsertion dans prevoir";
                        echo json_encode($return);
                    }
                }
            }
        }
    }

    
?>