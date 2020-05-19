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
        $return['erreur'] = true;
    else // CE COURS N'EXISTE PAS
    {
        $stmt = $bdd->prepare('INSERT INTO cours (NomCours, HeureDebut, HeureFin, ReprisDansListe, IdProfesseur, IdType, NomLocal) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param("sssiiis",$_POST['nomcours'],$_POST['heuredebut'], $_POST['heurefin'], $_POST['repris'], $idprof, $type, $_POST['local']);
        if($stmt->execute())
        {
            $return['erreur'] = false;
            $return['message'] = "1/ Problème d'ajout dans la table cours";
        }
        else
        {
            $return['erreur'] = true;
            $return['message'] = "1/ Problème d'ajout dans la table cours";
        }
    }

    echo json_encode($return);
?>