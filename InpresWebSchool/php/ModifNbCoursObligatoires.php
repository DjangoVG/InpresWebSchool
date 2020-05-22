<?php

    include('ConnexionBD.php');
    
    $stmt = $bdd->prepare('UPDATE minimumcours SET journee = ?, journees = ?');
    $stmt->bind_param("ii",$_POST['journee'], $_POST['journees']);
    if($stmt->execute())
    {
        $return['erreur'] = false;
        $return['message'] = "Aucun problème";
    }
    else
    {
        $return['erreur'] = true;
        $return['message'] = "1/ Problème d'ajout dans la table minimumcours";
    }
    echo json_encode($return);
?>