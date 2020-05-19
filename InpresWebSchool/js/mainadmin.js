document.write('<script type="text/javascript" src="js/util.js" ></script>');
var currentTabAdmin = 0;
var admin = true;
(function($) 
{
    showTabAdmin(currentTabAdmin); // Affiche la premiere page du formulaire
    "use strict";
    $('.column100').on('mouseover',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).addClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
	});

	$('.column100').on('mouseout',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).removeClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
    });

})(jQuery);

function TranformSelect()
{
    $('.sel').each(function() 
    {
        $(this).children('select').css('display', 'none');
        
        var $current = $(this);
        
        $(this).find('option').each(function(i) 
        {
          if (i == 0) 
          {
            $current.prepend($('<div>', {
              class: $current.attr('class').replace(/sel/g, 'sel__box')
            }));
            
            var placeholder = $(this).text();
            $current.prepend($('<span>', {
              class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
              text: placeholder,
              'data-placeholder': placeholder
            }));
            
            return;
          }
          
          $current.children('div').append($('<span>', {
            class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
            text: $(this).text()
          }));
        });
      });
      
      // Toggling the `.active` state on the `.sel`.
      $('.sel').click(function() {
        $(this).toggleClass('active');
      });
      
      // Toggling the `.selected` state on the options.
      $('.sel__box__options').click(function() {
        var txt = $(this).text();
        var index = $(this).index();
        
        $(this).siblings('.sel__box__options').removeClass('selected');
        $(this).addClass('selected');
        
        var $currentSel = $(this).closest('.sel');
        $currentSel.children('.sel__placeholder').text(txt);
        $currentSel.children('select').prop('selectedIndex', index + 1);
      });

      var showPass = 0;
      $('.btn-show-pass').on('click', function()
      {
          if(showPass == 0) 
          {
              $(this).next('input').attr('type','text');
              $(this).addClass('active');
              showPass = 1;
          }
          else 
          {
              $(this).next('input').attr('type','password');
              $(this).removeClass('active');
              showPass = 0;
          }
          
      });
}

function RemoveErrorForm()
{
    let Form = document.getElementsByClassName("login100-form validate-form");
    for (let p = 0 ; p < Form.length;p++)
        Form[p].classList.remove("ErrorForm");
}

function ValidationPattern (input)
{
    if($(input).attr('type') == 'email') 
    {
    if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null)
        return false;
    }
    else 
    {
        if($(input).val().trim() == '')
        {
            return false;
        }
    }
    return true;
}


/* PARTIE ADMINISTRATEUR */

function ConnexionAdmin()
{
    if ($("#AdresseMailAdmin").val().length == 0)
    {
        let Form = document.getElementById("FormmLogin");
        Form.classList.add("ErrorForm");
        setTimeout(RemoveErrorForm, 1300);
        MauvaisAdmin();      
    }
    else
    {
        admin = true;
        let addr = $('#AdresseMailAdmin');
        let mdp = $('#mdpAdmin');

        $.ajax({
            url : "php/LavementMotDePasse.php",
            method : "POST",
            dataType : "JSON",
            async : false,
            data : {
                username : $(addr).val(),
                mdp : $(mdp).val()
            },
            success : function(result)
            {
                return true;
            },
            error : function (result)
            {
                let Form = document.getElementById("FormmLogin");
                Form.classList.add("ErrorForm");
                setTimeout(RemoveErrorForm, 1300);
                MauvaisAdmin();
            }
        });        
    }


    if (!admin)
        return false;
    else
        return true;
}

function MauvaisAdmin()
{
    admin = false;
}

function showTabAdmin(current)
{
    if (current == -1)
        current = 0;

    let page = document.getElementsByTagName("title");
    if (page[0].textContent == "Consultation des professeurs")
        RechercheProfesseurs();
    else if (page[0].textContent == "Consultation des sections")
        RechercheSections();
    else if (page[0].textContent == "Consultation des locaux")
        RechercheLocal();
    else if (page[0].textContent == "Consultation des étudiants")
    {
        document.getElementById("nextBtn").innerHTML = "ACCEUIL";
    }
    else if (page[0].textContent == "Consultation des cours")
    {
        document.getElementById("nextBtn").innerHTML = "ACCEUIL";
    }
    else
    {
        if (page[0].textContent == "Ajouter un cours")
        {
            document.getElementById("nextBtn").innerHTML = "CONTINUER";
            if (current == 0) 
                document.getElementById("prevBtn").innerHTML = "ACCEUIL";
            else
                document.getElementById("prevBtn").innerHTML = "RETOUR";
            if (current == 4)
            {
                var u = document.getElementsByClassName("etape");
                if (u.length > 4)
                {
                    SupprimerGroupes();
                    RechercheGroupes();
                }
                else
                {
                    let ContainerProfesseur = document.getElementById("ContainerProfesseur");

                    let etape = document.createElement("div");
                    etape.style = "display: none";
                    etape.className = "etape";

                    let span1 = document.createElement("span");
                    span1.className = "login100-form-title p-b-41";
                    span1.textContent = "LISTE DES PROFESSEURS";

                    let div2 = document.createElement("div");
                    div2.className = "login100-form validate-form p-b-33 p-t-5 ProfForm";
                    div2.id = "Form_Prof";

                    let div3 = document.createElement("div");
                    div3.className = "sel";
                    div3.id = "ListProf";
                    let select = document.createElement("select");
                    select.name = "Plage1"; select.id = "CoursPlage1";
                    let option1 = document.createElement("option");
                    option1.value = "Plage1"; option1.disabled = true; option1.textContent = "Selectionner un professeur"; 
                    
                    
                    ContainerProfesseur.appendChild(etape);
                    etape.appendChild(span1);
                    etape.appendChild(div2);
                    div2.appendChild(div3);
                    div3.appendChild(select);
                    select.appendChild(option1);

                    let ContainerLocaux = document.getElementById("ContainerLocaux");

                    etape = document.createElement("div");
                    etape.style = "display: none";
                    etape.className = "etape";

                    span1 = document.createElement("span");
                    span1.className = "login100-form-title p-b-41";
                    span1.textContent = "LISTE DES LOCAUX";

                    div2 = document.createElement("div");
                    div2.className = "login100-form validate-form p-b-33 p-t-5 LocauxForm";
                    div2.id = "Form_Locaux";

                    div3 = document.createElement("div");
                    div3.className = "sel";
                    div3.id = "ListLocaux";
                    select = document.createElement("select");
                    select.name = "Plage1"; select.id = "CoursPlage1";
                    option1 = document.createElement("option");
                    option1.value = "Plage1"; option1.disabled = true; option1.textContent = "Selectionner un local"; 
                    
                    
                    ContainerLocaux.appendChild(etape);
                    etape.appendChild(span1);
                    etape.appendChild(div2);
                    div2.appendChild(div3);
                    div3.appendChild(select);
                    select.appendChild(option1);

                    let ContainerGroupes = document.getElementById("ContainerGroupes");

                    etape = document.createElement("div");
                    etape.style = "display: none";
                    etape.className = "etape";

                    span1 = document.createElement("span");
                    span1.className = "login100-form-title p-b-41";
                    span1.textContent = "LISTE DES GROUPES CORRESPONDANT A LA SECTION";

                    div2 = document.createElement("div");
                    div2.className = "login100-form validate-form p-b-33 p-t-5 LocauxForm";
                    div2.id = "Form_Groupes";

                    div3 = document.createElement("div");
                    div3.className = "sel";
                    div3.id = "ListGroupes";
                    select = document.createElement("select");
                    select.name = "Plage1"; select.id = "CoursPlage1";
                    option1 = document.createElement("option");
                    option1.value = "Plage1"; option1.disabled = true; option1.textContent = "Selectionner un groupe"; 
                    
                    
                    ContainerGroupes.appendChild(etape);
                    etape.appendChild(span1);
                    etape.appendChild(div2);
                    div2.appendChild(div3);
                    div3.appendChild(select);
                    select.appendChild(option1);
                    TranformSelect();  
                    RechercheProf();  
                    RechercheLocaux();  
                    RechercheGroupes();   
                }
                
                 
            }
            else if (current == 6)
                document.getElementById("nextBtn").innerHTML = "ENVOYER";

            var x = document.getElementsByClassName("etape");
            x[current].style.display = "block";
        }
        else
        {
            if (current == 0) 
            {
                document.getElementById("nextBtn").innerHTML = "SE CONNECTER";
                document.getElementById("prevBtn").innerHTML = "ACCEUIL";        
            }
            else if (current == 1 || current == 2)
            {
                if (page[0].textContent == "Page d'administration")
                {
                    document.getElementById("nextBtn").style.display = "none";
                    document.getElementById("prevBtn").style.display = "inline";
                    document.getElementById("prevBtn").innerHTML = "SE DECONNECTER";  
                }
                else
                {
                    document.getElementById("nextBtn").innerHTML = "CONTINUER";
                    document.getElementById("prevBtn").innerHTML = "SE DECONNECTER";                     
                }
    
            }    
            else
            {
                document.getElementById("nextBtn").innerHTML = "CONTINUER";
                document.getElementById("prevBtn").innerHTML = "RETOUR";     
            }  
            var x = document.getElementsByClassName("etape");
            x[current].style.display = "block"; 
        }
    }
}

function SupprimerGroupes()
{
    console.log("Je tente de supprimer des groupes");

    let groupe = "sel__box__options Bloc";
    var list = document.getElementsByClassName(groupe);
    for(let i = list.length - 1; i > 0; i--)
    {
        if(list[i] && list[i].parentElement)
        {
            console.log("Suppression groupes");
            list[i].parentElement.removeChild(list[i]); 
        }            
    }
}

function RechercheProf()
{
    console.log("Je passe dans RechercheProf");
    
    $.ajax({
        url : "php/RechercheProfesseurs.php",
        method : "POST",
        dataType : "JSON",
        success : function(result)
        {
            if (result['erreur']) return;

            var $current = $("#ListProf");
            result['professeur'].forEach(elem=>
            {
                $current.children('div').append($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                text: elem['IdProfesseur'] + " | " + elem['Prenom'] + " " + elem['Nom']
                }));

                $('.sel__box__options').click(function() {
                    var txt = $(this).text();
                    var index = $(this).index();
                    
                    $(this).siblings('.sel__box__options').removeClass('selected');
                    $(this).addClass('selected');
                    
                    var $currentSel = $(this).closest('.sel');
                    $currentSel.children('.sel__placeholder').text(txt);
                    $currentSel.children('select').prop('selectedIndex', index + 1);
                });
            });
        }
    });
}

function RechercheLocaux()
{
    console.log("Je passe dans RechercheLocaux");
    
    $.ajax({
        url : "php/RechercheLocaux.php",
        method : "POST",
        dataType : "JSON",
        success : function(result)
        {
            if (result['erreur']) return;

            var $current = $("#ListLocaux");
            result['locaux'].forEach(elem=>
            {
                $current.children('div').append($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                text: elem['NomLocal']
                }));

                $('.sel__box__options').click(function() {
                    var txt = $(this).text();
                    var index = $(this).index();
                    
                    $(this).siblings('.sel__box__options').removeClass('selected');
                    $(this).addClass('selected');
                    
                    var $currentSel = $(this).closest('.sel');
                    $currentSel.children('.sel__placeholder').text(txt);
                    $currentSel.children('select').prop('selectedIndex', index + 1);
                });
            });
        }
    });
}

function RechercheGroupes()
{
    console.log("Je passe dans RechercheGroupes");

    var bloc; // JE RECUPERE LE BLOC CHOISI
    var blocs = document.getElementsByClassName("inputBloc clique");
    bloc =  $(blocs[0]).children().first().prop("name");

    if (bloc.includes("Bloc 1"))
        blo = 1;
    else if (bloc.includes("Bloc 2"))
        blo = 2;
    else
        blo = 3;

    var section = []; // JE RECUPERE LES SECTIONS
    let i = 0;
    var sections = document.getElementsByClassName("inputJournee clique");
    $.each(sections, function() // Récupère les différentes sections choisies
    {
        section.push($(sections[i]).children().first().prop("name")); 
        i++;
    });



    for (let i = 0; i < section.length; i++)
    {
        if (section[i] == "Informatique de Gestion")
            section[i] = 1;
        else if (section[i] == "Informatique finalité : Industrielle")
            section[i] = 2;
        else
            section[i] = 3;
    }  

    $.ajax({
        url : "php/RechercheGroupes.php",
        method : "POST",
        dataType : "JSON",
        data : {
            bloc : blo,
            section : section
        },
        success : function(result)
        {
            if (result['erreur']) return;

            var $current = $("#ListGroupes");
            result['groupes'].forEach(elem=>
            {
                $current.children('div').append($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel__box__options Bloc'),
                text: elem['IdGroupe']
                }));

                $('.sel__box__options').click(function() {
                    var txt = $(this).text();
                    var index = $(this).index();
                    
                    $(this).siblings('.sel__box__options').removeClass('selected');
                    $(this).addClass('selected');
                    
                    var $currentSel = $(this).closest('.sel');
                    $currentSel.children('.sel__placeholder').text(txt);
                    $currentSel.children('select').prop('selectedIndex', index + 1);
                });
            });
        }
    });
}

function AffichageNextStepAdmin(n)
{
    if (n == 1)
    {
        if (currentTabAdmin == 0)
        {
            if (ConnexionAdmin())
            {
                var x = document.getElementsByClassName("etape");
                    
                x[currentTabAdmin].style.display = "none";
                currentTabAdmin += n;
                
                showTabAdmin(currentTabAdmin);   
            }
            else
            {
                let Form = document.getElementById("FormmLogin");
                Form.classList.add("ErrorForm");
                setTimeout(RemoveErrorForm, 1300);
            }            
        }

    } 
    else if (n == -1)
    {
        if (currentTabAdmin == 0)
            document.location.href = "index.html";
        else
        {
            document.getElementById("nextBtn").style.display = "inline";
            document.location.href = "admin.html";
        }
    }
        
    else
    {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "inline";
        var x = document.getElementsByClassName("etape");
                
        x[currentTabAdmin].style.display = "none";
        currentTabAdmin += n;
        
        showTabAdmin(currentTabAdmin);         
    }
}

function RechercheCours()
{
    SupprimerLignes(1);
    var journeechoisie = []; // JE RECUPERE LES SECTIONS
    let i = 0;
    var journee = document.getElementsByClassName("inputJournee clique");
    $.each(journee, function() // Récupère les différentes sections choisies
    {
        journeechoisie.push($(journee[i]).children().first().prop("name")); 
        i++;
    });

    i= 0;
    var sections = []; // JE RECUPERE LES SECTIONS
    var section2 = document.getElementsByClassName("inputGroup clique");
    $.each(section2, function() // Récupère les différentes sections choisies
    {
        sections.push($(section2[i]).children().first().prop("name")); 
        i++;
    });

    $.ajax({
        url : "php/RechercheCours.php",
        method : "POST",
        dataType : "JSON",
        data : {
            sections : sections,
            journees : journeechoisie
        },
        success : function(result)
        {
            let TableauCours = document.getElementById("TableCours");
            result['cours'].forEach(elem=>
            {
                let tr = document.createElement("tr");
                tr.className = "row100 body";
                TableauCours.children[0].appendChild(tr);

                let tdNomCours = document.createElement("td");
                tdNomCours.className = "cell100 column1";
                tdNomCours.textContent = elem['NomCours']; 
                tr.appendChild(tdNomCours);

                let tdHeureDebut = document.createElement("td");
                tdHeureDebut.className = "cell100 column2";
                tdHeureDebut.textContent = elem['HeureDebut'];
                tr.appendChild(tdHeureDebut);

                let tdHeureFin = document.createElement("td");
                tdHeureFin.className = "cell100 column3";
                tdHeureFin.textContent = elem['HeureFin'];
                tr.appendChild(tdHeureFin);

                let tdReprisDansListe = document.createElement("td");
                tdReprisDansListe.className = "cell100 column4";
                tdReprisDansListe.textContent = elem['ReprisDansListe'];
                tr.appendChild(tdReprisDansListe);

                let tdProfesseur = document.createElement("td");
                tdProfesseur.className = "cell100 column5";
                tdProfesseur.textContent = elem['Prenom'] + " " + elem['Nom'];
                tr.appendChild(tdProfesseur);

                let tdType = document.createElement("td");
                tdType.className = "cell100 column6";
                tdType.textContent = elem['NomType'];
                tr.appendChild(tdType);

                let tdLocal = document.createElement("td");
                tdLocal.className = "cell100 column7";
                tdLocal.textContent = elem['NomLocal'];
                tr.appendChild(tdLocal);
            });
        }
    });
}

function RechercheEtudiant() {
    SupprimerLignes(2);
    var journeechoisie = []; // JE RECUPERE LES SECTIONS
    let i = 0;
    var journee = document.getElementsByClassName("inputJournee clique");
    $.each(journee, function() // Récupère les différentes sections choisies
    {
        journeechoisie.push($(journee[i]).children().first().prop("name")); 
        i++;
    });

    $.ajax({
        url : "php/RechercheEtudiants.php",
        method : "POST",
        dataType : "JSON",
        data : {
            journees : journeechoisie
        },
        success : function(result)
        {
            let TableEtudiant = document.getElementById("TableEtudiants");
            result['etudiant'].forEach(elem=>
            {
                let tr = document.createElement("tr");
                tr.className = "row100 body";
                TableEtudiant.children[0].appendChild(tr);

                let tdAdresseMail = document.createElement("td");
                tdAdresseMail.className = "cell100 column1";
                tdAdresseMail.textContent = elem['AdresseMail']; 
                tr.appendChild(tdAdresseMail);

                let tdNom = document.createElement("td");
                tdNom.className = "cell100 column2";
                tdNom.textContent = elem['Nom'];
                tr.appendChild(tdNom);

                let tdPrenom = document.createElement("td");
                tdPrenom.className = "cell100 column3";
                tdPrenom.textContent = elem['Prenom'];
                tr.appendChild(tdPrenom);

                let Etablissement = document.createElement("td");
                Etablissement.className = "cell100 column4";
                
                if (elem['EtablissementScolaire'].length == 0)
                Etablissement.textContent = "Inconnu";
                else
                Etablissement.textContent = elem['EtablissementScolaire'];
                tr.appendChild(Etablissement);

                let tdJour = document.createElement("td");
                tdJour.className = "cell100 column5";
                tdJour.textContent = elem['Jour'];
                tr.appendChild(tdJour);

                let tdNombreCours = document.createElement("td");
                tdNombreCours.className = "cell100 column6";
                tdNombreCours.textContent = elem['NombreJour'];
                tr.appendChild(tdNombreCours);
            });
        }
    });
}

function RechercheProfesseurs()
{
    $.ajax({
        url : "php/RechercheProfesseurs.php",
        method : "POST",
        dataType : "JSON",
        success : function(result)
        {
            let TableauProf = document.getElementById("TableProfesseurs");
            result['professeur'].forEach(elem =>
            {
                let tr = document.createElement("tr");
                tr.className = "row100 body";
                TableauProf.children[0].appendChild(tr);

                let tdProf = document.createElement("td");
                tdProf.className = "cell100 column1";
                tdProf.textContent = elem['IdProfesseur']; 
                tr.appendChild(tdProf);

                let tdNom = document.createElement("td");
                tdNom.className = "cell100 column2";
                tdNom.textContent = elem['Nom'];
                tr.appendChild(tdNom);

                let tdPrenom = document.createElement("td");
                tdPrenom.className = "cell100 column3";
                tdPrenom.textContent = elem['Prenom'];
                tr.appendChild(tdPrenom);
            });
        }
    });
}

function RechercheSections()
{
    $.ajax({
        url : "php/RechercheSections.php",
        method : "POST",
        dataType : "JSON",
        success : function(result)
        {
            let TableSections = document.getElementById("TableSections");
            result['sections'].forEach(elem =>
            {
                let tr = document.createElement("tr");
                tr.className = "row100 body";
                TableSections.children[0].appendChild(tr);

                let tdProf = document.createElement("td");
                tdProf.className = "cell100 column1";
                tdProf.textContent = elem['IdSection']; 
                tr.appendChild(tdProf);

                let tdNom = document.createElement("td");
                tdNom.className = "cell100 column2";
                tdNom.textContent = elem['NomSection'];
                tr.appendChild(tdNom);
            });
        }
    });
}

function RechercheLocal()
{
    $.ajax({
        url : "php/RechercheLocaux.php",
        method : "POST",
        dataType : "JSON",
        success : function(result)
        {
            let TableLocaux = document.getElementById("TableLocaux");
            result['locaux'].forEach(elem =>
            {
                let tr = document.createElement("tr");
                tr.className = "row100 body";
                TableLocaux.children[0].appendChild(tr);

                let tdLocal = document.createElement("td");
                tdLocal.className = "cell100 column1";
                tdLocal.textContent = elem['NomLocal']; 
                tr.appendChild(tdLocal);
            });
        }
    });
}

function SupprimerLignes(bool)
{
    let Tableau;
    if (bool == 1)
        Tableau = document.getElementById("TableCours");
    else if (bool == 2)
        Tableau = document.getElementById("TableEtudiants");

    let Tbody = Tableau.children[0];
    let NbLignes = Tbody.childNodes.length;
    if (NbLignes >= 1)
    {
        for (let i = 0; i < NbLignes; i++)
        {
            Tbody.removeChild(Tbody.firstChild); 
        }        
    }
}

function NextStepCours(n)
{
    if (n == 1)
    {
        if (currentTabAdmin == 0) // INFOS DU COURS
        {
            if (CheckChampsCours())
            {
                document.getElementsByClassName("step")[currentTabAdmin].className += " finish";
                var x = document.getElementsByClassName("etape");
                x[currentTabAdmin].style.display = "none";
                currentTabAdmin += n;
                showTabAdmin(currentTabAdmin); 
            }
        }
        else if (currentTabAdmin == 1)  // TYPE DE COURS
        {
            let type = document.getElementsByClassName("inputGroup clique");
            if (type.length > 1 || type.length == 0)
            {
                let Form = document.getElementById("Ajout_Cours");
                Form.classList.add("ErrorForm");
                setTimeout(RemoveErrorForm, 1300);
            }
            else
            {
                document.getElementsByClassName("step")[currentTabAdmin].className += " finish";
                var x = document.getElementsByClassName("etape");
                x[currentTabAdmin].style.display = "none";
                currentTabAdmin += n;
                showTabAdmin(currentTabAdmin); 
            }
        }
        else if (currentTabAdmin == 2) // SECTIONS
        {
            let type = document.getElementsByClassName("inputJournee clique");
            if (type.length == 0)
            {
                let Form = document.getElementById("Ajout_SectionAdmin");
                Form.classList.add("ErrorForm");
                setTimeout(RemoveErrorForm, 1300);
            }
            else
            {
                document.getElementsByClassName("step")[currentTabAdmin].className += " finish";
                var x = document.getElementsByClassName("etape");
                x[currentTabAdmin].style.display = "none";
                currentTabAdmin += n;
                showTabAdmin(currentTabAdmin); 
            }
        }
        else if (currentTabAdmin == 3) // BLOC
        {
            let type = document.getElementsByClassName("inputBloc clique");
            if (type.length == 0 || type.length > 1)
            {
                let Form = document.getElementById("Ajout_Bloc");
                Form.classList.add("ErrorForm");
                setTimeout(RemoveErrorForm, 1300);
            }
            else
            {
                document.getElementsByClassName("step")[currentTabAdmin].className += " finish";
                var x = document.getElementsByClassName("etape");
                x[currentTabAdmin].style.display = "none";
                currentTabAdmin += n;
                showTabAdmin(currentTabAdmin); 
            }
        }
        else if (currentTabAdmin == 4 || currentTabAdmin == 5 || currentTabAdmin == 6) // FULL SELECT BOX
        {
            
            let etapes = document.getElementsByClassName("etape");
            let etape = etapes[currentTabAdmin].children[1].children;
            if (etape[0].children[0].textContent.includes("Selectionner"))
            {
                let Form;
                if (currentTabAdmin == 4)
                    Form = document.getElementById("Form_Groupes");
                else if (currentTabAdmin == 5)
                    Form = document.getElementById("Form_Prof");
                else if (currentTabAdmin == 6)
                    Form = document.getElementById("Form_Locaux");
                Form.classList.add("ErrorForm");
                setTimeout(RemoveErrorForm, 1300);                          
            }
            else
            {
                if (currentTabAdmin == 6)
                {
                    AjouterCours();
                    //document.getElementById("regForm").submit();
                    return false;  
                }
                else
                {
                    document.getElementsByClassName("step")[currentTabAdmin].className += " finish";
                    var x = document.getElementsByClassName("etape");
                    x[currentTabAdmin].style.display = "none";
                    currentTabAdmin += n;
                    showTabAdmin(currentTabAdmin);   
                }               
            }
        }    
    }
    else if (currentTabAdmin == -1 && n == -1)
    {
        document.location.href = "admin.html";
    }
    else // JE RECULE 
    {
        var x = document.getElementsByClassName("etape");
        x[currentTabAdmin].style.display = "none";
        currentTabAdmin += n;
        showTabAdmin(currentTabAdmin);   
    }
}

function CheckChampsCours() {
    var input = $('.validate-input .input100');
    var check = true;

    for(var i=0; i<input.length; i++)
    {
        if(!ValidationChamp(input[i]))
        {
            showAll(input[i]);
            showValidate(input[i]);
            check=false;
        }
        else
        {
            hideAll(input[i]);
            hideValidate(input[i]);
        }
    }
    return check;
}

function ValidationChamp(input)
{
    if (input.name == "NomCours") // NOM DU COURS
    {
        if($(input).val().trim() == '')
            return false;
    }
    else if (input.name == "HeureDebut" || input.name == "HeureFin") // HEURE
    {
        if($(input).val().trim().match(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/) == null)
            return false;
    }
    else // REPRIS DANS LISTE
    {
        if($(input).val().trim().match(/1|0/) == null) // A MODIF
            return false;
    }
    return true;
}

/* ---------------------------------------------- */

function ConsultationCours()
{
    document.location.href='cours.html';
}

function ConsultationEtudiant()
{
    document.location.href='etudiant.html';
}

function ConsultationProfesseur()
{
    document.location.href='professeurs.html';
}

function ConsultationSections()
{
    document.location.href='sections.html';
}

function ConsultationLocaux()
{
    document.location.href='locaux.html';
}

function RefAjouterCours()
{
    document.location.href = 'ajoutcours.html';
}

function AjouterCours()
{
    console.log("J'ajoute un cours");
    var typecours;
    var type2 = document.getElementsByClassName("inputGroup clique");

    typecours = $(type2[0]).children().first().prop("name"); 


    var sections = [];
    let i = 0;
    var section2 = document.getElementsByClassName("inputJournee clique");
    $.each(section2, function() // Récupère les différentes sections choisies
    {
        sections.push($(section2[i]).children().first().prop("name")); 
        i++;
    });

    let prof = document.getElementsByClassName("login100-form validate-form p-b-33 p-t-5 ProfForm");
    let locaux = document.getElementsByClassName("login100-form validate-form p-b-33 p-t-5 LocauxForm");
    

    console.log($("#NomCours").val());
    console.log($("#HeureDébut").val());
    console.log($("#HeureFin").val());
    console.log(typecours);
    console.log(prof[0].children[0].children[0].textContent);
    console.log(locaux[0].children[0].children[0].textContent);

    $.ajax({
        url : "php/AjouterCours.php",
        method : "POST",
        dataType : "JSON",
        data : {
            nomcours : $("#NomCours").val(),
            heuredebut : $("#HeureDébut").val(),
            heurefin : $("#HeureFin").val(),
            type : typecours,
            prof : prof[0].children[0].children[0].textContent,
            local : locaux[0].children[0].children[0].textContent,
            repris : $("#ReprisListe").val(),
        },
        success : function(result)
        {
            if(result['erreur']){
                alert('CE COURS EXISTE DEJA');
            }
            else
            {
                alert('NEXISTE PAS');
                //document.location.href="admin.html";
            }   
        },
        error : function ()
        {
            alert('error');
        }
    });




}

function AjouterLocal()
{
    document.location.href='ajoutlocal.html';
}

function AjouterProfesseur()
{
    document.location.href='ajoutprofesseur.html';
}

function AjouterEtudiant()
{
    //document.location.href='ajoutetudian.html';
}

function GenererProgramme()
{
    document.location.href='genererprogramme.html';
}

function ExporterBD()
{
    document.location.href='exportbd.html';
}

function GenererAttestation()
{
    document.location.href='genererattestation.html';
}

function RetourMenu() {
    document.location.href = 'admin.html';
}