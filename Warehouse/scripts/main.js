jQuery(document).ready(function() {	
/*	var temp, i=0;
	var imageArray = new Array('images/bgimages/bg1.jpg','images/bgimages/bg2.jpg','images/bgimages/bg3.jpg','images/bgimages/bg4.jpg','images/bgimages/bg5.jpg','images/bgimages/bg6.jpg','images/bgimages/bg7.jpg','images/bgimages/bg8.jpg','images/bgimages/bg9.jpg','images/bgimages/bg10.jpg','images/bgimages/bg11.jpg');
	nextImage = function() {
		if (i != imageArray.length) {			
			$('section').css('background','transparent url(' + imageArray[i] + ') no-repeat 0 0');
			i++
		} else {
			i=0;	
		}
		temp = setTimeout("nextImage()", 8000);
	}
	nextImage();
	*/
	
	jQuery('a').mouseover(function() {		
		if (this.innerHTML == 'Menu') {
			jQuery(this).html('메뉴');
		}
		if (this.innerHTML == 'Photo Gallery') {
			jQuery(this).html('포토 갤러리');			
		}					  
	});
	jQuery('a').mouseout(function() {
		if (this.innerHTML == '메뉴') {
			jQuery(this).html('Menu');
		}
		if (this.innerHTML == '포토 갤러리') {
			jQuery(this).html('Photo Gallery');
		}					  
	});
	jQuery('a').click(function() {
		if ((this.innerHTML == 'Photo Gallery') || (this.innerHTML == '포토 갤러리')) {
			jQuery(".leftPanel").toggle("slow");
			jQuery(".rightPanel").toggle("slow");
		}				
		
		return false;
	});
});

