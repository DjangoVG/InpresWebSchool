<?php
    include('ConnexionBD.php');

    if(isset($_POST['mailetudiant']) && isset($_POST['nometudiant']) && isset($_POST['prenometudiant']) && isset($_POST['etablissementetudiant']))
    {
        $stmt = $bdd->prepare("insert into etudiant(AdresseMail,Nom,Prenom,EtablissementScolaire) values(?,?,?,?)");
        $stmt->bind_param("ssss",$_POST['mailetudiant'],$_POST['nometudiant'],$_POST['prenometudiant'],$_POST['etablissementetudiant']);
        if($stmt->execute())
        $return['erreur'] = false;
        else
        {
            $return['erreur'] = true;
            $return['message'] = "Problème d'ajout dans la table étudiant";
        }
        $stmt = $bdd->prepare("insert into choisir(AdresseMail,IdSection) values(?,?)");
        if (isset($_POST['section1']))
        {
            $stmt->bind_param("siss",$_POST['mailetudiant'],$_POST['section1']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "Problème d'ajout dans la table choisir";
            }
        }
        if (isset($_POST['section2']))
        {
            $stmt->bind_param("siss",$_POST['mailetudiant'],$_POST['section2']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "Problème d'ajout dans la table choisir";
            }
        }
        if (isset($_POST['section3']))
        {
            $stmt->bind_param("siss",$_POST['mailetudiant'],$_POST['section3']);
            if($stmt->execute())
            $return['erreur'] = false;
            else
            {
                $return['erreur'] = true;
                $return['message'] = "Problème d'ajout dans la table choisir";
            }
        }

        echo json_encode($return);
    }
    else
    {
        $return['erreur'] = true;
        $return['message'] = "Veuillez remplir tous les champs";
    }
?>