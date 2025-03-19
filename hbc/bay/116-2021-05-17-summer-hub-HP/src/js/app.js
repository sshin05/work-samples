import BaySalesforceRemove from './components/BaySalesforceRemove';
import FadeInOnScroll from './components/FadeInOnScroll';
// import BackToTop from './components/BackToTop';
import BayFullWidth from './components/BayFullWidth';

class App{
    constructor(){
        console.log('From App!');
        this.init();
    }

    init(){
        //Clear Editorial page
        new BaySalesforceRemove();

        //Make full width
        new BayFullWidth();
        
        //Load Main carousel
        $('.hbc-carousel').slick({
            arrows:false,
            autoplay:true,
            fade: false,
            speed:0,
            autoplaySpeed: 2000,
            infinite: true,
            cssEase: 'ease-in-out',
            touchThreshold: 100
        });

        // //Back to top
        // new BackToTop('.sec__footer');

        // fade in on scroll
        new  FadeInOnScroll();
    }
}

//Start App onload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const MyApp = new App();
        console.log('App loaded!');
    }
};
