// import BackToTop from './components/BackToTop';
// import ResponsiveImage from './components/ResponsiveImage';
// import Router from './components/Router';
// import ScrollMagic from 'scrollmagic';

class App{
    constructor(){
        console.log('from class!');
        this.init();
    }

    init(){


 /*
                Custom navigation code
                - Adds sticky navigation
                - Accounts for global navigation during scroll up
                TO DO: Add link treatments dependent on where the scroll position is located

                - brucewillis
            */
           var initialPos = $("#NAVIGATION").offset().top + $("#NAVIGATION").height(); //initial position of the navigation on load
           var winPos = $(window).scrollTop(); // initial window position

         
           /*!
           * Run a callback after the user scrolls, calculating the distance and direction scrolled
           * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
           * @param  {Function} callback The callback function to run
           * @param  {Integer}  refresh  How long to wait between scroll events [optional]
           */
           var scrollDistance = function (callback, refresh) {

           // Make sure a valid callback was provided
           if (!callback || typeof callback !== 'function') return;

           // Variables
           var isScrolling, start, end, distance;

           // Listen for scroll events
           window.addEventListener('scroll', function (event) {
               $("#NAVIGATION").removeClass("down");
               // Set starting position
               if (!start) {
                   start = window.pageYOffset;
               }

               // Clear our timeout throughout the scroll
               window.clearTimeout(isScrolling);

               // Set a timeout to run after scrolling ends
               isScrolling = setTimeout(function() {

                   // Calculate distance
                   end = window.pageYOffset;
                   distance = end - start;

                   // Run the callback
                   callback(distance, start, end);

                   // Reset calculations
                   start = null;
                   end = null;
                   distance = null;

               }, refresh || 33);

           }, false);

           };

           scrollDistance(function (distance) {
           console.log('You travelled ' + parseInt(Math.abs(distance), 10) + 'px ' + (distance < 0 ? 'up' : 'down'));
              
           // });
           // $(window).scroll(function(){


               var scrollDistance = parseInt(Math.abs(distance), 10);
               //console.log($(window).scrollTop());
               // This starts the sticky nav when the window scroll position is past the original navigation position
               if ($(window).scrollTop() >= initialPos) { 
                   //console.log('scrolling below',initialPos);
                   //console.log('entered here 2');
                   // Makes the navbar sticky
                   $("#NAVIGATION").addClass("setPin");

                   // Checks for scroll direction to adjust local nav bar position from global nav
                   var scrollPos = $(window).scrollTop(); 
                   console.log('winPos ', scrollPos > winPos);
                   if(scrollPos > winPos) {
                       // console.log('scrollDown');
                       // console.log(scrollPos);
                       $("#NAVIGATION").removeClass("down");
                   } else {
                       //console.log('scrollUp');
                       if(scrollDistance >80 && window.pageYOffset > 1800){
                           setTimeout(function(){ 
                               $("#NAVIGATION").addClass("down");
                           }, 150);
                       }else{
                           $("#NAVIGATION").removeClass("down");
                       }
                   }
                   winPos = scrollPos;
               } else {
                   //console.log('entered here 3');
                   // Removes the sticky class and makes the nav bar static to its original position
                   $("#NAVIGATION").removeClass("setPin");
                   $("#NAVIGATION").removeClass("down");
               }

               
           });


        
    }
}

//Start App onload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const MyApp = new App();
        console.log('App Started!');
    }
};