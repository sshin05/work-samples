$(document).ready(function() {	
	$('.cover').hide();
	$('a').click(function(event){	
		var target = this;
		$('.cover').slideDown('fast', function() {			
			$('#imageHolder').attr('src', $(target).find('img').attr('src').replace('thumb','large')).load(function() {			
				$('.cover').slideUp('fast');
			});
	  	});
		return false;
	});
});

