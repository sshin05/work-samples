////////////////////////////////////////////////////////////////////////////
// EFFECT INITIALIZATION
// Used to sequence effect rendering

var effectsArray = new Array();
var effectNum;

function runEffects(effectNum) {
	effectNum = 0;
	effectsArray[effectNum];
	effectNum++;
}

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

function purgeEffects() {
	effectsArray = new Array();
	effectNum = null;
}


////////////////////////////////////////////////////////////////////////////
// ASYNCHRONOUS SERVER COMMUNICATION
// Allows for asynchronous action/effect.  Used for things like no refresh
// portlet removal

function retrieveURL(url) {

	// Do the AJAX via XMLHttpRequest if supported
	if (window.XMLHttpRequest) { 
		req = new XMLHttpRequest();
		req.onreadystatechange = processStateChange;
	
		try {
			req.open("POST", url, true); 
		} catch (e) {}
		req.send(null);
		
		// sequence effect
		stepEffects();
	}
  
	// IE 6 and lower require we act via ActiveX instead
	else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");

		try {
			if (req) {
				//req.onreadystatechange=processStateChange;
				req.open("POST", url, true);
				req.send();
			}
		} catch (e) {}
		
		// sequence effect
		stepEffects();
	}
}


////////////////////////////////////////////////////////////////////////////
// ROLLUP/ROLLDOWN WINDOW
// Used to make window scroll open and closed
var rollincrement = 20;
var rollspeed = 1;

function rollUp(target,oldheight,newheight) {
	
	var targElem = document.getElementById(target);
	var targTag = targElem.tagName.toLowerCase();
	var targHeight = eval(oldheight - rollincrement);
	
	if ((oldheight > newheight) && (targHeight > 0)) {
		if (isIE) { targElem.style.height = targHeight + 'px'; }
		else if (targTag == 'iframe') { targElem.height = targHeight; }
		else { targElem.style.height = targHeight + 'px'; }
		var oldheight = targHeight; 
		var rollUpTimer = window.setTimeout('rollUp(\''+target+'\','+oldheight+','+newheight+')', rollspeed);
	}
	
	else {
		if (isIE) { targElem.style.height = newheight + 'px'; }
		else if (targElem.tagName == 'IFRAME') { targElem.height = newheight; }
		else { targElem.style.height = newheight + 'px'; }
		clearTimeout(rollUpTimer);
		
		// sequence effect
		if (!rollUpTimer) { stepEffects(); }
	}
}

function rollDown(target,oldheight,newheight) {

	var targElem = document.getElementById(target);
	var targTag = targElem.tagName.toLowerCase();
	var targHeight = eval(oldheight + rollincrement);
	
	if ((newheight > oldheight) && (targHeight < newheight)) {
		if (isIE) { targElem.style.height = targHeight + 'px'; }
		else if (targTag == 'iframe') { targElem.height = targHeight; }
		else { targElem.style.height = targHeight + 'px'; }
		var oldheight = targHeight; 
		var rollDownTimer = window.setTimeout('rollDown(\''+target+'\','+oldheight+','+newheight+')', rollspeed);
	}
	
	else {
		if (isIE) { targElem.style.height = newheight + 'px'; }
		else if (targElem.tagName == 'IFRAME') { targElem.height = newheight; }
		else { targElem.style.height = newheight + 'px'; }
		clearTimeout(rollDownTimer);
		
		// sequence effect
		if (!rollDownTimer) { stepEffects(); }
	}
}


////////////////////////////////////////////////////////////////////////////
// FADE OUT
// Used to make window fade away - opacity change

var fadeOutIncrement = 2;
var fadeOutSpeed = 5;

function fadeOut(target,origOp,newOp) {

	var targelem = document.getElementById(target);
	var oldopacity = origOp;
	var newopacity = newOp;
	var targopacity = eval(oldopacity - fadeOutIncrement);
	
	if ((newopacity < oldopacity) && (targopacity > newopacity)) {
		if (targelem.filters) { targelem.style.filter += ' alpha(opacity=' + targopacity + ')'; } 
		else { targelem.style.opacity = targelem.style.MozOpacity = targopacity / 100; }
		var oldopacity = targopacity; 
		var fadeOutTimer = window.setTimeout('fadeOut(\''+target+'\','+oldopacity+','+newopacity+')', fadeOutSpeed);
	}
	
	else {
		if (targelem.filters) { targelem.style.filter.opacity = newopacity; }
		else { targelem.style.opacity = targelem.style.MozOpacity = newopacity / 100; }
		targelem.style.display = "none";
		clearTimeout(fadeOutTimer);
		
		// sequence effect
		if (!fadeOutTimer) { stepEffects(); }
	}
}


