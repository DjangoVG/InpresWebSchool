<?php
    if(isset($_POST['nomutilisateur']) && isset($_POST['motdepasse']))
    {
        $stmt = $bdd->prepare("select count(*) as n from login where adressemail = ? and motdepasse = ?");
        $stmt->bind_param("ss",$_POST['adressemail'],$_POST['motdepasse']);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        if($data['n'] == 0)
        {
            $return['erreur'] = true;
            $return['message'] = "Le nom d'utilisateur ou le mot de passe est incorrect";
        }
        else
        {
            $return['erreur'] = false;
        }
        echo json_encode($return);
    }
    else
    {
        $return['erreur'] = true;
        $return['message'] = "Veuillez completer tous les champs";
        echo json_encode($return);
    }
?>