//////////////////////////////////////////////////////////////
// IFRAME ARRAY
// Array load located in the main Portlets.js file.


//////////////////////////////////////////////////////////////
// IFRAME RESIZER SCRIPT
// Resizes iframes dynamically

// solves a Safari caching bug
function resize() {
	// fix for Safari
	if (isSF) { setTimeout("doresize()", 500); }
	doresize();
}

// main resize script
function doresize() {
	var time;
	var delay = 200;
	
	var docHeight = (isIE) ? document.body.scrollHeight : document.body.offsetHeight;	
	
	if (docHeight == null || docHeight <= 10) {
		time = setTimeout("doresize()", delay);
	}
	else {
		if (time) clearTimeout(time);
		try {
			if (isIE) {
				window.parent.document.getElementById(this.name).style.height = docHeight;
			}
			else {
				window.parent.document.getElementById(this.name).height = docHeight;
			}	
			// register height in global array
			top.ifrArray[this.name] = docHeight;
		} catch(e) {}
	}
}