// import BackToTop from './components/BackToTop';
// import ResponsiveImage from './components/ResponsiveImage';
// import Router from './components/Router';
// import ScrollMagic from 'scrollmagic';

class App{
    constructor(){
        console.log('from class!');
        this.init();
    }

    init(){

        // var controller = null;
        // var scrollMagicInit = false;
        
        // function initScrollMagic(){
        //     if (!scrollMagicInit){
        //     $.each($("section"), function(index,value){
        //         console.log (index);
        //         var postDetails = $(value).find(".not-sticky")[0];
        //         var postSidebar = $(value).find(".sticky-col")[0];
        //         var postSidebarContent = $(value).find(".sticky-col > div")[0];

        //         // console.log(postSidebarContent);
        //         // console.log(postDetails.offsetHeight - postSidebarContent.offsetHeight);

        //         controller = new ScrollMagic.Controller();
        //         var scene = new ScrollMagic.Scene({
        //         triggerElement: postSidebar,
        //         triggerHook: 0,
        //         duration: getDuration
        //         })
        //         //.addIndicators({name: "1 (duration: "+getDuration()+")"})
        //         .addTo(controller);


        //         controller.scrollPos(function () {
        //             if(window.innerWidth >= 768){
        //               return window.pageYOffset;
        //             } else {
        //               return 0;
        //             }
        //           });


        //         if (window.matchMedia("(min-width: 768px)").matches) {
        //          scene.setPin(postSidebar, {pushFollowers: false});
        //         }else {
        //             //destoryScrollMagic();
        //         }
            

        //         function getDuration() {
        //             //console.log(postDetails.offsetHeight)
        //             //console.log(postDetails.offsetHeight + " : " + postSidebarContent.offsetHeight);
        //             var valueCal = postDetails.offsetHeight - postSidebar.offsetHeight;
        //             if (valueCal < 0) {
        //                 valueCal = -valueCal;
        //               }
        //         return valueCal;
        //         }
            
        //     });
        //     }
        //     scrollMagicInit = true;
        // }

        // function destoryScrollMagic() {
        //     $.each($("section"), function(index,value){
        //         // console.log (index);
        //         // console.log('>>>>> ', controller);
        //         if(!controller){
        //             controller = controller.destroy(true);
        //             controller.destroy(reset);
        //             controller = null;
        //         }
        //     });
        //     // $('.scrollmagic-pin-spacer').css("width", "100%").css("margin-left", "0");
        // }
        // setTimeout(function(){ 
        //     console.log("triger-timer");
        //     document.documentElement.scrollTop = 0     
        //     initScrollMagic(); 
        // }, 3000);

        // $(window).on("load", function() {
        //     if (window.matchMedia("(min-width: 768px)").matches) {
        //         console.log ('initiated scroll magic LOAD');
        //         initScrollMagic();
        //     }
        // });

        // $(window).on("resize", function() {
        //     if (window.matchMedia("(min-width: 768px)").matches) {
        //         console.log ('initiated scroll magic RESIZE');
        //         initScrollMagic();
        //     }
        // });

    }
}

//Start App onload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const MyApp = new App();
    }
};