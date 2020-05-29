<?php
    include('ConnexionBD.php');

    $sections = $_POST['sectionss'];
    $Gestion = 0;
    $Indus = 0;
    $Reseau = 0;

    for ($i = 0; $i < sizeof($sections); $i++)
    {
        if ($sections[$i] == "Informatique de Gestion")
            $Gestion = 1;
        else if ($sections[$i] == "Informatique finalité : Industrielle")
            $Indus = 1;
        else if ($sections[$i] == "Informatique finalité : Réseau et télécom")
            $Reseau = 1;
    }
    
    if ($Gestion == 1 && $Indus == 1 && $Reseau == 1) // GESTION INDUS RESEAUX
    {
        $select =  'SELECT cours.* FROM composer, cours, concerner 
                    WHERE composer.NomCours = cours.NomCours 
                    AND composer.HeureDebut = cours.HeureDebut 
                    AND composer.HeureFin = cours.HeureFin 
                    AND composer.IdProfesseur = cours.IdProfesseur 
                    AND concerner.NomCours = cours.NomCours 
                    AND concerner.HeureDebut = cours.HeureDebut 
                    AND concerner.HeureFin = cours.HeureFin 
                    AND concerner.IdProfesseur = cours.IdProfesseur 
                    AND concerner.IdSection IN (1,2,3) 
                    AND cours.ReprisDansListe = 1
                    AND composer.IdJournee = ';
    }
    else if ($Gestion == 1 && $Indus == 0 && $Reseau == 0) // ONLY GESTION
    {
        $select =  'SELECT cours.* FROM composer, cours, concerner 
                    WHERE composer.NomCours = cours.NomCours 
                    AND composer.HeureDebut = cours.HeureDebut 
                    AND composer.HeureFin = cours.HeureFin 
                    AND composer.IdProfesseur = cours.IdProfesseur 
                    AND concerner.NomCours = cours.NomCours 
                    AND concerner.HeureDebut = cours.HeureDebut 
                    AND concerner.HeureFin = cours.HeureFin 
                    AND concerner.IdProfesseur = cours.IdProfesseur 
                    AND concerner.IdSection = 1
                    AND cours.ReprisDansListe = 1
                    AND composer.IdJournee = ';
    }
    else if ($Gestion == 1 && $Indus == 1 && $Reseau == 0) // ONLY GESTION ET INDUS
    {
        $select =  'SELECT cours.* FROM composer, cours, concerner 
                    WHERE composer.NomCours = cours.NomCours 
                    AND composer.HeureDebut = cours.HeureDebut 
                    AND composer.HeureFin = cours.HeureFin 
                    AND composer.IdProfesseur = cours.IdProfesseur 
                    AND concerner.NomCours = cours.NomCours 
                    AND concerner.HeureDebut = cours.HeureDebut 
                    AND concerner.HeureFin = cours.HeureFin 
                    AND concerner.IdProfesseur = cours.IdProfesseur 
                    AND concerner.IdSection IN (1,2)
                    AND cours.ReprisDansListe = 1
                    AND composer.IdJournee = ';
    }
    else if ($Gestion == 1 && $Indus == 0 && $Reseau == 1) // ONLY GESTION ET RESEAU
    {
        $select =  'SELECT cours.* FROM composer, cours, concerner 
                    WHERE composer.NomCours = cours.NomCours 
                    AND composer.HeureDebut = cours.HeureDebut 
                    AND composer.HeureFin = cours.HeureFin 
                    AND composer.IdProfesseur = cours.IdProfesseur 
                    AND concerner.NomCours = cours.NomCours 
                    AND concerner.HeureDebut = cours.HeureDebut 
                    AND concerner.HeureFin = cours.HeureFin 
                    AND concerner.IdProfesseur = cours.IdProfesseur 
                    AND concerner.IdSection IN (1,3)
                    AND cours.ReprisDansListe = 1
                    AND composer.IdJournee = ';
    }
    else if ($Gestion == 0 && $Indus == 1 && $Reseau == 0) // ONLY INDUS
    {
        $select =  'SELECT cours.* FROM composer, cours, concerner 
                    WHERE composer.NomCours = cours.NomCours 
                    AND composer.HeureDebut = cours.HeureDebut 
                    AND composer.HeureFin = cours.HeureFin 
                    AND composer.IdProfesseur = cours.IdProfesseur 
                    AND concerner.NomCours = cours.NomCours 
                    AND concerner.HeureDebut = cours.HeureDebut 
                    AND concerner.HeureFin = cours.HeureFin 
                    AND concerner.IdProfesseur = cours.IdProfesseur 
                    AND concerner.IdSection = 2
                    AND cours.ReprisDansListe = 1
                    AND composer.IdJournee = ';
    }
    else if ($Gestion == 0 && $Indus == 1 && $Reseau == 1) // ONLY INDUS ET RESEAU
    {
        $select =  'SELECT cours.* FROM composer, cours, concerner 
                    WHERE composer.NomCours = cours.NomCours 
                    AND composer.HeureDebut = cours.HeureDebut 
                    AND composer.HeureFin = cours.HeureFin 
                    AND composer.IdProfesseur = cours.IdProfesseur 
                    AND concerner.NomCours = cours.NomCours 
                    AND concerner.HeureDebut = cours.HeureDebut 
                    AND concerner.HeureFin = cours.HeureFin 
                    AND concerner.IdProfesseur = cours.IdProfesseur 
                    AND concerner.IdSection IN (2,3)
                    AND cours.ReprisDansListe = 1
                    AND composer.IdJournee = ';
    }
    else if ($Gestion == 0 && $Indus == 0 && $Reseau == 1) // ONLY RESEAU
    {
        $select =  'SELECT cours.* FROM composer, cours, concerner 
                    WHERE composer.NomCours = cours.NomCours 
                    AND composer.HeureDebut = cours.HeureDebut 
                    AND composer.HeureFin = cours.HeureFin 
                    AND composer.IdProfesseur = cours.IdProfesseur 
                    AND concerner.NomCours = cours.NomCours 
                    AND concerner.HeureDebut = cours.HeureDebut 
                    AND concerner.HeureFin = cours.HeureFin 
                    AND concerner.IdProfesseur = cours.IdProfesseur 
                    AND concerner.IdSection = 3
                    AND cours.ReprisDansListe = 1
                    AND composer.IdJournee = ';
    }

    $select .= $_POST['journee'];
    $stmt = $bdd->query($select);
    if ($stmt->num_rows > 0)
    {
        $results = array();
        $i = 0;
        while($row = $stmt->fetch_assoc()) 
        {
            $verifcount =  'SELECT NomCours, HeureDebut, HeureFin, IdProfesseur, IdJournee ,COUNT(*) As PlacesOccupees
            FROM     Assister
            WHERE assister.NomCours = \'' . $row['NomCours'] . '\' AND assister.HeureDebut = \'' . $row['HeureDebut'] . '\' AND assister.HeureFin = \'' . $row['HeureFin'] . '\' AND assister.IdProfesseur = ' . $row['IdProfesseur'] . 
            ' GROUP BY NomCours, HeureDebut, HeureFin, IdProfesseur, IdJournee;';
            $stmtt = $bdd->query($verifcount);
            if ($stmtt->num_rows > 0)
            {
                $rowd = $stmtt->fetch_assoc();
                $placesoccupees = $rowd['PlacesOccupees'];
                $nbplaces = 'SELECT TypeCours.NbPlaces FROM typecours INNER JOIN cours ON cours.IdType = typecours.IdType AND cours.NomCours = \'' . $row['NomCours'] . '\' AND cours.HeureDebut = \'' . $row['HeureDebut'] . '\' AND cours.HeureFin = \'' . $row['HeureFin'] . '\' AND cours.IdProfesseur = ' . $row['IdProfesseur'];
                $stmtt = $bdd->query($nbplaces);
                if ($stmtt->num_rows > 0)
                {
                    $rowd = $stmtt->fetch_assoc();
                    $placesmax = $rowd['NbPlaces'];                      
                }
            }
            else
            {
                $placesoccupees = 0;
                $placesmax = 1;
            }
    
            if ($placesoccupees < $placesmax)
            {
                $results[$i]=$row;
                $i++;  
            }
        }
        $return['cours'] = $results;
        $return['erreur'] = false;
        echo json_encode($return);
    }
?>