function changeHeight(comp, body) {
	if (isIE) {
		document.getElementById(body).style.height = getElementsByClassName(document, comp)[0].offsetHeight + (getElementsByClassName(document, comp)[0].offsetTop - document.getElementById(body).offsetTop) - 60 + 'px';
	} else {
		document.getElementById(body).style.height = getElementsByClassName(document, comp)[0].offsetHeight + (getElementsByClassName(document, comp)[0].offsetTop - document.getElementById(body).offsetTop) - 55 + 'px';
	}
	if (document.getElementById(body).offsetHeight > 500) {
		document.getElementById('leftshadow').style.height = document.getElementById('leftshadow').offsetHeight + 50 + 'px';
		document.getElementById('rightshadow').style.height = document.getElementById('rightshadow').offsetHeight + 50 + 'px';
	}

}


function switchSection(id, clName, num1, hideId, showId, airport, component, body, num2) {
	if (id.className != clName) {
		id.className = clName;
		
		hideshowLine(airport);
				
		getElementsByClassName(document, clName)[num1].className = "";
		toggleElement(hideId, 'hide');
		for (var i=0; i < 2; i++) {
			if (i == num2) {
				getElementsByClassName(document, showId)[i].style.display = "none";
			} else {
				getElementsByClassName(document, showId)[i].style.display = "inline";
			}
		}		
	}	
	changeHeight(component, body);
}

function checkboxToggle (currentId, newId, component, body) {
	if (currentId.checked == true) {
		if (document.getElementById(newId).style.visibility != "hidden") {
			document.getElementById(newId).style.visibility = "hidden";
		} else {
			
				document.getElementById(newId).style.display = "visible";
		}	
	} else {
		if (document.getElementById(newId).style.visibility != "visible") {
			document.getElementById(newId).style.visibility = "visible";
		} else {
			document.getElementById(newId).style.visibility = "hidden";
		}	
	}
	changeHeight(component, body);
}

var onclickSave = Array();

function toggleLink (id, toggleId, classWord, hideId, airport) {
	
	var tempId = getNextSibling(document.getElementById(toggleId).childNodes[0]);
	if (isIE) {
		tempId = document.getElementById(toggleId).childNodes[0];
	}
	if (tempId.className.match(classWord) == classWord) {
		tempId.className = tempId.className.substr(0,tempId.className.search(classWord));
	} else {
		tempId.className = tempId.className + " " + classWord;
	}
	var temp = 0;
	if (id.checked == false) {
		var j=0;
		for (var i=0; i < tempId.childNodes.length; i++) {
			
			if (isSafari && (tempId.childNodes[i].onclick)) {	
				tempId.childNodes[i].onclick = onclickSave[j];
				j++;
			} else if (!isSafari && tempId.childNodes[i].onclick == "return false;") {
					   if (isIE) tempId.childNodes[i].setAttribute("onclick", onclickSave[j]);
					   else tempId.childNodes[i].onclick = onclickSave[j];	
					   j++;
				   }
			 
		}
	} else {
		var j=0;
		for (var i=0; i < tempId.childNodes.length; i++) {
			if ((tempId.childNodes[i].onclick != "") && (tempId.childNodes[i].onclick != null)) {	
				if (isIE || isSafari) tempId.childNodes[i].setAttribute("onclick","return false;");
				else tempId.childNodes[i].onclick = "return false;";
				tempId.childNodes[i].className = "nonclick";				
				if (temp == 1) tempId.childNodes[i].className = "";
				temp = 1;
			}
		}
		document.getElementById(airport).style.display = "inline";
		if (document.getElementById(hideId).className.match("hide") != "hide") {
			document.getElementById(hideId).className += " hide";
		}
	}	
}

function hideshowLine(id) {
	if ((document.getElementById(id).style.display == "") || (document.getElementById(id).style.display == "inline")) {
		document.getElementById(id).style.display = "none";
	} else if(document.getElementById(id).style.display == "none") {
		document.getElementById(id).style.display = "inline";
	}
}

function changeFields(num, id) {
	//alert(num.options[num.options.selectedIndex].value);
	for (var i=0; i < 3; i++) {
		if (i == parseInt(num.options[num.options.selectedIndex].value)) {
			getElementsByClassName(document, id)[parseInt(num.options[num.options.selectedIndex].value)].style.display = 'block';
		} else {
			getElementsByClassName(document, id)[i].style.display = 'none';
		}
	}	
}


function loadSavedTrip(id, pickupLoc, returnLoc) {
	document.getElementById(pickupLoc).value = id.options[id.options.selectedIndex].value;
	document.getElementById(returnLoc).value = id.options[id.options.selectedIndex].value;
}

function tabChange(currentId, tab, itemNum, section, component, body) {
test1 = new Date();
	var ch = itemNum.slice(0,1);
	var num = itemNum.slice(itemNum.lastIndexOf(itemNum)-1);
	var tabs = getElementsByClassName(document, tab)[0].childNodes;
	for (var i=0; i<tabs.length; i++) {
		if ((tabs[i].nodeType!=3)&&(tabs[i].nodeType!=8)) {
			if (tabs[i].className.search(itemNum.slice(0,1)) > 0) {
				tabs[i].className = tabs[i].className.slice(0,tabs[i].className.search(itemNum.slice(0,1)));
			}
		}
	}	
	currentId.className += " " + itemNum;
	
	var sec = getElementsByClassName(document, section);
	for (var i=0; i<sec.length; i++) {
		if (i != (num - 1)) {
			sec[i].style.display = "none";
		} else {
			sec[i].style.display = "block";
			if (sec[i].offsetHeight < 243) {
				sec[i].style.height = 243;
			}
		}
	}
	changeHeight(component, body);

test2 = new Date();
test3 = (test2-test1)/1000;

}


function returnVehicleFunc (pickupLocation, returnLocation, returnId, city) {
	if ((document.getElementById(pickupLocation).value.toUpperCase() == document.getElementById(returnLocation).value.toUpperCase()) && (document.getElementById(pickupLocation).value.toUpperCase() == city.toUpperCase())) {
		document.getElementById(returnId).className = document.getElementById(returnId).className.substr(0,document.getElementById(returnId).className.search('hide'));		
	} else {
		document.getElementById(returnId).className = document.getElementById(returnId).className + " " + 'hide';
	}
	changeHeight('component', 'body');
}

function nextAccount(id, account, direction, button) {
	var totalnum = getElementsByClassName(document, account).length;

	var j=0;
	for (var i=0; i<totalnum; i++) {
		if (getElementsByClassName(document, account)[i].style.display == "block") {
			if ((i < totalnum-1) || (i+direction < i)) {
				getElementsByClassName(document, account)[i].style.display = "none";
			}
			j=i+direction;
		}
	}

	if ((j < totalnum) && (j >= 0)) {
		getElementsByClassName(document, account)[j].style.display = "block";
	}
	if ((direction < 0) && (j-direction == 0)) {
		getElementsByClassName(document, account)[0].style.display = "block";
	}		
	if (j >= totalnum-1|| (j <= 0)) {
		id.className = "disable";		
	} else {
		id.className = "";
	}	
	if (j >= 0) {
		document.getElementById(button).className = "";
	}
}

function showAll(accounts) {
	var length = getElementsByClassName(document, accounts).length
	for (var i=0; i<length; i++) {
		getElementsByClassName(document, accounts)[i].style.display = "block";
	}
}

function homepagestart() {
	changeHeight('component', 'body');
}

if (window.addEventListener) window.addEventListener('load', homepagestart, true);
if (window.attachEvent) window.attachEvent('onload', homepagestart);

