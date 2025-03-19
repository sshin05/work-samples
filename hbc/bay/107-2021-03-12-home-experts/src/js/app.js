import BackToTop from './components/BackToTop';
import BayFullWidth from './components/BayFullWidth';
import FedTabs from './components/FedTabs';

class App{
    constructor(){
        console.log('From App!');
        this.init();
    }

    init(){
        new FedTabs();

        //Make Editorial full width for SFCC
        new BayFullWidth()

        //Back to tops
        new BackToTop('.custom-back-to-top', '.custom-back-to-top2', '.custom-back-to-top3');
        //new BackToTop('.custom-back-to-top2');
        //new BackToTop('.custom-back-to-top3');

        /*$('#hbc-carousel').hbcCarousel({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            adaptiveHeight: true,
            dots: true
        });*/
    }
}

//Start App
const MyApp = new App();
