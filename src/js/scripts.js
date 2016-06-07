(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    
  	// Menu Toggle
  	$(document).ready(function() {
  		$('.sidebar-toggle').click(function(e) {
	        e.preventDefault();
	        $('#sidebar-wrapper, .sidebar-toggle-top').toggleClass('toggled');
          $(this).toggleClass('toggled');

	    });
      $('.sidebar-toggle-top').click(function(e) {
          e.preventDefault();
          $('#sidebar-wrapper, .sidebar-toggle').toggleClass('toggled');
          $(this).toggleClass('toggled');
      });
  	});

        // Mobile Menu Toggle
    $(document).ready(function() {
      $('.mobile-menu-toggle').click(function(e) {
          e.preventDefault();
          $('#sidebar-wrapper, .sidebar-toggle-top').toggleClass('toggled');
          $(this).toggleClass('toggled');
          
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



  });

})(jQuery, window, document);
