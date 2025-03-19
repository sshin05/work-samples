/**
 * Bay Fullscreen Fix
 * @author: Joseph Luzquinos
 * @argument:
 * @sample:
 */
class BayFullWidth{
    constructor(selector = ''){
        // if(selector == ''){
        //     window.console.log('Error: BayFullWidth)');
        //     return false;
        // }
        this.w = window;
        this.d = document;
        //this.selector = this.d.querySelector(selector);
        this.init();
    }

    init(){
        if(this.w.location.hostname !== "localhost"){
            this.d.querySelector('.home-slots')
                .style.cssText  = 'max-width:100%; padding:0;';
            this.d.querySelector('.html-slot-container').style.paddingLeft   = '0';
            this.d.querySelector('.html-slot-container').style.paddingRight  = '0';
        }
    }
}

export default BayFullWidth;