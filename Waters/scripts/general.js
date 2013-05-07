//////////////////////////////////////////////////////////////////////////////
// GENERAL SCRIPTS LIBRARY
// The scripts in this .js provide general functionality used across all
// Connect pages and templates.  This file should be provided globally and
// loaded first.
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// BROWSER TEST VARIABLES
// A couple of broad test variables for reference purposes
var a = navigator.userAgent.toLowerCase();
var iePos  = a.indexOf('msie');
if (iePos !=-1) {
	is_minor = parseFloat(a.substring(iePos+5,a.indexOf(';',iePos)))
	is_major = parseInt(is_minor);
}
var isSF = (a.indexOf("safari") > 0) ? true : false;
var isIE = (a.indexOf("msie") > 0 && is_major < 7) ? true : false;
var isIE7up = (a.indexOf("msie") > 0 && is_major >= 7) ? true : false;
var isNN = (a.indexOf("netscape") > 0 || a.indexOf("gecko") > 0) ? true : false;

///////////////////////////////////////////////////////////////////////////////
// CLASSNAME FINDER SCRIPT
// This script attaches a global event that allows us to look up a tag by
// its classname.  Usage is as follows:
// oElm = scope, generally "document"
// strTagName = the tagname to limit it to.  "*" is all
// strClassName = the actual class to look for.  Should be a string value

document.getElementsByClassName = function(oElm, strTagName, strClassName) {
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

//////////////////////////////////////////////////////////////////////////////
// BROWSER INITIALIZATION
// Settings to simplify things.  At present only setting mainwindow name for
// reference by pop-ups and secondary scripts.  Primary navbar is the
// differentiator... guaranteed pop-ups don't have it.
setWinName = function() {
	if (document.getElementById('primaryNav')) {
		self.name = "mainwindow";
	}
}
if (window.attachEvent) window.attachEvent('onload', setWinName);
if (window.addEventListener) window.addEventListener("load", setWinName, true);


//////////////////////////////////////////////////////////////////////////////
// DHTML MENU SCRIPTS
// The following scripts are required to insure the proper operation of the
// DHTML Primary Navbar across all browsers.

// SAFARI MENU POSITIONING FIX
// This is to resolve a height discrepancy for the mainnav bar
initNavBar = function() {
	// first we need to shorten the hgt of the bar itself
	var navContainer = document.getElementById('mainnav');
	if (navContainer) navContainer.style.height = "22px";
	
	// then we need to move items up to eliminate gaps
	var hasMenu = document.getElementById('primaryNav');
	var menuBlocks = (hasMenu) ? document.getElementById('primaryNav').getElementsByTagName('ul') : null;
	if (menuBlocks) {
		for (var i = 0; i < menuBlocks.length; i++) {
			var targElem = menuBlocks[i];
			var par = targElem.parentNode;
				var parpar = par.parentNode;
				var parparpar = parpar.parentNode;
			if (parparpar.id == 'primaryNav') {
				targElem.style.top = "22px";
			}
		}
	}
}			
if (isSF) window.addEventListener("load", initNavBar, true);

// IE 6 DHTML MENU SWAP FIX
// This script solves two big problmes in IE
// 1. dynamically applies classes so we can have LI hover states
// 2. dynamically applies an iframe under menu uls in IE so they overlay Selects

ieHover = function() {
	var hasMenu = document.getElementById('primaryNav');
	var liElems = (hasMenu) ? document.getElementById('primaryNav').getElementsByTagName('li') : null;
	if (liElems) {
		for (var i = 0; i < liElems.length; i++) {
			if (liElems[i]) {
				liElems[i].onmouseover = function() {
					this.className += " iehover";
					var ulElem = this.getElementsByTagName('ul');
					for (var j = 0; j < ulElem.length; j++) {
						var targUlElem = ulElem[j];
						var nextTag = targUlElem.firstChild;
						if (nextTag.nodeName != 'IFRAME') {
							var ulMat = document.createElement('iframe');
							ulMat.style.width = targUlElem.offsetWidth + "px";
							ulMat.style.height = targUlElem.offsetHeight + "px";
							targUlElem.insertBefore(ulMat, targUlElem.firstChild);
							ulMat.src = "javascript:void(0)";
							targUlElem.style.zIndex = "99";
						}
						else {
							nextTag.style.width = targUlElem.offsetWidth + "px";
							nextTag.style.height = targUlElem.offsetHeight + "px";
						}
					}
				}
			}
			liElems[i].onmouseout = function() {
				this.className = this.className.replace(' iehover', '');
			}
		}
	}
}
if (window.attachEvent) window.attachEvent('onload', ieHover);

// IE7 MENU STYLE FIX
// This script resolves a style problem in IE7's inheritance structure
// IE7 doesn't support inherit, and lacks workaround support

ieInheritStyle = function() {
	var hasMenu = document.getElementById('primaryNav');
	var menuLinks = (hasMenu) ? document.getElementById('primaryNav').getElementsByTagName('a') : null;
	if (menuLinks) {
		for (var i = 0; i < menuLinks.length; i++) {
			var targElem = menuLinks[i];
			var par = targElem.parentNode;
				var par2 = par.parentNode;
				var par3 = par2.parentNode;
			if ((par3.id == 'primaryNav') && (targElem.className != 'itemOn')) {
				targElem.style.color = par.currentStyle.color;
			}
		}
	}
}
if (isIE7up) window.attachEvent('onload', ieInheritStyle);

//////////////////////////////////////////////////////////////////////////////
// DEFAULT FORM TEXT ENTRIES
// Clears any populated input onclick
function clearTip(fieldId, tipTxt) {
	if (document.getElementById(fieldId).value == tipTxt) {
		document.getElementById(fieldId).style.color = "#333333";
		document.getElementById(fieldId).value = "";
	}
}

// Restores the "Default style" for any input
function restoreTip(fieldId, tipTxt) {
	if (document.getElementById(fieldId).value == "") {
		document.getElementById(fieldId).style.color = "#999999";	
		document.getElementById(fieldId).value = tipTxt;		
	}
}

//////////////////////////////////////////////////////////////////////////////
// TOOLTIP FIXES
// These scripts insure tooltips function properly across platforms
// and browsers.  IE and Safari both have issues.

// IE Img Tooltip fix
// This is to resolve a height discrepancy for the mainnav bar
initImgTips = function() {
	// first we need to setup the bucket of elements
	var imgBlocks = document.getElementsByTagName('img');
	
	// then we need to apply tooltips as necessary
	if (imgBlocks) {
		for (var i = 0; i < imgBlocks.length; i++) {
			var imgElem = imgBlocks[i];
			if ((imgElem.parentNode.title != '') && (imgElem.parentNode.title != null)) {
				imgElem.title = imgElem.parentNode.title;
			}
			else if ((imgElem.parentNode.parentNode.title != '') && (imgElem.parentNode.parentNode.title != null)) {
				imgElem.title = imgElem.parentNode.parentNode.title;
			}
		}
	}
}			
if (window.attachEvent) window.attachEvent('onload', initImgTips)


//////////////////////////////////////////////////////////////////////////////
// WINDOW OPENER SCRIPT
// opens a new window when invoked.  Also sets an array value
// for the new window and attaches and unload event so it knows
// when the window is closed.  this is to allow the window to be
// focused instead of reloaded onclick, reducing the potential for
// overwriting a user's workspace.

var winArray = new Array();

function openWindow(url, name, position, w, h) {

	var width = (w) ? w : null;
	var height = (h) ? h : null;
	var toolbar,location,menu,resize,scroll,status;
	
	if (!w) {
		switch (name) {
			case "quote":
				width = 400; height = 350; break;
			case "edit":
				width = 575; height = 450; break;
			case "help":
				width = 650; height = 400; scroll = 0; break;
			case "findacct":
				width = 660; height = 400; break;
			case "glossary":
				width = 500; height = 250; break;
			case "map":
				width = 620; height = 450; break;
			case "creategroup":
				width = 575; height = 400; break;
			case "securitylookup":
				width = 500; height = 350; break;
			case "alerts":
				width = 550; height = 350; break;
			case "article":
				width = 600; height = 450; break;
			case "openorder":
				width = 600; height = 450; break;
			case "pdfdoc":
				width = 650; height = 450; break;
			case "site":
				width = 650; height = 500; break;
			default:		
				width = 550; height = 450;
		}
	}
		
	var topIncre, leftIncre;	
	switch (position) {
		case "topleft":
			topIncre = 150; leftIncre = 200; break;
		case "midleft":
			topIncre = 250; leftIncre = 200; break;
		case "botleft":
			topIncre = 350; leftIncre = 200; break;
		default:		
			topIncre = 150; leftIncre = 200;
	}
	
	// should be changed to be an offset, not a hard coded setting
	var posX = topIncre;
	var posY = leftIncre;
	
	var winAtts = '';
	winAtts += (toolbar == 1) ? ",toolbar=1" : ",toolbar=0";
	winAtts += (location == 1) ? ",location=1" : ",location=0";
	winAtts += (menu == 1) ? ",menubar=1" : ",menubar=0";
	winAtts += (resize == 0) ? ",resizable=0" : ",resizable=1";
	winAtts += (scroll == 0) ? ",scrollbars=0" : ",scrollbars=1";
	winAtts += (status == 0) ? ",status=0" : ",status=1";	// latest browsers no longer allow control of status
	
	var winUrl = url;
	var winName = name;
	var winFeat = "width=" + width + ",height=" + height + winAtts + ",left=" + posX + ", top=" + posY;
	
	var newWin = window.open(winUrl, winName, winFeat);
	newWin.focus();
	
	//if(top.winArray[winName] != null) {
		//top.winArray[winName] = window.open(winUrl, winName, winFeat);
	//	top.winArray[winName].focus();
	//}
	//else {
	//	top.winArray[winName] = window.open(winUrl, winName, winFeat);
	//	top.winArray[winName].focus();
	//	if (window.attachEvent) {
	//		top.winArray[winName].attachEvent("onunload", unloadWinRef);
	//	}
	//	else {
	//		top.winArray[winName].addEventListener("unload", unloadWinRef, true);
	//	}
	//}
}

unloadWinRef = function() {
	window.parent.winArray[winName] = null;
}


//////////////////////////////////////////////////////////////////////////////
// EXPAND/COLLAPSE SCRIPTS
//
// Display None/Block
// Provides script for expanding/collapsing sections in content using the
// display style control.  This is used in some portlets, etc.
//
// hideTargID = ID of the the DIV or block element that should be hidden
// imgTargID = ID of the image that should be swapped when the elem is closed
// imgTargSrc = Local path to the image without "_opened.gif" or "_closed.gif".
//              Note: the way it works is that the inverse images must share the
//              same prefix (e.g., "folder_opened.gif" and "folder_closed.gif").
//				The script works by appending "_opened.gif" or "_closed.gif" as
//				needed based on the user's action.
// textTargID = ID of the element that contains the text you want to swap.
// textOpened = Text you want to have displayed when the target is hidden.
// textClosed = Text you want to have displayed when the target is shown.
// resizeView = Boolean value... whether to do a resize to reset elemenet onchange

// Elemnt Rolldown/Rollup
var elemHgtArray = new Array();
	
function sectionCollapse(hideTargID,imgTargID,imgTargSrc,textTargID,textClosed,textOpened,resizeView) {
	// load the target variables
	var targElem = document.getElementById(hideTargID);
	var collapseImg = "_collapse.gif";
	var expandImg = "_expand.gif";
	
	// set the reference variables
	var elemHeight = elemHgtArray[hideTargID];
	if (!elemHeight) { elemHeight = targElem.offsetHeight; elemHgtArray[hideTargID] = elemHeight; }
	var oldHeight = targElem.offsetHeight;
	var newHeight = (oldHeight == 0 || oldHeight == "0px") ? elemHeight : 0;
	var imgChange = (newHeight != 0) ? imgTargSrc + collapseImg : imgTargSrc + expandImg;
	var textInsert = (newHeight != 0) ? textOpened : textClosed;
	
	// run the arguments
	try {
		if (newHeight < oldHeight) { rollUp(hideTargID,oldHeight,newHeight); }
		else if (newHeight > oldHeight) { rollDown(hideTargID,oldHeight,newHeight); }
		if (imgTargSrc) { document.getElementById(imgTargID).src = imgChange; }
		if (textInsert != null) { document.getElementById(textTargID).innerHTML = textInsert; }
		if (resizeView)	{ this.resize(); }
	} catch(e) {}
}

// Table Group Collapse/Expand
// this one is for inline table hiding... resolves a problem where table row groups collapse in FF
function sectionCollapseTableGroup(hideTargID,imgTargID,imgTargSrc,textTargID,textClosed,textOpened,resizeView) {
	// check the element's status
	var status = document.getElementById(hideTargID).style.display;

	// load the variables
	var targElem = document.getElementById(hideTargID);
	var textTarg = (status == "none") ? textOpened : textClosed;
	var collapseImg = "_collapse.gif";
	var expandImg = "_expand.gif";
	var imgChange = (status == "none") ? imgTargSrc + collapseImg : imgTargSrc + expandImg;
	
	// change the display state
	if (status != "none") targElem.style.display = "none";
	else if (status == "none") targElem.style.display = (isIE || isIE7up) ? "block" : "table-row-group";
	
	// apply auxiliary changes
	if (imgTargSrc) document.getElementById(imgTargID).src = imgChange;
	if (textTarg) document.getElementById(textTargID).innerHTML = textTarg;
	if (resizeView)	this.resize();
}


//////////////////////////////////////////////////////////////////////////////
// FORM SUBMISSION SCRIPT
// This script provides us with the ability to submit any form from any place
// when the user clicks the "Enter" key.  This is necessary to overcome both
// browser weaknesses and the use of links as buttons.

// The script that we invoke
function enterKey(formField,evt) {
	// setup the variables for different browsers
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (evt) keycode = evt.which;
	else return true;

	// test the key and act as appropriate
	if (keycode == 13) {
		formField.form.submit();
		return false;
	}
	else {
		return true;
	}
}

// The onload event to apply this to all form inputs
initInputKey = function() {
	// first we set our bucket
	var inputContainer = document.body;
	
	// then we create an array of the target elements
	var inputBlocks = document.body.getElementsByTagName('input');
	var selectBlocks = document.body.getElementsByTagName('select');
	
	// and finally we attach the method to the elements
	if (inputBlocks) {
		for (var i = 0; i < inputBlocks.length; i++) {
			var targElem = inputBlocks[i];
			targElem.onkeypress = function(event) {
				return enterKey(this,event);
			}
		}
	}
	if (selectBlocks) {
		for (var i = 0; i < selectBlocks.length; i++) {
			var targElem = selectBlocks[i];
			targElem.onkeypress = function(event) {
				return enterKey(this,event);
			}
		}
	}
}			
if (window.attachEvent) window.attachEvent('onload', initInputKey);
if (window.addEventListener) window.addEventListener("load", initInputKey, true);

