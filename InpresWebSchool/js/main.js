var currentTab = 0; // Current tab is set to be the first tab (0)

$(function(){
  showTab(currentTab); // Display the current tab
  AjoutCoursPlage();
})

function AjoutCoursPlage()
{
  AjoutCoursPlages(1); AjoutCoursPlages(2); AjoutCoursPlages(3); AjoutCoursPlages(4);
}

function AjoutCoursPlages(n)
{
  $.ajax({
    url : "php/AjoutCoursPlage.php",
    method : "POST",
    dataType : "JSON",
    success : function(result){
      if (result['erreur']) return;

      result['cours'].forEach(elem=>
      {
        if (elem['Plage'] == n)
        {
          $('.sel--Plage0' + n).each(function() 
          {
            
            var $current = $(this);
            
            $current.children('div').append($('<span>', {
              class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
              text: elem['Nom']
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
  var x = document.getElementsByClassName("tab");
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
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) 
      return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab += n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length)
  {
    //...the form gets submitted:
    AjouterEtudiant();
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var input = $('.validate-input .input100');
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


 (function($) {
    "use strict";

    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

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
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).removeClass('active');
            showPass = 0;
        }
        
    });


})(jQuery);