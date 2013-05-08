$(document).ready(function() {
	$("a").click(function(event) {		
		$("li").each(function() {
			if ($(this).hasClass("colorOn")) {
				//alert($(this).hasClass("colorOn").toString());
				$(this).removeClass();
			}
		});
		$(this).parent().addClass("colorOn");	
	});
});

sfHover=function(){var hasMenu=document.getElementById('sfHover');var liElems=(hasMenu)?document.getElementById('sfHover').getElementsByTagName('li'):null;if(liElems){for(var i=0;i<liElems.length;i++){if(liElems[i]){liElems[i].onmouseover=function(){this.className+=" sfhover";var ulElem=this.getElementsByTagName('ul');for(var j=0;j<ulElem.length;j++){var targUlElem=ulElem[j];var nextTag=targUlElem.firstChild;if(nextTag.nodeName!='IFRAME'){var ulMat=document.createElement('iframe');ulMat.style.width=targUlElem.offsetWidth+"px";ulMat.style.height=targUlElem.offsetHeight+"px";targUlElem.insertBefore(ulMat,targUlElem.firstChild);targUlElem.style.zIndex="99";}else{nextTag.style.width=targUlElem.offsetWidth+"px";nextTag.style.height=targUlElem.offsetHeight+"px";}}}}liElems[i].onmouseout=function(){this.className=this.className.replace(' sfhover','');}}}}
if(window.attachEvent)window.attachEvent('onload',sfHover);