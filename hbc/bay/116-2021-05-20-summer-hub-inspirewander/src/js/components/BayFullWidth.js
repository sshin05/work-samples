/**
 * Bay Fullscreen Fix
 * @author: Joseph Luzquinos
 */
class BayFullWidth{
    constructor(){
        this.w = window;
        this.d = document;
        this.init();
    }

    init(){
        if(this.w.location.hostname !== "localhost"){
            try{
                let homeSlots = this.d.querySelector('.secondary-content .home-slots');
                homeSlots.style.maxWidth  = '100%';
                homeSlots.style.padding   = '0px';
                this.d.querySelector('.html-slot-container').style.paddingLeft   = '0';
                this.d.querySelector('.html-slot-container').style.paddingRight  = '0';
            }catch(err){
                console.log(err);
            }
        }
    }
}

export default BayFullWidth;