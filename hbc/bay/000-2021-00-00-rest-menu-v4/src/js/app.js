//import BackToTop from './components/BackToTop';
//import ResponsiveImage from './components/ResponsiveImage';
//import Router from './components/Router';
//import _ from 'lodash';

class App{
    constructor(){
        console.log('From App!');
        //window._ = _;
        this.init();
    }

    init(){
        $('.main_menu').restMenu({
            //dataDocName:"HB_Womens_Designer_brandnav"
            dataDocName:"HB_Womens_Designer_brandnav_SF"
        });
    }
}

//Start App onload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const MyApp = new App();
        console.log('App loaded!');
    }
};
