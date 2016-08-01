$( document ).ready(function() {
    $("button.signup-btn").click(function(event) {

    	event.preventDefault();
    	var e = $('.event-details>h1');
    	var e = e.html();
    	var e = e.replace(/ /g,"_");
    	window.location.href = 'http://www.thestudentsunion.co.uk/welcome2016/signups?event=' + e;

    });
});