<?php
    console.log(Connexion à la base de données);
    try
    {
        $bdd = new mysqli('localhost','root','','inpreswebschool');
    }
    catch(exception $e)
    {
        $return['erreur'] = true;
        $return['message'] = "Erreur : " + $e->getMessage();
        echo json_encode($return);
    }
?>