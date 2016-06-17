<%
/** This is a barebone editorial template. The main components are:

	1. HTML5 Doctype
	2. Modernizr for IE support of HTML5 elements
	3. Reset STYLE section based on http://html5boilerplate.com/
	4. global HTML DOCTYPE, CSS, and MOERDNIZER placed in /include/saks_html5_header.jsp
	5. jQuery 

**/
%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
	<%@ page import="java.net.URLEncoder"%>
	<%@ include file="/include/timer_test_helper.jsp" %>
	<%@ page import ="java.util.regex.*" %>

<%@ page import="com.s5a.utils.SaksLinkBuilder"%>
<%@ page import="com.s5a.logging.Logger"%>
<%@ page import="com.s5a.logging.LoggerFactory"%>
<%@ page import="com.s5a.utils.Switches" %>
<%@ page import="com.bluemartini.htmlapp.Folder" %>
<%@ page import="com.bluemartini.htmlapp.HTMLAssortmentUtil" %>
<%@ page import="com.s5a.utils.EndecaUtils" %>

	<%
	final Logger LOGGER = LoggerFactory.get().getLogger("WorldOfDesigner.jsp");
	/**
	 * CHANEL REDESIGN: initialize flags
	 */
	boolean isChanelLandingPage = false;
	DNAList redirectParams = new DNAList();
	String redirectPath = "";
	
	
	// Redirect
	boolean bredirect = false;
	Long folderID = null;
	BusinessObject objprod = dnaFormData.getBusinessObject("FOLDER");
	
	if (objprod != null) {
	
		folderID = objprod.getLong("folder_id");

		if (folderID != null) {
			Folder folder = HTMLAssortmentUtil.getFolderDetail(folderID);
		

			if (LOGGER.debug()) {
				LOGGER.debug("WorldOfDesigner folderID != null  ");
				LOGGER.debug("WorldOfDesigner Folder ID is -> " + folderID);
				LOGGER.debug("WorldOfDesigner Folder  is -> " + folder);
				
			}
			// set assortmentId for alfresco tags...
			pageContext.setAttribute("assortmentId", folderID);

			if ( Switches.getInstance().getFeatureState("READY_FOR_PROD")){//NEW CODE

				if (folderID.toString().length() <= 8 ||   ! EndecaUtils.isReadyForProd(folder)) {
					LOGGER.info("Invalid WorldOfDesigner folder id, it'll cause a redirect to MHP");
					bredirect = true;
				}

				else{//ORIGONAL CODE

					if (folderID.toString().length() <= 8 ) {
						LOGGER.info("Invalid WorldOfDesigner folder id, it'll cause a redirect to MHP");
						bredirect = true;
					}
				}
			}

		} else {
			LOGGER.info("WorldOfDesigner - folder is null.");
		}
	} else {
		LOGGER.error("WorldOfDesigner FOLDER BusinessObject is not in the dnaFormData, it'll cause a redirect to MHP");
		bredirect = true;
	}
	if (bredirect) {
		LOGGER.error("Redirect to MHP");
		htmlContext.redirectURL("/Entry.jsp");
	}
	
	String SFolder = request.getParameter("SFOLDER");
	Folder SfolSection = null;
	if (SFolder != null) {
		SfolSection = HTMLAssortmentUtil.getFolderByName(SFolder);
	}
	Folder currentFolder;
	Folder folSection = null;
	currentFolder = webconnect.getFolder(true);

	if(Switches.getInstance().getFeatureState(Switches.SPECIAL_BRAND)){
        if(currentFolder.getLabel().equalsIgnoreCase("CHANEL")){
            isChanelLandingPage = true;
        }
        request.setAttribute("isChanelLandingPage", isChanelLandingPage);
    }
			
	int styleType = 0;
	String categoryLabel = null;
	if(currentFolder != null)
	{
		styleType = currentFolder.getAsInteger("ATR_StyleType",1);
		categoryLabel = currentFolder.getLabel();
		//Set folder id to use in doubleClick_PA.jsp.
	  	pageContext.setAttribute("folderId", Long.toString(currentFolder.getLongID()));
	  	pageContext.setAttribute("styleType", styleType);
	    String alfrescoDefaultImagePath = currentFolder.getContent("ATR_AlfrescoDefaultImage").getPath();
		pageContext.setAttribute("alfrescoDefaultImagePath", alfrescoDefaultImagePath);  	
		// this is for alfresco 
		pageContext.setAttribute("folderName", currentFolder.getString("name"));
	}

	session.setAttribute("wod_designer", categoryLabel);
	pageContext.setAttribute("wod_url", "http://www.saksfifthavenue.com/main/WorldOfDesigner.jsp?FOLDER%3C%3Efolder_id=" + folderID);
%>


	<%@ include file="/include/html5_doctype.jsp"%>
	<%@ include file="/include/saks_global_css.jsp"%>


	<link rel="canonical" href="http://www.saksfifthavenue.com<%=HTMLContext.getContext().getTemplate() %>" />
	<script type='text/javascript' src="/static/build/js/dlp-store-list.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/compiled/editorial/dlp/customDLP.css"/>


	<%-- !!! TITLE TO BE SET FROM SPEC !!! --%>
	<title>Spring Designer Sunglasses: Dolce & Gabbana, Dior & More | Saks.com</title>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="Description" content="Discover the season’s best designer sunglasses, featuring Dior, Dolce & Gabbana, Givenchy, Fendi, Gucci, Ray-Ban, Tom Ford Eyewear and Roberto Cavalli at saks.com.">

	<meta name="Keywords" content="Saks Fifth Avenue, saksfifthavenue, Saks, 5th Avenue, Saks fifth avenue department store, 5th Saks, Saks fifth avenue store, luxury online shopping retailer, luxury department store, designer women apparel, designer men clothing, children clothes, designer handbags, designer wallets, designer purses, Ferragamo, Luggage, designer handbags, Fendi, Louis Vuitton, Prada, Chanel, Versace, Gucci, Escada, Donna Karan, Hermes, Bally, DKNY, Kate spade shoes, Ralph Lauren, Calvin Klein, Miu Miu, Armani clothing, Prada shoes, Burberry, Vera Wang, Jean Paul Gaultier, Burberry purses, luxury gifts, luxury shopping, French fashion, Italian fashion, leather luggage, fashion designer, handbag and accessories, leather accessories, online clothes shop, designer clothing, designer fashion, designer footwear, diesel jeans, baby accessories, designer ties, active wear, designer boutique, fine jewelry, classic apparel, contemporary apparel, swimwear, underwear and lingerie">

</head>

<body>
<%@ include file="/include/checkout_topnav.jsp"%>
<%@ include file="/include/omn_headerNew.jsp"%>

<%-- !!! OMNITURE TAGS: set from spec !!! --%>
<%
	omn_Pgnm = "";
	omn_sect = "";
	omn_pagetype = "";
%>

<div id="landing-page-layout" class="clearfix <c:if test="${pageType == 'dlpPageV2'}">sks-section-full</c:if>">

		<div id="landing-page-navigation">
			<%--@ include file="/main/WorldOfDesigner_left_nav_REFACTOR.jsp"  --%>
			<nav class="sfa-left-nav dlp-left-nav" itemscope="" itemtype="https://schema.org/WPSideBar">
				<div class="sfa-left-nav-content-container">
					<ul class="left-nav-group-container">
						<li class="left-nav-groups">
							<ul class="left-nav-links-container chanel-dlp-logo-container"><li class="js-links-title links-title standard-dlp-logo" itemscope="" itemtype="http://schema.org/ImageObject"></li></ul>
							<ul class="left-nav-links-container last-nav-group">
								<li class="js-left-nav-links left-nav-links">
									<ul>
										<li>
											<a href="/main/WorldOfDesigner.jsp?FOLDER<>folder_id=2534374305080309&PRODUCT<>prd_id=845524446947105&bmUID=lhUWOFR" itemprop="url">FRAGRANCE &amp; BEAUTY</a>
										</li>
										<li>
											<a href="refresh jsp" itemprop="url">FASHION</a>
										</li>
									</ul>
								</li>
							</ul>
							<ul class="left-nav-links-container last-nav-group left-nav-hide-links">
								<li class="js-left-nav-links left-nav-links"><ul><li><a href="/main/ShopByBrand.jsp" itemprop="url">Choose Another Designer</a></li></ul></li>
							</ul>
						</li>
					</ul>		
				</div>
			</nav>
		</div>

		<%-- OPEN landing-page-content --%>
		<div id="landing-page-content" itemscope itemtype="http://schema.org/ImageObject" >
			<img src="/Content/alfresco/guestDownload/direct/workspace/SpacesStore/54808193-97e0-4629-8c3e-3480735538fd/122313_DLP_CHANEL_BANNER.jpg?version=0.5" border="0"
			 alt="" />
			<img src="/static/images/editorial/dlpstorelisting/Chanel_DLP_815x600.jpg" border="0"
			 alt="Chanel Landing Page Fashion Image" />
		<meta itemprop="image" content="http://saksfifthavenue.com/static/images/alfresco/120511_ALFRESCODEFAULT_DLP_FASHION.jpg" />
		<meta itemprop="caption" content="${wod_designer}" />
		</div>
		<%-- CLOSE landing-page-content --%>
		  				

	</div> <%-- CLOSE landing-page-layout --%>

<div id="main-content" class="sfa-editorial-container grid-container grid-parent">
	<div class='sfa-editorial-loading'></div>
	<div id='sectionContainer' class='stores-container hide-content'></div>

</div>



<%@ include file="/include/omn_footer.jsp"%>
<%@ include file="/include/checkout_bottomnav.jsp" %>

<script type="text/javascript">

(function($){
    var editorialModel = {
    		sections : $(".section", "#main-content"),
    		slides: [],

    		initialize : function(){
    			editorialModel.build();
    		},

    		build : function(){




				//build overlays
				$.getJSON("/static/json/chanelstoreData.json", function(data){
					$.get('/static/templates/chaneldlp/chanel-store-list.mustache', function(template) {
						//var template = Saks.templates['chaneldlp/chanel-store-list'];
				   		var html = Mustache.to_html(template, data);
				    	$('#sectionContainer').html(html);
					//});

				}).done(function(){
					/*$("#main-content").waitForImages({
	      			    finished: function() {
	      			    	editorialModel.setUI();
	      			    },
	      			    each: function() {
	      			    },
	      			    waitForAll: true
	      			});*/
			});
        	},
    		setUI : function(){
     			var editorialArrows = $(".sfa-editorial-arrow", "#main-content");
     			var eleWithDataRetag = $("#main-content").find("*[data-retag]");

     			$("#sectionContainer").removeClass("hide-content");
				$(".sfa-editorial-loading").hide();


     			function setRealEstateTag(retag) {
                    var dataToPass = editorialModel.realEstateTag + ":" + retag,
                        eventData = {events: 'editorial_navigation_click', interaction_name: dataToPass};

                    s.eVar75 = dataToPass;
                    s.prop17 = dataToPass;
                    s.events = "event56";
                    if (!Saks.config.DISABLE_OMNITURE) {
                        void(s.t());
                    }

                    Saks.module('Mediator').publish('signal', eventData);
                };

				eleWithDataRetag.on( "click", function(e) {
					e.stopPropagation();
					var element = e.currentTarget;
					var retag = $(element).attr('data-retag');
					setRealEstateTag( retag );

					var id = $(this).attr("href");

					if(Modernizr.mobile || $("html").hasClass("lt-ie9")){
						
					}else{
						if($(id).length > 0) {
							    e.preventDefault();
							    // trigger scroll
							    controller.scrollTo(id);

							    // If supported by the browser we can also update the URL
							    if (window.history && window.history.pushState) {
							      history.pushState("", document.title, id);
							    }
						}
					}
				});
  			}
    };

    $(document).ready(function(){
    	editorialModel.initialize();
    });
	
})(jQuery);

</script>

</body>
</html>