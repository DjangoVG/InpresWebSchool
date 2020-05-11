<?php
    include('ConnexionBD.php');


    $select = 'SELECT Nom, Prenom FROM professeur WHERE IdProfesseur = ';
    $select .= $_POST['idprof'];
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
        $return['professeur'] = $results;
        echo json_encode($return);
    } 
    else 
    {
        $return['erreur'] = true;
        echo json_encode($return);
    }
?>