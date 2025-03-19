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
            let homeSlots = this.d.querySelector('.secondary-content .home-slots');
            console.log('aaa');
            homeSlots.style.maxWidth  = '100%';
            homeSlots.style.padding   = '0px';
            this.d.querySelector('.html-slot-container').style.paddingLeft   = '0';
            this.d.querySelector('.html-slot-container').style.paddingRight  = '0';
        }
    }
}

export default BayFullWidth;
