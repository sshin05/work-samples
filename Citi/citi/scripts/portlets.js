///////////////////////////////////////////////////////////////////////////////
// PORTLET SCRIPTS
// The scripts on this page are specifically used by the portlets.
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// IFRAME ARRAY
// Provides size for reference.  Loaded only in main window.
var ifrArray = new Array();


///////////////////////////////////////////////////////////////////////////////
// PORTLET MINIMIZER
// handles the minimizing and expansion of portlets

// set the img variables for reference
var imgPortletCollapse = "images/portlet_arrow_collapse.gif";
var imgPortletExpand = "images/portlet_arrow_expand.gif";

// the script
function portletMinimize(n) {
	
	var docHeight = top.ifrArray[n];
	if (!docHeight) { docHeight = document.getElementById(n).height; top.ifrArray[n] = docHeight; }
	var oldHeight = (document.getElementById(n).style.height) ? document.getElementById(n).style.height : document.getElementById(n).height;
	var newHeight = (oldHeight == 0 || oldHeight == "0px") ? docHeight : 0;
	
	try {
		if (isIE) {
			if (oldHeight.indexOf('p')) {
				oldHeight = oldHeight.substring(0,oldHeight.lastIndexOf('p'));
			}
		}
			
		if (newHeight < oldHeight) { // is open
			rollUp(n,oldHeight,newHeight);
		}
		else if (newHeight > oldHeight) { // is closed
			rollDown(n,oldHeight,newHeight);
		}
		var buttonimg = (newHeight == 0) ? imgPortletCollapse : imgPortletExpand ;
		document.getElementById("img" + n).src = buttonimg;
	} catch(e) {}
	
}


///////////////////////////////////////////////////////////////////////////////
// PORTLET CLOSER
// Handles transition effects init for portlet close

function portletClose(ifrTarg,portletURL) {

	// create the removal confirm message
	var msg = "Removing this content will discard its saved settings. \n";
		msg += "Are you sure you want to remove it? \n";
	
	// present message, run close routing if true, else do nothing
	if (confirm(msg)) {
		var portTarg = "port" + ifrTarg;
		var targelem = document.getElementById(ifrTarg);
		var height = (targelem.style.height) ? targelem.style.height : targelem.height;
		height = (targelem.style.height) ? height.substring(0,height.lastIndexOf('p')) : height;
		
		if (height > 0) { 
			effectsArray[0] = portletMinimize(ifrTarg);
		}
		effectsArray[1] = fadeOut(portTarg,100,0);
		effectsArray[2] = retrieveURL(portletURL);
		runEffects();
	}
}
