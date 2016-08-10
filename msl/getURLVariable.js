$( document ).ready(function() {
	
	function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
	}

	var placeholder = $('.sign-up-placeholder')
	var eventName = getUrlVars()["event"];
	var eventID = getUrlVars()["id"];

	eventName = eventName.replace(/_/g," ");

	eventNameID = eventName + ' ' + eventID;

	console.log(eventNameID);

	curEventTitle = $('dl.msl_signup dt:contains("' + eventNameID + '")');

	curEvent = curEventTitle.parent('.msl_signup');

	curEvent.addClass('selected').appendTo(placeholder);

	

	var allTitles = $('dl.msl_signup dt');
	var lastIndex = allTitles.lastIndexOf(" ");

	allTitles = allTitles.substring(0, lastIndex);

	

});

