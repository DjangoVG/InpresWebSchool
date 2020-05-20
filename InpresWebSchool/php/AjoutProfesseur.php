<?php

    include('ConnexionBD.php');

    $select = 'SELECT * from professeur WHERE Nom = \'';
    $select .= $_POST['nom'];
    $select .= '\' AND Prenom = \'';
    $select .= $_POST['prenom'];
    $select .= '\'';

    $stmt = $bdd->query($select);
    if ($stmt->num_rows > 0)
        $return['erreur'] = true;
    else
    {
        $stmt = $bdd->prepare('INSERT INTO professeur (Nom, Prenom) VALUES (?,?)');
        $stmt->bind_param("ss",$_POST['nom'], $_POST['prenom']);
        if($stmt->execute())
        {
            $return['erreur'] = false;
            $return['message'] = "Aucun problème";
        }
        else
        {
            $return['erreur'] = true;
            $return['message'] = "1/ Problème d'ajout dans la table professeur";
        }        
    }
    echo json_encode($return);
?>