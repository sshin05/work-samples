import BackToTop from './components/BackToTop';
//import ResponsiveImage from './components/ResponsiveImage';
//import Router from './components/Router';

class App{
    constructor(){
        console.log('From App!');
        this.init();
    }

    init(){
        //Back to Top
        //new BackToTop('.test-back-to-top');

        // Router
        // new Router({
        //     'page4': ()=>{
        //         console.log('Router: This is page4');
        //     },
        //     'page5': ()=>{
        //         console.log('Router: This is page5');
        //     }
        // });

        //HBC Carousel
        //$('#hbc-carousel').hbcCarousel();
    }
}

//Start App
const MyApp = new App();
