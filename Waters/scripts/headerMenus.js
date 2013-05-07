var color= window.location.search.substr(5,window.location.search.length);
if (color != "") {
	<!-- Landing Page stylesheet -->
	document.write('<img src=\"images/'+color+'/header_bar.jpg\" width=\"950\" height=\"17\" />');
}
