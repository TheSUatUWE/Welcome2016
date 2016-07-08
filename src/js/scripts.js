(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    
  	// Menu Toggle
  	$(document).ready(function() {
  		$('.sidebar-toggle').click(function(e) {
          e.preventDefault();
          $(this).toggleClass('toggled');
          $('#sidebar-wrapper').toggleClass('toggled');
      });

      $('.sidebar-toggle-top').click(function(e) {
          e.preventDefault();
          if ( $('.mobile-menu-toggle').hasClass('toggled') ) {
            console.log( 'mobile menu is active ');
            $('#sidebar-wrapper, .sidebar-toggle').toggleClass('toggled');
            

            
          } else {
            console.log( 'mobile menu is not active');
            $('#sidebar-wrapper').toggleClass('toggled');
            $('.mobile-menu-toggle, .sidebar-toggle').toggleClass('toggled'); 
          }
        
      });
  	});

    // Mobile Menu Toggle
    $(document).ready(function() {
      $('.mobile-menu-toggle').click(function(e) {
          e.preventDefault();
          $('ul.nav.nav-inline').toggleClass('mobile-active');
          $('nav.nav, .mobile-menu-circle').toggleClass('toggled');
          $(this).toggleClass('toggled');          
      });
    });

    // Mobile Menu Scroll on Dropdown open
    $( document ).ready(function() {
      $('.nav-item.dropdown').click(function(){
        if ( $('.mobile-menu-toggle').hasClass('toggled') ) { 
          var h = $('.nav-inline').outerHeight();
          $('.nav-inline').scroll(); 
          $('.nav-inline').animate({ scrollTop: h+'px' }, 500, 'easeInOutQuint');
          $('.mobile-menu-bg').toggleClass('mobile-dropdown-active');
        }

        $(window).bind('mousewheel', function() {
            $('.nav.nav-inline').stop();
        });

      });

      // Add Slidedown Animation To Dropdown //
       $('.dropdown').on('show.bs.dropdown', function(){
         $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
       });

       // Add Slideup Animation To Dropdown //
       $('.dropdown').on('hide.bs.dropdown', function(){
         $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
       });

    });

    // Add scrolled class to header 
    $( document ).ready(function() {
      if ($(window).scrollTop() !== 0) {
        $('.navbar-co').addClass('scrolled');
      }

      $(window).scroll(function() {
          if ($(document).scrollTop() > 1) {
            
            $('nav.nav').addClass('scrolled');

          } else {
            
            $('nav.nav').removeClass('scrolled');
            
          }
        });
    });

   

    // Resize event text block to remove unessisary whitespace
    function eventResize() {
      $('.event-card-small').each(function() {
        var cardH = $(this).outerHeight();
        var img = $(this).children('.card-img-top');
        var block = $(this).children('div.card-block'); 
        var blockH = block.outerHeight();
        var grad = img.children('.card-img-gradient');
        var newH = (cardH - blockH);



        img.height(newH);
        grad.height(newH);

        });
    }

    // Show event listings and hider loader on window load
    function eventLoad() {
      $('#loader').fadeOut('slow');
      $('#event-listings').fadeIn('slow');
    }

    // Add time of day icons to events
    function eventTOD() {
        // Add Night
       $('.event-card-small').each(function() {

        if ( $(this).hasClass('night') ) {
          $(this).find('.tod').addClass('night').prop('title', 'Night Event');

        }
        });
        // Add Day

        $('.event-card-small').each(function() {

        if ( $(this).hasClass('day') ) {
            $(this).find('.tod').addClass('day').prop('title', 'Day Event');
          }
        });

        $('.event-card-small').each(function() {
        if ( $(this).hasClass('w16_main') ) {
          $(this).find('.cat2').addClass('main').prop('title', 'Main Event');
           }
       });
    }

    // Add main event icon to events
    // function eventMain() {
    //   $('.event-card-small').each(function() {
    //     if ( $(this).hasClass('w16_main') ) {
    //       $(this).append('<object class="main-icon" data="/assets/icons/star.svg" type="image/svg+xml"></object><div class="w16-main main"></div>'); 
    //     } 
    //   });
    // }

    function initTooltip() {
      $('.tod, .cat2, .cat3').tooltip();
    }
     window.onload = function() {
      eventLoad();
      eventTOD();
      // eventMain();
      eventResize();
      initTooltip();
    };

     // Init tooltips //
  


  });
})(jQuery, window, document);