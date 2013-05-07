function expandCollapse(ID) {
	if (document.getElementById('Links'+ID).style.visibility != 'visible') {
		document.getElementById('Links'+ID).style.visibility = 'visible';
		document.getElementById('Links'+ID).style.display = 'block';
		document.getElementById('Button'+ID).innerHTML = "Collapse";
		document.getElementById('Img'+ID).innerHTML = "<img src='images/expanded.gif' />";
	} else {
		document.getElementById('Links'+ID).style.visibility = 'hidden';
		document.getElementById('Links'+ID).style.display = 'none';
		document.getElementById('Button'+ID).innerHTML = "Expand";
		document.getElementById('Img'+ID).innerHTML = "<img src='images/collapsed.gif' />";
	}
}
