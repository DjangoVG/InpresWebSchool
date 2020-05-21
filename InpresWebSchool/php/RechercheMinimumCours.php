<?php
    include('ConnexionBD.php');

    $select = 'SELECT * FROM minimumcours';
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
        $return['minimumcours'] = $results;
        echo json_encode($return);
    } 
    else 
    {
        $return['erreur'] = true;
        echo json_encode($return);
    }
?>