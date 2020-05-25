<?php
    require "../fpdf/fpdf.php";
    include ('ConnexionBD.php');

    class PDF extends FPDF {
        
        function header() {
            $this->Ln(35);
            $this->Image("../images/header.png",0,0);
            $this->SetFont('helvetica', 'B', 25);
            
            $this->Cell(276,5,'ATTESTATION DE PRESENCE',0,0,'C');
            $this->Ln();
            $this->SetFont('helvetica', '', 12);

            $this->Cell(276,10,"concernant " . $_GET['email'] , 0,0,'C');
            $this->Ln(30);
        }


        function MessageAttestation ($bdd)
        {
            $select = 'SELECT * FROM etudiant WHERE AdresseMail = \'';
            $select .= $_GET['email'];
            $select .= '\'';
            $stmt = $bdd->query($select);
            $row = $stmt->fetch_assoc();

            $this->Cell(276,10,"Nous soussignons, professeurs de la HEPL, certifions que Monsieur/Madame", 0,0,'C');
            $this->Ln();
            $this->SetFont('helvetica', '', 20);
            $this->Cell(276,10,$row['Nom'] . " " . $row['Prenom'], 0,0,'C');
            $this->Ln();
            $this->SetFont('Comic', '', 12);

            $select = 'SELECT DISTINCT journee.Date AS Jour
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
            $select .= $_GET['email'];
            $select .= '\' AND composer.HeureDebut = cours.HeureDebut 
            AND composer.HeureFin = cours.HeureFin 
            AND composer.IdProfesseur = cours.IdProfesseur
            GROUP BY etudiant.AdresseMail, assister.IdJournee, assister.NomCours, assister.HeureDebut, assister.HeureFin, assister.IdProfesseur ORDER BY assister.IdJournee, assister.HeureDebut';
            
            $stmt = $bdd->query($select);
    
            if ($stmt->num_rows > 1)
            {
                $this->Cell(276,10,"a participe pleinement aux journees du ", 0,1,'C');
                $this->Ln();
                $this->SetFont('Comic', '', 20);

                $results = array();
                while($row = $stmt->fetch_assoc()) 
                        $this->Cell(276,10,$row['Jour'], 0,1,'C');
            }
            else
            {
                $this->Cell(276,10,"a participe pleinement a la journee du ", 0,1,'C');
                $this->Ln();
                $this->SetFont('Times', '', 20);    
                $row = $stmt->fetch_assoc();    
                $this->Cell(276,10,$row['Jour'], 0,0,'C');     
            }
            $this->SetFont('Times', '', 12);
            $this->Cell(276,10,"a la Haute Ecole de la Province de Liege", 0,0,'C'); 
        }
    }


    $pdf = new PDF();
    $pdf->AddFont('Comic','','comicbd.php');
    $pdf->AliasNbPages();
    $pdf->AddPage('L','A4', 0);
    $pdf->MessageAttestation($bdd);
    $pdf->Output();
?>