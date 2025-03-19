/**
 * Album
 * @author: Eran Bendheim
 * @argument: 
 * @sample: 
 */
class Album{
    constructor(selector = ''){
        this.init();
    }

    init(){
        this.album();
        // this.timer();
    }

    album(){
        console.log('album');
        $('.advice').click(function(e) {
            // this.myStopFunction();
            let image = this.className.split(' ')[1];
            // $('.album img').css('display', 'none');
            $('.album img').removeClass('selected');
            $('.advice').removeClass('selected');
    
            // $('.album img.'+image).css('display', 'block');
            $('.album img.'+image).addClass('selected');
            $('.advice.'+image).addClass('selected');
        })  

    }

    // timer(){
    //     var myVar = setInterval(this.myTimer, 3000);
    // }

    // myStopFunction() {
    //     this.clearInterval(this.myVar);
    // }
    
    // myTimer() {
    //     console.log('timer');
    //     document.querySelector('.advice.p2').click();
    // }
}

export default Album;
