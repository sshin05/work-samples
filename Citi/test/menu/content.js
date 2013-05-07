// Last change July 14 2003
// Developed by ddmenu@inbox.ru


// constants

// x-coordinate of top left corner of dropdown menu 
var initX             = 100; 

// y-coordinate of top left corner of dropdown menu 
var initY             = 25; 

// the background color of dropdown menu (set empty '' for transparent)
var backColor         = '#778899'; 

// the background color of selected menu items, set empty '' for transparent
var activeBackColor   = '#B0C4DE'; 

// the color of dropdown menu border
var borderColor = 'white'; 

// the width of menu border
var borderSize  = '1'; 

// height of menu itesm
var itemHeight  = 20;

// overlapping between 
var xOverlap    = 5;
var yOverlap    = 10;

// end of constants


menuContent     = new Array ();

menuContent [0] = new Array ( 
-1, 
-1, 
120, // the width of current menu list 
-1, // x coordinate (absolute) of left corner of this menu list, -1 if the coordinate is defined from parent x-coordinate
-1, // y coordinate (absolute) of left corner of this menu list, -1 if the coordinate is defined from parent y-coordinate
new Array (
'Item 11', 'http://www.11.net',
'Item 12', 'http://www.12.net',
'Item 13', 'http://www.13.net'
));

menuContent [1] = new Array ( 
-1, 
-1,
120, // the width of current menu list 
-1, // x coordinate (absolute) of left corner of this menu list, -1 if the coordinate is defined from parent x-coordinate
-1, // y coordinate (absolute) of left corner of this menu list, -1 if the coordinate is defined from parent y-coordinate
new Array (
'Item 21', 'http://www.21.net', 
'Item 22', 'http://www.22.net', 
'Item 23', 'http://www.23.net'
));

menuContent [2] = new Array ( 
-1, 
1,
120, // the width of current menu list 
-1, // x coordinate (absolute) of left corner of this menu list, -1 if the coordinate is defined from parent x-coordinate
-1, // y coordinate (absolute) of left corner of this menu list, -1 if the coordinate is defined from parent y-coordinate
new Array (
'Item 31', 'http://www.31.net', 
'Item 32', 'http://www.32.net', 
'Item 33', 'http://www.33.net'
));


