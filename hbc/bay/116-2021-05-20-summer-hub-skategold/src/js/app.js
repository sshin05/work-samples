import BaySalesforceRemove from './components/BaySalesforceRemove';
import FadeInOnScroll from './components/FadeInOnScroll';
import BayFullWidth from './components/BayFullWidth';
//import BackToTop from './components/BackToTop';
//import ResponsiveImage from './components/ResponsiveImage';
//import Router from './components/Router';

class App{
    constructor(){
        console.log('App started!');
        this.init();
    }

    init(){
        //Clear Editorial page
        new BaySalesforceRemove();

        //Make full width
        new BayFullWidth();
        
        //Load Main carousel
        

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
