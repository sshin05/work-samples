/* Constants */
var date = new Date();
var curr_dy = date.getDate(); 
var curr_mn = date.getMonth();
var curr_yr = date.getFullYear();
var DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var moty = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

var arrBadSelect = document.getElementsByTagName('select');

/* Global variables */
var calField; var calSpan; var calFormat; var calWknd = false;
var selectedD; var selectedM; var selectedY;

function getElementPosition(elemId) {
    var offsetTrail = document.getElementById(elemId);
    var offsetLeft = 0;
    var offsetTop = 0;
    while (offsetTrail) {
        offsetLeft += offsetTrail.offsetLeft;
        offsetTop += offsetTrail.offsetTop;
        offsetTrail = offsetTrail.offsetParent;
    }
    return {left:offsetLeft, top:offsetTop};
}

function getDaysOfMonth(monthNo, p_year) {
	if ((p_year % 4) == 0) {
		if ((p_year % 100) == 0 && (p_year % 400) != 0)
			return DOMonth[monthNo];
		return lDOMonth[monthNo];
	} else
		return DOMonth[monthNo];
}

function getNextMonth(m,y,incr){
	var ret_arr = new Array();
	ret_arr[0] = m + incr; ret_arr[1] = y;
	if (ret_arr[0] == 12){ ret_arr[0]=0; ret_arr[1]=ret_arr[1]+1; }
	if (ret_arr[0] == -1){ ret_arr[0]=11; ret_arr[1]=ret_arr[1]-1; }
	return ret_arr;
}
function figureDOTW(m,d,y){
	var tDate = new Date(); tDate.setDate(d); tDate.setMonth(m); tDate.setFullYear(y); return tDate.getDay()
}
function scramKids(n){ // this is a basic removeChild loop for removing all childNodes from node n
	var numKids = n.childNodes.length;
	for (i=0;i<numKids;i++) { n.removeChild(n.childNodes[0]); }
}		
function buildCalendar(m,y){
// -- requires: Basic Date Starter-Set, getNextMonth(), figureDOTW(), scramKids()
	m = parseFloat(m); y = parseFloat(y); 
	var dayNo = figureDOTW(m,1,y);
	var monthNo = getDaysOfMonth(m,y);
	var rowNum = Math.ceil((monthNo+dayNo)/7);
	var dayCount = 1;
	var calTB = document.getElementById('caltblbody');
	var calNav = document.getElementById('calnav');
	var numOfRows = 5;
	scramKids(calTB);
	//alert(monthNo + " " + dayNo);
	if ( (monthNo%7 + dayNo) > 7) { numOfRows = 6; }
	for (i=0; i<numOfRows; i++){ // row loop
		var calTR = document.createElement('tr');
		var calTDtext;
		var cellContent;
		for (j=0; j<7; j++){ // cells in row loop, days in the week
			var calTD = document.createElement('td');
			if (j == 0 || j == 6 ) { // weekends
				calTD.style.color = '#666666';
			}
			if ((i==0 && j < dayNo) || dayCount > monthNo) { // cells before the first of the month or after the last day
				cellContent = document.createElement('br');
			} else {
				var dyA = document.createElement('a');
				dyA.setAttribute('href','javascript:placeDate('+m+','+dayCount+','+y+')');
				calTDtext = document.createTextNode(dayCount.toString());
				cellContent = calTDtext;
				// Highlight today's date with red border
				if (dayCount == curr_dy && m == curr_mn && y == curr_yr) {
					calTD.style.fontWeight = 'bold';
					calTD.style.color = '#00ADEF';
				}
				// Highlight selected date with blue background
				if (dayCount == selectedD && m == selectedM && y == selectedY)
					calTD.style.backgroundColor = '#d6e7f7';
				// if the day is a weekday or weekends allowed
				if ((j!=0 && j!=6) || calWknd == true){ 
					if (dayCount == curr_dy && m == curr_mn && y == curr_yr && calSpan != 3 && calSpan != 0 && calSpan != 4){
						dyA.appendChild(calTDtext);
						cellContent = dyA;
					}
					if (calSpan == 1 || calSpan == 4){
						if (y < curr_yr || (m < curr_mn && y == curr_yr) || (m == curr_mn && y == curr_yr && dayCount < curr_dy)) {
							dyA.appendChild(calTDtext);
							cellContent = dyA;
						}
					} 
					if (calSpan == 2 || calSpan == 3){
						if (y > curr_yr || (m > curr_mn && y == curr_yr) || (m == curr_mn && y == curr_yr && dayCount > curr_dy)) {
							dyA.appendChild(calTDtext);
							cellContent = dyA;
						}
					}
					if (calSpan == 5){
						dyA.appendChild(calTDtext);
						cellContent = dyA;
					}
				}
				else { /* else if it's a weekend */ }
				dayCount++;
			}
			calTD.appendChild(cellContent);
			calTD.setAttribute('width','14%');
			calTR.appendChild(calTD);
		}
		calTB.appendChild(calTR);
	}
	var nMonth = getNextMonth(m,y,+1);
	var pMonth = getNextMonth(m,y,-1);
	document.getElementById('calnavPM').setAttribute("href", "javascript:buildCalendar("+pMonth[0]+","+pMonth[1]+")");
	document.getElementById('calnavMY').innerHTML = moty[m] +' '+y;
	document.getElementById('calnavNM').setAttribute("href", "javascript:buildCalendar("+nMonth[0]+","+nMonth[1]+")");
	document.getElementById('selecttoday').setAttribute("href", "javascript:placeDate("+curr_mn+","+curr_dy+","+curr_yr+")");
}

/* 		
		m, y = allow specification of original month and date
		f = associated field ID for a given date element/call
		dateSpan - date that should have links; does not include weekends
			0 = no dates
			1 = all past dates up to and including today
			2 = all future dates starting with today
			3 = all future dates NOT including today ( for GTC Dates )
			4 = all past dates NOT including today ( for start / from dates )
			5 = all dates
		wknd - whether or not to allow selection of weekend days
			true = yes, show them selectable/linked
			false = no, show them unselectable/linked
		format - the format of the date that is to be displayed
			0 = mmddyy
			1 = mmddyyyy
			2 = mm/dd/yyyy
			3 = mm/dd/yy
			4 = yyyymm
			5 = ddmmyy
			6 = dd/mm/yy
			7 = ddmmyyyy
			8 = dd/mm/yyyy
			9 = dd
			default = mmddyyyy
		evt - function currently unknown, some sort of targeting setting
		posType - allows you to move the cal pos relative to the element
			above = directly above the calbutton
			aboveright = above and right of the calbutton
			below = centered below calbutton
			belowright = below, left edge aligned with left edge of calbutton, kicks right
			belowleft = below right edge aligned with right edge of calbutton, kicks left
			top = centered atop calbutton (overlays button)
			topright = top, right edge aligned with right edge of calbutton, kicks right
			topleft = top left edge aligned with left edge of calbutton, kicks left
			default = below
*/

function showCal(m,y,f,dateSpan,wknd,format,evt,posType){
	calField = f; 
	calSpan = dateSpan; 
	calFormat = format; 
	calWknd = wknd;
	if (calField.value != "" && calField.value != format) {
		var arr = calField.value.split("/");
		selectedM = parseInt(arr[0])-1;
		selectedD = parseInt(arr[1]);
		selectedY = parseInt(arr[2]);
	}
	if (m == '' && y == ''){m = curr_mn; y = curr_yr;}
	buildCalendar(m,y);
	
	var targetObj = (evt.srcElement) ? evt.srcElement : evt.target;
	var o = getElementPosition(targetObj.id);
	alert(targetObj.id)
	var calObj = document.getElementById('cal');
	var topIncre, leftIncre;
	switch (posType) {
		case "above":
			topIncre = -140; leftIncre = -80; break;			
		case "aboveright":
			topIncre = -140; leftIncre = 5; break;
		case "below":
			topIncre = 16; leftIncre = -70; break;
		case "belowright":
			topIncre = 16; leftIncre = 0; break;
		case "belowleft":
			topIncre = 16; leftIncre = -122; break;
		case "top":
			topIncre = 0; leftIncre = -70; break;
		case "topright":
			topIncre = 0; leftIncre = 0; break;
		case "topleft":
			topIncre = 0; leftIncre = -122; break;
		default:		
			topIncre = 16; leftIncre = -70;
		}
	calObj.style.top = (o.top + topIncre) + "px";
	calObj.style.left = (o.left + leftIncre) + "px";
	calObj.style.display = "block";
	if (isIE) {
		calObjWdt = calObj.offsetWidth;
		calObjHgt = calObj.offsetHeight; // changed... were reversed
		for (i = 0; i < arrBadSelect.length; i++) {
			if (arrBadSelect[i].id) {
				var selObj = document.getElementById(arrBadSelect[i].id);
				}
			if (selObj) {
				var selObjIsOverlapped = isOverlapped(calObj, selObj, calObjWdt, calObjHgt);
				}
			if (selObj && selObjIsOverlapped) {
				selObj.style.visibility = "hidden";
				}
			}
		}
}

function hideCal() {
	document.getElementById('cal').style.display = 'none';
	if (isIE) {
		for (i = 0; i < arrBadSelect.length; i++) {
			if (arrBadSelect[i].id) {
				var selObj = document.getElementById(arrBadSelect[i].id);
				}
			if (selObj) {
				selObj.style.visibility = "visible";
				}
			}
		}
}

function placeDate(m,d,y){ 
	calField.value = getFormattedDate(m,d,y,calFormat);
	calField.style.color = "#333";
	if (document.getElementById('period')) {
		validateDates(calField.id);
		}
	hideCal();
}

function getFormattedDate(m,d,y,calFormat){
	var monLabel = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
	var mLabel = monLabel[m];
	d = d.toString();
	m = m+1; m = m.toString();
	y = y.toString(); 
	var sy = y;
// -- convert to 2 digit numbers	
	if (m.length == 1){m = '0'+ m;}
	if (d.length == 1){d = '0'+ d;}
	if (y.length == 4)
	 sy = y.substring(2,4);
	var format;
	switch (calFormat){
		case 0 : format = m + d + sy; break; 			//  mmddyy
		case 1 : format = m + d + y; break; 			//  mmddyyyy
		case 10 : format = m +'/'+ d +'/'+ y; break; 	//  mm/dd/yyyy
		case 3 : format = m +'/'+ d +'/'+ sy; break; 	//  mm/dd/yy
		case 4 : format = y + m; break; 				//  yyyymm
		case 5 : format = d + m + sy; break;			//  ddmmyy
		case 6 : format = d +'/'+ m +'/'+ sy; break; 	//  dd/mm/yy
		case 7 : format = d + m + y; break;				//  ddmmyyyy
		case 8 : format = d +'/'+ m +'/'+ y; break; 	//  dd/mm/yyyy
		case 9 : format = d; break;						//	dd
		case 2 : format = d + '-' + mLabel + '-' + sy; break; // dd-MMM-yy
		default: format = m + d + y; break; 			//  mmddyyyy
	}
	return format;
}

// detects overlapping with select elements
function isOverlapped(abPosObj, objBehind, abPosObjWidth, abPosObjHeight) {
	var abLeft = parseInt(abPosObj.style.left.replace(/px/g, ''));
	var abTop = parseInt(abPosObj.style.top.replace(/px/g, ''));
	var selLeft = getElementPosition(objBehind.id).left;
	var selTop = getElementPosition(objBehind.id).top;
	var selWidth = document.getElementById(objBehind.id).offsetWidth;
	var selHeight = document.getElementById(objBehind.id).offsetHeight;
	
	// discovers if the select starts within the menu
	if ((abLeft < selLeft) && ((abLeft + abPosObjWidth) > selLeft)) {
		if ((abTop < selTop) && ((abTop + abPosObjHeight) > selTop)) {
			return true;
			}
		}
	// discovers if the select overlaps the menu anywhere
	if ((abLeft > selLeft) && (abLeft < (selLeft + selWidth))) {
		if ((abTop < selTop) && ((abTop + abPosObjHeight) > selTop)) {
			return true;
			}
		if ((abTop > selTop) && (abTop < (selTop + selHeight))) {
			return true;
			}
		}
	else {
		return false;
		}
}

