<?php
    include('ConnexionBD.php');

    $hashform = password_hash($_POST['mdp'], PASSWORD_DEFAULT);  

    // JE RECHERCHE DANS LA BDD LE MDP CORRESPONDANT A L'USERNAME ENTRE

    $select = 'SELECT motdepasse FROM administrateur WHERE nomutilisateur = \'';
    $select .= $_POST['username'];
    $select .= '\'';
    $stmt = $bdd->query($select);
    $resultat = mysqli_fetch_assoc($stmt);


    $VerifMdp = password_verify($_POST['mdp'], $resultat['motdepasse']);

    if (!$resultat)
        $return['erreur'] = true;

    if ($VerifMdp)
        $return['erreur'] = false;
    echo json_encode($return); 
?>