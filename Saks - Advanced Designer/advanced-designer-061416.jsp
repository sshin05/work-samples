 <%
/** This is a barebone editorial template. The main components are:

	1. HTML5 Doctype
	2. Modernizr for IE support of HTML5 elements
	3. Reset STYLE section based on http://html5boilerplate.com/
	4. global HTML DOCTYPE, CSS, and MOERDNIZER placed in /include/saks_html5_header.jsp
	5. FACEBOOK LIKE META TAGS AND JS
	6. jQuery 1.6 + is included via the TOPNAV JSP so you have full access to it

**/
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ page import="java.net.URLEncoder"%>
<%@ include file="/include/timer_test_helper.jsp" %>
<%@ page import ="java.util.regex.*" %>
<%
String pathInfo = com.saksfifthavenue.utils.JSPUtils.stripXSS(htmlContext.getDetails().getString("uri"));
String queryString = com.saksfifthavenue.utils.JSPUtils.stripXSS(htmlContext.getDetails().getString("queryString"));
String myUrl = pathInfo;
if (queryString != null && queryString.length() > 0){myUrl = myUrl + "?" + queryString;}
dnaFormData.setString("detail_ref_url", myUrl);
String GIF = webconnect.getContentByName("/media/images/clear.gif").getPath();

// !!! BACK TO LINK: TO BE FILLED OUT ACCORDING TO EDITORIAL SPECS !!! 
dnaFormData.setString("detail_ref_label", "Glam Gardens Beauty Event");

%>

	<%@ include file="/include/html5_doctype.jsp"%>
	<%@ include file="/include/saks_global_css.jsp"%>

	<link href='http://fonts.googleapis.com/css?family=Playfair+Display:400,400italic' rel='stylesheet' type='text/css'>
	<link type="text/css" rel="stylesheet" href="/static/fonts/antonio/antonio-regular/stylesheet.css"/>
	<link type="text/css" rel="stylesheet" href="/static/css/compiled/editorial/events/advanced-designers.css"/>
	<script type='text/javascript' src="/static/js/editorial/pinmarklet.js"></script>
	<script type='text/javascript' src="/static/js/editorial/slick.js"></script>
	<script src="https://use.typekit.net/gqv2ole.js"></script>
	<script>try{Typekit.load({ async: true });}catch(e){}</script>
				

	<link rel="canonical" href="http://www.saksfifthavenue.com<%=HTMLContext.getContext().getTemplate() %>" />

	<%-- !!! TITLE TO BE SET FROM SPEC !!! --%>
	<title>Advanced Designer: Acne Studios, Maison Margiela & More | Saks.com</title>

	<%-- !!! FB LIKE: Set og:image, og:title and og:description !!! --%>
	<meta property="og:title" content="Introducing The Advance @saks.com" />
	<meta property="og:type" content="article" />
	<meta name="og:url" property="og:url" content="http://www.saksfifthavenue.com<%=HTMLContext.getContext().getTemplate() %>" />
	<meta property="og:image" content="http://www.saksfifthavenue.com/emailMedia/FF_ADVANCED_DESIGNERS_61416.jpg" />
	<meta property="og:site_name" content="Saks Fifth Avenue" />
	<meta property="fb:admins" content="804745013" />
	<meta property="og:description" content="Today's visionary designers, defining fashion for tomorrow."/>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="Description" content="Discover the latest ready-to-wear designer clothing at saks.com, featuring Acne Studios, Rick Owens, Maison Margiela, Sacai, Simone Rocha, Ms. Min and more.">
	<meta name="Keywords" content="Saks Fifth Avenue, saksfifthavenue, Saks, 5th Avenue, Saks fifth avenue department store, 5th Saks, Saks fifth avenue store, luxury online shopping retailer, luxury department store, designer women apparel, designer men clothing, children clothes, designer handbags, designer wallets, designer purses, Ferragamo, Luggage, designer handbags, Fendi, Louis Vuitton, Prada, Chanel, Versace, Gucci, Escada, Donna Karan, Hermes, Bally, DKNY, Kate spade shoes, Ralph Lauren, Calvin Klein, Miu Miu, Armani clothing, Prada shoes, Burberry, Vera Wang, Jean Paul Gaultier, Burberry purses, luxury gifts, luxury shopping, French fashion, Italian fashion, leather luggage, fashion designer, handbag and accessories, leather accessories, online clothes shop, designer clothing, designer fashion, designer footwear, diesel jeans, baby accessories, designer ties, active wear, designer boutique, fine jewelry, classic apparel, contemporary apparel, swimwear, underwear and lingerie">

</head>

<body>
<div id="fb-root"></div>

	<%@ include file="/include/checkout_topnav.jsp"%>
	<%@ include file="/include/omn_headerNew.jsp"%>

	<%-- !!! OMNITURE TAGS: set from spec !!! --%>
	<%
		omn_Pgnm = "editorial:fall-shoes-092115";
		omn_sect = "editorial";
		omn_pagetype = "editorial";
	%>

	<div id="main-content" class="sfa-editorial-container grid-container">
		<div class='sfa-editorial-loading'></div>			
		
		<div class='sfa-editorial-slideshow hide-content'>
			<div class="sfa-title-container"></div>
		</div>		
		
	</div>
	<div id="editorial-footer" class='hide-content'>
		<div class="footer-setting">
			<ul class="sfa-editorial-credit">
				<li class="credit-copy">PHOTOGRAPHED BY AN LE</li>
			</ul>
			<ul class="sfa-editorial-social">
				<li class="fb" data-retag="social:fcbk"><a href="https://www.facebook.com/sharer/sharer.php?u=http://www.saksfifthavenue.com<%=HTMLContext.getContext().getTemplate() %>" target="_blank" title="Share on Facebook"><span class="icon font-icon-facebook"></span></a>
				</li>
				<li class="twitter" data-retag="social:tweet"><a href="https://twitter.com/intent/tweet?url=http://bit.ly/1rf6oF5&text=Introducing The Advance @saks.com. Today's visionary designers, defining fashion for tomorrow." target ="_blank" title="Tweet this link"><span class="icon font-icon-twitter"></span></a></li>
				<li class="pinterest" data-retag="social:pin"><a href="#"><span class="icon font-icon-pinterest" title = "Pin this image on Pinterest"></span></a></li>
			</ul>
		</div>
	</div>


<%@ include file="/include/omn_footer.jsp"%>
<%@ include file="/include/checkout_bottomnav.jsp" %>
<script type="text/javascript" src="/static/build/js/editorial.js"></script>
<script type='text/javascript' src="/static/js/editorial/mensemerging101314.js"></script>
<script type="text/javascript" src="/static/js/editorial/lazyload.js"></script>
<script type="text/javascript">
(function($){	

	var editorialModel = {
			mainImages: $(".lazy", "#main-content"),
			styles: $(".styles", "#main-content"),
			mainContainer: $(".sfa-editorial-slideshow", "#main-content"),
			titleContainer: $(".sfa-title-container", "#main-content"),
			sections: $(".editorial-slide", "#main-content"),
			footer: $("#editorial-footer"),
			slides: [],
			overlayType: "hotspot", //set overlay type (hotspot , quicklook)
			realEstateTag: "Thdvncd614",
			shopallUrl: "/The-Advanced/shop/_/N-52kdnp/Ne-52iqfl", 
         	linkingNames: ['Acne Studios','','Ms. Min','Sacai','Maison Margiela','Rick Owens','','Simone Rocha'],
			designerNames: ['Acne Studios','Ann Demeulemeester','Brandon Maxwell','Cedric Charlier','Christopher Kane','Comme des Gar&#231;ons','Creatures of the Wind','Haider Ackermann','Junya Watanabe','Leur Logette','Maison Margiela','Marques&#146;Almeida','Monse','Ms. Min','MSGM','NO. 21','Nocturne #22','noir kei ninomiya','Opening Ceremony','Public School','Rick Owens','Sacai','Simone Rocha','Thom Browne','Tome','1205'],
			vendorLinks: ['/The-Advanced/Acne-Studios/shop/_/N-52kdnt/Ne-52iqfl','/The-Advanced/Ms-Min/shop/_/N-52kdnv/Ne-52iqfl','/The-Advanced/Sacai/shop/_/N-52kdnq/Ne-52iqfl','/The-Advanced/Maison-Margiela/shop/_/N-52kdns/Ne-52iqfl','/The-Advanced/Rick-Owens/shop/_/N-52kdnw/Ne-52iqfl','/The-Advanced/Simone-Rocha/shop/_/N-52kdnr/Ne-52iqfl'],
			designerLinks: ['/The-Advanced/Acne-Studios/shop/_/N-52kdnt/Ne-52iqfl?','/The-Advanced/Ann-Demeulemeester/shop/_/N-52kdod/Ne-52iqfl?','/The-Advanced/Brandon-Maxwell/shop/_/N-52kdo8/Ne-52iqfl?','/The-Advanced/Cedric-Charlier/shop/_/N-52kdoa/Ne-52iqfl?','/The-Advanced/Christopher-Kane/shop/_/N-52kdpd/Ne-52iqfl?','/The-Advanced/Comme-De-Garcons/shop/_/N-52kdob/Ne-52iqfl?','/The-Advanced/Creatures-of-the-Wind/shop/_/N-52kdof/Ne-52iqfl?','/The-Advanced/Haider-Ackermann/shop/_/N-52kdog/Ne-52iqfl?','/The-Advanced/Junya-Wantanabe/shop/_/N-52kdoc/Ne-52iqfl?','/The-Advanced/Leur-Logette/shop/_/N-52kdoe/Ne-52iqfl?','/The-Advanced/Maison-Margiela/shop/_/N-52kdns/Ne-52iqfl?','/main/WorldOfDesigner.jsp?FOLDER<>folder_id=2534374306641041&PRODUCT<>prd_id=845524446508038&bmUID=jAhqbJ0&','/The-Advanced/Monse/shop/_/N-52kdoi/Ne-52iqfl?','/The-Advanced/Ms-Min/shop/_/N-52kdnv/Ne-52iqfl?','/The-Advanced/MSGM/shop/_/N-52kdoj/Ne-52iqfl?','/The-Advanced/NO-21/shop/_/N-52kdok/Ne-52iqfl?','/main/WorldOfDesigner.jsp?FOLDER<>folder_id=2534374306640953&PRODUCT<>prd_id=845524446508038&bmUID=jAhqbJ0&','/The-Advanced/Noir-Kei-Ninomiya/shop/_/N-52kdp5/Ne-52iqfl?','/The-Advanced/Opening-Ceremony/shop/_/N-52kdp2/Ne-52iqfl?','/The-Advanced/Public-School/shop/_/N-52kdp3/Ne-52iqfl?','/The-Advanced/Rick-Owens/shop/_/N-52kdnw/Ne-52iqfl?','/The-Advanced/Sacai/shop/_/N-52kdnq/Ne-52iqfl?','/The-Advanced/Simone-Rocha/shop/_/N-52kdnr/Ne-52iqfl?','/The-Advanced/Thom-Browne/shop/_/N-52kdp1/Ne-52iqfl?','/The-Advanced/Tome/shop/_/N-52kdp4/Ne-52iqfl?','/main/WorldOfDesigner.jsp?FOLDER<>folder_id=2534374306640987&PRODUCT<>prd_id=845524446508038&bmUID=jAhqbJ0&'],
			initialize : function(store){
				$.each( store, function ( index, value ) {
					editorialModel.slides.push( value.slide );
				});
				editorialModel.build();
			},
			build : function(){
				var drawerSlotNumber = 0; // used to put which drawer into specfic drawer-container
				var drawerCounter = 1; // used for drawer number counter
				//add section links 

				editorialModel.titleContainer.append("<a href='"+editorialModel.shopallUrl+"?sre="+editorialModel.realEstateTag+"HeaderShopAll'><img src='/static/images/editorial/advanced-designers/advanced-designers-title.jpg' alt='Advanced Designers title' /></a>");

				// Builds each slide and drawer-container in the right spot
				$.each(editorialModel.slides, function(index, value) {
					if (editorialModel.slides[index].sign) {
						editorialModel.mainContainer.append("<div id='section"+ (index + 1) +"' class='editorial-slide drawerLink' key='"+ drawerCounter +"'  data-retag='section"+ (index + 1) +":opendrawer'><div class='align-block'><img class='lazy' id='image"+ (index + 1) +"' data-original='"+editorialModel.slides[index].src+"' alt='"+editorialModel.slides[index].alt+"' /><div class='designer-name'>"+ editorialModel.linkingNames[index] +"</div><div class='styles'><span class='sign'> +</span></div></div></div>");
						drawerCounter++;
					} else {
						editorialModel.mainContainer.append("<div id='section"+ (index + 1) +"' class='editorial-slide'><div class='align-block'><img class='lazy' id='image"+ (index + 1) +"' data-original='"+editorialModel.slides[index].src+"' alt='"+editorialModel.slides[index].alt+"' /></div></div>");
						// Builds out the designer link located in one of the sections
						if (index == 6) {
							$('#image' + (index + 1)).after("<div class='designer-list'></div>");
							$.each(editorialModel.designerNames, function(index2, value2){
								$('.designer-list').append("<a href='"+ editorialModel.designerLinks[index2]+"sre="+editorialModel.realEstateTag+"Shop"+ value2.replace(/\s/g, "") +"PA'>"+value2+"</a>");
							});
							$('.designer-list').append("<a href='"+editorialModel.shopallUrl+"?sre="+editorialModel.realEstateTag+"DesignerListShopAll' class='editorial-cta'>SHOP ALL</a>");
						} else {
							$('#image'+ (index + 1)).after("<a href='"+editorialModel.shopallUrl+"?sre="+editorialModel.realEstateTag+"ShopAll' class='editorial-cta'>SHOP ALL</a>");
						}
					}

					// Builds the drawer-container after every section number which is divisble by 2
					if ((index+1)%2 == 0) {
						editorialModel.mainContainer.append("<div class='drawer-container'></div>");
					}
				});

				// Builds drawers into the right drawer-container
				drawerCounter = 1;
				$.each(editorialModel.slides, function(index, value) {
					if (editorialModel.slides[index].sign) {
						$(".drawer-container").eq(drawerSlotNumber).append("<div id='drawer"+ drawerCounter +"' class='drawer' overlaykey='"+ drawerCounter +"'><div class='sfa-drawer-nav-container'><div class='font-icon-close trigger' data-retag='drawer"+ drawerCounter +":closebutton'></div><div class='sfa-editorial-arrow navArrow navArrow-left'  data-direction='prev' data-retag='drawer"+ drawerCounter +":arrow5'><span class='font-icon-chevron-left'></span></div><div class='font-divider'></div><div class='sfa-editorial-arrow navArrow navArrow-right'  data-direction='next' data-retag='drawer"+ drawerCounter +":arrow6'><span class='font-icon-chevron-right'></span></div></div></div>");
						drawerCounter++;
					}
					if ((index+1)%2 == 0) {
						drawerSlotNumber++;
					}
				})		

				// Builds pricing information into each drawer from json file
				var jqxhr = $.get("/services/hotspots_to_json.jsp?hotpots_path=/Assortments/SaksMain/DynamicPricing/Editorial/TheAdvanced614", function(data){
					var allEditorialLooks = data.allEditorialLooks;
					var quicklook = data.quicklook;
					var hotspotIcon = data.hotspotIcon;
					var useShopThisLook = data.useShopThisLook;
					var thumbPath = 'http://image.s5a.com/is/image/saks/';
					var thumbSize = '?wid=175';
					var overlayParent = ['drawer1','drawer2','drawer3','drawer4','drawer5','drawer6','drawer7'];
					var parentIt = 0;
										
					object = $.parseJSON(jqxhr.responseText);
		
					$.each(allEditorialLooks, function( index, value ){
 						$("#"+overlayParent[index]).append("<div id='overlay" + (index + 1) + "' class='drawerStart'></div>");
 						
						//Fills in the carousel with images and text and link to quicklook	
						$.each(value, function( index2, value2 ){
 							$(".drawer[overlayKey='"+(index+1)+"']").find(".drawerStart").append("<div class='linelist'><a key='"+value2.itemProductCode+"|"+ value2.omnRealEstateBase+"' id='"+quicklook+"-"+value2.itemProductCode+"' href='#' class='jsModalBox'><span class='overlayThumbnail'><img src='"+thumbPath + value2.itemProductCode+thumbSize+"'/></span><span class='overlayText'>"+value2.standardText+" <span class='noWrapArrow soldOut_sale'>"+ value2.pricingText +"</span></span></a></div>");
     					});
					});
					
					// adds bio images and links
					$.each(editorialModel.slides, function(index, value) {
						if (editorialModel.slides[index].bio != "") {
							$("#"+overlayParent[parentIt]).append("<a class='bio-link' href='"+editorialModel.vendorLinks[parentIt]+"?sre="+editorialModel.realEstateTag+"Shop"+editorialModel.linkingNames[index].replace(/\s/g, "")+"Bio'><img src='"+editorialModel.slides[index].bio+"' alt='' /></a>");
							parentIt++;
						}
					});

				}).done(function(){
					$("#main-content").waitForImages({
						finished: function() {
							editorialModel.setUI();
						},
						each: function() {
						},
						waitForAll: true
					});
				});
			},
			setUI : function(){
				var slideshowCont = $('.sfa-editorial-slideshow');
				var hotSpotOverlay = $(".overlay", "#main-content");
				var drawerLink = $(".drawerLink");		
				var drawer = $(".drawer");
				var closeButton = $(".font-icon-close");
				var eleWithDataRetag = $("#main-content").find("*[data-retag]");
				var offsetHeight = $("#main-content").offset().top;
				var shopallLink = $("#section2 img");
				var locationLink = editorialModel.shopallUrl+"?sre="+editorialModel.realEstateTag+"ShopAll";

				slideshowCont.removeClass("hide-content");
				$('#editorial-footer').removeClass("hide-content");
				$(".sfa-editorial-loading").hide();

				eleWithDataRetag.on("click", function(e){
					e.stopPropagation;
					var element = e.currentTarget;
					var retag = $(element).attr('data-retag');
					setRealEstateTag(retag);
				});

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

				$("img.lazy").lazyload({
					effect : "fadeIn",
					load : function() {
						
					}
				});

				function scrolltoTop(scrollPos) {
					$('html, body').animate({
						scrollTop: scrollPos
					}, 1000);
				}

				scrolltoTop(offsetHeight);


				shopallLink.on("click", function(e){
					e.stopPropagation();
					location.href=locationLink;
				})


				drawerLink.on("click", function(e){ 
					e.stopPropagation();

					var ele = $(e.currentTarget);
					var imageKey = ele.attr("key");
					var workingDrawer = $('#drawer'+parseInt(imageKey));
				

					if(workingDrawer.parent().hasClass('open')){
						if (workingDrawer.hasClass('open')) {
							ele.find('.sign').text('+');
							workingDrawer.parent().removeClass('open')
							workingDrawer.removeClass('open').animate({"height":"0"});
						} else {
							$('.sign').text('+');
							ele.find('.sign').text('-');
							$(".drawer").removeClass('open').css({"height":"0"});
							workingDrawer.addClass('open').css({"height":"632px"});
						}
					}else{
						$(".drawer").removeClass('open').animate({"height":"0"}).parent().removeClass('open');
						$(".styles").find('.sign').text('+');
						ele.find('.sign').text('-');
						workingDrawer.parent().addClass('open');
						workingDrawer.addClass('open').animate({
							height: "632px"
						}, function(){
							$('html, body').animate({scrollTop: workingDrawer.offset().top});
						});

						
					}
				});

				closeButton.on("click", function(e){
					e.stopPropagation();
					$('.drawer').removeClass('open').animate({"height":"0"}).parent().removeClass('open');
					$('.styles').find('.sign').text('+');
				});

				drawer.find('a').not('.bio-link').on('click',function(e){
		    		e.preventDefault();
		        	e.stopPropagation();
		        	var b = $(this).attr('key').split('|');
		        	saksQuickLook.api.getQuicklook(b[0],b[1]);
		        	return false;	
		    	});

		    	hotSpotOverlay.find('a').on('click',function(e){
		    		e.preventDefault();
		        	e.stopPropagation();
		        	var b = $(this).attr('key').split('|');
		        	saksQuickLook.api.getQuicklook(b[0],b[1]);
		        	return false;	
		    	});

				$('.overlay').click(function(e){
					e.stopPropagation();
				});


				//pinterest    		
				
				$('.sfa-editorial-social').find('.pinterest a').click(function(){
					var imgArray = { 
						images: []
					};
					var i=0;		            
					while (editorialModel.slides[i]) {                   
						imgArray.images.push({
							"src":editorialModel.slides[i].src,
							"alt":"Introducing The Advance @saks.com. Today's visionary designers, defining fashion for tomorrow."
						});						
						i++;		                
					};

					UTIL.pinterest.addPinMarklet({
						images : imgArray.images
					});

					return false;
				});

				$('.drawerStart').on('init', function(event, slick, currentSlide, nextSlide){
				  	$('.slick-dots button').on('click', function(e){
						e.stopPropagation();
						e.preventDefault();
						return false;
					});
				});

				$.each($(".drawerStart"), function(index, value){
					$(value).slick({
						dots: true,
						infinite: true,
						slidesToShow: 5,
						slidesToScroll: 5,
						prevArrow: $("#drawer"+(index+1)+" .navArrow-left"),
						nextArrow: $("#drawer"+(index+1)+" .navArrow-right")
					});
				});			
			}
	};
	$(document).ready(function(){   	    
		var path = '/static/images/editorial/advanced-designers/';
		var store = [{
			slide: { src: path + 'advanced-designers-acne-studios.jpg', bio: path + 'advanced-designers-acne-studios-bio.jpg', alt: 'Acne clothing and more designer fashion brands at saks.', sign: true}
			},{
			slide: { src: path + 'advanced-designers-shop-all.jpg', bio: '', alt: 'Luxury fashion from top fashion houses at saks.com. ', sign: false}
			},{
			slide: { src: path + 'advanced-designers-ms-min.jpg', bio: path + 'advanced-designers-ms-min-bio.jpg', alt: 'Ms. min plus more top fashion designers at saks fifth avenue.', sign: true}
			},{
			slide: { src: path + 'advanced-designers-sacai.gif', bio: path + 'advanced-designers-sacai-bio.jpg', alt: 'Sacai and more luxury fashion brands at saks 5th avenue.', sign: true}
			},{
			slide: { src: path + 'advanced-designers-maison-margiela.jpg', bio: path + 'advanced-designers-maison-margiela-bio.jpg', alt: 'Maison margiela haute couture at saks fifth ave.', sign: true}
			},{
			slide: { src: path + 'advanced-designers-rick-owens.jpg', bio: path + 'advanced-designers-rick-owens-bio.jpg', alt: 'Rick owens shoes and high fashion dresses at saks 5th ave.', sign: true}
			},{
			slide: { src: path + 'the-designers-title.png', bio: '', alt: '', sign: false}
			},{
			slide: { src: path + 'advanced-designers-simone-rocha.jpg', bio: path + 'advanced-designers-simone-rocha-bio.jpg', alt: 'Simone rocha shoes and mini dresses at saksfifthavenue.', sign: true}
			}];	
		editorialModel.initialize(store);
	});
	
})(jQuery);

</script>


</body>
</html>

