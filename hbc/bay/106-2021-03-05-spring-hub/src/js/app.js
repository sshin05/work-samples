import BaySalesforceRemove from './components/BaySalesforceRemove';
import FullPageComponent from './components/FullPageComponent/FullPageComponent';
import ChangeBackgroundColor from './components/FullPageComponent/ChangeBackgroundColor';
import BayFullWidth from './components/BayFullWidth';

/**
 * @preserve
 * HBC Digital - Editorial
 * Full Page Experience
 * @author: Joseph Luzquinos
 */
class App{
    constructor(){
        console.log('From App!');
        this.d = document;
        this.w = window;
        this.init();
    }

    init(){
        new BayFullWidth();

        //Clear Editorial page
        new BaySalesforceRemove();

        // Start Full Page Component
        new FullPageComponent();

        // Replace bg colors on hover
        new ChangeBackgroundColor();

        // Reload on rezize
        // this.w.addEventListener('resize', ()=>{
        //     location.reload();
        // });

        this.d.querySelector('#dsg-editorial.dsg-editorial').style.display = 'block';
        this.d.querySelector('.editorial-spinner').style.display = 'none';
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        //Start App
        const MyApp = new App();
    }
};