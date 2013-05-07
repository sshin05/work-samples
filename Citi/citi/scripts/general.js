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
// DHTML DROP DOWN MENU
// This script takes care of the account change drop down

var timeOn = null;

function showMenu(eventObj, labelID, menuID) {
    hideAllMenus(menuID, labelID);
	
	var top = 0;
	var left = 0;
	p = getElementsByClass(labelID)[0];
	for (; p; p = p.offsetParent) {
	  top  += p.offsetTop;
	  left += p.offsetLeft;
	}
	
	document.getElementById(menuID).style.top = top + 19 + "px";
	document.getElementById(menuID).style.left = left + "px";
	document.getElementById(menuID).style.position = "absolute";	

	
	eventObj.cancelBubble = true;
    if(changeObjectVisibility(menuID, 'block')) {
		return true;
    } else {
		return false;
    }	
}

function hideAllMenus(mID, lID) {
	changeObjectVisibility(mID, 'none');
}

function menuOver() {
	clearTimeout(timeOn);
}

function menuOut(menuID, labelID) {
 	timeOn = setTimeout("hideAllMenus('" + menuID + "','" + labelID + "')", 200);
}

function getStyleObject(objectId, doc) {
    if(document.getElementById && document.getElementById(objectId)) {
		return document.getElementById(objectId).style;
	} else if (document.all && document.all(objectId)) {
			   return document.all(objectId).style;
	} else if (document.layers && document.layers[objectId]) {
			   return getObjNN4(document,objectId);
	} else {
		return false;
    }
}

function changeObjectVisibility(objectId, newVisibility) {
    var styleObject = getStyleObject(objectId, document);
    if(styleObject) {
	styleObject.display = newVisibility;
	return true;
    } else {
	return false;
    }
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



