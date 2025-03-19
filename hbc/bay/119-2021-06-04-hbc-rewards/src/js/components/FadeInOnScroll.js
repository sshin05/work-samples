/**
 * Fade In On Scroll Component
 * @author: Eran Bendheim
 * @sample:
 */
class FadeInOnScroll{
    constructor(){
        this.init();
    }

    init(){
        this.animateFadeInOnScroll();
    }

    animateFadeInOnScroll(){
        $(document).on("scroll", function() {
          var pageTop = $(document).scrollTop();
          var pageBottom = pageTop + $(window).height();
          var tags = $(".logoOverportrait");
        
          for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
        
            if ($(tag).position().top < pageBottom) {
              $(tag).addClass("visible");
              $(".logoOverportrait").fadeIn(1500);
            } else {
              $(tag).removeClass("visible");
            }
          }
          /////stickynav
          if (pageTop > 110){
            $('.sec__nav').addClass('scrolled');
          }else{
            $('.sec__nav').removeClass('scrolled');
          }
        });

    }
}

export default FadeInOnScroll;
