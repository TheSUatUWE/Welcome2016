(function ($, window, document, undefined) {

  'use strict';

  $(function () {


    // Init Headspace 
    var headspace = new Headspace(document.querySelector('nav'));

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
          $('.logo').toggleClass('mobileMenuActive');
        
          $('body, html, #page-wrapper').toggleClass('mobileMenuActive');

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
        $('.logo').addClass('scrolled');
      }

      $(window).scroll(function() {
          if ($(document).scrollTop() > 1) {
            
            $('nav.nav').addClass('scrolled');
            $('.logo').addClass('scrolled');

          } else {
            
            $('nav.nav').removeClass('scrolled');
            $('.logo').removeClass('scrolled');
            
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

    // Add icons to events
    function eventTOD() {
        // Add Night or Day
       $('.event-col').each(function() {
          if ( $(this).children('.event-card-small').hasClass('night') ) {
            $(this).find('.tod').addClass('night').prop('title', 'Night');
          } else if ( $(this).children('.event-card-small').hasClass('day') ) {
            $(this).find('.tod').addClass('day').prop('title', 'Day');
          }          
        });

        $('.event-col').each(function() {
          var cat2 =  $(this).find('.cat2');
          var cat3 =  $(this).find('.cat3');
          if ( $(this).children('.event-card-small').hasClass('main') ) {
           cat2.addClass('main').prop('title', 'Main Event');
          } else if ( $(this).children('.event-card-small').hasClass('free') ) {
            cat2.addClass('free').prop('title', 'Free');
          } else if ( $(this).children('.event-card-small').hasClass('signUp') ) {
            cat3.addClass('signUp').prop('title', 'Sign Up');
          } else if ( $(this).children('.event-card-small').hasClass('liveMusic') ) {
            cat2.addClass('liveMusic').prop('title', 'Live Music');
          } else if ( $(this).children('.event-card-small').hasClass('club') ) {
            cat2.addClass('club').prop('title', 'Club Night');
          } else {
            cat2.addClass('empty');
          }
       });

        $('.event-col').each(function() {
          var cat3 =  $(this).find('.cat3');
          if ( $(this).children('.event-card-small').hasClass('platX') ) {
            cat3.addClass('platinum').prop('title', 'Platinum Extra');
          } else if ( $(this).children('.event-card-small').hasClass('platPlatX') ) {
            cat3.addClass('platinumX').prop('title', 'Platinum & Platinum Extra');
          } else if ( $(this).children('.event-card-small').hasClass('alcoholFree') ) {
            cat3.addClass('alcoholFree').prop('title', 'Alcohol Free');
          } else if ( $(this).children('.event-card-small').hasClass('family') ) {
            cat3.addClass('family').prop('title', 'Family Friendly');
          }
       });
    }

    function initListJs() {

      // Options for List.js
      var options = {
          valueNames: [ 'start-date', 'card-title', 'types', 'location', 'date' ],
          listClass: 'list',
          sortClass: 'sort'
      };

    
      // Create new List 
      var eventList = new List('event-list', options);

      // Main Filter buttons
      $('.main-filter').click(function() {
        // Declare variables
        var mainFilterBtn = $(this);
        var mainFilter = $(this).html().toLowerCase();
        // Add active class to the clicked filter
        $(this).toggleClass('active');
        // Remove active class from all other filters
        $('.main-filter').not( $(this) ).removeClass('active');
        
        // Loop through each event card
        $('.event-col').each(function(){
          // Declare event card variables
          var event = $(this);
          var card = event.children('.card');

          if ( !mainFilterBtn.hasClass('active') ) {
            eventList.filter();
          } else {
            eventList.filter(function(item) {
               if (item.values().types.includes(mainFilter) ) {
                   return true;
               } else {
                   return false;
               }
            });
          }
        });
      });

      // Location buttons
      $('.location-filter').click(function() {
        // Declare variables
        var locationFilterBtn = $(this);
        var locationFilter = $(this).attr('data-location');
        var filterText = locationFilterBtn.html();
        

        // Add active class to the clicked filter
        $(this).toggleClass('active');
        // Remove active class from all other filters
        $('.location-filter').not( $(this) ).removeClass('active');
        // 

        // Loop through each event card
        $('.event-col').each(function(){
          // Declare event card variables
          var event = $(this);
          var card = event.children('.card');
          
          if ( locationFilter == 'all' ) {
            eventList.filter();
          } else {
            eventList.filter(function(item) {
              if (item.values().types.includes(locationFilter)  ) {
                 return true;
              } else {
                 return false;
              }
            });
          }
        });

        // Append selected filter to location-filter button and update data-current attr
        var locationPlaceholder = $('#dropdownLocation').children('.current-placeholder');
        locationPlaceholder.empty();
        locationPlaceholder.append(filterText);

        $('#dropdownLocation').attr('data-current', locationFilter);

        
        
      });

      // Catagory buttons
      $('.catagory-filter').click(function() {
        // Declare variables
        var catagoryFilterBtn = $(this);
        var catagoryFilter = $(this).attr('data-catagory');
        var filterText = catagoryFilterBtn.html();
        
        // Add active class to the clicked filter
        $(this).toggleClass('active');
        // Remove active class from all other filters
        $('.catagory-filter').not( $(this) ).removeClass('active');
        // 

        // Loop through each event card
        $('.event-col').each(function(){
          // Declare event card variables
          var event = $(this);
          var card = event.children('.card');
          
          if ( catagoryFilter == 'all' ) {
            eventList.filter();
          } else {
            eventList.filter(function(item) {
              if (item.values().types.includes(catagoryFilter)  ) {
                 return true;
              } else {
                 return false;
              }
            });
          }
        });

        // Append selected filter to location-filter button 
        var catagoryPlaceholder = $('#dropdownCatagory').children('.current-placeholder');
        catagoryPlaceholder.empty();
        catagoryPlaceholder.append(filterText);
        $('#dropdownCatagory').attr('data-current', catagoryFilter);
        
      });

      // Sort buttons 
      $('#sort-by').change(function() {
          var selection = this.value;
          if (selection) {
              eventList.sort(function(item) {
                  return (item.values().material == selection);
              });
          } else {
              eventList.sort();
          }
      });


    }

    function initTooltip() {
      $('.tod, .cat2, .cat3').tooltip();
    }
     window.onload = function() {
      eventLoad();
      eventTOD();
      eventResize();
      initTooltip();
      initListJs();
    };

    // Fire eventResize whenever the user resizes their window
    $(window).resize(function() {
        eventResize();
    });




  });
})(jQuery, window, document);