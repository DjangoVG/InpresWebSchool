<?php
    try
    {
        $bdd = new mysqli('localhost','root','','inpreswebschool');
        $bdd->set_charset("utf8");
    }
    catch(exception $e)
    {
        $return['erreur'] = true;
        $return['message'] = "Erreur : " + $e->getMessage();
        echo json_encode($return);
    }
?>