<?php 

    include('ConnexionBD.php');
    $sections = $_POST['sections'];
    $journees = $_POST['journees'];

    $Gestion = 0;
    $Indus = 0;
    $Reseau = 0;
    $Lundi = 0;
    $Mardi = 0;
    $Mercredi = 0;
    $Jeudi = 0;
    $Vendredi = 0;

    for ($i = 0; $i < sizeof($sections); $i++)
    {
        if ($sections[$i] == "Informatique de Gestion")
            $Gestion = 1;
        else if ($sections[$i] == "Informatique finalité : Industrielle")
            $Indus = 1;
        else if ($sections[$i] == "Informatique finalité : Réseau et télécom")
            $Reseau = 1;
    }

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

    $select =  'SELECT DISTINCT cours.* FROM composer, cours, concerner 
    WHERE composer.NomCours = cours.NomCours 
    AND composer.HeureDebut = cours.HeureDebut 
    AND composer.HeureFin = cours.HeureFin 
    AND composer.IdProfesseur = cours.IdProfesseur 
    AND concerner.NomCours = cours.NomCours 
    AND concerner.HeureDebut = cours.HeureDebut 
    AND concerner.HeureFin = cours.HeureFin 
    AND concerner.IdProfesseur = cours.IdProfesseur ';

    $section = [];
    if ($Gestion == 1)
        array_push($section, 1);
    if ($Indus == 1)
        array_push($section, 1);
    if ($Reseau == 1)
        array_push($section, 1);

    if (count($section) > 1)
    {
        $boo = false;
        $select .= " AND (";
        for ($i = 0; $i < 3; $i++)
        {
            if ($Gestion == 1 && $i == 0) 
            {
                $select .= 'concerner.IdSection = ';
                $select .= 1; 
                $boo = true;
            }
            else if ($Indus == 1  && $i == 1)
            {
                if ($boo)
                {
                    $select .= ' OR concerner.IdSection = ';
                    $select .= 2;          
                }
                else
                {
                    $select .= 'concerner.IdSection = ';
                    $select .= 2; 
                    $boo = true;
                }
            }
            else if ($Reseau == 1  && $i == 2)
            {
                if ($boo)
                {
                    $select .= ' OR concerner.IdSection = ';
                    $select .= 3;          
                }
                else
                {
                    $select .= 'concerner.IdSection = ';
                    $select .= 3; 
                    $boo = true;
                }
            }
        }
        if ($boo)
        $select .= ")";
    }
    else
    {
        if ($Gestion == 1) 
        {
            $select .= ' AND concerner.IdSection = ';
            $select .= 1;        
        }
        if ($Indus == 1)
        {
            $select .= ' AND concerner.IdSection = ';
            $select .= 2;  
        }
        if ($Reseau == 1)
        {
            $select .= ' AND concerner.IdSection = ';
            $select .= 3;  
        }
    }

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
        $select .= " AND (";
        for ($i = 0; $i < 5; $i++)
        {
            if ($Lundi == 1 && $i == 0) 
            {
                $select .= 'composer.IdJournee = ';
                $select .= 1; 
                $boo = true;
            }
            else if ($Mardi == 1  && $i == 1)
            {
                if ($boo)
                {
                    $select .= ' OR composer.IdJournee = ';
                    $select .= 2;          
                }
                else
                {
                    $select .= 'composer.IdJournee = ';
                    $select .= 1; 
                    $boo = true;
                }
            }
            else if ($Mercredi == 1 && $i == 2)
            {
                if ($boo)
                {
                    $select .= ' OR composer.IdJournee = ';
                    $select .= 3;          
                }
                else
                {
                    $select .= 'composer.IdJournee = ';
                    $select .= 3; 
                    $boo = true;
                } 
            }
            else if ($Jeudi == 1 && $i == 3)
            {
                if ($boo)
                {
                    $select .= ' OR composer.IdJournee = ';
                    $select .= 4;          
                }
                else
                {
                    $select .= 'composer.IdJournee = ';
                    $select .= 4; 
                    $boo = true;
                } 
            }
            else if ($Vendredi == 1 && $i == 4)
            {
                if ($boo)
                {
                    $select .= ' OR composer.IdJournee = ';
                    $select .= 5;          
                }
                else
                {
                    $select .= 'composer.IdJournee = ';
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
            $select .= ' AND composer.IdJournee = ';
            $select .= 1;        
        }
        if ($Mardi == 1)
        {
            $select .= ' AND composer.IdJournee = ';
            $select .= 2;  
        }
        if ($Mercredi == 1)
        {
            $select .= ' AND composer.IdJournee = ';
            $select .= 3;  
        }
        if ($Jeudi == 1)
        {
            $select .= ' AND composer.IdJournee = ';
            $select .= 4;  
        }
        if ($Vendredi == 1)
        {
            $select .= ' AND composer.IdJournee = ';
            $select .= 5;  
        }        
    }


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