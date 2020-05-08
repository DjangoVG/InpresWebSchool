<?php
    include('ConnexionBD.php');

    $stmt = $bdd->prepare("insert into etudiant(AdresseMail,Nom,Prenom,EtablissementScolaire) values(?,?,?,?)"); // J'AJOUTE L'ETUDIANT DANS LA TABLE
    $stmt->bind_param("ssss",$_POST['mailetudiant'],$_POST['nometudiant'],$_POST['prenometudiant'],$_POST['etablissementetudiant']);
    if($stmt->execute())
        $return['erreur'] = false;
    else
    {
        $return['erreur'] = true;
        $return['message'] = "Problème d'ajout dans la table étudiant";
    }

    $tableausections = $_POST['sections'];
    foreach ($tableausections as &$value)  // J'AJOUTE UN TUPLE PAR SECTION CHOISIES
    {
        if ($value == "Informatique de Gestion")
        {
            $stmt = $bdd->prepare("insert into choisir(AdresseMail,IdSection) values(?,1)");
            $stmt->bind_param("s",$_POST['mailetudiant']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "1/ Problème d'ajout dans la table choisir";
            }              
        }
        else if ($value == "Informatique finalité : Industrielle")
        {
            $stmt = $bdd->prepare("insert into choisir(AdresseMail,IdSection) values(?,2)");
            $stmt->bind_param("s",$_POST['mailetudiant']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "2/ Problème d'ajout dans la table choisir";
            }             
        }
        else if ($value == "Informatique finalité : Réseau et télécom")
        {
            $stmt = $bdd->prepare("insert into choisir(AdresseMail,IdSection) values(?,3)");
            $stmt->bind_param("s",$_POST['mailetudiant']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "3/ Problème d'ajout dans la table choisir";
            }                
        }

        /* TO DO AJOUTER LETUDIANT A UNE JOURNEE */
        /* TO DO AJOUTER L'ETUDIANT QUI S'INSCRIT A UN COURS */
    }
    echo json_encode($return);
?>