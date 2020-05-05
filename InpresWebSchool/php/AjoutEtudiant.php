<?php
    include('ConnexionBD.php');

    if(isset($_POST['mailetudiant']) && isset($_POST['nometudiant']) && isset($_POST['prenometudiant']) && isset($_POST['etablissementetudiant']))
    {
        $stmt = $bdd->prepare("insert into etudiant(AdresseMail,Nom,Prenom,EtablissementScolaire) values(?,?,?,?)");
        echo $_POST['mailetudiant'];
        echo $_POST['nometudiant'];
        echo $_POST['prenometudiant'];
        echo $_POST['etablisementetudiant'];
        $stmt->bind_param("ssss",$_POST['mailetudiant'],$_POST['nometudiant'],$_POST['prenometudiant'],$_POST['etablissementetudiant']);
        if($stmt->execute())
            $return['erreur'] = false;
        else
        {
            $return['erreur'] = true;
            $return['message'] = "Problème d'ajout";
        }
        echo json_encode($return);
    }
    else
    {
        echo "Fuck";
        $return['erreur'] = true;
        $return['message'] = "Veuillez remplir tous les champs";
    }
?>