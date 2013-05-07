<!-- Script to show the drop down menus in the header -->
<!-- number in l2Hover(#) is how many to show in the list -->
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

//document.onclick = closeAll;

function closeAll(e) {
	var l2s=getElementsByClassName(document, "l2");
	for (var i=0; i<l2s.length; i++) {
		if (l2s[i].isOpen) {
			closeDropdown(l2s[i]);
			previousPos=null;
		}
	}
}


iehover=function() {  
     var sfEls=document.getElementById("nav").getElementsByTagName("LI");  
     for (var i=0; i<sfEls.length; i++) {  
          sfEls[i].onmouseover=function() {  
               this.className+=" iehover";
          }  
          sfEls[i].onmouseout=function() {  
               this.className=this.className.replace(new RegExp(" iehover\\b"), "");  
          }  
     }  
}  
if (isIE6orBelow && window.attachEvent) window.attachEvent("onload", iehover);  


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


var numScroll=null, previousPos=null;
var subs;
var isOpenElsewhere=false, facetIsOpen=false, active=false, subLevelIsOpen=false;
var carry, num, menuI2Num, counter, d, u, t;
	
l2Hover = function(maxNumToShow) {
	var l2s=getElementsByClassName(document, "l2");	
	var l2Subs = getElementsByClassName(document, "l2_sub");
	if ((l2s[l2s.length-1].offsetTop > l2s[0].offsetTop) && (!isIE)) {
		var navChange = document.getElementById('nav');
		navChange.style.height = '56px';
		var nav_l2 = getElementsByClassName(document, 'nav_l2');
		nav_l2[0].style.marginBottom = '48px';
	}					
	t = null;
	active=false;
	
	for (var i=0; i<l2s.length; i++) {
		l2s[i].pos=i;
		//l2s[i].isOpen=false;		
		l2s[i].onmouseover=function() {
			//if (previousPos!=this.pos) {
				//for (var i=0; i<l2s.length; i++) {	
					//if (l2s[i].origClassName!=null){						
						//closeDropdown(l2s[i]);
						//alert(l2s[i].pos);		
					//}
				//}
				//document.getElementById('directexthere').innerHTML += window.pos + ' : ' + this.pos + '<br />';
				if (!active || (window.pos != this.pos)) {
				
					window.pos=this.pos;
					//document.getElementById('directexthere').innerHTML += window.pos + ' : ' + this.pos + '<br />';
					if (t != null) {
						//document.getElementById('directexthere').innerHTML += '1) ' + window.obj.className + ' : ';						
						//document.getElementById('directexthere').innerHTML += window.obj.className + '<br />';
						if (window.obj.className.match('shift') == 'shift') {
							window.obj.childNodes[2].style.left = '-999px';
						}
						window.obj.className = window.obj.origClassName;
						if (isIE) {
							window.obj.childNodes[2].style.left = '-999px';
						} 
						clearTimeout(t);
						t = null;
					}
					this.origClassName=this.className.replace(new RegExp(" iehover\\b"), "");
					//this.origClassName=this.origClassName.replace(new RegExp(" iehover\\b"), "");
					this.className+=" l2over sfhover";
					//document.getElementById('directexthere').innerHTML += '5) ' + this.className + ' : ' + window.obj.origClassName + '<br />';
					// move position slightly for IE
					window.objLeft=this.childNodes[2].style.left;
					if (isIE) {
  						// IE 7, IE 6, mozilla, safari, opera 9
						if (isIE6orBelow) {
							//this.childNodes[2].style.top = '18px';
						}
						this.childNodes[2].style.left=(this.offsetLeft + 50) + 'px';
					}
					
					var facetBar = getElementsByClassName(document, 'nav_l2');
					var lastItemLeftPos = facetBar[0].clientWidth - this.offsetLeft;
					
					if (lastItemLeftPos <= 263) {
						if (isIE) {
							this.childNodes[2].style.left = (this.offsetLeft - this.childNodes[2].clientWidth + this.clientWidth + 61) +  'px';
						} else {
							this.className+=" shift";
							this.childNodes[2].style.left = (this.offsetLeft - this.childNodes[2].clientWidth + this.clientWidth + 10) +  'px';
						}
					}
					
					
					if (isIE6orBelow) {						
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
								//alert(targUlElem.innerHTML)
							}
							else {
								nextTag.style.width = targUlElem.offsetWidth + "px";
								nextTag.style.height = targUlElem.offsetHeight + "px";
							}
						}
					}
					
					//show only 10 if longer showDefault();
					subs=this.getElementsByTagName("li");
					subsInnerHTML=new Array();
					window.maxNumToShow=maxNumToShow;
					var counter=0;
					for (var i=0; i<subs.length-2; i++) {
						if (subs[i].className == 'menuItem') {
							if (isIE) {
								subs[i].style.display='inline';
							} 
							if (counter>=window.maxNumToShow) {
								subs[i].style.display='none';
							}
							subsInnerHTML.push(subs[i].innerHTML);
							numScroll=0;
							counter++;
						}
					}
					//alert(subsInnerHTML)
					//previousPos=this.pos;
					active=true;
					//this.isOpen=true;
					
					// Prevents events from bubbling to the document
					//if (!e) var e=window.event;
						//e.cancelBubble=true;
					//if (e.stopPropagation) e.stopPropagation();
					
				}
			//} 
			/*else {			
				Prevents events from bubbling to the document
				if (!e) var e=window.event;
					e.cancelBubble=true;
				if (e.stopPropagation) e.stopPropagation();	
				
				if (!facetIsOpen) {
					closeDropdown(this);
					alert(this.pos);
				} 
				if (subLevelIsOpen) {
					closeDropdown(this);
					alert(this.pos);
				}				
			}	*/
		}
		l2s[i].onmouseout=function() {
			window.obj = this;			
			clearTimeout(t);
			t=setTimeout("closeDropdown()",0);
		}
	}	
	for (var i=0; i<l2Subs.length; i++) {
		l2Subs[i].onmouseover=function() {
			clearTimeout(t);
		}
		l2Subs[i].onmouseout=function() {
		}
	}
}


closeDropdown = function() {
	//window.obj = currentId;
	//previousPos=null;	
	//document.getElementById('directexthere').innerHTML += '3) ' + parent.obj.className + '<br />';	
		if (isIE) {					
			window.obj.childNodes[2].style.left = '-999px';
			window.obj.className = window.obj.origClassName;
			handleChildren(carry, num);
			var sel = document.getElementsByTagName('select');
			for (var s=0; s<sel.length; s++) {
				if (sel[s].style.visibility=='hidden') {
					sel[s].style.visibility='visible';
				}
			}
		} else {
			if (window.obj.className.match('shift') == 'shift') {
				window.obj.childNodes[2].style.left = '-999px';
			}
			window.obj.className = window.obj.origClassName;
			//document.getElementById('directexthere').innerHTML += '2) ' + window.obj.className + '<br />';
			handleChildren(carry, num);
		}
	
	//parent.obj.isOpen=false;
	active=false;
	numScroll = 0;
	//clearTimeout(d); clearTimeout(u);
	facetIsOpen=false;
	//subLevelIsOpen=false;
	
	if (counter < window.maxNumToShow) {
		subs[subs.length-2].childNodes[0].className = "noscrollleft";
		subs[subs.length-2].childNodes[0].setAttribute("onmouseover", "");
		subs[subs.length-2].childNodes[0].setAttribute("onmouseout", "");
		subs[subs.length-2].childNodes[1].className = "noscrollright";
		subs[subs.length-2].childNodes[1].setAttribute("onmouseover","");
		subs[subs.length-2].childNodes[1].setAttribute("onmouseout","");
	}	
}


scrollDown = function(b) {
	if (b) {
		d=setTimeout("scrollDownOne()",100);	
		
	} else {
		clearTimeout(d);
		
	}
}


scrollUp = function(b) {
	if (b) {
		u=setTimeout("scrollUpOne()",100);
		
	} else {
		clearTimeout(u);
		
	}
}


scrollUpOne = function() {
	if (numScroll >= 0) {
		var j=0;
		for (var i=0; i<subs.length-2; i++) {
			if (subs[i].innerHTML == subsInnerHTML[j+numScroll]) {
				if (j < 1)  {		
					(isIE) ? subs[i].style.display="inline" : subs[i].style.display="block";
				}					
				if ((j+numScroll) == (window.maxNumToShow+numScroll)) {
					subs[i].style.display="none";
				}
				j++;
			}
		}
		numScroll--;
		u=setTimeout("scrollUpOne()",100);
		//document.getElementById('directexthere').innerHTML += '4: ' + window.obj.className + '<br />';
	}
}

scrollDownOne = function() {
	if (numScroll < (subsInnerHTML.length - window.maxNumToShow)) {
		var j=0;
		for (var i=0; i < subs.length-2; i++) {
			//alert(i)
			if (subs[i].innerHTML == subsInnerHTML[j+numScroll]) {
				if (j < 1)  {
					subs[i].style.display="none";
					//alert(subs[i].innerHTML + " : " + numScroll + " : " + j);
				}
				if ((j+numScroll) == (window.maxNumToShow+numScroll)) {
					(isIE) ? subs[i].style.display="inline" : subs[i].style.display="block";
					//alert(subs[i].innerHTML + " : " + (j+numScroll) + " : " + (window.maxNumToShow+numScroll));
				}
				j++;
			}
		}
		numScroll++;
		d=setTimeout("scrollDownOne()",100);
		//document.getElementById('directexthere').innerHTML += '3: ' + window.obj.className + '<br />';
	}
}

handleChildren = function(id, position) {
	// Checks to see if id is legit
	if ((id != null) && (id.parentNode != null)) {		
		carry=id;
		
		//	If the dropdown is still open
		if (active) {		
			
			// Checks to see if a dropdown is open elsewhere
			if (!isOpenElsewhere) {
				
				if (id.className=='') {

					// Retrieves the total number of sub-submenu items
					menuI2Num=0;
					g=position+1;
					while (subs[g].className=='menuI2') {
						g++;
						menuI2Num++; //increments sub-submenu item totals
					}

					if (menuI2Num>0) {
						facetIsOpen=true;
						// Creates the record of sublevels and sub-sublevels in subFacetsLevels and subFacetsClass
							subsInnerHTML = new Array();
							orig=1;
							counter=0;
							subs[position].childNodes[0].className='itemOn';
							for (var q=0; q<position+1; q++) {
								if (subs[q].className.match('menuItem')=='menuItem') {
									subsInnerHTML.push(subs[q].innerHTML);
									if (subs[q].style.display!="none") {
										counter++;
									}
								}
							}
							//alert(subsInnerHTML)
							loc=position + 1;
							for (var p=0; p<menuI2Num; p++) {
								if (counter < window.maxNumToShow) {
									(isIE) ? subs[loc].style.display="inline" : subs[loc].style.display="block";
									loc++;
									counter++;
								}
								subsInnerHTML.push(subs[position + orig].innerHTML);
								orig++;
							}
							
							for (var i=position + orig; i<subs.length - 1; i++) {
								if (subs[i].className.match('menuItem')=='menuItem'){
									if (counter >= window.maxNumToShow) {
										subs[i].style.display='none';
									}
									counter++;
									subsInnerHTML.push(subs[i].innerHTML);
								}
							}
							
							if ((counter > window.maxNumToShow) && (isIE)) {
								subs[subs.length-2].childNodes[0].className="up";
								subs[subs.length-2].childNodes[1].className="down";
								
								subs[subs.length-2].childNodes[0].onmouseover = function() {
									scrollUp(1); this.className='upOver';
								}										
								subs[subs.length-2].childNodes[0].onmouseout = function() {
									scrollUp(0); this.className='up'
								}
								subs[subs.length-2].childNodes[1].onmouseover = function() {
									scrollDown(1); this.className='downOver';
								}
								subs[subs.length-2].childNodes[1].onmouseout = function() {
									scrollDown(0); this.className='down';
								}
						   } else if (counter > window.maxNumToShow) {
								subs[subs.length-2].childNodes[0].className="up";
								subs[subs.length-2].childNodes[0].setAttribute("onmouseover", "scrollUp(1); this.className='upOver'");
								subs[subs.length-2].childNodes[0].setAttribute("onmouseout", "scrollUp(0); this.className='up'");
								subs[subs.length-2].childNodes[1].className="down";
								subs[subs.length-2].childNodes[1].setAttribute("onmouseover","scrollDown(1); this.className='downOver'");
								subs[subs.length-2].childNodes[1].setAttribute("onmouseout","scrollDown(0); this.className='down'");
							}
						
						isOpenElsewhere=true;
						prevId=carry;
						num=position;
					} else {						
						window.obj = id.parentNode.parentNode.parentNode;
						closeDropdown();
						//alert(id.parentNode.parentNode.parentNode.pos);
					}							
				} else {			
					this.IsOpen = false;
					sublevelReset(id);					
				}
			} else {
				this.IsOpen = false;
				sublevelReset(id);
				
				if (position != num) {
					handleChildren(id, position);
				}
			}
		} else {
			this.IsOpen = false;
			sublevelReset(id);
		}	
	} else {
		//sublevelReset(id);
	} 
}

sublevelReset = function(id) {
	for (var i=0; i<subs.length-2; i++) {		
		subs[i].childNodes[0].className='';
	}
	subsInnerHTML = new Array();
	var counter=0;
	for (var i=0; i<subs.length-2; i++) {
		if ((subs[i].className.match('menuItem')=='menuItem') && (counter < window.maxNumToShow)){
			(isIE) ? subs[i].style.display="inline" : subs[i].style.display="block";
			counter++;
		} else {
			subs[i].style.display = "none";
		}
		if (subs[i].className.match('menuItem')=='menuItem') {
			subsInnerHTML.push(subs[i].innerHTML);
		}
		
	}
	isOpenElsewhere=false;
	numScroll=0;
	if (counter < window.maxNumToShow) {
		subs[subs.length-2].childNodes[0].className = "noscrollleft";
		subs[subs.length-2].childNodes[0].setAttribute("onmouseover", "");
		subs[subs.length-2].childNodes[0].setAttribute("onmouseout", "");
		subs[subs.length-2].childNodes[1].className = "noscrollright";
		subs[subs.length-2].childNodes[1].setAttribute("onmouseover","");
		subs[subs.length-2].childNodes[1].setAttribute("onmouseout","");
	}
}

