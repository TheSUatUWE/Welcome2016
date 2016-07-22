(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    // Smooth Scroll

    $( document ).ready(function() {
        $(function() {
          $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 1000);
                return false;
              }
            }
          });
        });
    });
    
    //  AJAX MailChimp Sign up //
    $(document).ready(function(){
        
        var $message;

        // function facebookButton() {
        //     $('#facebook-button').css('display', 'table');
        //  }

        // Submit the form with an ajax/jsonp request.
        // Based on http://stackoverflow.com/a/15120409/215821
        function submitSubscribeForm($form, $resultElement) {
            $.ajax({
                type: 'GET',
                url: $form.attr('action'),
                data: $form.serialize(),
                cache: false,
                dataType: 'jsonp',
                jsonp: 'c', // trigger MailChimp to return a JSONP response
                contentType: 'application/json; charset=utf-8',

                error: function(error){
                    // According to jquery docs, this is never called for cross-domain JSONP requests
                },

                success: function(data){
                    if (data.result !== 'success') {
                        var message = data.msg || 'Sorry. Unable to subscribe. Please try again later.';
                        $resultElement.css('color', '#e84253');

                        if (data.msg && data.msg.indexOf(' You&#39;re already subscribed') >= 0) {
                            message = 'You&#39;re already subscribed. Thank you.';
                            $resultElement.css('color', '#e84253');
                        }

                        $resultElement.html(message);

                    } else {
                        $resultElement.css({
                          'color' : '#e84253',
                          'background': '#fff',
                          'display': 'table',
                          'padding': '10px',
                          'border-radius': '3px'
                        });
                        $resultElement.html('Thank you! We can&#39;t wait to see you in September.<br><small>You will get an email shortly, make sure confirm the subscription in your inbox to get the updates.</small>');
                         

                         // $form.delay(1000).fadeOut(500, facebookButton);
                    }
                }
            });
        }

        // Validate the email address in the form
        function isValidEmail($form) {
            // If email is empty, show error message.
            // contains just one @
            var email = $form.find('input[type="email"]').val();
            if (!email || !email.length) {
                return false;
            } else if (email.indexOf('@') === -1) {
                return false;
            }

            return true;
        }

        // Turn the given MailChimp form into an ajax version of it.
        // If resultElement is given, the subscribe result is set as html to
        // that element.
        function ajaxMailChimpForm($form, $resultElement){

            // Hijack the submission. We'll submit the form manually.
            $form.submit(function(e) {
                e.preventDefault();


                if (!isValidEmail($form)) {
                    
                   $message._show('success', 'A valid email address must be provided.');
                } else {
                    $resultElement.css('color', '#e84253');
                    $resultElement.html('Subscribing...');
                    submitSubscribeForm($form, $resultElement);
                }
            });
        }

        ajaxMailChimpForm($('#subscribe-form'), $('#subscribe-result'));

        
        
    });



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
        var key = $(this).prev('.key');

        if (document.documentElement.clientWidth < 768) {
         key.css('top', (newH - 80) );
        } else {
           key.css('top', (newH - 65) );
        }
       
        img.height(newH);
        grad.height(newH);

        });
    }

    // Show event listings and hider loader on window load
    function eventLoad() {
      $('#loader').fadeOut('slow');
      $('#event-listings-card').fadeIn('slow');
    }

    // Add time of day icons to events
    function eventTOD() {
        // Add Night
       $('.event-col').each(function() {
          if ( $(this).children('.event-card-small').hasClass('night') ) {
            $(this).find('.tod').addClass('night').prop('title', 'Night Event');
          }          
        });
        // Add Day

        $('.event-col').each(function() {

        if ( $(this).children('.event-card-small').hasClass('day') ) {
            $(this).find('.tod').addClass('day').prop('title', 'Day Event');
          }
        });

        $('.event-col').each(function() {
        if ( $(this).children('.event-card-small').hasClass('main') ) {
          $(this).find('.cat2').addClass('main').prop('title', 'Main Event');
           }
       });
    }

    // Add main event icon to events
    // function eventMain() {
    //   $('.event-card-small').each(function() {
    //     if ( $(this).hasClass('w1Res6_main') ) {
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
      eventResize();
      initTooltip();
    };

    // Fire eventResize whenever the user resizes their window
    $(window).resize(function() {
        eventResize();
    });


  });
})(jQuery, window, document);