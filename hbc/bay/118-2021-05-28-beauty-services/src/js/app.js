
class App{
    constructor(){
        console.log('From App!');
        this.init();
    }

    init(){
     


    }
}

//Start App onload
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const MyApp = new App();
        console.log('App loaded!');
    }
};
