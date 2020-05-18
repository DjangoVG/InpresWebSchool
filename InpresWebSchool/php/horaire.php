<?php

    include ('ConnexionBD.php');

    $email = $_GET['email'];
    $cle = $_GET['cle'];

    $select = 'SELECT cle FROM etudiant WHERE AdresseMail = \'';
    $select .= $email;
    $select .= '\'';

    $stmt = $bdd->query($select);
    if ($stmt->num_rows > 0)
    {
        while($row = $stmt->fetch_assoc()) 
        {
            $clebdd = $row['cle'];
        }
    }

    if($cle == $clebdd)
    {
        $select = 'SELECT etudiant.Nom as NomEtudiant, etudiant.Prenom as PrenomEtudiant, assister.AdresseMail, journee.Jour, assister.NomCours, assister.HeureDebut, assister.HeureFin, professeur.Nom as Nomprof, professeur.Prenom as PrenomProf
        FROM etudiant 
        INNER JOIN assister 
        ON assister.AdresseMail = etudiant.AdresseMail 
        INNER JOIN journee 
        ON assister.IdJournee = journee.IdJournee 
        INNER JOIN composer 
        ON journee.IdJournee = composer.IdJournee 
        INNER JOIN cours 
        ON composer.NomCours = cours.NomCours 
        INNER JOIN professeur 
        ON assister.IdProfesseur = professeur.IdProfesseur 
        WHERE etudiant.AdresseMail = \'';
        
        $select .= $email;
        $select .= '\'
        AND composer.HeureDebut = cours.HeureDebut 
        AND composer.HeureFin = cours.HeureFin 
        AND composer.IdProfesseur = cours.IdProfesseur
        GROUP BY etudiant.AdresseMail, assister.IdJournee, assister.NomCours, assister.HeureDebut, assister.HeureFin, assister.IdProfesseur ORDER BY assister.IdJournee, assister.HeureDebut';

        ?> 
        <!DOCTYPE html>
        <link rel="stylesheet" type="text/css" href="../css/main.css">
        <div class="limiter">
        <div class="container-login100" style="background-image: url('../images/Fond_InpresWebSchool.jpeg');">

            <div class="wrap-table100">
                <span class="login100-form-title m-b-20">
                    HORAIRE PERSONNEL...
                </span>
                    <div class="table100 ver1 m-b-50">
                        <div class="table100-head">
                            <table>
                                <thead>
                                    <tr class="row100 head">
                                        <th class="cell100 column2">Jour</th>
                                        <th class="cell100 column1">Nom du cours</th>
                                        <th class="cell100 column3">Heure de début</th>
                                        <th class="cell100 column3">Heure de fin</th>
                                        <th class="cell100 column5">Nom du professeur</th>
                                        <th class="cell100 column6">Prénom du professeur</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
    
                        <div class="table100-body js-pscroll">
                            <table id="TableCours">
                                <tbody>
                    <?php

                    $stmt = $bdd->query($select);
                    while($row = $stmt->fetch_assoc()) 
                    {

                        echo "<tr class=\"row100 body\">";
                        echo "<td class=\"cell100 column2\">".$row['Jour']."</td>";
                        echo "<td class=\"cell100 column1\">".$row['NomCours']."</td>";
                        echo "<td class=\"cell100 column3\">".$row['HeureDebut']."</td>";
                        echo "<td class=\"cell100 column3\">".$row['HeureFin']."</td>";
                        echo "<td class=\"cell100 column5\">".$row['Nomprof']."</td>";
                        echo "<td class=\"cell100 column6\">".$row['PrenomProf']."</td>";
                        echo "</tr>";
                    
                    }   ?>        
                    </tbody>
                </table>
            </div>
        </div>
    </div><?php


        $select = "update etudiant set validation = 1 where AdresseMail = ?";
        $stmt = $bdd->prepare($select);
        $stmt->bind_param("s",$email);
        $stmt->execute();
    }
    else
    {
        echo "Le lien ne correspond à aucun utilisateur !";
    }
?>