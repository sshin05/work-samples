/**
 * Back to Top Component
 * @author: Eran Bendheim
 * @argument: selector, speed
 * @sample:
 */
class FadeInOnScroll{
    constructor(selector = ''){
        // if(selector == ''){
        //     window.console.log('Error: Enter selector: new BackToTop(selector)');
        //     return false;
        // }
        // this.w = window;
        // this.d = document;
        // this.selector = this.d.querySelector(selector);
        this.init();
    }

    init(){
        this.fadeInOnScroll();
    }

    fadeInOnScroll(){

        $(window).scroll(function() {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight();
            $(".fadeIn").each(function() {
              /* Check the location of each desired element */
              var objectBottom = $(this).offset().top + $(this).outerHeight();
              
              /* If the element is completely within bounds of the window, fade it in */
              if (objectBottom - 500 < windowBottom) { //object comes into view (scrolling down)
                if ($(this).css("opacity")==0) {$(this).fadeTo(1000,1);}
              } 
            //   else { //object goes out of view (scrolling up)
            //     if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
            //   }
            });

            // show nav 
            if ($(this).scrollTop()>100){
              $(".sec__nav").addClass('fadein');
            }else{
              $(".sec__nav").removeClass('fadein');
            }
          }).scroll(); //invoke scroll-handler on page-load

    }
}

export default FadeInOnScroll;
