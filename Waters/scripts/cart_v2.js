var a = navigator.userAgent.toLowerCase();
var iePos  = a.indexOf('msie');
if (iePos !=-1) {
	is_minor = parseFloat(a.substring(iePos+5,a.indexOf(';',iePos)))
	is_major = parseInt(is_minor);
}
var isIE = (a.indexOf("msie") > 0) ? true : false;
var isIE6down = (a.indexOf("msie") > 0 && is_major < 7) ? true : false;
var isIE7up = (a.indexOf("msie") > 0 && is_major >= 7) ? true : false;


////////////////////////////////////////////////////////////////////////////
// SPECIAL EFFECTS INITIALIZATION
// Initializes special effects

var effectsArray = new Array();
var effectNum;


function stepEffects() {
	if (effectNum != null) {
		if (effectsArray[effectNum]) {
			effectsArray[effectNum];
			effectNum++;
		}
		else {
			purgeEffects();
		}
	}
}


////////////////////////////////////////////////////////////////////////////
// FADE IN/FADE OUT OVERLAY
// Used to make window fade in/fade away - opacity change



var fadeIncrement = 20;
var fadeSpeed = 5;

function fadeOut(target,origOp,newOp) {

	var targelem = document.getElementById(target);
	var oldopacity = origOp;
	var newopacity = newOp;
	var targopacity = eval(oldopacity - fadeIncrement);
	
	if ((newopacity < oldopacity) && (targopacity > 0)) {
		if (isIE7up) { 
			targelem.style.filter = ' alpha(opacity=' + targopacity + ')'; 
		} else if (isIE6down) { 
					targelem.style.filter -= ' alpha(opacity=' + targopacity + ')'; 
			   } else {
			   		targelem.style.opacity = targelem.style.MozOpacity = targopacity / 100; 
			   }
		var oldopacity = targopacity; 
		var fadeOutTimer = window.setTimeout('fadeOut(\''+target+'\','+oldopacity+','+newopacity+')', fadeSpeed);
	} else {
		if (isIE7up) { 
			targelem.style.filter = 'alpha(opacity=' + newopacity + ')'; 
		} else if (isIE6down) { 
					targelem.style.filter = ' alpha(opacity=' + targopacity + ')'; 
			   } else {
			   		targelem.style.opacity = targelem.style.MozOpacity = newopacity / 100; 
			   }
		targelem.style.display = "none";
		clearTimeout(fadeOutTimer);
		
		// sequence effect
		if (!fadeOutTimer) { stepEffects(); }
	}
}

function fadeIn(target,origOp,newOp) {

	var targelem = document.getElementById(target);
	var oldopacity = origOp;
	var newopacity = newOp;
	var targopacity = eval(oldopacity + fadeIncrement);
	
	if ((oldopacity < newopacity) && (targopacity < newopacity)) {
		if (isIE7up) { 
			targelem.style.filter = '  alpha(opacity=' + targopacity + ')'; 
		} else if (isIE6down) { 
					targelem.style.filter += 'alpha(opacity=' + targopacity + ')'; 
			   } else {
			   		targelem.style.opacity = targelem.style.MozOpacity = targopacity / 100; 
			   }
			   
		var oldopacity = targopacity; 
		var fadeInTimer = window.setTimeout('fadeIn(\''+target+'\','+oldopacity+','+newopacity+')', fadeSpeed);
	} else {
		if (isIE7up) { 
			targelem.style.filter = 'alpha(opacity=' + newopacity + ')'; 
		} else if (isIE6down) { 
					targelem.style.filter = 'alpha(opacity=' + newopacity + ')'; 
			   } else {
			   		targelem.style.opacity = targelem.style.MozOpacity = newopacity / 100; 
			   }
		targelem.style.display = "block";
		clearTimeout(fadeInTimer);
		
		// sequence effect
		if (!fadeInTimer) { stepEffects(); }
	}
}


////////////////////////////////////////////////////////////////////////////
// CLASS FINDER
// Used to find all the locations of the specified class

function getElementsByClassName(node, classname)
{
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

////////////////////////////////////////////////////////////////////////////
// LEFT AND TOP POSITION FINDER
// Used to find the left and top position of the element

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

////////////////////////////////////////////////////////////////////////////
// OVERLAY REPOSITIONER
// Positions the overlay depending on the size and location of the browser
var clientw;
var carticon;
var cart;

overlayPosition = function() {
	var overlay = document.getElementById('overlay');
	clientw = document.body.clientWidth;
	clientw = clientw / 2;	
	clientw = clientw - 468;
	overlay.style.left = clientw + "px";
	
	cover = getElementsByClassName(document, 'cover');	
	cover[0].style.width = (isIE) ? document.body.scrollWidth + "px" : document.documentElement.scrollWidth + "px";
	cover[0].style.height = (isIE) ? document.body.scrollHeight + "px" : document.documentElement.scrollHeight + "px";
	
	var left = findPosLeft(cart[0]);
	var top = findPosTop(cart[0]);
	carticon.style.left = (left - 15) + "px";
	carticon.style.top = (top - 5) + "px";
}

window.onresize = overlayPosition;
////////////////////////////////////////////////////////////////////////////
// CART OVERLAY OPENER
// Used to open the cart overlay


cartOverlay = function(id, area, layerId) {

	var layer = document.getElementById(layerId);
	cart = getElementsByClassName(document, id);
	
	carticon = document.getElementById(id);
	carticon.style.display = 'block';

	layer.style.top = findPosTop(cart[0]) + 25 + "px";
	overlayPosition();
	//layer.style.display = 'block';
	
	cover = getElementsByClassName(document, 'cover');			
	cover[0].style.top = "0px";
	cover[0].style.left = "0px";	
	cover[0].style.width = (isIE) ? document.body.scrollWidth + "px" : document.documentElement.scrollWidth + "px";
	cover[0].style.height = (isIE) ? document.body.scrollHeight + "px" : document.documentElement.scrollHeight + "px";
	cover[0].style.display = "block";

	var page = getElementsByClassName(document, area);
	//page[0].style.display = "block";
	page[0].style.height = "0px";
	
	//fadeIn(layerId, 0, 100);
	Effect.toggle(layerId, 'appear');
}

////////////////////////////////////////////////////////////////////////////
// CART OVERLAY CLOSER
// Used to close the cart overlay


hideCart = function(layerId) {
	//fadeOut(layerId, 100, 0);
	Effect.toggle(layerId, 'appear');
	var idToHide = document.getElementById(layerId);
	
	var carticon = document.getElementById('cart');
	carticon.style.display = 'none';	
	var myaccount = document.getElementById('myaccount');
	myaccount.style.display = 'none';	

	cover = getElementsByClassName(document, 'cover');
	cover[0].style.display = 'none';
	
}

////////////////////////////////////////////////////////////////////////////
// DIV POP UP'S
// Opens and closes up a non-browser pop up window

openWindow = function(id, position) {
	var popup = document.getElementById(id);
	var top = findPosTop(position);
	var left = findPosLeft(position);
	var posWidth = position.clientWidth/4;
	popup.style.left = left + posWidth + "px";	
	popup.style.top = top + "px";
	//alert(popup.style.top)
	//popup.style.left = ((popup.parentNode.clientWidth / 2) - 171) + "px";
	//popup.style.top = ((popup.parentNode.clientHeight / 2) - 200) + "px";
	popup.style.display = 'block';
}

closeWindow = function(id) {
	var popup = document.getElementById(id);
	popup.style.display = 'none';
}

////////////////////////////////////////////////////////////////////////////
// CHECKS ALL CHECKBOXES
// Enables all check boxes in the table

checkItems = function(inputBox) {
	var box = document.getElementsByName(inputBox);
	if (box[0].checked == true) {
		for (var i=1; i < box.length; i++) {
			box[i].checked = true;
		}
	} else {
		for (var i=1; i < box.length; i++) {
			box[i].checked = false;
		}
	}
}

////////////////////////////////////////////////////////////////////////////
// BUTTONS ENABLES
// Enables all buttons if one or more check boxes are checked


buttonsEnabler = function() {
	var enabled = false;
	var total = 1;
	var box = document.getElementsByName('box');
	for (var i=1; i<box.length; i++) {
		if (box[i].checked == true) {
			total--;
		} else {
			total++;
		}
	}
	
	enabled = (total < box.length)? true:false;
	
	var buttons = getElementsByClassName(document, 'button');
	
	for (var i=0; i<3; i++) {
		if ((buttons[i].className == "button disabled") && (enabled)) {
			buttons[i].className = "button enabled";
		}
		if ((buttons[i].className == "button enabled") && (!enabled)) {
			buttons[i].className = "button disabled";
		}
	}
	
}

////////////////////////////////////////////////////////////////////////////
// ACCORDION EFFECT
// Does the accordion effect without the special effects


accordion = function(section, body, num) {
	var sections = getElementsByClassName(document, section);
	//alert(sections[num].childNodes[1].childNodes[1].className);
	choose = (isIE) ? sections[num].childNodes[0].childNodes[0] : sections[num].childNodes[1].childNodes[1];
	choose.className = 'arrowdown headertext';
	var bodies = getElementsByClassName(document, body);	
	bodies[num].style.display = 'block';
	
	for (var i=0; i < sections.length; i++) {
		if (i != num) {
			if (isIE) {
				sections[i].childNodes[0].childNodes[0].className = 'arrowright headertext';
			} else {
				sections[i].childNodes[1].childNodes[1].className = 'arrowright headertext';
			}
			bodies[i].style.display = 'none';
		}
	}
}

accordionLoad = function() {
	accordion('section', 'body', 0);
}

////////////////////////////////////////////////////////////////////////////
// NEXT AND PREVIOUS OVERLAYS
// Moves the user to the next segment in the overlays


nextPage = function(next, section) {
	var page = getElementsByClassName(document, section);
	page[next].style.display = "none";
	page[next+1].style.display = "block";
	
}

prevPage = function(next, section) {
	var page = getElementsByClassName(document, section);
	page[next-1].style.display = "block";
	page[next].style.display = "none";
}

gotoPage = function(next, section) {
	var page = getElementsByClassName(document, section);
	for (var i=0; i<page.length; i++) {
		if (i != next) {
			page[i].style.display = "none";	
		} else {
			page[i].style.display = "block";
		}
	}
}
