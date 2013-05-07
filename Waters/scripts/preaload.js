// JavaScript Document
<!--
var myimages=new Array()
function preloadimages(){
for (i=0;i<preloadimages.arguments.length;i++){
myimages[i]=new Image()
myimages[i].src=preloadimages.arguments[i]
}
}
preloadimages("../images/green/ul_bg.gif","../images/purple/ul_bg.gif","../images/turquoise/ul_bg.gif","../images/orange/ul-bg.gif");
//-->