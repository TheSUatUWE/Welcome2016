(function ($, window, document, undefined) {

  'use strict';

  $(function () {


  	   $.ajax({
  	        url:'http://www.thestudentsunion.co.uk/svc/feeds/events/6013',
  	        data:'/?subtree=true&from=2015-12-01&to=2015-12-25&imagesize=sqaure',
  	        type: 'GET',
  	        async: false,
  	        cache: false,
  	        timeout: 30000,
  	        error: function(){
  	            return true;
  	        },
  	        success: function(msg){ 
  	            if (parseFloat(msg)){
  	                return false;
  	            } else {
  	                return true;
  	            }
  	        }
  	    });

  });
})(jQuery, window, document);