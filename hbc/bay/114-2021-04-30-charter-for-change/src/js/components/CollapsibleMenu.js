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

            /////// for logo copy display
            this.showCopy();
            $( ".partners li:first img" ).trigger( "click" );
    }

    animateCollapsibleMenu(){
        $('.faqElement').click(function() {
            var faqElement = $(this);
            var question = faqElement.find('.faqQuestion');
            var answer = faqElement.find('.faqAnswer');
            if (!answer.hasClass('activeFaqAnswer')) {
              $('.faqElement').removeClass('flipButton');
              faqElement.addClass('flipButton');
              $('.activeFaqAnswer').css('max-height', '');
              $('.faqAnswer').removeClass('activeFaqAnswer');
              answer.css('max-height', 'none');
              answer.css('max-height', answer.height());
              answer.addClass('activeFaqAnswer');
            }
        });
    }

    showCopy(){
        $('.partners li img').click(function(){
            $('.partnersCopy li').css('display','none');
            $('.partners li img').css('opacity','.5');
            $('.partnersCopy #content' + this.id ).css('display','block');
            $(this).css('opacity','1');
        });
    }
}

export default CollapsibleMenu;
