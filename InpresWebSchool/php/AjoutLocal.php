<?php

    include('ConnexionBD.php');

    $stmt = $bdd->prepare('INSERT INTO local (NomLocal) VALUES (?)');
    $stmt->bind_param("s",$_POST['local']);
    if($stmt->execute())
    {
        $return['erreur'] = false;
        $return['message'] = "Aucun problème";
    }
    else
    {
        $return['erreur'] = true;
        $return['message'] = "1/ Problème d'ajout dans la table local";
    }
    echo json_encode($return);
?>