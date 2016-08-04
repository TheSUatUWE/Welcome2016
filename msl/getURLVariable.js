$( document ).ready(function() {
	
	function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
	}

	var placeholder = $('.sign-up-placeholder')
	var event = getUrlVars()["event"];

	event = event.replace(/_/g," ");

	curEventTitle = $('dl.msl_signup dt:contains("' + event + '")');

	curEvent = curEventTitle.parent('.msl_signup');

	curEvent.appendTo(placeholder);


	

});