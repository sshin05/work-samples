//import BackToTop from './components/BackToTop';
//import ResponsiveImage from './components/ResponsiveImage';
//import Router from './components/Router';
import FedTabs from './components/FedTabs';

class App{
    constructor(){
        console.log('App started!');
        this.init();
    }

    init(){
        new FedTabs();
    }
}

//Start App onload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const MyApp = new App();
        console.log('App loaded!');
    }
};
