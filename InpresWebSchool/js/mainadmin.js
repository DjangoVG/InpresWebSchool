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

    if (!admin)
        return false;
    else
    return true;
}

function MauvaisAdmin()
{
    admin = false;
}

function nextStep(n)
{
    if (n == 1) // J'avance dans le formulaire
    {
        if (currentTabAdmin == 0) // Je suis sur a page de l'admin
            if(!ConnexionAdmin())
                return 0;
        else
        {
            
        }
    }
    else // je recule dans le formulaire
    {
        if (currentTabAdmin == 0 || currentTabAdmin == 1)
        {
            document.location.href='index.html';   
            return 0;         
        }
    }
    AffichageNextStepAdmin(n);

}

function showTabAdmin(current)
{
    var x = document.getElementsByClassName("etape");
    x[current].style.display = "block";

    if (current == 0) 
    {
        document.getElementById("nextBtn").innerHTML = "SE CONNECTER";
        document.getElementById("prevBtn").innerHTML = "ACCEUIL";        
    }
    else
    {

    }
}

function AffichageNextStepAdmin(n)
{
    if (n == 1 && currentTabAdmin == 0)
    {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("prevBtn").style.display = "inline";
    } 
    
    var x = document.getElementsByClassName("etape");
            
    x[currentTabAdmin].style.display = "none";
    currentTabAdmin += n;
    
    showTabAdmin(currentTabAdmin); 
}

function RetourMenu()
{
    document.location.href='admin.html';
}

function ConsultationCours()
{
    document.location.href='cours.html';
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
    RechercheCours();
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
    RechercheCours();
}

function RechercheCours()
{

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

    }});
}