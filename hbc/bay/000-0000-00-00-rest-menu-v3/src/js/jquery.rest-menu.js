/**
 * Dynamic Menu
 *
 * @author: Joseph A. Luzquinos
 * @dependencies: jQuery, Lodash
 * @version: 2.0
 */

;(function ( $, window, document, undefined ) {

    // Plugin Name and Defaults
    var pluginName = "restMenu",
        defaults = {
            dataDocName    : 'baybrandnav',
            apiUrlQa       : 'https://watts-cdn.hbccommon.private.hbc.com/qa/json/',
            apiUrlProd     : 'https://watts-cdn.hbccommon.private.hbc.com/prod/json/',
            apiFormat      : 'json',
            featuredType   : 1, // 1,2,3
            active         : true,
            featured       : false,
            menu_direction : 'down' // options: down, right
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.theData = {}; // All the data
        this.cachedLast = []; //create array for cached data
        this.cachedFeatured = ''; //Cached Featured
        this.cachedFeaturedList = []; //Featured list
        this.language = 'en'; // Default english
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var _self = this;

            _self.language = $(_self.element).attr('data-language') ? $(_self.element).attr('data-language') : 'dsg-en';
            _self.queryStringSearch();
            _self.getData();
            _self.cacheLast();   // Cached for last alpha and numbers on load
            _self.loadEvents();
            _self.initialSelection();
            _self.loadFeatured();
            _self.insertFeatured();
        },
        loadFeatured:function(){
            var _self = this,
                listFeatured = [];

            // Get Data and list Active
            _self.cachedFeaturedList = _.filter(_self.theData, {'featured':true});

            // Sort by title
            _self.cachedFeaturedList = _.sortBy(_self.cachedFeaturedList, ['title']);

            // Cache featured image field
            _self.cachedFeatured = _.filter(_self.cachedFeaturedList, function(data) { return data.featured && data.featured_img; });

           // console.log(_self.cachedFeaturedList);

        },
        insertFeatured:function(){
            var _self     = this,
                $featured = $(_self.element).find('.main_menu-featured-results');

            _.forEach(_self.cachedFeaturedList, function(item){
                if(item.active){
                    $featured.append('<li><a href="'+item.link+'">'+item.title+'</a></li>');
                }
            });
        },
        initialSelection: function(){
            $(this.element)
                .find('.main_menu-top')
                .find('div')
                .first()
                .trigger( "click" );
        },
        queryStringSearch: function(){
            window.previewQuerySearch = {};
            window.location.search.substring(1).split("&").map(
                function(s) {
                    return s.split("=");
                }).forEach(
                function(a) {
                    previewQuerySearch[a[0]] = a[1];
                });

            window.previewQuerySearch;
        },
        getDataURL: function(){
            var _self  = this,
                APIUrl = '';
                site   = window.location.hostname;

            //Check if production or else serve preview
            if(site == 'www.thebay.com' || site == 'www.labaie.com'){
                //Production Data
                APIUrl = _self.options.apiUrlProd + _self.options.dataDocName + '.' + _self.options.apiFormat;
            }else{
                //QA Data
                APIUrl = _self.options.apiUrlQa + _self.options.dataDocName + '.' + _self.options.apiFormat;
            }

            return APIUrl;
        },
        getData: function(){
            var _self = this,
                apiData     = [];
                currentData = [];
                activeData  = [];

            // Make ajax call
            $.ajax({
                //url: _self.options.dataURL,
                url: _self.getDataURL(),
                async: false,
                dataType: 'json',
                success: function (json) {
                    apiData = json;
                }
            });

            //Get Data from data local file
            //apiData.data = myData;

            //Map data based on language
            $.each(apiData.data, function(i, v){
                //Select Language
                if(_self.language == 'en'){

                    //Drop fr
                    delete v.active_fr;
                    delete v.featured_fr;
                    delete v.featured_img_fr;
                    delete v.link_fr;

                    //push to clean array
                    currentData.push(v);
                }else{
                    //Map French
                    v.active       = v.active_fr;
                    v.featured     = v.featured_fr;
                    v.featured_img = v.featured_img_fr;
                    v.link         = v.link_fr;

                    //Drop from original
                    delete v.active_fr;
                    delete v.featured_fr;
                    delete v.featured_img_fr;
                    delete v.link_fr;

                    //push to clean array
                    currentData.push(v);
                }
            });

            //Remove inactive, or active = 0
            $.each(currentData, function(i, v){
                //Only push active brands
                if(v.active == "1"){
                    activeData.push(v);
                }
            })

            //Cache Data
            _self.theData = activeData;
        },
        loadEvents: function(){
            var _self = this;

            //Each element
            $(_self.element).find('div.main_menu-top').find('div').each(function(idx, el){
                $(_self.element).find(el).on('click', function(){

                    var range = _.split( $(el).attr('class'), 'main_menu-filter-' )[1],
                        range_1 = '',
                        range_2 = '';

                    //Check if button is not selected
                    if(!$(_self.element).find(el).hasClass('button-selected')){

                        // Check for character range
                        if(range.length == 2){
                            // only letters
                            range_1 = range[0];
                            range_2 = range[1];
                        }else{
                            // for end of letters to number
                            range_1 = range[0];
                            range_2 = 'num';
                        }

                        if(range_2 == 'num'){
                            _self.insertResult( _self.getLastData() );
                        }else{
                            _self.insertResult( _self.filterRange(range_1, range_2) );
                        }

                        $('.main_menu-top div').removeClass('button-selected'); //clear
                        $(this).addClass('button-selected');                    //select
                    }

                    return false;
                });

            });

            //Search Open
            $('.search_link, .search_link-mobile p').on('click', function(){
                $('.main_search-overlay').addClass('overlay-open');
                $('.main_search-texbox input').focus();
                return false;
            });

            //Search Close
            $('.main_search-close').on('click', function(){
                $('.main_search-overlay').removeClass('overlay-open');
                return false;
            });

            //Query Search
            $('.main_search-texbox input').on('input', function(){
                var _search        = this;
                var totalCount     = _self.theData.length;
                var searchValue    = $(_search).val();
                var $searchResults = $('.main_search-results');
                var findResults    = _.filter(_self.theData, function(item){
                    var searchRegex    = new RegExp( searchValue, 'gi' );
                    return item.title.match(searchRegex) && item.active;
                });

                //If no results
                if(findResults.length == totalCount || findResults.length == 0){
                    if(findResults.length == 0){
                        $searchResults.html('<p>No Results for: ' + searchValue + '</p>');
                    }
                }else{
                    if(searchValue == ''){
                        $searchResults.html('');

                    }else{
                        $searchResults.html('');

                        _.forEach(findResults, function(item){
                            $searchResults.append('<a href="'+item.link+'">'+ item.title +'</a>');
                        });
                    }
                }
            });

        },
        cacheLast:function(){
            var _self = this,
                lastMenuClassName = $('.main_menu-top div').last().attr('class'),
                range = _.split( lastMenuClassName, 'main_menu-filter-' )[1],
                dataAlpha    = [],
                dataNum      = [],
                dataChar     = [],
                dataReturned = [];

            //Cache last range
            this.cachedLast = _self.filterRange(range[0], range.substring(1));

            // Filter
            $.each(_self.cachedLast, function(key, val){

                if( val.title.match( new RegExp("^[a-z]", "i") ) ){
                    dataAlpha.push(val);
                }

                if( val.title.match( new RegExp("^[0-9]", "i") ) ){
                    dataNum.push(val);
                }

                if( val.title.match( new RegExp("^[\\W]", "i") ) ){
                    dataChar.push(val);
                }

            });

            this.cachedLast = _.concat(dataAlpha, dataNum, dataChar); //Cache in that order
        },
        getLastData:function(){
            return this.cachedLast;
        },
        insertResult: function(data){

            //Insert Results in the right direction
            if(this.options.menu_direction === 'down'){
                this.createColumns(data);
            }else{
                this.createRows(data);
            }

        },
        chunk: function(arr, len) {

            var chunks = [],
                i = 0,
                n = arr.length;

            while (i < n) {
                chunks.push(arr.slice(i, i += len));
            }

            return chunks;

        },
        createColumns: function(data){
            var _self     = this,
                perColumn = Math.ceil(data.length / 2), //Amount per column
                //colums2    = _.chunk(data, perColumn);   //Break array into columns
                colums    = _self.chunk(data, perColumn);   //Break array into columns

                //console.log(colums);

            //Insert column containers
            $(_self.element).find('.main_menu-results').html('<div class="main_menu-col-1"></div><div class="main_menu-col-2"></div>');

            //All Items
            $.each(colums, function(i, v){

                //Insert into columns
                $.each(v, function(idx, val){
                    $(_self.element).find('.main_menu-col-'+(i+1)).append('<div><a href="'+val.link+'">'+val.title+'</a></div>');
                });

            });
        },
        createRows: function(data){
            var _self = this;

            $(_self.element).find('.main_menu-results').html('');

            $.each(data, function(i, v){
                $(_self.element)
                    .find('.main_menu-results')
                    .append('<div><a href="'+v.link+'">'+v.title+'</a></div>');
            });

        },
        filterRange: function(from, to){
            var _self = this,
                listActive = [],
                listFiltered = [],
                listReturn = [];

            // Get Data and list Active
            listActive = _.filter(_self.theData, function(data){
                return data.active;
            });

            // Filter
            listFiltered = _.filter(listActive, function(data){
                var regex;

                if(to === 'num'){
                    regex =  new RegExp("^["+from+"-z, 0-9, \\W]", "i");
                }else{
                    regex =  new RegExp("^["+from+"-"+to+"]", "i");
                }

                return data.title.match(regex);
            });

            listReturn = _.sortBy(listFiltered, ['title']);

            return listReturn;
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
