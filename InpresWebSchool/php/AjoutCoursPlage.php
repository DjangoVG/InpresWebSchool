<?php
    include('ConnexionBD.php');

    if ($_POST['idjournee'] == 1)
        $stmt = $bdd->query("SELECT * FROM composer WHERE IdJournee = 1");
    else if  ($_POST['idjournee'] == 2)
        $stmt = $bdd->query("SELECT * FROM composer WHERE IdJournee = 2");
    else if  ($_POST['idjournee'] == 3)
        $stmt = $bdd->query("SELECT * FROM composer WHERE IdJournee = 3");
    else if  ($_POST['idjournee'] == 4)
        $stmt = $bdd->query("SELECT * FROM composer WHERE IdJournee = 4");
    else if  ($_POST['idjournee'] == 5)
        $stmt = $bdd->query("SELECT * FROM composer WHERE IdJournee = 5");
    
    if ($stmt->num_rows > 0)
    {
        $results = array();
        $i = 0;
        while($row = $stmt->fetch_assoc()) 
        {
          $results[$i]=$row;
          $i++;
        }
        $return['cours'] = $results;
        echo json_encode($return);
    } else 
    {
        $return['erreur'] = true;
        echo json_encode($return);
    }
?>