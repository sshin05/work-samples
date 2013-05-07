var a = navigator.userAgent.toLowerCase();
var iePos  = a.indexOf('msie');
if (iePos !=-1) {
	is_minor = parseFloat(a.substring(iePos+5,a.indexOf(';',iePos)))
	is_major = parseInt(is_minor);
}
var isIE = (a.indexOf("msie") > 0) ? true : false;
var isIE6orBelow = (a.indexOf("msie") > 0 && is_major < 7) ? true : false;
var isIE7 = (a.indexOf("msie") > 0 && is_major >= 7) ? true : false;

function getElementsByClassName(node, classname)
{
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

<!-- Script to show the drop down menus in the header -->
<!-- number in l2Hover(#) is how many to show in the list -->
numScroll = null;
t=null
l2Hover = function(maxNumToShow) {
	var l2s = getElementsByClassName(document, "l2");
	var l2Subs = getElementsByClassName(document, "l2_sub");
	// detection to handle IE differences
	var browserName=navigator.appName; 
	var browserVer=parseInt(navigator.appVersion); 
	//
	t=null;
	active=false;
	for (var i=0; i<l2s.length; i++) {
		l2s[i].pos = i;
		l2s[i].onmouseover=function() {
			//document.getElementById('directexthere').innerHTML += window.pos + ' : ' + this.pos + '<br />';
			if (!active || (window.pos != this.pos)) {
				window.pos = this.pos;
				//document.getElementById('directexthere').innerHTML += window.pos + ' : ' + this.pos + '<br />';
				if (t != null) {
					resetInnerHTML();
					window.obj.className = window.obj.origClassName;
					if (browserName=="Microsoft Internet Explorer")
					{
						window.obj.childNodes[2].style.left = '-999px';
					} 
					clearTimeout(t);
					t = null;
				}
				this.origClassName = this.className				
				this.className+=" sfhover";
				//document.getElementById('directexthere').innerHTML += '5) ' + this.className + '<br />';
				// move position slightly for IE
				window.objLeft = this.childNodes[2].style.left;
				if (browserName=="Microsoft Internet Explorer")
				{		
					if (typeof document.body.style.maxHeight != "undefined") {
  						// IE 7, mozilla, safari, opera 9
						this.childNodes[2].style.top = '18px';
						this.childNodes[2].style.left = (this.offsetLeft+50);
					} else {
  						// IE6, older browsers
						this.childNodes[2].style.left = (this.offsetLeft+50);
					}	
				}
				//show only 10 if longer showDefault();
				subs = getElementsByClassName(this, "menuItem");				
				subsInnerHTML = new Array();
				window.maxNumToShow = maxNumToShow;
				
				for (var i=0; i<subs.length; i++) {
					if (i >= maxNumToShow) {
						subs[i].style.visibility='hidden';
						subs[i].style.display='none';
					}
					subsInnerHTML.push(subs[i].innerHTML);
					numScroll = 0;
				}
				active = true;
			}
		}
		l2s[i].onmouseout=function() {
			window.obj = this;
			if (browserName=="Microsoft Internet Explorer")
			{
				clearTimeout(t);
				t=setTimeout("parent.obj.childNodes[2].style.left = -999; active=false; resetInnerHTML();",0);
			} else {			
				t=setTimeout("parent.obj.className = parent.obj.origClassName; active=false; resetInnerHTML();",0);
				//document.getElementById('directexthere').innerHTML += '1: ' + t + '<br />';				
			}
		}
	}
	for (var i=0; i<l2Subs.length; i++) {
		l2Subs[i].onmouseover=function() {
			clearTimeout(t);
			//document.getElementById('directexthere').innerHTML += '2: ' + t + '<br />';
		}
		l2Subs[i].onmouseout=function() {
		}
	}
}
scrollDown = function(b) {
	if (b) {
		d=setTimeout("scrollDownOne()",50);
	} else {
		clearTimeout(d);
	}
}
scrollUp = function(b) {
	if (b) {
		u=setTimeout("scrollUpOne()",50);
	} else {
		clearTimeout(u);
	}
}
scrollUpOne = function() {
	if ((numScroll) > 0) {
		for (var i=0; i<window.maxNumToShow; i++) {
			subs[i].innerHTML = subsInnerHTML[i+(numScroll-1)];
		}
		numScroll--;
		u=setTimeout("scrollUpOne()",50);
	}

}
scrollDownOne = function() {
	if ((numScroll) < (subs.length - window.maxNumToShow)) {
		for (var i=0; i<window.maxNumToShow; i++) {
			subs[i].innerHTML = subsInnerHTML[i+(numScroll+1)];
		}
		numScroll++;
		d=setTimeout("scrollDownOne()",50);
	}
}
resetInnerHTML = function() {
	if (numScroll > 0) {
		for (var i=0; i<window.maxNumToShow; i++) {
			subs[i].innerHTML = subsInnerHTML[i];
		}
		numScroll = 0;
	}
}