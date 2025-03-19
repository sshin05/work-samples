/**
 * Files to be for build and compile
 *
 * Author: Joseph A. Luzquinos
 */

module.exports = {
    project:{
        "name"       : "rest-menu", // spinal-case
        "bayID"      : "000",          // ONLY used for The Bay
        "pubdate"    : "0000-00-00"    //
    },
	app_files:{
		js:[
            // Lowdash
            './vendor/lodash/dist/lodash.js',

			//--- Greensock (GSAP) ---//

			// TweenMax INCLUDES:
            // TweenLite
            // TimelineLite
            // TimelineMax
            // CSSPlugin
            // EasePack
            // RoundPropsPlugin
            // BezierPlugin
            // AttrPlugin
            // DirectionalRotationPlugin
            //'./vendor/gsap/src/uncompressed/TweenMax.js',

            // TweenLite and plugins
            // DO NOT include these if using TweenMax
			//'./vendor/gsap/src/uncompressed/TweenLite.js',
			// './vendor/gsap/src/uncompressed/TimelineLite.js',
			// './vendor/gsap/src/uncompressed/plugins/CSSPlugin.js',
			// './vendor/gsap/src/uncompressed/easing/EasePack.js',

			//- GSAP plugins not included in TweenMax -//
			// './vendor/gsap/src/uncompressed/plugins/DrawSVGPlugin.js',
			// './vendor/gsap/src/uncompressed/utils/SplitText.js',
			//'./vendor/gsap/src/uncompressed/plugins/ScrollToPlugin.js',


			//--- ScrollMagic ---//
            //'./vendor/ScrollMagic/scrollmagic/uncompressed/ScrollMagic.js',

            // ScrollMagic Plugins

            // animations.gsap.js
            // use to set/remove tweens with scrollmagic (http://scrollmagic.io/docs/animation.GSAP.html)
			// './vendor/ScrollMagic/scrollmagic/uncompressed/plugins/animation.gsap.js',

			//  debug.addIndicators.js
            // './vendor/ScrollMagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js',

            // Scrollmagic Sticky Nav
            // other js files required for scrollmagic sticky nav:
            // ScrollMagic.js
            // TweenLite/Max.js
            // ScrollToPlugin.js
			//'./src/plugins/scrollmagic.sticky-nav.js',

			// HBC Carousel
			//'./src/plugins/hbc-carousel/hbc-carousel.min.js',

			// HBC Goto top plugin
			// NOTE: do not use in conjunction with Scrollmagic Sticky Nav
			// './src/plugins/jquery.go-to-top.js',

			// HBC Scroll to Anchor plugin
			// NOTE: do not use in conjunction with Scrollmagic Sticky Nav
			// './src/plugins/jquery.nav-scroll-to-el.js',

            //Custom Scrollbar
            //'./vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',

            //Test Data
            //'./src/js/myData.js',

            //Rest menu plugin
            './src/js/jquery.rest-menu.js',

			// App File (must be included)
			'./src/js/app.js'
		] ,
		styles :[
			// HBC Carousel
			//'./src/plugins/hbc-carousel/hbc-carousel-bay.min.css',

            // Custom Scrollbar
            //'./vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',

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
			'<html>',
			'<head>',
			'<meta charset="UTF-8">',
            '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">',
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
			'./vendor/jquery/jquery.js'
		]
	}
};
