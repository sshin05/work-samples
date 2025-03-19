import BackToTop from './components/BackToTop';
import BayFullWidth from './components/BayFullWidth';

class App{
    constructor(){
        console.log('From App!');
        this.init();
    }

    init(){
        //Make full width
        new BayFullWidth();
        
        //Load Main carousel
        $('.hbc-carousel').slick({
            arrows:false,
            autoplay:true
        });

        //Back to top
        new BackToTop('.sec__footer');
    }
}

//Start App onload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const MyApp = new App();
        console.log('App loaded!');
    }
};
