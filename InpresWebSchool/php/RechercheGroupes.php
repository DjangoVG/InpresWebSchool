<?php
    include('ConnexionBD.php');

    $select =  'SELECT * FROM groupe 
                WHERE BlocGroupe = ';
    $bloc = $_POST['bloc'];
    $select .= $bloc;
    

    $sections = $_POST['section'];
    if (count($sections) > 1)
    {
        $select .= ' AND (IdSection = ';
        for ($i = 0; $i < count($sections); $i++)
        {
            if ($i == 0)
            {
                $select .= $sections[$i];
            } 
            else if ($i == 1)
            {
                if ($i < count($sections))
                {
                    $select .= " OR IdSection = ";
                    $select .= $sections[$i];  
                    $select .= ")";                    
                }
                else
                {
                    $select .= " OR IdSection = ";
                    $select .= $sections[$i];                    
                }
            }
            else if ($i == 2)
            {
                $select .= " OR IdSection = ";
                $select .= $sections[$i];
                $select .= ")"; 
            }     
        }
    }
    else
    {
        $select .= " AND IdSection = ";
        $select .= $sections[0];
    }

    $stmt = $bdd->query($select);

    if ($stmt->num_rows > 0)
    {
        $results = array();
        $i = 0;
        while($row = $stmt->fetch_assoc()) 
        {
            $results[$i]=$row;
            $i++;
        }
        $return['groupes'] = $results;
        echo json_encode($return);
    } 
    else 
    {
        $return['erreur'] = true;
        echo json_encode($return);
    }
?>