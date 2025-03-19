// import BackToTop from './components/BackToTop';
// import BayFullWidth from './components/BayFullWidth';
// import FadeInOnScroll from './components/FadeInOnScroll';
import CollapsibleMenu from './components/CollapsibleMenu';


class App{
    constructor(){
        console.log('From App!');
        this.init();
    }

    init(){
        //Make full width
        // new BayFullWidth();
        
        //Load Main carousel
        // $('.hbc-carousel').slick({
        //     arrows:true,
        //     autoplay:true
        // });

        //Back to top
        // new BackToTop('.sec__footer');

        //Fade In On Scroll
        // new FadeInOnScroll();

        //Fade In On Scroll
        new CollapsibleMenu();
    }
}

//Start App onload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const MyApp = new App();
        console.log('App loaded!');
    }
};
