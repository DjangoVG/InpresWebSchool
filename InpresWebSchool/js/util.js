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
    console.log('clique');
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
    console.log('clique');
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