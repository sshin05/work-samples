/////////////////////////////////////////////////////////////
// MOVE LIST ITEM
// Function to move a selected item from one list box to another list box
// 
// moveFromListId = id of the source list for the option move
// moveFromListReference = string reference of "available" or "selected" for message purpose
// moveToListName =  id of the target list for the option to move to 
// maxlength = the maxlength for the target list, 0 = no limit (limits not currently used)

function moveListItem(moveFromListId, moveFromListReference, moveToListId, maxlength) {

	//moveFromList = select object from which the list item came
	var moveFromList = document.getElementById(moveFromListId);
	
	//moveToList = select object to which the list item will be moved
	var moveToList = document.getElementById(moveToListId);
	
	var moveFromListSelectedIndexArray = new Array();
	var m = 0;
	var numberItemsSelected = 0;	// used to determine # of selected items with use for maxlength			
	for (k = 0; k < moveFromList.length; k++){
		if ( moveFromList.options[k].selected == true ){
		    moveFromListSelectedIndexArray[m] = moveFromList.options[k].index;
			m++;
		}
	}
	numberOfItemsSelected = m;
	var moveToListLength = moveToList.length;
	//As long as an item is selected in the moveFromList, we will perform this functionality
	if (moveFromList.selectedIndex != -1) {
		var optionTextArray = new Array();
		var optionValueArray = new Array();
		for (n = 0; n < moveFromListSelectedIndexArray.length; n++){
			optionTextArray[n] = moveFromList.options[moveFromListSelectedIndexArray[n]].text;
			optionValueArray[n] = moveFromList.options[moveFromListSelectedIndexArray[n]].value;
		}
		
		// Now, regardless of the selected item's index, remove it from moveFromList's options
		for (q = 0; q < optionTextArray.length; q++){
			for (r = 0; r < moveFromList.length; r++){
				if (optionTextArray[q] == moveFromList.options[r].text){
					moveFromList.options[r] = null;
				}
			}
		}
		
		if ( moveFromList.options.length > 0 && moveFromList.selectedIndex == -1) {
			moveFromList.selectedIndex = 0;
		}
		
		//if maxlength has been passed as a parameter and we're moving from available to selected
		if (maxlength && moveFromListReference == "available") {
			if ( moveToList.length + numberOfItemsSelected == maxlength ) {
				var msg = "By adding additional items to your \"Selected\" list, ";
					msg += "you have reached the maximum number of items to ";
					msg += "be displayed in the window.  Be advised ";
					msg += "if you add anymore selections, your portal window ";
					msg += "will scroll."
				alert(msg);
			}
		}
		
		moveToList.selectedIndex = -1;		
		// Next, create a new option in the moveToList select box,
		// which contains the value and text of the item being moved
		for (t = 0; t < optionTextArray.length; t++) {
				moveToList.options[moveToListLength] = new Option (optionTextArray[t], optionValueArray[t], false, true);
				moveToList.options[moveToListLength].selected = true;
				moveToListLength = moveToListLength + 1;
		}
	}
	 
	else {
		if ( moveFromListReference == "available" ) {
			var msg = "No content item selected.  You must select a \n";
				msg += "content item to move from one column to another.";
			alert(msg);
		}
		else {
			var msg = "No column in the \"Selected\" ";
				msg += "list has been selected for removal. ";
				msg += "The \"Remove\" button can only move columns from the \"Selected\" ";
				msg += "list to the \"Available\" list.";
			alert(msg);
		}
	}
}