<?php 

    include('ConnexionBD.php');
    $journees = $_POST['journees'];

    $Lundi = 0;
    $Mardi = 0;
    $Mercredi = 0;
    $Jeudi = 0;
    $Vendredi = 0;

    for ($i = 0; $i < sizeof($journees); $i++)
    {
        if ($journees[$i] == "Lundi 15 juin 2020")
            $Lundi = 1;
        else if ($journees[$i] == "Mardi 16 juin 2020")
            $Mardi = 1;
        else if ($journees[$i] == "Mercredi 17 juin 2020")
            $Mercredi = 1;
        else if ($journees[$i] == "Jeudi 18 juin 2020")
            $Jeudi = 1;
        else if ($journees[$i] == "Vendredi 19 juin 2020")
            $Vendredi = 1;
    }

    $select =   'SELECT etudiant.*, journee.Jour, count(etudiant.AdresseMail) as NombreJour
                FROM etudiant 
                INNER JOIN assister 
                ON assister.AdresseMail = etudiant.AdresseMail 
                LEFT JOIN journee 
                ON assister.IdJournee = journee.IdJournee ';
                


    $check = [];
    if ($Lundi == 1)
        array_push($check, 1);
    if ($Mardi == 1)
        array_push($check, 1);
    if ($Mercredi == 1)
        array_push($check, 1);
    if ($Jeudi == 1)
        array_push($check, 1);
    if ($Vendredi == 1)
        array_push($check, 1);

    if (count($check) > 1)
    {
        $boo = false;
        $select .= " WHERE (";
        for ($i = 0; $i < 5; $i++)
        {
            if ($Lundi == 1 && $i == 0) 
            {
                $select .= 'assister.IdJournee = ';
                $select .= 1; 
                $boo = true;
            }
            else if ($Mardi == 1  && $i == 1)
            {
                if ($boo)
                {
                    $select .= ' OR assister.IdJournee = ';
                    $select .= 2;          
                }
                else
                {
                    $select .= 'assister.IdJournee = ';
                    $select .= 2; 
                    $boo = true;
                }
            }
            else if ($Mercredi == 1 && $i == 2)
            {
                if ($boo)
                {
                    $select .= ' OR assister.IdJournee = ';
                    $select .= 3;          
                }
                else
                {
                    $select .= 'assister.IdJournee = ';
                    $select .= 3; 
                    $boo = true;
                } 
            }
            else if ($Jeudi == 1 && $i == 3)
            {
                if ($boo)
                {
                    $select .= ' OR assister.IdJournee = ';
                    $select .= 4;          
                }
                else
                {
                    $select .= 'assister.IdJournee = ';
                    $select .= 4; 
                    $boo = true;
                } 
            }
            else if ($Vendredi == 1 && $i == 4)
            {
                if ($boo)
                {
                    $select .= ' OR assister.IdJournee = ';
                    $select .= 5;          
                }
                else
                {
                    $select .= 'assister.IdJournee = ';
                    $select .= 5;
                }
            }  
        }
        if ($boo)
            $select .= ")";
    }
    else
    {
        if ($Lundi == 1) 
        {
            $select .= ' WHERE assister.IdJournee = ';
            $select .= 1;        
        }
        if ($Mardi == 1)
        {
            $select .= ' WHERE assister.IdJournee = ';
            $select .= 2;  
        }
        if ($Mercredi == 1)
        {
            $select .= ' WHERE assister.IdJournee = ';
            $select .= 3;  
        }
        if ($Jeudi == 1)
        {
            $select .= ' WHERE assister.IdJournee = ';
            $select .= 4;  
        }
        if ($Vendredi == 1)
        {
            $select .= ' WHERE assister.IdJournee = ';
            $select .= 5;
        }  
    }
    
    $select .= " AND validation = 1 GROUP BY etudiant.AdresseMail, assister.IdJournee ORDER BY etudiant.Nom";
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
        $return['etudiant'] = $results;
        echo json_encode($return);
    } 
    else 
    {
        $return['erreur'] = true;
        echo json_encode($return);
    }
?>