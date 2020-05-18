<?php
    include('ConnexionBD.php');


    $select = 'SELECT * FROM etudiant WHERE AdresseMail = \'';
    $select .= $_POST['mailetudiant'];
    $select .= '\'';
    $select .= " AND validation = 1";

    $stmt = $bdd->query($select);
    if ($stmt->num_rows > 0)
        $return['erreur'] = true;
    else 
        $return['erreur'] = false;
        

    echo json_encode($return);
?>