currentTab = 1;
function changeTabs(showID, maxTabs) {
	for (var x=1; x<= maxTabs; x++) {
		if (showID == ("Tab"+x)) {
			currentTab = x;
			document.getElementById('Index'+x).style.visibility = 'visible';
			document.getElementById('Index'+x).style.display = 'block';
			document.getElementById(showID).className = 'tabProductMiddle';
			document.getElementById(showID+'_L').className = 'td tabProductLeftActive';
			document.getElementById(showID+'_R').className = 'td tabProductRightActive';
			document.getElementById(showID+'_F').className = 'curr';
		} else if (document.getElementById('Tab'+x) != null) {
			document.getElementById('Index'+x).style.display='none';
			document.getElementById('Index'+x).style.visibility ='hidden';
			document.getElementById('Tab'+x).className = 'tabProductMiddle2';
			document.getElementById('Tab'+x+'_L').className = 'td tabProductLeft';
			document.getElementById('Tab'+x+'_R').className = 'td tabProductRight';
			document.getElementById('Tab'+x+'_F').className = '';
		}
	}
}
function highlightTab(showID, highlight) {
	if (showID != ("Tab"+currentTab)) {
		if (highlight) {
			document.getElementById(showID).className = 'tabProductMiddle';
			document.getElementById(showID+'_L').className = 'td tabProductLeftActive';
			document.getElementById(showID+'_R').className = 'td tabProductRightActive';
			document.getElementById(showID+'_F').className = 'curr';
		} else {
			document.getElementById(showID).className = 'tabProductMiddle2';
			document.getElementById(showID+'_L').className = 'td tabProductLeft';
			document.getElementById(showID+'_R').className = 'td tabProductRight';
			document.getElementById(showID+'_F').className = '';
		}
	} 
}
