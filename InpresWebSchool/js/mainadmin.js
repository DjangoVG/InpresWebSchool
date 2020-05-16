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
    else
    {
        var x = document.getElementsByClassName("etape");
        x[current].style.display = "block";
        if (page[0].textContent == "Ajouter un cours")
        {
            document.getElementById("nextBtn").innerHTML = "CONTINUER";
            if (current == 0) 
                document.getElementById("prevBtn").innerHTML = "ACCEUIL";
            else
                document.getElementById("prevBtn").innerHTML = "RETOUR";
            if (current == 1)
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
                div2.className = "login100-form validate-form p-b-33 p-t-5 ProfForm";
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
                TranformSelect();  
                RechercheProf();  
                RechercheLocaux(); 
            }
            else if (current == 3)
                document.getElementById("nextBtn").innerHTML = "ENVOYER";
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
                document.getElementById("nextBtn").innerHTML = "CONTINUER";
                document.getElementById("prevBtn").innerHTML = "SE DECONNECTER";     
            }    
            else
            {
                document.getElementById("nextBtn").innerHTML = "CONTINUER";
                document.getElementById("prevBtn").innerHTML = "RETOUR";     
            }   
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

function AffichageNextStepAdmin(n)
{
    if (n == 1 && currentTabAdmin == 0)
    {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "inline";
    } 
    if (n == -1 && currentTabAdmin == 0)
        document.location.href = "index.html";
    else
    {
        var x = document.getElementsByClassName("etape");
                
        x[currentTabAdmin].style.display = "none";
        currentTabAdmin += n;
        
        showTabAdmin(currentTabAdmin);         
    }

}

function ClickSection(n) // Je clique sur une section (modification de sa classe)
{
    var i, x = document.getElementsByClassName("inputGroup");
    for (i = 0; i < x.length; i++) 
    {
        if (n == i)
        {
            if (x[i].className == "inputGroup clique") 
                x[i].className = "inputGroup";
            else
                x[i].className = "inputGroup clique";            
        }
    }

    let page = document.getElementsByTagName("title");
    if (page[0].textContent == "Consultation des cours")
        RechercheCours();
    else if (page[0].textContent == "Consultation des étudiants")
        RechercheEtudiant();
}

function ClickJournee(n) // Je clique sur une journee (modification de sa classe)
{
    var i, x = document.getElementsByClassName("inputJournee");
    for (i = 0; i < x.length; i++) 
    {
        if (n == i)
        {
            if (x[i].className == "inputJournee clique") 
                x[i].className = "inputJournee";
            else
                x[i].className = "inputJournee clique";            
        }
    }
    let page = document.getElementsByTagName("title");
    if (page[0].textContent == "Consultation des cours")
        RechercheCours();
    else if (page[0].textContent == "Consultation des étudiants")
        RechercheEtudiant();
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
                tdType.textContent = elem['IdType'];
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
    document.getElementsByClassName("step")[currentTabAdmin].className += " finish";
    var x = document.getElementsByClassName("etape");
            
    x[currentTabAdmin].style.display = "none";
    currentTabAdmin += n;

    if (currentTabAdmin == x.length) // JE VALIDE LE DOCUMENT
    {
        AjouterCours();
        document.getElementById("regForm").submit();
        return false;
    }

    console.log(currentTabAdmin);
    if (currentTabAdmin == -1 && n == -1)
        document.location.href = "admin.html";
    
    showTabAdmin(currentTabAdmin); 

}

function TranformSelect()
{
    console.log("Transformation des selects");
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

    var typecours = [];
    var i = 0;
    var type2 = document.getElementsByClassName("inputGroup clique");
    $.each(type2, function() // Récupère les différentes sections choisies
    {
        typecours.push($(type2[i]).children().first().prop("name")); 
        i++;
    });

    // TO DO




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