// TODO: make this a jQuery Plugin
$(document).ready(function(){

    // set a duration for all tweens
    var globalTweenTime = 1.2;
    var navHeight = $('#dsg-editorial.dsg-editorial nav').height();

    // init Scroll Magic controller
    // only one controller is needed per scroll container (default: window)
    var scrollController = new ScrollMagic.Controller();

    // wrap nav pin scene in a function to call during window resize bugfix
    function createNavPinScene() {
        return new ScrollMagic.Scene({
            // triggerElement: top of sticky nav
            triggerElement: "#sticky-nav",
            // triggerHook: 0 == top of screen
            triggerHook: 0
        })
            .setPin("#sticky-nav")
            .addTo(scrollController);
    }
    
    // create nav pin scene
    var navPin = createNavPinScene();

    // fixes window resize bug
    $(window).on('resize', function() {
        navPin.destroy(true);
        navPin = createNavPinScene();
    });

    // changes behaviour of controller from instant jump to animated scroll
    scrollController.scrollTo(function (newpos, scrollduration) {

        // if back to top, no nav height offset
        if (newpos == 0) {
            var offset = 0;
        } else {
            var offset = navHeight;
        };
         
        // animate scroll
        TweenLite.to(window, scrollduration, {
            scrollTo: {y: (newpos - offset), autoKill: false}, 
            ease: Power3.easeInOut
        });

    });

    // bind scroll to anchor links
    $(document).on("click", "a[href^='#']", function (e) {
        e.preventDefault();
        
        var id = $(this).attr("href");

        // back to top
        if (id == '#') {
            scrollController.scrollTo(0, globalTweenTime);
        }

        // if element with id exists 
        if ($(id).length > 0) {
            scrollController.scrollTo(id, globalTweenTime);
        }

    });

});