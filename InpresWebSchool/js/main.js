document.write('<script type="text/javascript" src="js/util.js" ></script>');
var currentTab = 0; // 0 car premiere page du formulaire
var boolean = true;
(function($) 
{
    showTab(currentTab); // Affiche la premiere page du formulaire
    "use strict";
})(jQuery);

function Inscription() { // JE CHECK SI UTILISATEUR DANS LA PERIODE
    var now = new Date();
    $.ajax({
        url : "php/RecherchePeriode.php",
        method : "POST",
        dataType : "JSON",
        async : false,
        success : function(result)
        {
            result['periode'].forEach(elem=>
            {
                let DateDebut = new Date(elem['DebutPeriode']);
                let DateFin = new Date(elem['FinPeriode']);
                if (now < DateDebut || now > DateFin)
                    alertbox.show('La période d\'inscription est clotûrée !');
                else
                    document.location.href = "inscription.html";
            })
        }
    });
}

function AjoutCoursPlages(journeechoisie)
{
    console.log("Je passe dans AjoutCoursPlages");
    var sections = [];
    var i = 0;
    var section2 = document.getElementsByClassName("inputGroup clique");
    var nomprof;
    $.each(section2, function() // Récupère les différentes sections choisies
    {
        sections.push($(section2[i]).children().first().prop("name")); 
        i++;
    });
  $.ajax({
    url : "php/AjoutCoursPlage.php",
    method : "POST",
    dataType : "JSON",
    data : {
        sectionss : sections,
        journee : journeechoisie
    },
    success : function(result)
    {
        if (result['erreur']) return;
        
        result['cours'].forEach(elem=>
        {
            console.log("cours : " + elem['NomCours']);
            if (elem['HeureFin'] <= '11:00:00') // PLAGE 1
            {
                let string = ".sel--Plage01Jour0";
                let result = string.concat (journeechoisie);
                $(result).each(function() 
                {
                    var $current = $(this);
                    // JE RECHERCHE L'ID DU PROFESSEUR
                    $.ajax({
                        url : "php/RechercheProfesseur.php",
                        method : "POST",
                        dataType : "JSON",
                        data : {
                            idprof : elem["IdProfesseur"],
                        },
                        success : function(result)
                        {   
                            result['professeur'].forEach(prof=>
                            {
                                
                                nomprof = prof['Nom'];
                                prenomprof = prof['Prenom'];
                            });

                            $current.children('div').append($('<span>', {
                            class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                            text: elem['NomCours'] + " | [" + elem['HeureDebut'] + " - " + elem['HeureFin'] + "] -> " + prenomprof + " " + nomprof
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
                    }});
                });   
            }
            else if (elem['HeureFin'] <= '13:00:00') // PLAGE 2
            {
                let string = ".sel--Plage02Jour0";
                let result = string.concat (journeechoisie);
                $(result).each(function() 
                {
                    var $current = $(this);
                    // JE RECHERCHE L'ID DU PROFESSEUR
                    $.ajax({
                        url : "php/RechercheProfesseur.php",
                        method : "POST",
                        dataType : "JSON",
                        data : {
                            idprof : elem["IdProfesseur"],
                        },
                        success : function(result)
                        {   
                            result['professeur'].forEach(prof=>
                            {
                                
                                nomprof = prof['Nom'];
                                prenomprof = prof['Prenom'];
                                console.log("check : " + prof['Nom']);
                            });

                            $current.children('div').append($('<span>', {
                            class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                            text: elem['NomCours'] + " | [" + elem['HeureDebut'] + " - " + elem['HeureFin'] + "] -> " + prenomprof + " " + nomprof
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
                        }});
                });          
            }
            else if (elem['HeureFin'] <= '16:00:00') // PLAGE 3
            {
                let string = ".sel--Plage03Jour0";
                let result = string.concat (journeechoisie);
                $(result).each(function() 
                {
                    var $current = $(this);
                    // JE RECHERCHE L'ID DU PROFESSEUR
                    $.ajax({
                        url : "php/RechercheProfesseur.php",
                        method : "POST",
                        dataType : "JSON",
                        data : {
                            idprof : elem["IdProfesseur"],
                        },
                        success : function(result)
                        {   
                            result['professeur'].forEach(prof=>
                            {
                                
                                nomprof = prof['Nom'];
                                prenomprof = prof['Prenom'];
                                console.log("check : " + prof['Nom']);
                            });

                            $current.children('div').append($('<span>', {
                            class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                            text: elem['NomCours'] + " | [" + elem['HeureDebut'] + " - " + elem['HeureFin'] + "] -> " + prenomprof + " " + nomprof
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
                        }});
                });          
            }
            else if (elem['HeureFin'] <= '18:00:00') // DERNIERE PLAGE
            {
                let string = ".sel--Plage04Jour0";
                let result = string.concat (journeechoisie);
                $(result).each(function() 
                {
                    var $current = $(this);
                    // JE RECHERCHE L'ID DU PROFESSEUR
                    $.ajax({
                        url : "php/RechercheProfesseur.php",
                        method : "POST",
                        dataType : "JSON",
                        data : {
                            idprof : elem["IdProfesseur"],
                        },
                        success : function(result)
                        {   
                            result['professeur'].forEach(prof=>
                            {
                                nomprof = prof['Nom'];
                                prenomprof = prof['Prenom'];
                            });

                            $current.children('div').append($('<span>', {
                            class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                            text: elem['NomCours'] + " | [" + elem['HeureDebut'] + " - " + elem['HeureFin'] + "] -> " + prenomprof + " " + nomprof
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
                        }
                    });
                });           
            }
        });
    }
});
}

function SupprimerPlage()
{
    let input = document.getElementsByClassName("inputJournee clique");
    for(let i = 0; i < input.length ; i++)
    {
        let chaine1 = "sel__box__options sel__box__options--Plage01";
        let final = chaine1.concat("Jour0" + i);
        var list = document.getElementsByClassName(final);
        for(let i = list.length - 1; i > 0; i--)
        {
            if(list[i] && list[i].parentElement)
            {
                console.log("Suppression plage 1");
                list[i].parentElement.removeChild(list[i]); 
            }            
        }

        chaine1 = "sel__box__options sel__box__options--Plage02";
        final = chaine1.concat("Jour0" + i);
        list = document.getElementsByClassName(final);
        for(let i = list.length - 1; i > 0; i--)
        {
            if(list[i] && list[i].parentElement)
            {
                console.log("Suppression plage 2");
                list[i].parentElement.removeChild(list[i]); 
            }            
        }

        chaine1 = "sel__box__options sel__box__options--Plage03";
        final = chaine1.concat("Jour0" + i);
        list = document.getElementsByClassName(final);
        for(let i = list.length - 1; i > 0; i--)
        {
            if(list[i] && list[i].parentElement)
            {
                console.log("Suppression plage 3");
                list[i].parentElement.removeChild(list[i]); 
            }            
        }

        chaine1 = "sel__box__options sel__box__options--Plage04";
        final = chaine1.concat("Jour0" + i);
        list = document.getElementsByClassName(final);
        for(let i = list.length - 1; i > 0; i--)
        {
            if(list[i] && list[i].parentElement)
            {
                console.log("Suppression plage 4");
                list[i].parentElement.removeChild(list[i]); 
            }            
        }
    }
}

function AjouterEtudiant()
{
    var sections = [];
    var i = 0;
    var section2 = document.getElementsByClassName("inputGroup clique");
    $.each(section2, function() // Récupère les différentes sections choisies
    {
        sections.push($(section2[i]).children().first().prop("name")); 
        i++;
    });

    let journee = document.getElementsByClassName("inputJournee clique");
    let fullplages = document.getElementsByClassName("login100-form validate-form p-b-33 p-t-5 PlageForm");
    tableaujourneechoisie = [];
    tableauplagechoisie = [];
    for (let i = 0; i < journee.length; i++)
    {
        tableaujourneechoisie.push(journee[i].textContent);    
        for (let j = 0; j < 4; j++)
        {
            tableauplagechoisie.push(fullplages[i].children[j].children[0].textContent);
        }
    }

    $.ajax({
        url : "php/AjoutEtudiant.php",
        method : "POST",
        dataType : "JSON",
        data : {
            mailetudiant : $("#AdresseMail").val(),
            nometudiant : $("#Nom").val(),
            prenometudiant : $("#Prenom").val(),
            etablissementetudiant : $("#Etablissement").val(),
            sections : sections,
            journeeschoisies : tableaujourneechoisie,
            plagechoisies : tableauplagechoisie
        },
        success : function(result)
        {
            if(result['erreur']){
                alert(result['message']);
            }
            else
            {
                location.reload();
            }
                
        }
    });
}


function showTab(n)
{
    var x = document.getElementsByClassName("etape");
    x[n].style.display = "block";

    if (n == 0)
        document.getElementById("prevBtn").innerHTML = "ACCEUIL";
    else 
        document.getElementById("prevBtn").innerHTML = "RETOUR";

    if (n == (x.length - 1) && n != 2) 
        document.getElementById("nextBtn").innerHTML = "ENVOYER";
    else 
        document.getElementById("nextBtn").innerHTML = "CONTINUER";

    if (n == 3)
    {
        SupprimerPlage();
        let journeechoisie = 0;
        let journee = document.getElementsByClassName("inputJournee clique");
        let fullplages = document.getElementsByClassName("login100-form validate-form p-b-33 p-t-5 PlageForm");
        console.log(journee[0].children[0]);
        for (let i = 0; i < journee.length; i++)
        {
            if ($(journee[i]).children().first().prop("name") == "Lundi 15 juin 2020")
                journeechoisie = 1;   
            else if ($(journee[i]).children().first().prop("name") == "Mardi 16 juin 2020")
                journeechoisie = 2; 
            else if ($(journee[i]).children().first().prop("name") == "Mercredi 17 juin 2020")
                journeechoisie = 3;      
            else if ($(journee[i]).children().first().prop("name") == "Jeudi 18 juin 2020")
                journeechoisie = 4;            
            else if ($(journee[i]).children().first().prop("name") == "Vendredi 19 juin 2020")
                journeechoisie = 5;

            AjoutCoursPlages(journeechoisie);
        }            
    }
    AffichageStepFormulaire(n)
}

function ClickBoutonFormulaire(n) 
{
    if (n == -1)
    {
        if (currentTab == 0)
            document.location.href='index.html'; 
        else
            AffichageNextStep(n);
    }
    else
    {
        if (currentTab == 2) // J'AVANCE DANS LE FORMULAIRE
        {
            SupprimerAllJournee();
            var compteurjour = document.getElementsByClassName("inputJournee clique");
            if (compteurjour.length == 0)
            {
                let Form = document.getElementsByClassName("login100-form validate-form");
                Form[currentTab].classList.add("ErrorForm");
                alertbox.show('Vous devez choisir au minimum une journée !');
                setTimeout(RemoveErrorForm, 1300);
            }
            else
            {
                for (let i = 0; i < compteurjour.length; i++) // JE RECUPERE LE NOMBRE DE JOURS ET JE CREE LE NOMBRE DE FORMULAIRE
                {
                    let journeechoisie = 0;

                    if ($(compteurjour[i]).children().first().prop("name") == "Lundi 15 juin 2020")
                        journeechoisie = 1;   
                    else if ($(compteurjour[i]).children().first().prop("name") == "Mardi 16 juin 2020")
                        journeechoisie = 2; 
                    else if ($(compteurjour[i]).children().first().prop("name") == "Mercredi 17 juin 2020")
                        journeechoisie = 3;      
                    else if ($(compteurjour[i]).children().first().prop("name") == "Jeudi 18 juin 2020")
                        journeechoisie = 4;            
                    else if ($(compteurjour[i]).children().first().prop("name") == "Vendredi 19 juin 2020")
                        journeechoisie = 5;

                    let ContainerJournee = document.getElementById("ContainerJournees");

                    var etape = document.createElement("div");
                    etape.style = "display: none";
                    etape.className = "etape";

                    let span1 = document.createElement("span");
                    span1.className = "login100-form-title p-b-41";
                    span1.textContent = compteurjour[i].textContent;

                    let div2 = document.createElement("div");
                    div2.className = "login100-form validate-form p-b-33 p-t-5 PlageForm";
                    div2.id = "Form_Plages";

                    let div3 = document.createElement("div");
                    let jourclass = "sel sel--Plage01";
                    let result = jourclass.concat("Jour0", journeechoisie);
                    div3.className = result;
                    let select = document.createElement("select");
                    select.name = "Plage1"; select.id = "CoursPlage1";
                    let option1 = document.createElement("option");
                    option1.value = "Plage1"; option1.disabled = true; option1.textContent = "Plage 1 [8h20 - 10h20]";
                    let repos = document.createElement("option");
                    repos.value = "Aucun cours ne m'intéresse"; repos.textContent = "Aucun cours ne m'intéresse";

                    let separateur = document.createElement("hr");
                    separateur.className = "rule";

                    let div4 = document.createElement("div");
                    jourclass = "sel sel--Plage02";
                    result = jourclass.concat("Jour0", journeechoisie);
                    div4.className = result;
                    let select2 = document.createElement("select");
                    select2.name = "Plage2"; select2.id = "CoursPlage2";
                    let option2 = document.createElement("option");
                    option2.value = "Plage2"; option2.disabled = true; option2.textContent = "Plage 2 [10h30 - 12h30]";
                    let repos2 = document.createElement("option");
                    repos2.value = "Aucun cours ne m'intéresse"; repos2.textContent = "Aucun cours ne m'intéresse";

                    let div5 = document.createElement("div");
                    jourclass = "sel sel--Plage03";
                    result = jourclass.concat("Jour0", journeechoisie);
                    div5.className = result;
                    let select3 = document.createElement("select");
                    select3.name = "Plage3"; select3.id = "CoursPlage3";
                    let option3= document.createElement("option");
                    option3.value = "Plage3"; option3.disabled = true; option3.textContent = "Plage 3 [13h30 - 15h30]";
                    let repos3 = document.createElement("option");
                    repos3.value = "Aucun cours ne m'intéresse"; repos3.textContent = "Aucun cours ne m'intéresse";

                    
                    let div6 = document.createElement("div");
                    jourclass = "sel sel--Plage04";
                    result = jourclass.concat("Jour0", journeechoisie);
                    div6.className = result;
                    let select4 = document.createElement("select");
                    select4.name = "Plage4"; select4.id = "CoursPlage4";
                    let option4= document.createElement("option");
                    option4.value = "Plage4"; option4.disabled = true; option4.textContent = "Plage 4 [15h30 - 17h30]";
                    let repos4 = document.createElement("option");
                    repos4.value = "Aucun cours ne m'intéresse"; repos4.textContent = "Aucun cours ne m'intéresse";

                    /* ------------------------------------------------ */

                    ContainerJournee.appendChild(etape);
                    etape.appendChild(span1);
                    etape.appendChild(div2);
                    div2.appendChild(div3);
                    div3.appendChild(select);
                    select.appendChild(option1);
                    select.appendChild(repos);

                    div2.appendChild(div4);
                    div4.appendChild(select2);
                    select2.appendChild(option2);
                    select2.appendChild(repos2);

                    div2.appendChild(div5);
                    div5.appendChild(select3);
                    select3.appendChild(option3);
                    select3.appendChild(repos3);

                    div2.appendChild(div6);
                    div6.appendChild(select4);
                    select4.appendChild(option4);
                    select4.appendChild(repos4);

                    
                }
                TranformSelect();
                AjoutStepDocument();
                AffichageNextStep(n);    
            }
            
        }
        else if (currentTab == 0) // JE SUIS PREMIERE PAGE DONC JE VERIFIE LES CHAMPS
        {
            if (CheckChampFormulaire())
            {
                AffichageNextStep(n);
            }
        }
        else
        {
            if (n == 1 && currentTab == 1) // JE CHECK SI MINIMUM UNE SECTION COCHEE
            {
                let journee = document.getElementsByClassName("inputGroup clique");
                if (journee.length == 0)
                {
                    let Form = document.getElementsByClassName("login100-form validate-form");
                    Form[currentTab].classList.add("ErrorForm");
                    alertbox.show('Vous devez choisir au minimum une section !');
                    setTimeout(RemoveErrorForm, 1300);
                }
                else
                    AffichageNextStep(n);
            } 
            else if (n == 1 && currentTab == 2) // JE CHECK SI MINIMUM UNE JOURNEE COCHEE
            {
                let journee = document.getElementsByClassName("inputJournee clique");
                if (journee.length == 0)
                {
                    let Form = document.getElementById("Form_Journee");
                    Form.classList.add("ErrorForm");
                    alertbox.show('Vous devez choisir au minimum une journée !');
                    setTimeout(RemoveErrorForm, 1300);
                }
                else
                {
                    AffichageNextStep(n);
                }
            }
            else if (n == 1 && currentTab >= 3) // JE CHECK LES PLAGES
            {
                let boolean = true;
                let plages = document.getElementsByClassName("etape");
                let plage = plages[currentTab].children[1].children; // JE RECUPERE LES 4 PLAGES DE LA CURRENT PLAGE
                var MinimumCoursJournee = 0;
                var MinimumCoursJournees = 0;

                $.ajax({
                    url : "php/RechercheMinimumCours.php",
                    method : "POST",
                    dataType : "JSON",
                    async : false,
                    success : function(result)
                    {
                        result['minimumcours'].forEach(elem=>
                        {
                            MinimumCoursJournee = elem['journee'];
                            MinimumCoursJournees = elem['journees'];
                        })
                    }
                });

                if (plages.length == 4) // J'AI PRIS QU'1 JOURNEE
                {
                    for (let i = 0; i < plage.length; i++)
                    {
                        if (plage[i].children[0].textContent.includes("Plage"))
                        {
                            let Form = document.getElementById("Form_Plages");
                            Form.classList.add("ErrorForm");
                            alertbox.show('Vous devez sélectionner un cours en plage ' + i + ' !');
                            setTimeout(RemoveErrorForm, 1300); 
                            boolean = false;                           
                        }
                        else
                        {
                            if (plage[i].children[0].textContent.includes("Aucun cours ne m'intéresse"))
                            {
                                if (i < MinimumCoursJournee)
                                {
                                    let Form = document.getElementById("Form_Plages");
                                    Form.classList.add("ErrorForm");
                                    setTimeout(RemoveErrorForm, 1300);
                                    boolean = false;  
                                }
                            }                  
                        }
                    }  
                    if (boolean) 
                        AffichageNextStep(n);  
                    else
                        alertbox.show('Vous devez sélectionner un cours dans les ' + MinimumCoursJournee + ' premières plages !');             
                }
                else // J'AI PRIS PLUSIEURS JOURNEES
                {
                    for (let i = 0; i < plage.length; i++)
                    {
                        if (plage[i].children[0].textContent.includes("Plage"))
                        {
                            let Form = document.getElementById("Form_Plages");
                            Form.classList.add("ErrorForm");
                            alertbox.show('Vous devez sélectionner un cours en plage ' + i + ' !');
                            setTimeout(RemoveErrorForm, 1300); 
                            boolean = false;                           
                        }
                        else
                        {
                            if (plage[i].children[0].textContent.includes("Aucun cours ne m'intéresse"))
                            {
                                if (i < MinimumCoursJournees)
                                {
                                    let Form = document.getElementById("Form_Plages");
                                    Form.classList.add("ErrorForm");
                                    setTimeout(RemoveErrorForm, 1300);
                                    boolean = false;  
                                }
                            }                  
                        }
                    }  
                    if (boolean)
                        AffichageNextStep(n);
                    else
                        alertbox.show('Vous devez sélectionner un cours dans les ' + MinimumCoursJournees + ' premières plages !');
                }
            }
        }
    }
}

function AffichageNextStep(n)
{
    document.getElementsByClassName("step")[currentTab].className += " finish";
    var x = document.getElementsByClassName("etape");
            
    x[currentTab].style.display = "none";
    currentTab += n;

    if (currentTab == x.length) // JE VALIDE LE DOCUMENT
    {
        AjouterEtudiant();
        document.getElementById("regForm").submit();
        return false;
    }
    showTab(currentTab); 
}

function SupprimerAllJournee()
{
    let ContainerJournee = document.getElementById("ContainerJournees");
    let idstep = document.getElementById("idstep");

    while (ContainerJournee.firstChild != null)
    {
        ContainerJournee.removeChild(ContainerJournee.firstChild);   
        idstep.removeChild(idstep.lastChild);     
    }

}

function AffichageStepFormulaire(n) 
{
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

function AjoutStepDocument()
{
    let nbretape = document.getElementsByClassName("etape");

    for (let i = 3; i < nbretape.length; i++)
    {
        step = document.createElement("span");
        if (i == 4)
            step.className = "step active"; 
        else 
            step.className = "step";
        idstep.appendChild(step); 
    }
}


function CheckChampFormulaire()
{
    var input = $('.validate-input .input100');
    var check = true;

    for(var i=0; i<input.length; i++)
    {
        if(!ValidationPattern(input[i]))
        {
            if ( i<input.length-1) // Je suis pas l'établissement scolaire
            {
                hideValidateNotUnique(input[i]);
                showAll(input[i]);
                showValidate(input[i]);
                check=false;      
            }
        }
        else
        {
            if (i == 0)
            {
                if (!ValidationUnique(input[i]))
                    check = false; 
            }
            else
            {
                hideAll(input[i]);
                hideValidate(input[i]);
            }
        }

    }
    return check;
}