<?php
    include('ConnexionBD.php');
    $sections = $_POST['sectionss'];
    $journees = $_POST['journeess'];
    $Gestion = 0;
    $Indus = 0;
    $Reseau = 0;
    $week = array();

    for ($i = 0; $i < sizeof($sections); $i++)
    {
        if ($sections[$i] == "Informatique de Gestion")
            $Gestion = 1;
        else if ($sections[$i] == "Informatique finalité : Industrielle")
            $Indus = 1;
        else if ($sections[$i] == "Informatique finalité : Réseau et télécom")
            $Reseau = 1;
    }

    for ($j = 0; $j < sizeof($journees); $j++)
    {
        if ($journees[$j] == "Lundi 15 juin 2020")
            array_push($week, 1);
        else if ($journees[$j] == "Mardi 16 juin 2020")
            array_push($week, 2);
        else if ($journees[$j] == "Mercredi 17 juin 2020")
            array_push($week, 3);
        else if ($journees[$j] == "Jeudi 18 juin 2020")
            array_push($week, 4);
        else if ($journees[$j] == "Vendredi 19 juin 2020")
            array_push($week, 5);
    }
    
    $weekREQ = "(";
    $cpt = 0;
    foreach($week as $day)
    {
        $weekREQ .= strval($day);
        if($cpt != sizeof($week) - 1)
            $weekREQ .= ",";
        $cpt++;
    }
    $weekREQ .= ")";

    if ($Gestion == 1 && $Indus == 1 && $Reseau == 1) // GESTION INDUS RESEAUX
    {
        $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection IN (1,2,3))) AND IdJournee IN ';
    }
    else if ($Gestion == 1 && $Indus == 0 && $Reseau == 0) // ONLY GESTION
    {
        $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection = 1)) AND IdJournee IN ';
    }
    else if ($Gestion == 1 && $Indus == 1 && $Reseau == 0) // ONLY GESTION ET INDUS
    {
        $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection IN (1,2))) AND IdJournee IN ';
    }
    else if ($Gestion == 1 && $Indus == 0 && $Reseau == 1) // ONLY GESTION ET RESEAU
    {
        $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection IN (1,3))) AND IdJournee IN ';
    }
    else if ($Gestion == 0 && $Indus == 1 && $Reseau == 0) // ONLY INDUS
    {
        $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection = 2)) AND IdJournee IN ';
    }
    else if ($Gestion == 0 && $Indus == 1 && $Reseau == 1) // ONLY INDUS ET RESEAU
    {
        $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection IN (2,3))) AND IdJournee IN ';
    }
    else if ($Gestion == 0 && $Indus == 0 && $Reseau == 1) // ONLY RESEAU
    {
        $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection = 3 )) AND IdJournee IN ';
    }

    $select .= $weekREQ;
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
        $return['cours'] = $results;
        echo json_encode($return);
    } 
    else 
    {
        $return['erreur'] = true;
        echo json_encode($return);
    }
?>