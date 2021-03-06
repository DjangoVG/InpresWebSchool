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

function ValidationPattern (input)
{
    let checkbool = true;
    if($(input).attr('type') == 'email')
    {
        if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null)
            checkbool = false;         
    }
    else 
    {
        if($(input).val().trim() == '')
            checkbool = false;         
    }

    return checkbool;
}

function ValidationUnique(input)
{
    $.ajax({ // CALLBACK ?
        url : "php/RechercheEtudiant.php",
        method : "POST",
        dataType : "JSON",
        async : false,
        data : {
            mailetudiant : $(input).val()
        },
        success : function(result)
        {
            if (result['erreur'])
            {
                NotUnique();
                showAll(input);
                showValidateNotUnique(input);  
               
            }
            else
            {
                Unique();
                hideAll(input[0]);
                hideValidateNotUnique(input);               
            }
        }
    });
    return boolean;
}

function NotUnique() {
    boolean = false;
}
function Unique() {
    boolean = true;
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
                $current.prepend($('<div>', { // rajoute une option en tant que premier enfant
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

    $('.sel').click(function() {
        $(this).toggleClass('active');
    });
        
    $('.sel__box__options').click(function() {
        var txt = $(this).text();
        var index = $(this).index();
        
        $(this).siblings('.sel__box__options').removeClass('selected'); // renvoie le noeud suivant immédiatement le noeud spécifié dans child list
        $(this).addClass('selected');
        
        var $currentSel = $(this).closest('.sel'); // renvoie le parent le plus proche
        $currentSel.children('.sel__placeholder').text(txt);
        $currentSel.children('select').prop('selectedIndex', index + 1); // recuperer la propriete selctedsIndex
    });

    var showPass = 0;
    $('.btn-show-pass').on('click', function() // bouton formulaire email mdp
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

function ClickOption(n) // Je clique sur une section (modification de sa classe)
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

function ClickBloc(n) // Je clique sur une journee (modification de sa classe)
{
    var i, x = document.getElementsByClassName("inputBloc");
    for (i = 0; i < x.length; i++) 
    {
        if (n == i)
        {
            if (x[i].className == "inputBloc clique") 
                x[i].className = "inputBloc";
            else
                x[i].className = "inputBloc clique";            
        }
    }
}

function ClickCollectif(n) // Je clique sur une journee (modification de sa classe)
{
    x = document.getElementsByClassName("inputCollectif");
    
    if (x[0].className == "inputCollectif clique") 
        x[0].className = "inputCollectif";
    else
        x[0].className = "inputCollectif clique";            
}

var AlertBox = function(id, option) 
{
    this.show = function(msg) 
    {
        var alertArea = document.querySelector(id);
        var alertBox = document.createElement('DIV');
        var alertContent = document.createElement('DIV');
        var alertClass = this;
        alertContent.classList.add('alert-content');
        alertContent.innerText = msg;
        alertBox.classList.add('alert-box');
        alertBox.appendChild(alertContent);

        alertArea.appendChild(alertBox);
        
        var alertTimeout = setTimeout(function() 
        {
            alertBox.classList.add('hide');
            var disperseTimeout = setTimeout(function() 
            {
                alertBox.parentNode.removeChild(alertBox);
                clearTimeout(disperseTimeout);
            }, 500);
            clearTimeout(alertTimeout);
        }, option.closeTime);
    };
};

var alertbox = new AlertBox('#alert-area', {
    closeTime: 2000
}); // nouvelle AlertBox

function AjoutCoursEtFiltrage(string, journeechoisie, elemprof, nomcours, heuredebut, heurefin) 
{
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
                idprof : elemprof,
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
                text: nomcours + " | [" + heuredebut + " - " + heurefin + "] -> " + prenomprof + " " + nomprof
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

function SupressionPlages(chaine, i)
{
    final = chaine.concat("Jour0" + i);
    list = document.getElementsByClassName(final);
    for(let i = list.length - 1; i > 0; i--)
    {
        if(list[i] && list[i].parentElement)
        {
            console.log("Suppression plage 2");
            list[i].parentElement.removeChild(list[i]); 
        }            
    }
}