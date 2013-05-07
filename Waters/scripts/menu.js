startitup = function() {	
	mainmenu = new Array('Item 1','Item 2','Item 3','Item 4','Item 5');
	dropdown1 = new Array('Item 1','Item 2','Item 3','Item 4','Item 5');
	var ul, li, a, txt, menu;
	menu = document.getElementById('menu');
	ul = document.createElement('ul');
	for (var i = 0; i < mainmenu.length; i++) {
		li = document.createElement('li');
		txt = document.createTextNode(mainmenu[i]);
		li.appendChild(txt);
		ul.appendChild(li);
	}	
	
	menu.appendChild(ul);
}