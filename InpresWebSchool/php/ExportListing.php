<?php

    include('ConnexionBD.php');

    $Fichier = "ListeEtudiants".'_'.date('Y-m-d').'.csv'; 

    // Création d'un fichier CSV vide 
    $csv_export = ''; 
    
    // Extraction des données de la table 
    $select = 'SELECT etudiant.Prenom AS EtudiantNom, etudiant.Nom AS EtudiantPrenom, assister.NomCours, journee.Jour, assister.HeureDebut, assister.HeureFin, cours.NomLocal, professeur.Prenom AS ProfesseurPrenom, professeur.Nom AS ProfesseurNom
    FROM etudiant
    INNER JOIN assister 
    ON assister.AdresseMail = etudiant.AdresseMail 
    LEFT JOIN journee 
    ON assister.IdJournee = journee.IdJournee 
    INNER JOIN composer 
    ON journee.IdJournee = composer.IdJournee 
    LEFT JOIN cours 
    ON assister.NomCours = cours.NomCours 
    AND assister.HeureDebut = cours.HeureDebut 
    AND assister.HeureFin = cours.HeureFin 
    AND assister.IdProfesseur = cours.IdProfesseur 
    INNER JOIN professeur 
    ON assister.IdProfesseur = professeur.IdProfesseur 
    WHERE etudiant.validation = 1 GROUP BY etudiant.AdresseMail, assister.IdJournee, assister.NomCours, assister.HeureDebut, assister.HeureFin'; 

    $query = mysqli_query($bdd, $select); 
    $field = mysqli_field_count($bdd);
    
    for($i = 0; $i < $field; $i++) { 
        $csv_export.= mysqli_fetch_field_direct($query, $i)->name.';'; 
    }

    $csv_export.= '
    '; 
     
    // Boucle des tuples pour remplir le fichier 
    while($row = mysqli_fetch_array($query)) 
    { 
        for($i = 0; $i < $field; $i++) 
        { 
            $csv_export.= '"'.$row[mysqli_fetch_field_direct($query, $i)->name].'";'; 
        } 
        $csv_export.= '
    '; 
    } 
     
    // Export des données au format CSV et appel du fichier créé pour téléchargement 
    header("Content-type: text/x-csv"); 
    header("Content-Disposition: attachment; filename=".$Fichier.""); 
    echo($csv_export); 
?>