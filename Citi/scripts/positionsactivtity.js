
/////////////////////////////////////////////////////////////////////////////////////////
// DHTML PORTLET ACCORDION
// This script gives the accordion functionality to the Positions & Activity portlet

function portletAccordion (tab, selection, totalnum) {
	for (var i = 0; i < totalnum; ++i) {
		var temp = tab + i;
		if (i != selection) {	
			document.getElementById(temp).style.display = "none";	
			t = temp + 'link';	
			document.getElementById(t).className = "";
		} else {
			document.getElementById(temp).style.display = "block";
			t = temp + 'link';
			document.getElementById(t).className = "itemOn";			
		}		
	}
	resize();
}


function resetAccordion (tab, totalnum) {
	for (var i = 0; i < totalnum; ++i) {
		var temp = tab + i;
		document.getElementById(temp).style.display = "none";	
		t = temp + 'link';	
		document.getElementById(t).className = "";	
	}
}


function clearSelector(listbox) {
	if(document.getElementById) 
	document.getElementById(listbox).selectedIndex = -1;
}

function clearCheck(checkbox) {
	if(document.getElementById) 
	var t = document.getElementById(checkbox).checked = false;
}


function setDate() {
if(document.getElementById) {
var t = document.getElementById('monthlist');
var currentTime = new Date();
var month = currentTime.getMonth() + 1;
for(i=0;i<t.length;i++)
	{
	if(t.options[i].value==month) {
	t.selectedIndex=i;
	}
}
}

}