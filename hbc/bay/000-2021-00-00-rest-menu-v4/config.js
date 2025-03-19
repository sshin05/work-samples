/**
 * Files to be for build and compile
 *
 * Author: Joseph A. Luzquinos
 */

module.exports = {
    project:{
        "name"       : "2020-workflow", // spinal-case
        "bayID"      : "000",          // ONLY used for The Bay
		"pubdate"    : "0000-00-00",   //
		"keywords"   : "",             // comma separated
    },
	app_files:{
		libs:[
			'./src/js/_libs/lodash.min.js',
			
			//Rest Menu
			'./src/js/components/rest-menu/jquery.rest-menu.js',

			// Scroll Magic - Custom
			//'./src/js/_libs/ScrollMagic_custom.js',

			// HBC Carousel
			//'./src/js/_libs/hbc-carousel/hbc-carousel.min.js',
		],
		js:[
			// App File (must be included)
			'./build/js/app.js'
		] ,
		styles :[
			// HBC Carousel
			//'./src/js/_libs/hbc-carousel/hbc-carousel-bay.min.css',

			// main.scss must be included
			'./src/scss/main.scss',

			// French File must be included after main.scss
			'./src/scss/french-style-fix.scss'
		],
		assets:[
		],
		typekit : [
        	'<script src="//use.typekit.net/qno3ktb.js"></script>',
        	'<script>try{Typekit.load();}catch(e){}</script>'
		],
		header : [
            '<!DOCTYPE html>',
            '<head>',
			'<meta charset="utf-8">',
            '<meta http-equiv="x-ua-compatible" content="ie=edge">',
            '<meta name="viewport" content="width=device-width, initial-scale=1">',
            '<link rel="icon" type="image/png" href="../../../_server/img/favicon-project-32x32.png" sizes="32x32">',
            '<link rel="stylesheet" type="text/css" href="https://stage.thebay.com/on/demandware.static/Sites-TheBay-Site/-/en_CA/v1586960507293/customfonts/customfont.css">',
            '</head>',
            '<body>'
        ],
		footer: [
			'</body>',
			'</html>'
		]
	},
	// Load these files only for build, these files will NOT compile.
	build_files:{
		js:[
			'./src/js/_libs/lodash.min.js',
            './node_modules/jquery/dist/jquery.js'
		]
	}
};
