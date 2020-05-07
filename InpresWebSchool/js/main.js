var currentTab = 0; // Current tab is set to be the first tab (0)

(function($) 
{
  showTab(currentTab); // Display the current tab
  AjoutCoursPlages();
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
  $.ajax({
    url : "php/AjoutCoursPlage.php",
    method : "POST",
    dataType : "JSON",
    success : function(result){
      if (result['erreur']) return;

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
        else if (elem['HeureFin'] <= '13:00:00') // pLAGE 2
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
    console.log(elem['Nom'])
  
  });
    },
    error: function(error){
      alert(error);
    }
});
}

function AjouterEtudiant()
{
  $.ajax({
    url : "php/AjoutEtudiant.php",
    method : "POST",
    dataType : "JSON",
    data : {
        mailetudiant : $("#AdresseMail").val(),
        nometudiant : $("#Nom").val(),
        prenometudiant : $("#Prenom").val(),
        etablissementetudiant : $("#Etablissement").val()
    },
    success : function(result){
        if(result['erreur']){
            alert(result['message']);
        }
        else
            location.reload();
    }
});
}

function showTab(n)
{
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("etape");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "ENVOYER";
  } else {
    document.getElementById("nextBtn").innerHTML = "CONTINUER";
  }
  // ... and run a function that displays the correct step indicator:
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
    console.log("Je suis un mail");
    if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
    }
  }
  else 
  {
    console.log("Je suis pas un mail");
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