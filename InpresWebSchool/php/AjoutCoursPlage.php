<?php
    include('ConnexionBD.php');

    $stmt = $bdd->query("SELECT * FROM cours");

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