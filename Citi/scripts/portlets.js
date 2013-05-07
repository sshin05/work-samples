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

var imgPortletCollapse2 = "../images/portlet_arrow_collapse.gif";
var imgPortletExpand2 = "../images/portlet_arrow_expand.gif";

// the script


function portletMinimizeWithContext(ctx,n)
{
	
	imgPortletCollapse = ctx + "/framework/skins/CitiGPBAdmin/images/portlet_arrow_collapse.gif";
	imgPortletExpand = ctx +  "/framework/skins/CitiGPBAdmin/images/portlet_arrow_expand.gif";
	
	
	if(n!="" && n.indexOf("UserProfile")!=-1){
		return portletMinimize3(n);
	}
	else {
		return portletMinimize(n);
	}
}


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
		var buttonimg = (newHeight == 0) ? imgPortletCollapse : imgPortletExpand;
		document.getElementById("img" + n).src = buttonimg;
	} catch(e) {}	
}


function portletMinimize3(n) {
	
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
		var buttonimg = (newHeight == 0) ? imgPortletCollapse2 : imgPortletExpand2;
		document.getElementById("img" + n).src = buttonimg;
	} catch(e) {}
	
}


///////////////////////////////////////////////////////////////////////////////
// PORTLET MINIMIZER
// handles the minimizing and expansion of portlets

function portletMinimize2(n) {
	
	var docHeight = top.ifrArray[n];
	if (!docHeight) { docHeight = document.getElementById(n).height; top.ifrArray[n] = docHeight; }
	var oldHeight = (document.getElementById(n).style.height) ? document.getElementById(n).style.height : document.getElementById(n).height;
	var newHeight = (oldHeight == 0 || oldHeight == "0px") ? docHeight : 0;
	
	try {
		if (isIE) {
			if (oldHeight.indexOf('p')) {
				oldHeight = oldHeight.substring(0,oldHeight.lastIndexOf('p'));
			}
			document.getElementById(n).style.height = newHeight;
		} else {
			document.getElementById(n).height = newHeight;
		}
					
		var buttonimg = (newHeight == 0) ? imgPortletCollapse : imgPortletExpand;
		document.getElementById("img" + n).src = buttonimg;
	} catch(e) {}
	
}

