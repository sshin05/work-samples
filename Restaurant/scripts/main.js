$(window).ready(function() {
	if($.browser.msie && jQuery.browser.version < 7) {
		$('#loader').hide();
	} else {
		$('#loader').slideUp(450);	
	}
});

