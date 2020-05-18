<?php

$to = "regis4d@hotmail.com" ;  // liste des emails separees par virgule
$subject = "test";
$message = "test";
$headers = 'From: Regis' . "\r\n" .
    'Reply-To: regis.evrard.vg@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    
    if (mail($to, $subject, $message, $headers)) // Envoi du mail
        echo "envoyé !";
    else
        echo "problème";
?>