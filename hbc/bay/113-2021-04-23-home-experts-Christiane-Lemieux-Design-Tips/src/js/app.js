import BackToTop from './components/BackToTop';
// import BayFullWidth from './components/BayFullWidth';
import FedTabs from './components/FedTabs';
import Album from './components/album';

class App{
    constructor(){
        console.log('From App!');
        this.init();
    }

    init(){
        new FedTabs();

        //Make Editorial full width for SFCC
        // new BayFullWidth()

        //Back to tops
        new BackToTop('.custom-back-to-top');

        //Album
        new Album
    }
}



//Start App
const MyApp = new App();
