var currentTab = 0; // Current tab is set to be the first tab (0)

(function($) 
{
  showTab(currentTab); // Display the current tab
  "use strict";

  $('.sel').each(function() {
      $(this).children('select').css('display', 'none');
      
      var $current = $(this);
      
      $(this).find('option').each(function(i) {
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

  /* AFFICHAGE DU FORMULAIRE */
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


})(jQuery);

function AjoutCoursPlages()
{
    // JE RECUPERE L'ID DE LA JOURNEE ICI
    var journeepicked = document.getElementsByClassName("sel__placeholder sel__placeholder--Journee") ;
    if (journeepicked[0].textContent.includes("Lundi"))
        $id = 1;
    else if (journeepicked[0].textContent.includes("Mardi"))
        $id = 2;
    else if (journeepicked[0].textContent.includes("Mercredi"))
        $id = 3;
    else if (journeepicked[0].textContent.includes("Jeudi"))
        $id = 4;
    else if (journeepicked[0].textContent.includes("Vendredi"))
        $id = 5;

    // JE RECUPERE LES SECTIONS QUE L'ETUDIANT A CHOISI

    var sections = [];
    var i = 0;
    var section2 = document.getElementsByClassName("inputGroup clique");
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
        idjournee : $id,
        sectionss : sections
    },
   success : function(result)
    {
      if (result['erreur']) return;

      console.log("cours : " + result['cours']);
      result['cours'].forEach(elem=>
      {
        if (elem['HeureFin'] <= '11:00:00') // PLAGE 1
        {
          $('.sel--Plage01').each(function() 
          {
            
            var $current = $(this);
            
            $current.children('div').append($('<span>', {
              class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
              text: elem['NomCours']// FULL NOM
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
        else if (elem['HeureFin'] <= '13:00:00') // PLAGE 2
        {
          $('.sel--Plage02').each(function() 
          {
            
            var $current = $(this);
            
            $current.children('div').append($('<span>', {
              class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
              text: elem['NomCours']
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
        else if (elem['HeureFin'] <= '16:00:00') // PLAGE 3
        {
          $('.sel--Plage03').each(function() 
          {
            
            var $current = $(this);
            
            $current.children('div').append($('<span>', {
              class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
              text: elem['NomCours']
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
        else if (elem['HeureFin'] <= '18:00:00') // DERNIERE PLAGE
        {
          $('.sel--Plage04').each(function() 
          {
            
            var $current = $(this);
            
            $current.children('div').append($('<span>', {
              class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
              text: elem['NomCours']
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
    // -----
    result['cours'].forEach(elem=>{
    console.log(elem['NomCours'])
  
  });
    },
    error: function(error){
      alert(error);
    }
});
}

function SupprimerPlage()
{
    console.log("Je tente de supprimer");
    var list = document.getElementsByClassName("sel__box__options sel__box__options--Plage01");
    for(var i = list.length - 1; i > 0; i--)
    {
        if(list[i] && list[i].parentElement)
        {
                list[i].parentElement.removeChild(list[i]); 
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

    var j = 0, cours, TabPlages = [];
    for (j = 1 ; j < 5 ; j++)
    {
        cours = document.getElementsByClassName("sel__placeholder sel__placeholder--Plage0" + j);
        TabPlages.push(cours[0].textContent);
    }

    console.log($("#AdresseMail").val());
    console.log($("#Nom").val());
    console.log($("#Prenom").val());
    console.log($("#Etablissement").val());
    console.log(sections);
    console.log(TabPlages);

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
            Plages : TabPlages
        },
        success : function(result){
            if(result['erreur']){
                alert(result['message']);
            }
            else
                location.reload();
        },
        error : function(result) {
            alert (result['message']);
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


function showTab(n)
{
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("etape");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
    if (n == 0)
        document.getElementById("prevBtn").style.display = "none";
    else 
    document.getElementById("prevBtn").style.display = "inline";

    if (n == (x.length - 1)) 
        document.getElementById("nextBtn").innerHTML = "ENVOYER";
    else 
        document.getElementById("nextBtn").innerHTML = "CONTINUER";

    if (n == (x.length - 1))
    {
        SupprimerPlage();
        AjoutCoursPlages();
    }
        
    
    AffichageStepFormulaire(n)
}

function ClickBoutonFormulaire(n) 
{
  if (CheckChampFormulaire())
  {
    var x = document.getElementsByClassName("etape");
        
    x[currentTab].style.display = "none";
    currentTab += n;
    if (currentTab >= x.length)
    {
      AjouterEtudiant();
      document.getElementById("regForm").submit();
      return false;
    }
    showTab(currentTab);
  }
}

function AffichageStepFormulaire(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}


function CheckChampFormulaire()
{
  var input = $('.validate-input .input100');
  var check = true;

  for(var i=0; i<input.length; i++)
   {
      if(!ValidationPattern(input[i]))
      {
          if ( i<input.length-1) // Je suis l'établissement scolaire
          {
            showValidate(input[i]);
            check=false;              
          }
      }
      else
      {
        hideValidate(input[i]);
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
    if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
    }
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

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

function InscriptionBouton()
{

}

function Administrateur()
{
    
}