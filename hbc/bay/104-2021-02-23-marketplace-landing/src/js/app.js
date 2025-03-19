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



        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
        }


    }
};
