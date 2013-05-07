
var a = navigator.userAgent.toLowerCase();
var iePos  = a.indexOf('msie');
if (iePos !=-1) {
	is_minor = parseFloat(a.substring(iePos+5,a.indexOf(';',iePos)))
	is_major = parseInt(is_minor);
}
var safari = a.indexOf('safari');
var isIE = (a.indexOf("msie") > 0) ? true : false;
var isIE6orBelow = (a.indexOf("msie") > 0 && is_major < 7) ? true : false;
var isIE7 = (a.indexOf("msie") > 0 && is_major >= 7) ? true : false;
var isSafari = (safari > 0) ? true : false;

function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
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

function getNextSibling(startBrother) {
	endBrother=startBrother.nextSibling;
	while(endBrother.nodeType!=1){
   		endBrother = endBrother.nextSibling;
  	}
  	return endBrother;
}

function showElement (id, classWord) {
	if (document.getElementById(id).className.match(classWord) == classWord) {
		document.getElementById(id).className = document.getElementById(id).className.substr(0,document.getElementById(id).className.search(classWord));
	}
}

function hideElement (id, classWord) {
	document.getElementById(id).className = document.getElementById(id).className + " " + classWord;
}

function hideElement2 (id) {
	document.getElementById(id).style.display = "none";
}

function toggleElement (id, classWord) {
	if (document.getElementById(id).className.match(classWord) == classWord) {
		document.getElementById(id).className = document.getElementById(id).className.substr(0,document.getElementById(id).className.search(classWord));
	} else {		
		document.getElementById(id).className = document.getElementById(id).className + " " + classWord;
	}
}


function hideshowElement (currentId, newId, classWord) {
	if (currentId.style.display != "none") {
		currentId.style.display = "none";
	} else {
		currentId.style.display = "block";
	}	
	toggleElement(newId, classWord);
}

function accountLogin() {	
	getElementsByClassName(document, 'content')[0].className = 'content hide';	
	getElementsByClassName(document, 'content hide')[1].className = 'content';
	getElementsByClassName(document, 'nav')[0].style.display = "none";
	getElementsByClassName(document, 'nav')[1].style.display = "block";
	getElementsByClassName(document, 'tabs1')[0].style.display = "none";
	getElementsByClassName(document, 'tabs2')[0].style.display = "block";
	document.getElementById('savedtrips').style.display = "block";
	if (document.getElementById('citizen') != null) {
		document.getElementById('citizen').style.display = "none";
	}
	var temp = document.getElementById('name').childNodes;
	for (var i=0; i<temp.length; i++) {
		if ((temp[i].nodeType!=3)&&(temp[i].nodeType!=8)) {
			if (temp[i].className == "row hide") {
				temp[i].className = "row";
			} else if (temp[i].className == "row") {
				temp[i].className = "row hide";
			}
		}
	}
	changeHeight('component', 'body');
	//alert(document.getElementById('name').childNodes[1].className);
	
}

function accountLogOut() {
	getElementsByClassName(document, 'content')[1].className = 'content hide';
	getElementsByClassName(document, 'content hide')[0].className = 'content';
	getElementsByClassName(document, 'nav')[0].style.display = "block";
	getElementsByClassName(document, 'nav')[1].style.display = "none";
	getElementsByClassName(document, 'tabs1')[0].style.display = "block";
	getElementsByClassName(document, 'tabs2')[0].style.display = "none";
	document.getElementById('savedtrips').style.display = "none";
	if (document.getElementById('citizen') != null) {
		document.getElementById('citizen').style.display = "block";
	}
	var temp = document.getElementById('name').childNodes;
	for (var i=0; i<temp.length; i++) {
		if ((temp[i].nodeType!=3)&&(temp[i].nodeType!=8)) {
			if (temp[i].className == "row") {
				temp[i].className = "row hide";
			} else if (temp[i].className == "row hide") {
				temp[i].className = "row";
			}
		}
	}
}

function checkCheckbox () {
	document.getElementById('checkboxCountry').checked = true;
	document.getElementById('resident').checked = true;
	var id, j=0;
	id = getNextSibling(document.getElementById('switchBar').childNodes[0]);
	if (isIE) {
		id = document.getElementById('switchBar').childNodes[0];
	}
	id = id.childNodes;
	for (var i=0; i < id.length; i++) {
		if ((id[i].onclick != "") && (id[i].onclick != null)) {
			onclickSave[j] = id[i].onclick;
			j++;			
			if (isIE || isSafari) {
				id[i].setAttribute("onclick","return false;");
			}
			else id[i].onclick = "return false;";
		}
	}
}



function openWindow(filename, w, h) {
	window.open(filename, 'airport', 'height=' + h + ', width=' + w + ', resizable=no, toolbar=no, location=no, status=no, menubar=no, scrollbars=yes');
}


function findCity(id, listing, city) {
	if (id.value.toUpperCase() == city.toUpperCase()) {
		document.getElementById(listing).style.top = findPosTop(id) - 81 + "px";
		document.getElementById(listing).style.left = findPosLeft(id) - 20 + "px";
		document.getElementById(listing).style.display = "block";
		getElementsByClassName(document, 'tablelisting')[0].style.display = "inline";
	}
	
}

function insertLoc(id, pickup, listing) {
	document.getElementById(pickup).value = id.innerHTML;
	document.getElementById(listing).style.display = "none";
}

function domRollover() {
	if (navigator.userAgent.match(/Opera (\S+)/)) {
		var operaVersion = parseInt(navigator.userAgent.match(/Opera (\S+)/)[1]);
	}
	if (!document.getElementById||operaVersion <7) return;
	var imgarr=document.getElementsByTagName('img');
	var imgPreload=new Array();
	var imgSrc=new Array();
	var imgClass=new Array();
	for (i=0;i<imgarr.length;i++){
		if (imgarr[i].className.indexOf('domroll')!=-1){
			imgSrc[i]=imgarr[i].getAttribute('src');
			imgClass[i]=imgarr[i].className;
			imgPreload[i]=new Image();
			if (imgClass[i].match(/domroll (\S+)/)) {
				imgPreload[i].src = imgClass[i].match(/domroll (\S+)/)[1]
			}
			imgarr[i].setAttribute('xsrc', imgSrc[i]);
			imgarr[i].onmouseover=function(){
				this.setAttribute('src',this.className.match(/domroll (\S+)/)[1])
			}
			imgarr[i].onmouseout=function(){
				this.setAttribute('src',this.getAttribute('xsrc'))
			}
		}
	}
}

sfHover = function() {
	var k;
	for (k = 0; k < getElementsByClassName(document, 'navigation').length; k++){
		var hasMenu = getElementsByClassName(document, 'navigation')[k];
		var liElems = (hasMenu) ? getElementsByClassName(document, 'navigation')[k].getElementsByTagName('li') : null;
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
							ulMat.src = "javascript:void(0)";
							targUlElem.style.zIndex = "0";
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
}

if (window.attachEvent) window.attachEvent('onload', sfHover);


function startup() {
	checkCheckbox(); 
	domRollover(); 
}

if (window.addEventListener) window.addEventListener('load', startup, true);
if (window.attachEvent) window.attachEvent('onload', startup);
