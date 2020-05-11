var currentTab = 0; // 0 car premiere page du formulaire
var boolean = true;
(function($) 
{
  showTab(currentTab); // Affiche la premiere page du formulaire
  "use strict";
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
        console.log("SUCCES : " + result);
        if (result['erreur']) return;

        console.log("cours : " + result['cours']);
        result['cours'].forEach(elem=>
        {
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
        });
    }
});
}

function SupprimerPlage()
{
    console.log("Je tente de supprimer");
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
}


function showTab(n)
{
    var x = document.getElementsByClassName("etape");
    x[n].style.display = "block";

    if (n == 0)
        document.getElementById("prevBtn").style.display = "none";
    else 
        document.getElementById("prevBtn").style.display = "inline";

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
        for (let i = 0; i < journee.length; i++)
        {
            tableaujourneechoisie = [];
            for (let j = 0; j < 4; j++)
            {
                if (fullplages[i].children[j].className.includes("Jour01"))
                {
                    journeechoisie = 1;
                    break;                  
                }
                else if (fullplages[i].children[j].className.includes("Jour02"))
                {
                    journeechoisie = 2;
                    break;                  
                }
                else if (fullplages[i].children[j].className.includes("Jour03"))
                {
                    journeechoisie = 3; 
                    break;                  
                }
                else if (fullplages[i].children[j].className.includes("Jour04"))
                {
                    journeechoisie = 4; 
                    break;                  
                }
            }
            console.log(journeechoisie);
            AjoutCoursPlages(journeechoisie);
        }
    }
    AffichageStepFormulaire(n)
}

function ClickBoutonFormulaire(n) 
{
    if (currentTab == 2 && n == 1) // J'AVANCE DANS LE FORMULAIRE
    {
        SupprimerAllJournee();
        let compteurjour = document.getElementsByClassName("inputJournee clique");
        for (let i = 0; i < compteurjour.length; i++) // JE RECUPERE LE NOMBRE DE JOURS ET JE CREE LE NOMBRE DE FORMULAIRE
        {
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
            let result = jourclass.concat("Jour0", i+1);
            div3.className = result;
            let select = document.createElement("select");
            select.name = "Plage1"; select.id = "CoursPlage1";
            let option1 = document.createElement("option");
            option1.value = "Plage1"; option1.disabled = true; option1.textContent = "Plage 1 [8h20 - 10h20]";
            let repos = document.createElement("option");
            repos.value = "Repos"; repos.textContent = "Repos";

            let separateur = document.createElement("hr");
            separateur.className = "rule";

            let div4 = document.createElement("div");
            jourclass = "sel sel--Plage02";
            result = jourclass.concat("Jour0", i+1);
            div4.className = result;
            let select2 = document.createElement("select");
            select2.name = "Plage2"; select2.id = "CoursPlage2";
            let option2 = document.createElement("option");
            option2.value = "Plage2"; option2.disabled = true; option2.textContent = "Plage 2 [10h30 - 12h30]";
            let repos2 = document.createElement("option");
            repos2.value = "Repos"; repos2.textContent = "Repos";

            let div5 = document.createElement("div");
            jourclass = "sel sel--Plage03";
            result = jourclass.concat("Jour0", i+1);
            div5.className = result;
            let select3 = document.createElement("select");
            select3.name = "Plage3"; select3.id = "CoursPlage3";
            let option3= document.createElement("option");
            option3.value = "Plage3"; option3.disabled = true; option3.textContent = "Plage 3 [13h30 - 15h30]";
            let repos3 = document.createElement("option");
            repos3.value = "Repos"; repos3.textContent = "Repos";

            
            let div6 = document.createElement("div");
            jourclass = "sel sel--Plage04";
            result = jourclass.concat("Jour0", i+1);
            div6.className = result;
            let select4 = document.createElement("select");
            select4.name = "Plage4"; select4.id = "CoursPlage4";
            let option4= document.createElement("option");
            option4.value = "Plage4"; option4.disabled = true; option4.textContent = "Plage 4 [15h30 - 17h30]";
            let repos4 = document.createElement("option");
            repos4.value = "Repos"; repos4.textContent = "Repos";

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
        showTab(currentTab); 
    }

    if (n == 1 && currentTab == 0) // JE SUIS PREMIERE PAGE DONC JE VERIFIE LES CHAMPS
    {
        if (CheckChampFormulaire())
        {
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
    }
    else
    {
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

    if (check)
        document.getElementsByClassName("step")[currentTab].className += " finish";

    return check;
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

function ValidationUnique(input)
{
    $.ajax({
        url : "php/RechercheEtudiant.php",
        method : "POST",
        dataType : "JSON",
        async : false,
        data : {
            mailetudiant : $(input).val()
        },
        success : function(result)
        {
            let input = $('.validate-input .input100');
            if (result['erreur'])
            {
                NotUnique();
                showAll(input[0]);
                showValidateNotUnique(input[0]);  
               
            }
            else
            {
                Unique();
                hideAll(input[0]);
                hideValidateNotUnique(input[0]);               
            }
        }
    });
    return boolean;
}

function NotUnique()
{
    boolean = false;
}
function Unique()
{
    boolean = true;
}

function showAll (input)
{
    var thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('faux');
}

function showValidateNotUnique(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('notunique');
}

function hideValidateNotUnique(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('notunique');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('faux');
}

function hideAll(input)
{
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate');
}

function InscriptionBouton()
{

}

function Administrateur()
{
    
}