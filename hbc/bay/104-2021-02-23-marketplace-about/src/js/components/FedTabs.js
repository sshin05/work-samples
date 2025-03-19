/**
 * FED Tabs
 * @author: Joseph Luzquinos
 * @argument:
 * @sample:
 */
class FedTabs{
    constructor(selector = '.fed-tabs'){
        if(selector == ''){
            window.console.log('Error: Enter selector: new FedTabs(selector)');
            return false;
        }

        this.selectors = document.querySelectorAll(selector);
        this.buttonClass          = 'fed-tabs__buttons-button';
        this.containerClass       = 'fed-tabs__container-section';
        this.buttonClassActive    = 'fed-tabs__buttons-active';
        this.containerClassActive = 'fed-tabs__container-active';
        this.init();
    }

    init(){
        this.eachTab();
    }

    eachTab(){
        this.selectors.forEach((selector, index)=>{
            this.tab(selector, index);
        });
    }

    tab(selector, index){
        let _this = this;
        let tabButtons = selector.querySelectorAll(`.${this.buttonClass}`);
        let sections   = selector.querySelectorAll(`.${this.containerClass}`);
        let intro   = selector.querySelectorAll(`.${this.introScreen}`);

        tabButtons.forEach((el, i)=>{
            el.addEventListener('click', function(e){
                e.preventDefault();

                //Clear buttons
                _this.clearButtons(tabButtons);

                //Add active class
                this.classList.add('fed-tabs__buttons-active');

                //Clear sections
                _this.clearSections(sections);

                //Add active class
                sections[i].classList.add('fed-tabs__container-active');

            });
        });
    }

    clearButtons(buttons){
        buttons.forEach((el, i)=>{
            if( el.classList.contains('fed-tabs__buttons-active') ){
                el.classList.remove('fed-tabs__buttons-active');
            }
        });
    }

    clearSections(sections){
        sections.forEach((el, i)=>{
            if( el.classList.contains('fed-tabs__container-active') ){
                el.classList.remove('fed-tabs__container-active');
            }
        });
    }

}

export default FedTabs;
