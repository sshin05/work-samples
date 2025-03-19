/**
 * @preserve
 * HBC Digital - Editorial
 * Holiday Gift Guide
 * @author: Joseph Luzquinos
 */
import fullpage from 'fullpage.js';
//import moveStaticContent from './moveStaticContent';

class FullPageComponent{
    constructor(){
        this.w = window;
        this.d = document;
        this.init();
    }

    init(){
        this.theApp();
    }

    theApp(){
        //Editorial container
        let this_ = this;
        let editorialcontainer = this.d.querySelector('#dsg-editorial.dsg-editorial');
        let shopCatalogues = this.d.querySelector('.shop-catalogues');
        let fadeInSpeed = 1200;
        let fadeOutSpeed = 500;

        $('.back-to-hp').on('click', function(){
            this_.w.location.href = $(this).attr('href');
        });

        //
        $('.home-slots>*:last-child:not(:empty)').css({
            marginBottom:0,
            marginTop:0
        });

        let myFullPage = new fullpage('#bay-fullpage', {
            licenseKey    : '03DC3AAF-4C6A47E5-B72CCA75-928BAFDF',
            autoScrolling : true,
            anchors       : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            animateAnchor : false,
            navigation    : true,
            //sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'], //for testing
            afterLoad     : function(origin, destination, direction){
                //Do not display the on first section
                // if(destination.index == 0){
                //     shopCatalogues.style.display = 'none';
                // }else{
                //     shopCatalogues.style.display = 'block';
                // }
            },
            onLeave (origin, destination, direction){
                if( $(window).width() >= 1024 ){
                    //Fade out
                    $('.text-section0').fadeOut(fadeOutSpeed);
                    $('.text-section1').fadeOut(fadeOutSpeed);
                    $('.text-section2').fadeOut(fadeOutSpeed);
                    $('.text-section3').fadeOut(fadeOutSpeed);
                    $('.text-section4').fadeOut(fadeOutSpeed);
                    $('.text-section5').fadeOut(fadeOutSpeed);
                    $('.text-section6').fadeOut(fadeOutSpeed);
                    $('.text-section7').fadeOut(fadeOutSpeed);
                }

                //Display on section
                if(destination.index == 0){
                    $('.text-section0').fadeIn(fadeInSpeed);
                }

                if(destination.index == 1){
                    $('.text-section1').fadeIn(fadeInSpeed);
                }

                if(destination.index == 2){
                    $('.text-section2').fadeIn(fadeInSpeed);
                }

                if(destination.index == 3){
                    $('.text-section3').fadeIn(fadeInSpeed);
                }

                if(destination.index == 4){
                    $('.text-section4').fadeIn(fadeInSpeed);
                }

                if(destination.index == 5){
                    $('.text-section5').fadeIn(fadeInSpeed);
                }

                if(destination.index == 6){
                    $('.text-section6').fadeIn(fadeInSpeed);
                }

                if(origin.index == 7 && direction == "down"){
                    $('.arrow-back-to-top').css('display','flex');
                    $('.arrow-down').css('display','none');
                }

                if(origin.index == 8 && direction == "up"){
                    $('.arrow-back-to-top').fadeOut();
                    $('.arrow-down').fadeIn();
                }

                if(destination.index == 7){
                    $('.text-section7').fadeIn(fadeInSpeed);
                }

                //show nav on desktop
                $('#fp-nav').show();

                //hide nave on mobile
                if(destination.index == 0){
                    
                }else{
                    if( $(window).width() < 1024 ){
                        setTimeout(()=>{
                            $('#fp-nav').fadeOut();
                        },2000); 
                    }
                }
            }
        });

        let fullPageNav = this.d.querySelector('#fp-nav');

        //display after load
        editorialcontainer.style.visibility = 'visible';
        
        //Move nav to editorial
        editorialcontainer.appendChild(fullPageNav); 


        //GO to next slide
        $('.arrow-down').on('click', function(){
            fullpage_api.moveSectionDown();
        });

        //Back to home page
        $('.back-to-hp').on('click',function(e){
            e.preventDefault();
            player.pauseVideo();
        });

        //Back to top
        this.d.querySelector('.arrow-back-to-top img').addEventListener('click', (e)=>{
            fullpage_api.moveTo(1);
        });
    }
}

export default FullPageComponent;
