/**
 * Go To Top of The Page
 * HBC Digital - DSG
 * Author: Joseph Luzquinos
 */

;(function ( $, window, document, undefined ) {

    // Plugin Name and Defaults
    var pluginName = "goToTop",
        defaults = {
            speed: 1000
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
            var _self = this;

            //On Click, Go to Top
            $( this.element ).on('click', function(){
                $('html, body').animate({scrollTop: 0}, _self.options.speed);
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