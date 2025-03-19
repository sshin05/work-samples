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
        new BackToTop('.custom-back-to-top', '.custom-back-to-top2', '.custom-back-to-top3', '.custom-back-to-top4', '.custom-back-to-top5', '.custom-back-to-top6');


        $('#hbc-carousel').hbcCarousel({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            adaptiveHeight: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1023,
                    settings: {
                        arrows: true,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>'

                    }
                }
            ]
        });
    }
}

//Start App
const MyApp = new App();
