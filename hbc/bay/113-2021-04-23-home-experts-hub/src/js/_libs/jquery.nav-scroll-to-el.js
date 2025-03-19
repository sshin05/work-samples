/**
 * Navigation Scroll to Element
 * HBC Digital - DSG
 * Author: Joseph Luzquinos
 */

;(function ( $, window, document, undefined ) {

    // Plugin Name and Defaults
    var pluginName = "navScrollToEl",
        defaults = {
            speed: 1000,
            removeFromTop: 60,
            fillerHeight: 65,
            containerSelector :'.bay-editorial' //Used to set Editorial's Position
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            this.insertFiller();
            this.positionNav();
            this.linksToAnchor();

        },
        insertFiller: function(){

            $(this.element).after('<div id="triggerNav"></div>');

        },
        positionNav: function(){
            var _self = this;

            // Initial Nav position if page is loaded in the middle of the page
            if( ($(window).scrollTop() - $( _self.options.containerSelector ).position().top) > $('.nav-anchor-1').offset().top ){
                $(_self.element).addClass('fixed');
                $('#triggerNav').height( _self.options.fillerHeight );
            }

            // Position Nav on scroll
            $(window).on('scroll', function(){
                var thePosition = $(this).scrollTop();

                if((thePosition - $( _self.options.containerSelector ).position().top) > $(_self.element).position().top){
                    $(_self.element).addClass('fixed');
                    $('#triggerNav').height( _self.options.fillerHeight );
                }

                if((thePosition - $( _self.options.containerSelector ).position().top) < $('#triggerNav').position().top){
                    $(_self.element).removeClass('fixed');
                    $('#triggerNav').height(0);
                }

                _self.selectLink( thePosition );

                return false;
            });
        },
        selectLink: function( thePosition ){

            thePosition = thePosition + 1; //Position fix

            // Unselect All if scrolled on top
            if(thePosition + this.options.removeFromTop < $('.nav-anchor-1').offset().top){
                $(this.element).find('li a').removeClass('active');
            }

            if(thePosition + this.options.removeFromTop > $('.nav-anchor-1').offset().top){
                $(this.element).find('li a').removeClass('active');
                $('.nav-item-1').addClass('active');
            }

            if(thePosition + this.options.removeFromTop > $('.nav-anchor-2').offset().top){
                $(this.element).find('li a').removeClass('active');
                $('.nav-item-2').addClass('active');
            }

            if(thePosition + this.options.removeFromTop > $('.nav-anchor-3').offset().top){
                $(this.element).find('li a').removeClass('active');
                $('.nav-item-3').addClass('active');
            }

            if(thePosition + this.options.removeFromTop > $('.nav-anchor-4').offset().top){
                $(this.element).find('li a').removeClass('active');
                $('.nav-item-4').addClass('active');
            }

            if(thePosition + this.options.removeFromTop > $('.nav-anchor-5').offset().top){
                $(this.element).find('li a').removeClass('active');
                $('.nav-item-5').addClass('active');
            }

        },
        linksToAnchor: function(){
            var _self = this;

            $('.nav-item-1').on('click', function(){
                $('html, body').animate({
                    scrollTop: $('.nav-anchor-1').offset().top - _self.options.removeFromTop
                }, _self.options.speed);
                return false;
            });

            $('.nav-item-2').on('click', function(){
                $('html, body').animate({
                    scrollTop: $('.nav-anchor-2').offset().top - _self.options.removeFromTop
                }, _self.options.speed);
                return false;
            });

            $('.nav-item-3').on('click', function(){
                $('html, body').animate({
                    scrollTop: $('.nav-anchor-3').offset().top - _self.options.removeFromTop
                }, _self.options.speed);
                 return false;
            });

            $('.nav-item-4').on('click', function(){
                $('html, body').animate({
                    scrollTop: $('.nav-anchor-4').offset().top - _self.options.removeFromTop
                }, _self.options.speed);
                 return false;
            });

            $('.nav-item-5').on('click', function(){
                $('html, body').animate({
                    scrollTop: $('.nav-anchor-5').offset().top - _self.options.removeFromTop
                }, _self.options.speed);
                 return false;
            });
        }
    };

    // Preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );