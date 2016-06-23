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

      // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
       $('.dropdown').on('show.bs.dropdown', function(){
         $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
       });

       // ADD SLIDEUP ANIMATION TO DROPDOWN //
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

     // Day Night Welcome Events
    $( window ).load(function() {
        $('.event-card').each(function() {
          if ( $(this).hasClass('night') ) {
            $(this).append('<object class="tod-icon" data="/assets/icons/bright_moon.svg" type="image/svg+xml"></object><div class="w16-tod night"></div>'); 
          } else {
              $(this).append('<object class="tod-icon" data="/assets/icons/sun.svg" type="image/svg+xml"></object><div class="w16-tod day"></div>');
          }
        });
    });

    // Main Events
    $( window ).load(function() {
        $('.event-card').each(function() {
          if ( $(this).hasClass('w16_main') ) {
            $(this).append('<object class="main-icon" data="/assets/icons/star.svg" type="image/svg+xml"></object><div class="w16-main main"></div>'); 
          } 
        });
    });

    

  });
})(jQuery, window, document);