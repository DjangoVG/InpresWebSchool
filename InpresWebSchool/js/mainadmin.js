document.write('<script type="text/javascript" src="js/util.js" ></script>');
var currentTabAdmin = 0;
var admin = true;
var gomodif = false; // SI COLLECTIF TRUE POUR RECHERCHE LES GROUPES AVANT
var boolean = true; // MAIL UNIQUE ?
(function($) 
{
    let page = document.getElementsByTagName("title");
    if (page[0].textContent == "Page d'administration")
    {
        if (sessionStorage.getItem("connecte") == "1")
        {
            var x = document.getElementsByClassName("etape");
                            
            x[currentTabAdmin].style.display = "none";
            currentTabAdmin += 1;
            
            showTabAdmin(currentTabAdmin);               
        }
        else
        {
            showTabAdmin(currentTabAdmin);
        }
    }
    else
    {
        if (sessionStorage.getItem("connecte") == "1")
        {
            showTabAdmin(currentTabAdmin);
        }
        else
            document.location.href = 'admin.html';
    }
        
    "use strict";
})(jQuery);


/* LOGIN ADMINISTRATEUR */

function ConnexionAdmin()
{
    if ($("#AdresseMailAdmin").val().length == 0)
    {
        let Form = document.getElementById("FormmLogin");
        Form.classList.add("ErrorForm");
        setTimeout(RemoveErrorForm, 1300);
        alertbox.show('Veuillez entrer un vrai login !');
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
                sessionStorage.setItem("connecte","1");
                return true;
            },
            error : function (result)
            {
                let Form = document.getElementById("FormmLogin");
                Form.classList.add("ErrorForm");
                setTimeout(RemoveErrorForm, 1300);
                alertbox.show('Mauvais login !');
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

/* AFFICHAGE DES ETAPES ----------------------------- */
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
    else if (page[0].textContent == "Ajouter un local")
    {
        document.getElementById("nextBtn").innerHTML = "AJOUTER CE LOCAL";
        document.getElementById("prevBtn").innerHTML = "ACCEUIL";
    }
    else if (page[0].textContent == "Génération d'une attestation")
    {
        document.getElementById("nextBtn").innerHTML = "GÉNÉRER";
        document.getElementById("prevBtn").innerHTML = "ACCEUIL";
        var x = document.getElementsByClassName("etape");
        x[current].style.display = "block"; 
    }
    else if (page[0].textContent == "Ajouter un professeur")
    {
        document.getElementById("nextBtn").innerHTML = "AJOUTER CE PROFESSEUR";
        document.getElementById("prevBtn").innerHTML = "ACCEUIL";
    }
    else if (page[0].textContent == "Ajouter un cours")
    {
        document.getElementById("nextBtn").innerHTML = "CONTINUER";
        if (current == 0) 
            document.getElementById("prevBtn").innerHTML = "ACCEUIL";
        else
            document.getElementById("prevBtn").innerHTML = "RETOUR";
        if (current == 4 || gomodif == true)
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
                div2.className = "login100-form validate-form p-b-33 p-t-5 GroupeForm";
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
        else if (current == 5 && gomodif == true)
            document.getElementById("nextBtn").innerHTML = "ENVOYER";
        else if (current == 6)
            document.getElementById("nextBtn").innerHTML = "ENVOYER";

        var x = document.getElementsByClassName("etape");
        x[current].style.display = "block";
    }
    else if (page[0].textContent == "Page d'inscription")
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
    else if (page[0].textContent == "Ajouter un étudiant")
    {
        if (current == 0) 
        {
            document.getElementById("nextBtn").innerHTML = "CONTINUER";
            document.getElementById("prevBtn").innerHTML = "ACCEUIL";  
            var x = document.getElementsByClassName("etape");
            x[current].style.display = "block";    
        }
        else if (current == 1)
        {
            let x = document.getElementsByClassName("etape");
            x[0].style.display = "none";  
            document.getElementById("nextBtn").innerHTML = "GÉNÉRER";
            document.getElementById("prevBtn").innerHTML = "RETOUR";  
            let ContainerEtudiants = document.getElementById("ContainerEtudiants");
            let toClone = document.getElementById("toClone");
            
            for (let i = 0; i < $("#NombreEtudiants").val(); i++) // JE CLONE LES FORMULAIRES
            {
                let nouvelEtudiant = toClone.cloneNode(true);
                nouvelEtudiant.style.display = "block";
                nouvelEtudiant.children[0].innerHTML = "ÉTUDIANT " + (i+1);
                ContainerEtudiants.appendChild(nouvelEtudiant);
            }
            ContainerEtudiants.className = "etape";
            x = document.getElementsByClassName("etape");
            x[current].style.display = "block"; 
        }
    }
    else if (page[0].textContent == "Modifier le nombre de cours" || page[0].textContent == "Modifier la période d'inscription")
    {
        if (current == 0) 
        {
            document.getElementById("nextBtn").innerHTML = "CONTINUER";
            document.getElementById("prevBtn").innerHTML = "ACCEUIL";    
        }
        else if (current == 1)
        {
            let x = document.getElementsByClassName("etape");
            x[0].style.display = "none"; 
            document.getElementById("nextBtn").innerHTML = "MODIFIER";
            document.getElementById("prevBtn").innerHTML = "RETOUR";  
        }
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

function NextStep(n)
{
    var page = document.getElementsByTagName("title");
    if (n == 1)
    {
        if (page[0].textContent == "Page d'inscription")
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
        else if (page[0].textContent == "Ajouter un cours")
        {
            if (currentTabAdmin == 0) // INFOS DU COURS
            {
                var input = $('.validate-input .input100');
                if (CheckChamps(input))
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
                    alertbox.show('Vous devez choisir un type de cours seulement !');
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
                    alertbox.show('Vous devez choisir au moins une section !');
                    setTimeout(RemoveErrorForm, 1300);
                }
                else
                {
                    let collectif = document.getElementsByClassName("inputCollectif clique");
                    if (type.length == 1 && collectif.length == 1)
                    {
                        let Form = document.getElementById("Ajout_SectionAdmin");
                        Form.classList.add("ErrorForm");
                        alertbox.show('Vous devez choisir au minimum 2 sections car cours collectif !');
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
            }
            else if (currentTabAdmin == 3) // BLOC
            {
                let type = document.getElementsByClassName("inputBloc clique");
                if (type.length == 0 || type.length > 1)
                {
                    let Form = document.getElementById("Ajout_Bloc");
                    Form.classList.add("ErrorForm");
                    alertbox.show('Vous devez choisir un bloc !');
                    setTimeout(RemoveErrorForm, 1300);
                }
                else
                {
                    let collectif = document.getElementsByClassName("inputCollectif clique");
                    if (collectif.length == 1)
                    {
                        document.getElementsByClassName("step")[currentTabAdmin].className += " finish";
                        var x = document.getElementsByClassName("etape");
                        x[currentTabAdmin].style.display = "none";
                        currentTabAdmin += 2;
                        gomodif = true;
                        showTabAdmin(currentTabAdmin); 
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
                    alertbox.show('Veuillez choisir un élement dans la liste !');
                    setTimeout(RemoveErrorForm, 1300);                          
                }
                else
                {
                    if (currentTabAdmin == 6)
                    {
                        AjouterCours();
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
        else if (page[0].textContent == "Ajouter un local")
        {
            if (ValidationLocal())
                AjouterLocal();
            else
            {
                let Form = document.getElementById("FormLocal");
                Form.classList.add("ErrorForm");
                alertbox.show('Veuiller rentrer des champs valides !');
                setTimeout(RemoveErrorForm, 1300);
            }
        }
        else if (page[0].textContent == "Ajouter un professeur")
        {
            if (ValidationProfesseur())
                AjouterProfesseur();
            else
            {
                let Form = document.getElementById("FormProfesseur");
                Form.classList.add("ErrorForm");
                alertbox.show('Veuiller rentrer des champs valides !');
                setTimeout(RemoveErrorForm, 1300);
            }
        }
        else if (page[0].textContent == "Page d'administration")
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
                    alertbox.show('Mauvais login !');
                    setTimeout(RemoveErrorForm, 1300);
                }            
            }
        }
        else if (page[0].textContent == "Ajouter un étudiant")
        {
            if (currentTabAdmin == 0) // JE SUIS PREMIERE PAGE DONC JE VERIFIE LES CHAMPS
            {
                if (CheckNombreEtudiants())
                {
                    currentTabAdmin += n;
                    showTabAdmin(currentTabAdmin);  
                }
            }
            else if (currentTabAdmin == 1)
            {
                let bool = false;
                let ContainerEtudiants = document.getElementById("ContainerEtudiants");
                for (let i = 0; i < ContainerEtudiants.children.length ; i++) // JE RECUPERE CHAQUES CHAMPS POUR LES VERIFIER
                {
                    if (CheckChampFormulaireMultiEtudiant(ContainerEtudiants.children[i].children[1]))
                        bool = true;
                }
                if (bool)
                {
                    for (let i = 0; i < ContainerEtudiants.children.length ; i++) // JE REPARCOURS LE CONTAINER ET JE LES AJOUTE TOUS + ADDING PROGRAMME
                    {
                        $.ajax({
                            url : "php/AjoutEtudiant.php",
                            method : "POST",
                            dataType : "JSON",
                            async : false,
                            data : {
                                mailetudiant : $(ContainerEtudiants.children[i].children[1].children[0].children[0]).val(),
                                nometudiant : $(ContainerEtudiants.children[i].children[1].children[1].children[0]).val(),
                                prenometudiant : $(ContainerEtudiants.children[i].children[1].children[2].children[0]).val(),
                                etablissementetudiant : $(ContainerEtudiants.children[i].children[1].children[3].children[0]).val(),
                            },
                            success : function(result)
                            {
                                document.location.href = "admin.html";
                            },
                            error : function(result)
                            {
                                document.location.href = "admin.html";
                            }
                        });
                    }
                }
            }
        }
        else if (page[0].textContent == "Modifier le nombre de cours")
        {
            if (currentTabAdmin == 0)
            {
                var input = $('#NbJournee');
                if (CheckChamps(input))
                {
                    currentTabAdmin += n;
                    showTabAdmin(currentTabAdmin); 
                }
            }
            else if (currentTabAdmin == 1)
            {
                var input = $('#NbJournees');
                if (CheckChamps(input))
                {
                    $.ajax({
                        url : "php/ModifNbCoursObligatoires.php",
                        method : "POST",
                        dataType : "JSON",
                        data : {
                            journee : $('#NbJournee').val(),
                            journees : $('#NbJournees').val()
                        },
                        success : function(result)
                        {
                            alertbox.show("Modifié !")
                            setTimeout(RetourMenu, 3000);
                        }
                    });
                }
            }
        }
        else if (page[0].textContent == "Modifier la période d'inscription")
        {
            if (currentTabAdmin == 0)
            {
                var input = $('#DateDebut');
                if (CheckChamps(input))
                {
                    currentTabAdmin += n;
                    showTabAdmin(currentTabAdmin); 
                }
            }
            else if (currentTabAdmin == 1)
            {
                var input = $('#DateFin');
                if (CheckChamps(input))
                {
                    var debut = $('#DateDebut').val();
                    
                    let debutarray = debut.split("/");
                    debut = "";
                    debut = debut.concat(debutarray[2], "-", debutarray[1], "-", debutarray[0]);
                    var fin = $('#DateFin').val();
                    let finarray = fin.split("/");
                    fin ="";
                    fin = fin.concat(finarray[2], "-", finarray[1], "-", finarray[0]);
                    $.ajax({
                        url : "php/ModifPeriode.php",
                        method : "POST",
                        dataType : "JSON",
                        data : {
                            DateDebut : debut,
                            DateFin : fin
                        },
                        success : function(result)
                        {
                            alertbox.show("Modifié !")
                            setTimeout(RetourMenu, 2500);
                        }
                    });
                }
            }
        }
        else if (page[0].textContent == "Génération d'une attestation")
        {
            var input = $('#Nom');
            if (CheckChamps(input))
            {
                $.ajax({
                    url : "php/RechercheEtudiant.php",
                    method : "POST",
                    dataType : "JSON",
                    data : {
                        mailetudiant : $('#Nom').val()
                    },
                    success : function(result)
                    {
                        if (!result['erreur'])
                        {
                            let Form = document.getElementById("FormEtudiant");
                            Form.classList.add("ErrorForm");
                            alertbox.show('Cet étudiant n\'existe pas !');
                            setTimeout(RemoveErrorForm, 1300);
                        }
                        else
                        {
                            alertbox.show('Attestation générée !');
                            top.location.href = "./php/attestation.php?email=" + encodeURI($('#Nom').val());
                        }
                    }
                });
            }
        }
    } 
    else if (n == -1)
    {
        if (page[0].textContent == "Ajouter un cours")
        {
            if (currentTabAdmin == 0 && n == -1)
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
        else if (page[0].textContent == "Page d'administration")
        {
            if (currentTabAdmin == 0)
                document.location.href = "index.html";
            else if (currentTabAdmin == 1)
            {
                sessionStorage.setItem("connecte", "0");
                document.getElementById("nextBtn").style.display = "inline";
                document.location.href = "admin.html";
            }
            else
            {
                document.getElementById("nextBtn").style.display = "inline";
                document.location.href = "admin.html";
            }
        }
        else if (page[0].textContent == "Modifier la période d'inscription" || page[0].textContent == "Modifier le nombre de cours" || page[0].textContent == "Génération d'une attestation")
            document.location.href = "admin.html";
        else if (currentTabAdmin == 0)
            document.location.href = "index.html";
        else if (currentTabAdmin == 1)
        {
            sessionStorage.setItem("connecte", "0");
            document.getElementById("nextBtn").style.display = "inline";
            document.location.href = "admin.html";
        }
        else
        {
            document.getElementById("nextBtn").style.display = "inline";
            document.location.href = "admin.html";
        }
    }
    else
    {
        if (page[0].textContent == "Ajouter un local")
            AjouterLocal();
        else if (page[0].textContent == "Page d'administration")
        {
            let page = document.getElementsByTagName("title");
            if (page[0].textContent == "Ajouter un local")
                AjouterLocal();
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
}

/* FONCTIONS DE RECHERCHE -------------------------------------- */

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

                let tdNomJournee = document.createElement("td");
                tdNomJournee.className = "cell100 column2";
                tdNomJournee.textContent = elem['Jour'];
                tr.appendChild(tdNomJournee);

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
            let i =0;
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


                let tdformListeCours = document.createElement("td");
                tdformListeCours.className = "cell100 column1";
                tr.appendChild(tdformListeCours);

                let divbouton = document.createElement("div");
                divbouton.className = "container-login100-form-btn";
                tdformListeCours.appendChild(divbouton);


                let bouton = document.createElement("button");
                bouton.type = "button"; bouton.className = "login100-form-btn";
                bouton.id = i;

                bouton.innerHTML = "SES COURS"; 
                let string = 'http://localhost/InpresWebSchool/InpresWebSchool/php/horaire.php?email='+ encodeURI(elem['AdresseMail']) +'&cle=' + encodeURI(elem['cle'] + '&i=1');
                bouton.setAttribute('onclick','document.location.href=\'' + string + '\'');

                divbouton.appendChild(bouton);
                i++;
            });
        }
    });
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

function Redirection (mail, cle)
{
    document.location.href = "php/horaire.php?email=" + encodeURI(mail) + "&cle=" + encodeURI(cle);
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

function CheckChamps(input) {
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

function CheckNombreEtudiants() {
    var input = $('#NombreEtudiants');
    var check = true;

    if(!ValidationChamp(input))
    {
        showAll(input);
        showValidate(input);
        check=false;
    }
    else
    {
        hideAll(input);
        hideValidate(input);
    }

    return check;
}

function CheckChampFormulaireMultiEtudiant(IndexEtudiant)
{
    var check = true;
    for(var i=0; i<4; i++)
    {
        if(!ValidationPattern(IndexEtudiant.children[i].children[0]))
        {
            if (i<3) // Je suis pas l'établissement scolaire
            {
                hideValidateNotUnique(IndexEtudiant.children[i].children[0]);
                showAll(IndexEtudiant.children[i].children[0]);
                showValidate(IndexEtudiant.children[i].children[0]);
                check=false;      
            }
        }
        else
        {
            if (i == 0)
            {
                if (!ValidationUnique(IndexEtudiant.children[i].children[0]))
                    check = false; 
            }
            else
            {
                hideAll(IndexEtudiant.children[i].children[0]);
                hideValidate(IndexEtudiant.children[i].children[0]);
            }
        }

    }
    return check;
}

function ValidationChamp(input)
{
    if (input.name == "NomCours" || input.name == "Nom") // NOM DU COURS OU NOM ETUDIANT (ATTESTATION)
    {
        if($(input).val().trim() == '')
            return false;
    }
    else if (input.name == "HeureDebut" || input.name == "HeureFin") // HEURE
    {
        if($(input).val().trim().match(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/) == null)
            return false;
        else
        {
            if (input.name == "HeureFin") // JE CHECK SI HEURE DEBUT < HEURE FIN
            {
                let DateHeureDebut = new Date('December 1, 2020 ' + $('#HeureDébut').val());
                let DateHeureFin = new Date('December 1, 2020 ' + $('#HeureFin').val());
                if (DateHeureDebut >= DateHeureFin)
                    return false;
            }
        }
    }
    else if (input.name == "JourCours")
    {
        let jour = $(input).val();
        jour = jour.toLowerCase();
        jour = jour.charAt(0).toUpperCase() + jour.slice(1);

        if(jour == "Lundi" || jour == "Mardi" || jour == "Mercredi" || jour == "Jeudi" || jour == "Vendredi") {}
        else
            return false;
    }
    else if (input.name == "ReprisListe") // REPRIS DANS LISTE
    {
        if($(input).val().trim().match(/^[0-9]+$/) == null)
        {
            return false;
        }
        else
        {
            if($(input).val() < 0 || $(input).val() > 1)
                return false;            
        }
    }
    else if (input.name == "NombreEtudiants") // NOMBRES DETUDIANTS TO ADD
    {
        if($(input).val().trim().match(/^[0-9]+$/) == null)
        {
            return false;
        }
        else
        {
            if($(input).val() < 1 || $(input).val() > 5)
                return false;            
        }
    }
    else if (input.name == "AdresseMail")
    {
        console.log(input.name);
        return false;
    }
    else if (input.name == "Nom")
    {
        if($(input).val().trim() == '')
            return false;
    }
    else if (input.name == "Prenom")
    {
        if($(input).val().trim() == '')
            return false;
    }
    else if (input.name == "EtablissementScolaire")
    {
        if($(input).val().trim() == '')
            return false;
    }
    else if (input.name == "NbJournee" || input.name == "NbJournees")
    {
        if($(input).val().trim().match(/^[0-9]+$/) == null)
        {
            return false;
        }
        else
        {
            if($(input).val() < 1 || $(input).val() > 4)
                return false;            
        }
    }
    else if (input.name == "DateDebut" || input.name == "DateFin")
    {
        if($(input).val().trim().match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/) == null)
            return false;
    }
    return true;
}

function ValidationLocal()
{
    if($("#NomLocal").val().trim() == '')
        return false;
    else
        return true;
}

function ValidationProfesseur()
{
    if($("#NomProfesseur").val().trim() == '' || $("#PrenomProfesseur").val().trim() == '')
        return false;
    else
        return true;
}

/* ---------------------------------------------- */

function ConsultationCours() {
    document.location.href='cours.html';
}

function ConsultationEtudiant() {
    document.location.href='etudiant.html';
}

function ConsultationProfesseur() {
    document.location.href='professeurs.html';
}

function ConsultationSections() {
    document.location.href='sections.html';
}

function ConsultationLocaux() {
    document.location.href='locaux.html';
}

function RefAjouterCours() {
    document.location.href = 'ajoutcours.html';
}

function RefAjouterLocal() {
    document.location.href='ajoutlocal.html';
}

function RefAjouterProfesseur() {
    document.location.href='ajoutprofesseur.html';
}

function RefAjouterEtudiant() {
    document.location.href='ajoutetudiant.html';
}

function RefModifNbMinimumCours() {
    document.location.href='modifnbcours.html';
}

function RefPeriodeInscription() {
    document.location.href='modifperiode.html';
}

/* AJOUT ------------------------------------------------ */

function AjouterLocal()
{
    $.ajax({
        url : "php/AjoutLocal.php",
        method : "POST",
        dataType : "JSON",
        data : {
            local : $("#NomLocal").val()
        },
        success : function(result)
        {
            if(result['erreur'])
            {
                let Form = document.getElementById("FormLocal");
                Form.classList.add("ErrorForm");
                alertbox.show('Ce local existe déja !');
                setTimeout(RemoveErrorForm, 1300);
            }
            else
                document.location.href="admin.html";
        }
    });
}

function AjouterCours()
{
    console.log("J'ajoute un cours");

    var type2 = document.getElementsByClassName("inputGroup clique");
    let typecours = $(type2[0]).children().first().prop("name"); 

    var sections = []; // JE RECUPERE LES SECTIONS
    let i = 0;
    var section2 = document.getElementsByClassName("inputJournee clique");
    $.each(section2, function() // Récupère les différentes sections choisies
    {
        if ($(section2[i]).children().first().prop("name") == "Informatique de Gestion")
            sections.push(1); 
        else if ($(section2[i]).children().first().prop("name") == "Informatique finalité : Industrielle")
            sections.push(2); 
        else
            sections.push(3); 
        i++;
    });

    var bloc2 = document.getElementsByClassName("inputBloc clique");
    let bloc = $(bloc2[0]).children().first().prop("name"); 

    let prof = document.getElementsByClassName("login100-form validate-form p-b-33 p-t-5 ProfForm");
    let locaux = document.getElementsByClassName("login100-form validate-form p-b-33 p-t-5 LocauxForm");
    let groupe = document.getElementsByClassName("login100-form validate-form p-b-33 p-t-5 GroupeForm");

    let commun;
    let commun2 = document.getElementsByClassName("inputCollectif clique");

    if (commun2.length == 0)
        commun = "Non";
    else
        commun = "Oui";

    if (bloc == "Bloc 1")
        bloc = 1;
    else if (bloc == "Bloc 2")
        bloc = 2;
    else
        bloc = 3;

    let jour;
    if ($("#JourCours").val() == "Lundi")
        jour = 1;
    else if ($("#JourCours").val() == "Mardi")
        jour = 2;
    else if ($("#JourCours").val() == "Mercredi")
        jour = 3;
    else if ($("#JourCours").val() == "Jeudi")
        jour = 4;
    else
        jour = 5;

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
            commun : commun,
            section : sections,
            bloc : bloc,
            groupe : groupe[0].children[0].children[0].textContent,
            jour : jour
        },
        success : function()
        {
            RetourMenu();
        },
        error : function()
        {
            let Form = document.getElementById("Form_Locaux");
            Form.classList.add("ErrorForm");
            alertbox.show('Ce cours  existe déja !');
            setTimeout(RemoveErrorForm, 1300);
        }
    });
}

function AjouterProfesseur()
{
    $.ajax({
        url : "php/AjoutProfesseur.php",
        method : "POST",
        dataType : "JSON",
        data : {
            nom : $("#NomProfesseur").val(),
            prenom : $("#PrenomProfesseur").val()
        },
        success : function(result)
        {
            if(result['erreur'])
            {
                let Form = document.getElementById("FormProfesseur");
                Form.classList.add("ErrorForm");
                alertbox.show('Ce professeur existe déja !');
                setTimeout(RemoveErrorForm, 1300);
            }
            else
                document.location.href="admin.html";
        }
    });
}

function ExporterBD()
{
    document.location.href='php/ExportListing.php';
}

function GenererAttestation()
{
    document.location.href='genererattestation.html';
}

function RetourMenu() {
    document.location.href = 'admin.html';
}