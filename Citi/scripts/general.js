/////////////////////////////////////////////////////////////
// LOADING SCRIPT
// Run as the page is parsed, the script on this page provides
// an intermittent "loading" routine for long loading pages.
// Once the page loads the div created is wiped out.

// Some global reference variables
var loadId = "loading";
var pageId = "page";

// Hides the loading DIV, Shows the content OnLoad
function clearLoadingBar() {
	var bar = document.getElementById(loadId);
	bar.style.display = "none";	
	var page = document.getElementById(pageId);
	page.style.display = "block";
}


////////////////////////////////////////////////////////////////////
//  getElementsByClass(name of class)
//  Retrieves all classes on the page and extracts the desired class

function getElementsByClass(maClass) {
   	var tabRetour = new Array();
   	var tabTmp = new Array();
   	tabTmp = document.getElementsByTagName("*");
   	j=0;
    for (i=0; i<tabTmp.length; i++) {
     	if (tabTmp[i].className==maClass) {
         	tabRetour[j]=tabTmp[i];
      		j++;						
      	} 
    }
    return tabRetour;
}

/////////////////////////////////////////////////////////////////////////////////////////
// DHTML MENU SWAP FIX
// This script solves the no-psuedo classes for IE problem with the dhtml menu

// Detect IE
var isIE = (navigator.userAgent.toLowerCase().indexOf("msie") > 0) ? true : false;
var isSF = (navigator.userAgent.toLowerCase().indexOf("safari") > 0) ? true : false;

initNavBar = function() {
	// first we need to shorten the hgt of the bar itself
	var navContainer = document.getElementById('dropdown');
	if (navContainer) navContainer.style.height = "16px";
	
	// then we need to move items up to eliminate gaps
	var hasMenu = document.getElementById('dropdown');
	var menuBlocks = (hasMenu) ? document.getElementById('dropdown').getElementsByTagName('ul') : null;
	if (menuBlocks) {
		for (var i = 0; i < menuBlocks.length; i++) {
			var targElem = menuBlocks[i];
			var par = targElem.parentNode;
				var parpar = par.parentNode;
				var parparpar = parpar.parentNode;
			if (parparpar.id == 'dropdown') {
				targElem.style.top = "12px";
			}
		}
	}
}			
if (isSF) window.addEventListener("load", initNavBar, true);


sfHover = function() {
	var hasMenu = document.getElementById('dropdown');
	var liElems = (hasMenu) ? document.getElementById('dropdown').getElementsByTagName('li') : null;
	if (liElems) {
		for (var i = 0; i < liElems.length; i++) {
			if (liElems[i]) {
				liElems[i].onmouseover = function() {
					this.className += " sfhover";
					var ulElem = this.getElementsByTagName('ul');					
					for (var j = 0; j < ulElem.length; j++) {
						var targUlElem = ulElem[j];
						var nextTag = targUlElem.firstChild;
						if (nextTag.nodeName != 'IFRAME') {
							var ulMat = document.createElement('iframe');
							ulMat.style.width = targUlElem.offsetWidth + "px";
							ulMat.style.height = targUlElem.offsetHeight + "px";							
							targUlElem.insertBefore(ulMat, targUlElem.firstChild);
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
				this.className = this.className.replace(' sfhover', '');
			}
		}
	}
}
if (window.attachEvent) window.attachEvent('onload', sfHover);



/////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL DHTML LAYER OVERLAYS
// These scripts hides and unhides a DHTML layer.


function unhide(panel) {
	document.getElementById(panel).style.display = 'block';
}

function hide(panel) {
	document.getElementById(panel).style.display = 'none';
}

function invisible(panel) {
	document.getElementById(panel).style.visibility = 'hidden';
}

function visible(panel) {
	document.getElementById(panel).style.visibility = 'visible';
}


/////////////////////////////////////////////////////////////////////////////////////////
// DHTML PORTLET TAB SWITCH
// This script gives the tab switch functionality to the Positions & Activity portlet

function portletTabSwitch(tab, tabcontent, totalnum) {
	for (var i = 0; i < totalnum; ++i) {
		var temp = 'tab' + i;
		if (temp == tab) {		
			document.getElementById(temp).className = "tabon";
			getElementsByClass(tabcontent)[i].style.display = "block";
		} else {
			document.getElementById(temp).className = "taboff";
			getElementsByClass(tabcontent)[i].style.display = "none";
		}
	}
	resize();
}


/////////////////////////////////////////////////////////////////////////////////////////
// JAVASCRIPT POP UP
// Opens a javascript window.

function openwin(filename, winname, w, h) {
	window.open (filename, winname, 'width=' + w + ', height=' + h + ', resizable=no, status=no, titlebar=no' );
}


/////////////////////////////////////////////////////////////////////////////////////////
// SEARCH RESULTS
// Adjusts borders of the Find in the Admin section as well as hiding search results

function searchResults(result, flag, panel) {
	if (flag == true) {
		getElementsByClass(result)[0].style.border = "solid 2px #3298CD";
		unhide(panel);
		temp = findPosLeft(getElementsByClass(result)[0]) + getElementsByClass(result)[0].scrollWidth;		
		temp = temp - document.getElementById(panel).scrollWidth;
		document.getElementById(panel).style.left = temp + "px";	
	} else {
		parent.getElementsByClass(result)[0].style.border = "solid 1px #C5C7DC";
		parent.document.getElementById(panel).style.display = 'none';
	}
	
} 


/////////////////////////////////////////////////////////////////////////////////////////
// OFFSET FINDER
// Resolves the distance between the object and top of the page


function findPosLeft(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
		}
	}
	return curleft;
}

function findPosRight(obj) {
	var curright = 0;
	if (obj.offsetParent) {
		curright = obj.offsetRight
		while (obj = obj.offsetParent) {
			curright += obj.offsetRight
		}
	}
	return curright;
}


function findPosTop(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curtop += obj.offsetTop
		}
	}
	return curtop;
	
}
