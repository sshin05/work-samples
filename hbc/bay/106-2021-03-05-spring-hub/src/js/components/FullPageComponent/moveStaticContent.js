/**
 * moveStaticContent
 * @author: Joseph Luzquinos
 * @argument: selector, speed
 */
class moveStaticContent{
    constructor(){
        this.w = window;
        this.d = document;
        this.init();
    }

    init(){
        this.moveContent();
    }

    moveContent(){
        //Static Container
        //let staticContainer = this.d.querySelector('.static-sections');
        
        //Section 2
        //staticContainer.appendChild( this.d.querySelector('.text-wrapper.text-section2') );

        //Section 3
        // staticContainer.appendChild( this.d.querySelector('.text-wrapper.text-section3') );

        // //Section 4
        // staticContainer.appendChild( this.d.querySelector('.text-wrapper.text-section4') );

        // //Section 5
        // staticContainer.appendChild( this.d.querySelector('.text-wrapper.text-section5') );

        // //Section 6
        // staticContainer.appendChild( this.d.querySelector('.text-wrapper.text-section6') );

        // //Section 7
        // staticContainer.appendChild( this.d.querySelector('.text-wrapper.text-section7') );

        
    }
}

export default moveStaticContent;
