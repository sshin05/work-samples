/**
 * Back to Top Component
 * @author: Joseph Luzquinos
 * @argument: selector, speed
 * @sample: <img class="responsive-image" data-desktop="<%=img('header-slide.png')%>" data-mobile="<%=img('header-slide-mobile.png')%>" alt="This is the alt." src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
 */
class BackToTop{
    constructor(selector = ''){
        if(selector == ''){
            window.console.log('Error: Enter selector: new BackToTop(selector, speed)');
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
