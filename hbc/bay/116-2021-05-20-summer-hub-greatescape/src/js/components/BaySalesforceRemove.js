/**
 * Bay Salesforce remove
 * @author: Joseph Luzquinos
 * @options: ['header','footer','width']
 * @description: Removes SFCC container to create fullscreen experiences.
 */
class BaySalesforceRemove{
    constructor(options = []){
        this.w       = window;
        this.d       = document;
        this.options = options;
        this.init();
    }

    init(){
        if(this.w.location.hostname !== "localhost"){

            if( this.checkInArray(this.options,'header') ){
                this.removeHeader();
                console.log('Header Removed!');
            }

            if( this.checkInArray(this.options,'footer') ){
                this.removeFooter();
                console.log('Footer Removed!');
            }

            if( this.checkInArray(this.options,'width') ){
                this.removeWidth();
                console.log('Width Removed!');
            }

            if( this.checkInArray(this.options,'promoDrawer') ){
                this.removePromoDrawer();
                console.log('Promo Drawer Removed!');
            }

            //Remove All
            if (this.options.length == 0) {
                this.removeHeader();
                this.removeFooter();
                this.removeWidth();
                this.removePromoDrawer();
                this.removeLiveChat();
                this.removeGrecaptcha();
                console.log('Header, Footer and Width Removed!');
            }
        }
    }

    removeHeader(){
        try {
            this.d.querySelector('header').style.display = 'none';
        } catch (error) {
            console.log(error);
        }
    }

    removeFooter(){
        try {
            this.d.querySelector('.footer-top-utility-section').style.display = 'none';
            this.d.querySelector('footer#footercontent').style.display        = 'none';
        } catch (error) {
            console.log(error);
        }
    }

    removeWidth(){
        try {
            this.d.querySelector('.home-slots').style.maxWidth = '100%';
            this.d.querySelector('.html-slot-container').style.paddingLeft = '0';
            this.d.querySelector('.html-slot-container').style.paddingRight = '0';
        } catch (error) {
            console.log(error);
        }
    }

    removePromoDrawer(){
        try {
            this.d.querySelector('#promo-drawer').style.display         = 'none';
            this.d.querySelector('#promo-drawer-overlay').style.display = 'none';
        } catch (error) {
            console.log(error);
        }
    }

    removeLiveChat(){
        try {
            this.d.querySelector('.livechat-wrapper').style.display = 'none';
        } catch (error) {
            console.log(error);
        }
    }

    removeGrecaptcha(){
        try {
            this.d.querySelector('.grecaptcha-badge').style.display = 'none';
        } catch (error) {
            console.log(error);
        }
    }



    checkInArray(arr, val) {
      if (arr.indexOf(val) !== -1) {
        return true;
      } else {
        return false;
      }
    }
}

export default BaySalesforceRemove;
