currentTab = 1;
function changeTabs(showID, maxTabs) {
	for (var x=1; x<= maxTabs; x++) {
		if (showID == ("Tab"+x)) {
			currentTab = x;
			document.getElementById('Index'+x).style.visibility = 'visible';
			document.getElementById('Index'+x).style.display = 'block';
			document.getElementById(showID).className = 'tabMiddle';
			document.getElementById(showID+'_L').innerHTML = "<img src='images/tab_lt_active.jpg' alt=' ' />";
			document.getElementById(showID+'_R').innerHTML = "<img src='images/tab_rt_active.jpg' alt=' ' />";
			document.getElementById(showID+'_F').className = 'curr';
			document.getElementById(showID+'_indicator').src = "images/indicator.gif";
		} else if (document.getElementById('Tab'+x) != null) {
			document.getElementById('Index'+x).style.display='none';
			document.getElementById('Index'+x).style.visibility ='hidden';
			document.getElementById('Tab'+x).className = 'tabMiddle2';
			document.getElementById('Tab'+x+'_L').innerHTML = "<img src='images/tab_lt_inactive.jpg' alt=' ' />";
			document.getElementById('Tab'+x+'_R').innerHTML = "<img src='images/tab_rt_inactive.jpg' alt=' ' />";
			document.getElementById('Tab'+x+'_F').className = '';
			document.getElementById('Tab'+x+'_indicator').src = "images/indicator_blank.gif";
		}
	}
}
function highlightTab(showID, highlight) {
	if (showID != ("Tab"+currentTab)) {
		if (highlight) {
			document.getElementById(showID).className = 'tabMiddle';
			document.getElementById(showID+'_L').innerHTML = "<img src='images/tab_lt_active.jpg' alt=' ' />";
			document.getElementById(showID+'_R').innerHTML = "<img src='images/tab_rt_active.jpg' alt=' ' />";
			document.getElementById(showID+'_F').className = 'curr';
		} else {
			document.getElementById(showID).className = 'tabMiddle2';
			document.getElementById(showID+'_L').innerHTML = "<img src='images/tab_lt_inactive.jpg' alt=' ' />";
			document.getElementById(showID+'_R').innerHTML = "<img src='images/tab_rt_inactive.jpg' alt=' ' />";
			document.getElementById(showID+'_F').className = '';
		}
	} 
}
