/**
 * Back to Top Component
 * @author: Joseph Luzquinos
 * @argument: selector, speed
 * @sample:
 */
class BackToTop{
    constructor(selector = ''){
        if(selector == ''){
            window.console.log('Error: Enter selector: new BackToTop(selector)');
            return false;
        }
        this.w = window;
        this.d = document;
        this.selector = this.d.querySelector(selector);
        this.init();
    }

    init(){
        this.selector.addEventListener('click', (e)=>{
            e.preventDefault();
            this.animateToTop();
        });
    }

    animateToTop(){

        this.w.scroll({top: 0, left: 0, behavior: 'smooth'});

    }
}

export default BackToTop;
