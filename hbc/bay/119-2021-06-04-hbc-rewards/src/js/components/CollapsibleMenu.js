/**
 * Collapsible Menu
 * @author: Eran Bendheim
 * @sample:
 */
class CollapsibleMenu{
    constructor(){
        this.init();
    }

    init(){
            this.animateCollapsibleMenu();
    }

    animateCollapsibleMenu(){
        $('.faqElement').click(function() {
            var faqElement = $(this);
            var question = faqElement.find('.faqQuestion');
            var answer = faqElement.find('.faqAnswer');
            faqElement.removeClass('flipButton');
            if (!answer.hasClass('activeFaqAnswer')) {
              $('.faqElement').removeClass('flipButton');
              faqElement.addClass('flipButton');
              $('.activeFaqAnswer').css('max-height', '');
              $('.faqAnswer').removeClass('activeFaqAnswer');
              answer.css('max-height', 'none');
              answer.css('max-height', answer.height());
              answer.addClass('activeFaqAnswer');
            }else {
                $('.activeFaqAnswer').css('max-height', '');
                $('.activeFaqAnswer').removeClass('activeFaqAnswer');
            }
        });


        $( window ).resize(function() {
            $('.faqElement.flipButton').removeClass('flipButton');
            $('.activeFaqAnswer').css('max-height', '');
            $('.activeFaqAnswer').removeClass('activeFaqAnswer');
        });

    }

}

export default CollapsibleMenu;
