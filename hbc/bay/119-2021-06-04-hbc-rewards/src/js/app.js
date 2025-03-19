import CollapsibleMenu from './components/CollapsibleMenu';

class App{
    constructor(){
        console.log('From App!');
        this.init();
    }

    init(){
     

        const observer = new IntersectionObserver(entries => {
            // Loop over the entries
            entries.forEach(entry => {
              // If the element is visible
              if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('text-transition');
              }
            });
          });
          observer.observe(document.querySelector('.text'));
          observer.observe(document.querySelector('.text2'));

          new CollapsibleMenu();

          // $('.hbc-carousel-bay').on('init', function(event, slick){

          // });

    }
}

//Start App onload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const MyApp = new App();
        var myVar = setInterval(myTimer, 1000);

        function myTimer() {
          $('.preloading').hide();
          $('.dsg-editorial').removeClass('fade-out');
          console.log('App loaded!');
          //// check if scrollto exist in the url if so scroll to
          if (location.href.indexOf("#") != -1) {
            document.getElementById('neo').scrollIntoView();
          }

          clearInterval(myVar);

        }

    }
};
