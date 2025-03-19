/**
 * Responsive Image Component
 * @author: Joseph Luzquinos
 * @argument: options (Object)
 */

class ResponsiveImage{
    constructor( options = {} ){
        this.w       = window;
        this.d       = document;
        this.options = { ...this.defaultOptions(), ...options };
        this.init();
    }

    defaultOptions(){
        return {
            breakpoint : 960,
            selector   : '.responsive-image'
        };
    }

    init(){
        this.setImages();
    }

    setImages(){
        let _this = this;

        _this.d.querySelectorAll(this.options.selector).forEach( (image)=>{
            let desktop = image.getAttribute('data-desktop');
            let mobile  = image.getAttribute('data-mobile');
            let setImage = ()=>{
                let src = image.getAttribute('src');

                if( _this.w.innerWidth > _this.options.breakpoint ){
                    if(src !== desktop){
                        image.setAttribute('src', desktop);
                    }
                }else{
                    if(src !== mobile){
                        image.setAttribute('src', mobile);
                    }
                }
            };

            //On Load
            _this.w.addEventListener('load', ()=>{
                setImage();
            });

            //On Resize
            _this.w.addEventListener('resize', ()=>{
                setImage();
            });
        });
    }
}

export default ResponsiveImage;
