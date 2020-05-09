<?php
    include('ConnexionBD.php');
    $Gestion = 0;
    $Indus = 0;
    $Reseau = 0;
    $sections = $_POST['sectionss'];
    for ($i = 0; $i < sizeof($sections); $i++)
    {
        if (strpos($sections[$i], "Gestion"))
            $Gestion = 1;
        if (strpos($sections[$i], "Industrielle"))
            $Indus = 1;
        if (strpos($sections[$i], "Réseau"))
            $Reseau = 1;
    }

    // JOURNEE 1
    if ($_POST['idjournee'] == 1)
    {
        QueryJournee(1);
    }
    // JOURNEE 2
    else if ($_POST['idjournee'] == 2)
    {
        QueryJournee(2);
    }
    // JOURNEE 3
    else if ($_POST['idjournee'] == 3)
    {
        QueryJournee(3);
    }
    // JOURNEE 4
    else if  ($_POST['idjournee'] == 4)
    {
        QueryJournee(4);
    }
    // JOURNEE 5
    else if ($_POST['idjournee'] == 5)
    {
        QueryJournee(5);
    }

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

    /* ----------------------------------------------- */


    function QueryJournee($n)
    {
        
        global $Gestion;
        global $Indus;
        global $Reseau;
        global $bdd;
        global $stmt;
        if ($Gestion == 1 && $Indus == 1 && $Reseau == 1) // GESTION INDUS RESEAUX
        {
            $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection IN (1,2,3))) AND IdJournee = ';
            $select .= $n;
            $stmt = $bdd->query($select);
        }
        else if ($Gestion == 1 && $Indus == 0 && $Reseau == 0) // ONLY GESTION
        {
            $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection = 1)) AND IdJournee = ';
            $select .= $n;
            $stmt = $bdd->query($select);
        }
        else if ($Gestion == 1 && $Indus == 1 && $Reseau == 0) // ONLY GESTION ET INDUS
        {
            $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection IN (1,2))) AND IdJournee = ';
            $select .= $n;
            $stmt = $bdd->query($select);
        }
        else if ($Gestion == 1 && $Indus == 0 && $Reseau == 1) // ONLY GESTION ET RESEAU
        {
            $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection IN (1,3))) AND IdJournee = ';
            $select .= $n;
            $stmt = $bdd->query($select);
        }
        else if ($Gestion == 0 && $Indus == 1 && $Reseau == 0) // ONLY INDUS
        {
            $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection = 2)) AND IdJournee = ';
            $select .= $n;
            $stmt = $bdd->query($select);
        }
        else if ($Gestion == 0 && $Indus == 1 && $Reseau == 1) // ONLY INDUS ET RESEAU
        {
            $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection IN (2,3))) AND IdJournee = ';
            $select .= $n;
            $stmt = $bdd->query($select);
        }
        else if ($Gestion == 0 && $Indus == 0 && $Reseau == 1) // ONLY RESEAU
        {
            $select = 'SELECT * FROM composer WHERE EXISTS (SELECT * from cours WHERE EXISTS (SELECT * from concerner where IdSection =3)) AND IdJournee = ';
            $select .= $n;
            $stmt = $bdd->query($select);
        }
    }
?>