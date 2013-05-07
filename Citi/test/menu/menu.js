// Last change July 14 2003
// Developed by ddmenu@inbox.ru


// Don't change these parameters
var delay        = 200; /////
var menuElement  = new Array ();
var usedWidth    = 0;
var numOfMenus   = 0;
/// ----------------------------

// check browser version
isNC    = (document.layers) ? 1 : 0;
isOPERA = (navigator.userAgent.indexOf('Opera') >= 0)? true : false;
isIE    = (document.all && !isOPERA)? true : false;
isDOM   = (document.getElementById && !isIE && !isOPERA)? true : false;

var topID  = -1;

// constructor of menu elements
function menuConstructor (id, content)
{
	this.ID            = id;
	this.parentID      = content [0]*1;
	this.parentItemID  = content [1]*1;
	this.width         = content [2]*1;
	this.timerID       = -1;
	this.isOn          = false;
	this.item          = new Array ();
	this.currItemID    = -1;
	
	this.x = content [3]*1;
	
	if (this.x < 0 && this.parentID == -1)
	{
		this.x = initX + usedWidth;
		usedWidth = usedWidth + this.width;
	}
	else if (this.x < 0 && this.parentID > -1)
	{
		this.x =  menuElement [this.parentID].x
			      + menuElement [this.parentID].width
			      - xOverlap;
	}
	
	this.y = content [4]*1;
	if (this.y < 0 && this.parentID == -1)
		this.y = initY;
	else if (this.y < 0 && this.parentID > -1)
		this.y =  menuElement [this.parentID].y
	 		      + itemHeight*this.parentItemID
			      + yOverlap;
	
	items = content [5];

	layerBody = '<table width=' + this.width + ' cellpadding=3 cellspacing=' + borderSize + ' border=0>';
	
	
	count = 0;
	for (j = 0; j <= items.length - 2; j = j + 2)
	{
		controlBlock = ' onMouseOver = "enterItem (' + this.ID + ', ' + ((j + 2)/2 - 1) + ');" onMouseOut = "exitItem (' + this.ID + ', ' + ((j + 2)/2 - 1) + ');" ';
		layerBody += '<td id=Td' + this.ID + count + ' height=' + itemHeight + ' width=' + this.width + ' style="background: ' + backColor + ';" ' + backColor + '><a class=subMenu href='+ items [j + 1] +' ' + controlBlock + '>' + items [j] + '</a></td>';
		if (j < items.length - 3)
			layerBody = layerBody +  '<tr>\n';
		else
			layerBody = layerBody + '\n';
		count++;
		imgLocator = '';
	}

	if (!isNC)
		layerHeader = '<div id=Menu' + this.ID +
				   	   ' onMouseOver="enterMenu (' + this.ID + ');" onMouseOut = "exitMenu (' + this.ID + ');"' +
		    	       ' style="background: ; width: ' + this.width + '; visibility: hidden; position: absolute; left: ' + this.x +
		        	   '; top: ' + this.y + ';">';
	else
		layerHeader = '<layer id=Menu' + this.ID +
					   ' onMouseOver="enterMenu (' + this.ID + ');" onMouseOut = "exitMenu (' + this.ID + ');"' +
					   ' visibility=hide left=' + this.x +
					   ' top =' + this.y + '>';

	layerHeader += '<table width=' + this.width + ' cellpadding=0 cellspacing=0 border=0>' +
				    '<td bgcolor=' + borderColor + '>';

	layerFooter = '</table></td></table>';

	if (!isNC)
		layerFooter = layerFooter + '</div>';
	else
		layerFooter = layerFooter + '</layer>';

	document.writeln (layerHeader + layerBody + layerFooter);


	return this;
}
function enterTopItem (ID)
{
	document.all['TD' + ID].style.background = activeBackColor;
	
	if (topID != ID && topID != -1)
		hideTree (topID);
	releaseTree (ID);
	topID = ID;
	show (ID);
}
function exitTopItem (ID)
{
	document.all['TD' + ID].style.background = backColor;
	menuElement [ID].timerID = setTimeout ('hide (' + ID + ')', delay);
}

function enterItem (menuID, itemID)
{
	document.all['Td' + menuID + itemID].style.background = activeBackColor;	
	
	var currItemID = menuElement [menuID].currItemID;

	if (currItemID != i & currItemID > -1)	
		hide (currItemID);
	

	for (var i = 0; i < numOfMenus; i++)
	{
		if (menuElement [i].parentID == menuID &&
		    menuElement [i].parentItemID == itemID)
		{
			clearTimeout (menuElement [i].timerID);
			menuElement [i].timerID = -1;
			show (i);
			return 0;
		}
	}

	return -1;
}

function exitItem (menuID, itemID)
{
	document.all['Td' + menuID + itemID].style.background = backColor;
	for (var i = 0; i < numOfMenus; i++)
	{
		if (menuElement [i].parentID == menuID &&
		    menuElement [i].parentItemID == itemID)
		{
			menuElement [i].timerID = setTimeout ('hide (' + i + ')', delay);
			return 0;
		}
	}
}
function enterMenu (ID)
{
	var parentID = menuElement [ID].parentID;
	if (parentID == -1)
	{
		clearTimeout (menuElement [ID].timerID);
		menuElement [ID].timerID = -1;
	}
	else
		releaseTree (ID);
}
function exitMenu (ID)
{
	timeoutTree (ID);
}
function hideTree (ID)
{
	hide (ID);
	for (var j = 0; j < numOfMenus; j++)
	{
		if (menuElement [j].parentID == ID &&
			menuElement [j].isOn)
		{
			hideTree (j);
			return 0;
		}
	}
}
function releaseTree (ID)
{
	clearTimeout (menuElement [ID].timerID);
	menuElement [ID].timerID = -1;

	var parentID = menuElement [ID].parentID;
	if (parentID > -1)
		releaseTree (parentID);
}
function timeoutTree (ID)
{
	menuElement [ID].timerID = setTimeout ('hide (' + ID + ')', delay);
	var parentID = menuElement [ID].parentID;
	if (parentID > -1)
		timeoutTree (parentID);
}

function show (ID)
{
	if (isDOM) 
		document.getElementById('Menu' + ID).style.visibility = "visible";
    	else if (isIE) 
		document.all['Menu' + ID].style.visibility = "visible";
      	else if (isNC) 
		document.layers[ID].visibility = "show";		

	menuElement [ID].isOn = true;

	if (menuElement [ID].parentID > -1)
		menuElement [menuElement [ID].parentID].currItemID = ID;
}

function hide (ID)
{
	if (isDOM) 
		document.getElementById('Menu' + ID).style.visibility = "hidden";
    	else if (isIE) 
		document.all['Menu' + ID].style.visibility = "hidden";
      	else if (isNC) 
		document.layers[ID].visibility = "hide";

	menuElement [ID].isOn = false;

	if (menuElement [ID].parentID > -1)
		menuElement [menuElement [ID].parentID].currItemID = -1;
}

function createMenuTree ()
{
	for (var i = 0; i < menuContent.length; i++)
	{
		menuElement [i] = new menuConstructor (i, menuContent [i]);
		numOfMenus++;
	}
}

createMenuTree ();
