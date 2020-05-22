<?php

    include('ConnexionBD.php');
    
    $stmt = $bdd->prepare('UPDATE periode SET DebutPeriode = ?, FinPeriode = ?');
    $stmt->bind_param("ss",$_POST['DateDebut'], $_POST['DateFin']);
    if($stmt->execute())
    {
        $return['erreur'] = false;
        $return['message'] = "Aucun problème";
    }
    else
    {
        $return['erreur'] = true;
        $return['message'] = "1/ Problème d'ajout dans la table periode";
    }
    echo json_encode($return);
?>