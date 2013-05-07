<%@ page language="java" contentType="text/html;charset=UTF-8"%>

<%@ taglib prefix="netui" uri="http://beehive.apache.org/netui/tags-html-1.0"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<%@ page import="com.citi.gpb.general.PortalConstants,				 
				 com.bea.portlet.PageURL,
				 com.bea.netuix.servlets.controls.page.PagePresentationContext,                 
                 com.bea.netuix.servlets.controls.page.BookPresentationContext,
                 com.bea.netuix.servlets.controls.window.WindowCapabilities" %>


<% BookPresentationContext book = BookPresentationContext.getBookPresentationContext(request);
   PagePresentationContext pageCtx = (PagePresentationContext)book.getPagePresentationContext(request);        
%>


<script src="<%=request.getContextPath()%>/<%=PortalConstants.JS_ROOT_URL%>/tablesort.js" type="text/javascript"></script>


<div id="body">
	<div class="bodypage">
		<div class="header"><%=pageCtx.getTitle()%></div>
		<div class="clear"></div>

<netui:form action="refresh" >
 	
		<div class="switch">
			<a href="<%= PageURL.createPageURL(request, response, PortalConstants.PORTLET_TYPE_TRADE_EXCEPTIONS) %>">Trade Exceptions</a>
			<div class="dash"><img src="<%=request.getContextPath()%>/<%=PortalConstants.IMAGE_ROOT_URL%>/spacer.gif" width="1" alt="" /></div>
			<div class="floatleft">Trade Activity</div>
		</div>
		<div class="clear"></div>
		
		<script type="text/javascript">
						
		function tradeSearch(id, num, check, value) {
			var temp = document.getElementById(id).rows;			
			
			if (check.checked == true) {							
				for (j = 0; j < temp.length; j++) {								
					switch(value) {
						case "failedunmatched": 
							if ((temp[j].cells[num].childNodes[0].innerHTML == 'unmatched') && (temp[j].cells[num+1].innerHTML == 'failed')) 
								temp[j].style.display = appropriateDisplay();											
							break;
						case "failedothers":
							if ((temp[j].cells[num].childNodes[0].innerHTML != 'unmatched') && (temp[j].cells[num+1].innerHTML == 'failed'))
								temp[j].style.display = appropriateDisplay();
							break;
						case "pendingunmatched":
							if ((temp[j].cells[num].childNodes[0].innerHTML == 'unmatched') && (temp[j].cells[num+1].innerHTML == 'pending'))
								temp[j].style.display = appropriateDisplay();								
							break;
						case "pendingothers":
							if ((temp[j].cells[num].childNodes[0].innerHTML != 'unmatched') && (temp[j].cells[num+1].innerHTML == 'pending'))
								temp[j].style.display = appropriateDisplay();
							break;
						case "settled":
							if ((temp[j].cells[num+1].innerHTML == 'settled'))
								temp[j].style.display = appropriateDisplay();
							break;
						default: 
							if ((temp[j].cells[num].childNodes[0].innerHTML == 'unmatched') && (temp[j].cells[num+1].innerHTML == 'failed')) 
								temp[j].style.display = appropriateDisplay();	
					}			
				}				
			} else {
				for (j = 0; j < temp.length; j++) {								
					switch(value) {
						case "failedunmatched": 
							if ((temp[j].cells[num].childNodes[0].innerHTML == 'unmatched') && (temp[j].cells[num+1].innerHTML == 'failed'))
								temp[j].style.display = 'none';									
							break;
						case "failedothers":
							if ((temp[j].cells[num].childNodes[0].innerHTML != 'unmatched') && (temp[j].cells[num+1].innerHTML == 'failed'))
								temp[j].style.display = 'none';
							break;
						case "pendingunmatched":
							if ((temp[j].cells[num].childNodes[0].innerHTML == 'unmatched') && (temp[j].cells[num+1].innerHTML == 'pending'))
								temp[j].style.display = 'none';
							break;
						case "pendingothers":
							if ((temp[j].cells[num].childNodes[0].innerHTML != 'unmatched') && (temp[j].cells[num+1].innerHTML == 'pending'))
								temp[j].style.display = 'none';
							break;
						case "settled":
							if ((temp[j].cells[num+1].innerHTML == 'settled'))
								temp[j].style.display = 'none';
							break;
						default: 
							if ((temp[j].cells[num].childNodes[0].innerHTML == 'unmatched') && (temp[j].cells[num+1].innerHTML == 'failed'))
								temp[j].style.display = 'none';
					}
				}
			}				
		}
		
		function appropriateDisplay() {
			var localisIE = (navigator.appName == "Microsoft Internet Explorer") ? true : false;
			if (localisIE) {
				return 'inline';
			} else {
				return 'table-row';
			}
		}
		
		function selectAll() {
			document.getElementById('failedUnmatchedBox').checked = true;
			document.getElementById('allFailedBox').checked = true;
			document.getElementById('pendingUnmatchedBox').checked = true;
			document.getElementById('allUnmatchedBox').checked = true;
			document.getElementById('allSettledBox').checked = true;
			tradeSearch('tblStart', 11, document.getElementById('failedUnmatchedBox'), 'failedunmatched');
			tradeSearch('tblStart', 11, document.getElementById('allFailedBox'), 'failedothers');
			tradeSearch('tblStart', 11, document.getElementById('pendingUnmatchedBox'), 'pendingunmatched');
			tradeSearch('tblStart', 11, document.getElementById('allUnmatchedBox'), 'pendingothers');
			tradeSearch('tblStart', 11, document.getElementById('allSettledBox'), 'settled');			
		}
			
		</script>
		
		
		<div class="borderbottom">
			<form>
			<div class="checkboxcol">
				<span class="head">Failed</span>
				<div class="clear"></div>
				<netui:checkBox tagId="failedUnmatchedBox" dataSource="actionForm.failedUnmatched" onclick="tradeSearch('tblStart', 11, this, 'failedunmatched');"/> <div class="txt">Unmatched Problem</div>
				<!-- <input type="checkbox" name="box" value="1" checked="checked" onclick="tradeSearch('tblStart', 11, this);" /> <div class="txt">Unmatched Problem</div>-->
				<div class="clear"></div>
				<netui:checkBox tagId="allFailedBox" dataSource="actionForm.failedAll" onclick="tradeSearch('tblStart', 11, this, 'failedothers');"/> <div class="txt">All Others</div>
			</div>
			
			
			<div class="checkboxcol">
				<span class="head">Pending</span>
				<div class="clear"></div>
				<netui:checkBox tagId="pendingUnmatchedBox" dataSource="actionForm.pendingUnmatched" onclick="tradeSearch('tblStart', 11, this, 'pendingunmatched');"/> <div class="txt">Unmatched Problem</div>
				<div class="clear"></div>
				<netui:checkBox tagId="allUnmatchedBox" dataSource="actionForm.pendingAll" onclick="tradeSearch('tblStart', 11, this, 'pendingothers');"/> <div class="txt">All Others</div>
			</div>
			
			<div class="checkboxcol">
				<span class="head">Settled</span>
				<div class="clear"></div>
				<netui:checkBox tagId="allSettledBox" dataSource="actionForm.settledAll" onclick="tradeSearch('tblStart', 11, this, 'settled');"/> <div class="txt">All Settled Today</div>				
			</div>			
			</form>
			<div class="checkboxcol">
			<a href="#" onclick="selectAll(); return false">Select All</a>		
			</div>
		</div>
				
		<div class="subline"><c:if test="${empty actionForm.tradeExceptions}"><font color="red">There are no trades available for the current top acount</font></c:if></div>
		
		
		<div class="clear"></div>		
		<div class="timeinfo">Last updated: <netui:content value="${actionForm.lastUpdatedDate}" /></div>
		<div class="clear"></div>
		
		<table class="list"">
		<thead id="tblHead">
			<tr class="normal">
			<th width="60"><a href="#"></a></th>
			<th width="20"><a href="#" onclick="switchClass('tblHead', this, 1); return sortTable('tblStart',1,true);">Broker</a></th>
			<th width="150"><a href="#" onclick="switchClass('tblHead', this, 2); return sortTable('tblStart',2,true);">Client Comment</a></th>
			<th width="50"><a href="#" onclick="switchClass('tblHead', this, 3); return sortTable('tblStart',3,true);">Root ID</a></th>
			<th width="120"><a href="#" onclick="switchClass('tblHead', this, 4); return sortTable('tblStart',4,true);">Security Description</a></th>
			<th width="60"><a href="#" onclick="switchClass('tblHead', this, 5); return sortTable('tblStart',5,true);">Trade Date</a></th>
			<th width="80"><a href="#" onclick="switchClass('tblHead', this, 6); return sortTable('tblStart',6,true);" class="down">Settle Date</a></th>
			<th width="30"><a href="#" onclick="switchClass('tblHead', this, 7); return sortTable('tblStart',7,true);">Trade</a></th>
			<th width="40"><a href="#" onclick="switchClass('tblHead', this, 8); return sortTable('tblStart',8,true);">Quantity</a></th>
			<th width="80"><a href="#" onclick="switchClass('tblHead', this, 9); return sortTable('tblStart',9,true);">Original Cash</a></th>
			<th width="30"><a href="#" onclick="switchClass('tblHead', this, 10); return sortTable('tblStart',10,true);">CCY</a></th>
			<th width="65"><a href="#" onclick="switchClass('tblHead', this, 11); return sortTable('tblStart',11,true);">Status</a></th>
			<th width="0" class="none"><a href="#">CCY</a></th>
			</tr>
		</thead>
		
		
		<%int  tradeCounter=0;%>		
		<tbody id="tblStart">		
		<c:forEach items="${actionForm.tradeExceptions}" var="ipbException">
			<c:forEach items="${ipbException.tradeExceptionsDetailDto}" var="tradeDetail">
					
		   		<tr onclick="detailsPop('details', <%=tradeCounter %>, 'tblStart', this); return false" onmouseover="this.style.cursor='pointer';" style='display: none;'>
				<td><a href="#" onclick="detailsPop('details', <%=tradeCounter %>, 'tblStart', ''); return false" class="button"><span class="borderleft"><span class="borderright"><span class="exclamation">Details</span></span></span></a></td>
				<td><c:out value="${tradeDetail.brokerName}" /></td>
				<td><c:out value="${tradeDetail.lastClientNoteShort}" /></td>
				<td><c:out value="${tradeDetail.customerAcct}" /></td>
				<td><c:out value="${tradeDetail.securityName}" /></td>
				<td><c:out value="${tradeDetail.date}" /></td>
				<td><c:out value="${tradeDetail.settleDate}" /></td>
				<td><c:out value="${tradeDetail.type}" /></td>
				<td><c:out value="${tradeDetail.quantity}" /></td>
				<td><c:out value="${tradeDetail.settleAmt}" /></td>
				<td><c:out value="${tradeDetail.settleCurr}" /></td>	
				<td><c:out value="${tradeDetail.allStatusClass}" escapeXml="false" /><c:out value="${tradeDetail.displayInstructionStatus}" /><c:out value="${tradeDetail.allStatusClassClose}" escapeXml="false"/></td>
				<td class="none"><c:out value="${tradeDetail.displayTradeStatus}" /></td>
	   	 		</tr>
				<%tradeCounter++; %>
	    	</c:forEach>
	    </c:forEach>						    
		</tbody>
		
		</table>
		  
	  
	    <div class="clear"></div>
		<div class="submitFoot">
			<netui:anchor action="toCsv" styleClass="floatleft"><img src="<%=request.getContextPath()%>/<%=PortalConstants.IMAGE_ROOT_URL%>/icn_xls.gif" width="16" height="16" alt="" /></netui:anchor>&nbsp;<netui:anchor action="toCsv" styleClass="button"><span class="borderleft"><span class="borderright"><span class="noarrow">Export to CSV</span></span></span></netui:anchor>
			&nbsp;&nbsp;<netui:anchor action="refresh" styleClass="button"><span class="borderleft"><span class="borderright"><span class="noarrow">Refresh Data</span></span></span></netui:anchor>
		</div>
		
		<%tradeCounter=0; %>
			<c:forEach items="${actionForm.tradeExceptions}" var="ipbException">
				<c:forEach items="${ipbException.tradeExceptionsDetailDto}" var="tradeDetail">
						<div class="details" id="details<%=Integer.toString(tradeCounter)%>">
							<div class="head">
								<div class="floatleft">Trade Details</div>
								<div class="floatright"><a href="#" onclick="detailsUnpop('details', <%=tradeCounter %>, 'tblStart'); return false">x Close</a></div>
							</div>
							<div class="body">
								<div class="desc"><c:out value="${tradeDetail.lastClientNoteFull}" /></div>
							<div class="line">
							<div class="col">
								<h3>Root ID</h3>
								<div class="clear"></div>
								<c:out value="${tradeDetail.customerAcct}" />
							</div>
							<div class="col">
								<h3>Client Reference</h3>
								<div class="clear"></div>
								<c:out value="${tradeDetail.clientRef}" />
							</div>
							<div class="col">
								<h3>Block ID</h3>
								<div class="clear"></div>
								<c:out value="${tradeDetail.blockRef}" />
							</div>
						</div>
						<div class="line">
							<c:if test="${tradeDetail.isPendingIcon}">
								<img src="<%=request.getContextPath()%>/<%=PortalConstants.IMAGE_ROOT_URL%>/icn_x.gif" alt="" class="icon" />
							</c:if>
							<c:if test="${tradeDetail.isFailedIcon}">
								<img src="<%=request.getContextPath()%>/<%=PortalConstants.IMAGE_ROOT_URL%>/icn_!.gif" alt="" class="icon" />
							</c:if>								
							<div class="iconline">Buy <c:out value="${tradeDetail.quantity}" /> <c:out value="${tradeDetail.securityName}" /></div>
							<div class="floatright">Trade: <span class="bold"><c:out value="${tradeDetail.settleDate}" /></span></div>
						</div>
						<div class="line">
							<div class="col">
								<h3>CUSIP:</h3>
								<div class="clear"></div>
								<c:out value="${tradeDetail.cusip}" />
							</div>
							<div class="col">
								<h3>ISIN:</h3>
								<div class="clear"></div>
								<c:out value="${tradeDetail.isin}" />
							</div>
							<div class="col">
								<h3>SEDOL:</h3>
								<div class="clear"></div>
								<c:out value="${tradeDetail.sedol}" />
							</div>
						</div>				
						<div class="line">
							<div class="col">
								<h3>Original Cash (Local)</h3>
								<div class="clear"></div>
								<c:out value="${tradeDetail.settleAmt}" /> <c:out value="${tradeDetail.settleCurr}" />
							</div>
							<div class="col">
								<h3>Original Cash (USD)</h3>
								<div class="clear"></div>
								<c:out value="${tradeDetail.settleAmtUSD}" />
							</div>
						</div>
					</div>
				</div>	
				<%tradeCounter++; %>
			</c:forEach>
		</c:forEach>
  
  
	</netui:form>								
  </div>	
</div> 

	<script language="JavaScript" type="text/JavaScript">
		<!--
		window.onload= function() {

			tradeSearch('tblStart', 11, document.getElementById('failedUnmatchedBox'), 'failedunmatched');
			tradeSearch('tblStart', 11, document.getElementById('allFailedBox'), 'failedothers');
			tradeSearch('tblStart', 11, document.getElementById('pendingUnmatchedBox'), 'pendingunmatched');
			tradeSearch('tblStart', 11, document.getElementById('allUnmatchedBox'), 'pendingothers');
			tradeSearch('tblStart', 11, document.getElementById('allSettledBox'), 'settled');
			
			//runfirstTime();
			
		}		
		-->
		</script>
	<!-- end body page -->

<div class="clear"></div>