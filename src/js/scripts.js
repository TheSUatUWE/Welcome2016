(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    
  	// Menu Toggle
  	$(document).ready(function() {
  		$('.sidebar-toggle').click(function(e) {
	        e.preventDefault();
	        $('#sidebar-wrapper').toggleClass('toggled');
	        $(this).toggleClass('toggled');
	    });
  	});



  });

})(jQuery, window, document);
