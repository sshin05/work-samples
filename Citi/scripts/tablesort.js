// Table Sort functions

//-----------------------------------------------------------------------------
// sortTable(id, col, rev)
//
//  id  - ID of the TABLE, TBODY, THEAD or TFOOT element to be sorted.
//  col - Index of the column to sort, 0 = first column, 1 = second column,
//        etc.
//  rev - If true, the column is sorted in reverse (descending) order
//        initially.
//
// Note: the team name column (index 1) is used as a secondary sort column and
// always sorted in ascending order.
//-----------------------------------------------------------------------------

function sortTable(id, col, rev) {

  // Get the table or table section to sort.
  var tblEl = document.getElementById(id);

  // The first time this function is called for a given table, set up an
  // array of reverse sort flags.
  if (tblEl.reverseSort == null) {
    tblEl.reverseSort = new Array();
    // Also, assume the team name column is initially sorted.
    tblEl.lastColumn = 1;
  }

  // If this column has not been sorted before, set the initial sort direction.
  if (tblEl.reverseSort[col] == null)
    tblEl.reverseSort[col] = rev;

  // If this column was the last one sorted, reverse its sort direction.
  if (col == tblEl.lastColumn)
    tblEl.reverseSort[col] = !tblEl.reverseSort[col];

  // Remember this column as the last one sorted.
  tblEl.lastColumn = col;

  // Set the table display style to "none" - necessary for Netscape 6
  // browsers.
  var oldDsply = tblEl.style.display;
  tblEl.style.display = "none";

  // Sort the rows based on the content of the specified column using a
  // selection sort.

  var tmpEl;
  var i, j;
  var minVal, minIdx;
  var testVal;
  var cmp;

  for (i = 0; i < tblEl.rows.length - 1; i++) {

    // Assume the current row has the minimum value.
    minIdx = i;
    minVal = getTextValue(tblEl.rows[i].cells[col]);
    
    // Search the rows that follow the current one for a smaller value.
    for (j = i + 1; j < tblEl.rows.length; j++) {
      testVal = getTextValue(tblEl.rows[j].cells[col]);
      

      cmp = compareValues(minVal, testVal);
      // Negate the comparison result if the reverse sort flag is set.
      if (tblEl.reverseSort[col])
        cmp = -cmp;
      // Sort by the first column (name) if those values are equal.
      if (cmp == 0 && col != 0)
      
        cmp = compareValues(getTextValue(tblEl.rows[minIdx].cells[1]), getTextValue(tblEl.rows[j].cells[1]));
      // If this row has a smaller value than the current minimum, remember its
      // position and update the current minimum value.
      if (cmp > 0) {
        minIdx = j;
        minVal = testVal;
      }
    }

    // By now, we have the row with the smallest value. Remove it from the
    // table and insert it before the current row.
    if (minIdx > i) {
      tmpEl = tblEl.removeChild(tblEl.rows[minIdx]);
      tblEl.insertBefore(tmpEl, tblEl.rows[i]);
    }
  }

  // Restore the table's display style.
  tblEl.style.display = oldDsply;

  return false;
}

//-----------------------------------------------------------------------------
// Functions to get and compare values during a sort.
//-----------------------------------------------------------------------------

// This code is necessary for browsers that don't reflect the DOM constants
// (like IE).
if (document.ELEMENT_NODE == null) {
  document.ELEMENT_NODE = 1;
  document.TEXT_NODE = 3;
}

function getTextValue(el) {

  var i;
  var s;

  // Find and concatenate the values of all text nodes contained within the
  // element.
  s = "";
  for (i = 0; i < el.childNodes.length; i++)
    if (el.childNodes[i].nodeType == document.TEXT_NODE)
      s += el.childNodes[i].nodeValue;
    else if (el.childNodes[i].nodeType == document.ELEMENT_NODE &&
             el.childNodes[i].tagName == "BR")
      s += " ";
    else
      // Use recursion to get text within sub-elements.
      s += getTextValue(el.childNodes[i]);

  return normalizeString(s);
}

function compareValues(v1, v2) {

  var f1, f2;

  var a1, a2;
  a1 = removeCommasBrackets(v1);
  a2 = removeCommasBrackets(v2);
  
  f1 = parseFloat(a1);
  f2 = parseFloat(a2);

  // If the values are numeric, convert them to floats.
  //f1 = parseFloat(v1);
  //f2 = parseFloat(v2);
  
  //alert(f1 + " " + f2);
  
  if (!isNaN(f1) && !isNaN(f2)) {
    v1 = f1;
    v2 = f2;
  }

  // Compare the two values.
  if (v1 == v2)
    return 0;
  if (v1 > v2)
    return 1
  return -1;
}

// Regular expressions for normalizing white space.
var whtSpEnds = new RegExp("^\\s*|\\s*$", "g");
var whtSpMult = new RegExp("\\s\\s+", "g");

function normalizeString(s) {

  s = s.replace(whtSpMult, " ");  // Collapse any multiple whites space.
  s = s.replace(whtSpEnds, "");   // Remove leading or trailing white space.

  return s;
}

//-----------------------------------------------------------------------------
// Functions to update the table appearance after a sort.
//-----------------------------------------------------------------------------

// Style class names.
var rowClsNm = "alternateRow";
var colClsNm = "sortedColumn";

// Regular expressions for setting class names.
var rowTest = new RegExp(rowClsNm, "gi");
var colTest = new RegExp(colClsNm, "gi");

function makePretty(tblEl, col) {

  var i, j;
  var rowEl, cellEl;

  // Set style classes on each row to alternate their appearance.
  for (i = 0; i < tblEl.rows.length; i++) {
   rowEl = tblEl.rows[i];
   rowEl.className = rowEl.className.replace(rowTest, "");
    if (i % 2 != 0)
      rowEl.className += " " + rowClsNm;
    rowEl.className = normalizeString(rowEl.className);
    // Set style classes on each column (other than the name column) to
    // highlight the one that was sorted.
    for (j = 2; j < tblEl.rows[i].cells.length; j++) {
      cellEl = rowEl.cells[j];
      cellEl.className = cellEl.className.replace(colTest, "");
      if (j == col)
        cellEl.className += " " + colClsNm;
      	cellEl.className = normalizeString(cellEl.className);
    }
  }

  // Find the table header and highlight the column that was sorted.
  var el = tblEl.parentNode.tHead;
  rowEl = el.rows[el.rows.length - 1];
  // Set style classes for each column as above.
  for (i = 2; i < rowEl.cells.length; i++) {
    cellEl = rowEl.cells[i];
    cellEl.className = cellEl.className.replace(colTest, "");
    // Highlight the header of the sorted column.
    if (i == col)
      cellEl.className += " " + colClsNm;
      cellEl.className = normalizeString(cellEl.className);
  }
}


// new utility functions (Simon Griffin)
function removeCommasBrackets(strValue) {
  strValue = removeCommas(strValue);
  if (strValue.indexOf("(") == 0 && strValue.indexOf(")") > -1) {
  	strValue = removeBrackets(strValue);
  }
  //alert(strValue);
  return strValue;
}

function removeCommas(strValue) {
  var objRegExp = /,/g; 
  //search for commas globally
  //replace all matches with empty strings
  return strValue.replace(objRegExp,'');
}

function removeBrackets(strValue) {
  var objRegExp = /(\(|\))/g; 
  //search for brackets globally
  //replace all matches with empty strings
  strValue = strValue.replace(objRegExp,'');
  // add neg symbol
  strValue = "-" + strValue;
  return strValue;
}



//////////////////////////////////////////////////////////////////////////////
// ONCLICK FUNCTION
// Moves the arrow to clicked link

function switchClass(id, arrow, col) {
	if (arrow.className == "down") {
		arrow.className="up";
	} else {
		arrow.className="down";
	}
	
	
	temp = document.getElementById(id).rows[0].cells
	for (i = 0; i < temp.length; ++i) {
		if (i != col) {
			if (temp[i].childNodes[0].attributes != null) {
				//alert(temp[i].childNodes[0].attributes);
				temp[i].childNodes[0].className = "";
			}
		}
	}	
}



/////////////////////////////////////////////////////////////////////////////////////////
// IPB TRADE DETAILS SCRIPT
// These scripts hides and unhides a DHTML layer.


function detailsPop(panel, num, table, line) {
	
	var row = document.getElementById(table).rows;
	for (i=0; i<row.length; ++i) {
		var t = panel + i;
		document.getElementById(t).style.display = 'none';
		//alert("erase previous panel:" + t + " clicked on currently:" + num);
		if (row[i].className == 'bgSelect') {			
			row[i].className = '';			
		}
	}
	
	var lefthand = findPosLeft(line);
	var tophand = findPosTop(line);
	var temp = panel + num;
	line.className = "bgSelect";
	document.getElementById(temp).style.top = tophand + 'px';
	document.getElementById(temp).style.left = lefthand + 70 +'px';
	document.getElementById(temp).style.display = 'block';	
}

function detailsUnpop(panel, num, table) {
	var row = document.getElementById(table);
	var temp = panel + num;
	document.getElementById(temp).style.display = 'none';
	var row = document.getElementById(table).rows;
	for (i=0; i<row.length; ++i) {
		row[i].className='';
	}	
}
