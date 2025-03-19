/**
 * DSG Editorial Workflow
 * @author: Joseph A. Luzquinos
 */

const version      = '3.0.0';
const gulp         = require('gulp');
const plugin       = require('gulp-load-plugins')();
const config       = require('./config.js');
const fs           = require('fs');
const del          = require('del');
const imageService = 'scene7'; //Keywords (default: 'scene7'): 'aws', 'scene7'

//For new features
const browserify   = require('browserify');
const babelify     = require('babelify');
const source       = require('vinyl-source-stream');
const buffer       = require('vinyl-buffer');

const getAutoBanner = ()=> {
    if(__dirname.search("bay") > 0){
        return 'bay';
    }

    if(__dirname.search("saks") > 0){
        return 'saks';
    }

    if(__dirname.search("saks-off-fifth") > 0){
        return 'saks-off-fifth';
    }

    if(__dirname.search("Dev-templates") > 0){
        return 'dev';
    }

    return false;
};

console.log(config.project.name );

const compiled_js  = getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-main-' + version + '.js';
const compiled_css = getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-main-' + version + '.css';

const getStagingURL = (banner)=> {

    let stagingBase;

    switch(banner) {
        case 'bay':
            stagingBase = `https://stage.thebay.com/editorial/${config.project.name}?__siteDate=${config.project.pubdate.replace('-', '').replace('-', '')}0000`; //SalesForce
            break;
        case 'lt':
            stagingBase = 'https://prev-lat.digital.hbc.com/editorial/editorial.jsp?pageId=' + config.project.name + '&timerTime='+ config.project.pubdate +'-00-00-01';
            break;
        case 'saks':
            //TODO
            stagingBase = 'https://saks.com/content-view/' + config.project.pubdate + '-' + config.project.name;
            break;
        case 'dev':
            stagingBase = 'https://apache-prev.dev.awshbc.io/editorial/editorial.jsp?pageId='+config.project.name + '&launchTime=' + config.project.pubdate + '%2012:01:00&new=true';
            break;
    }

    console.log(stagingBase);

    return stagingBase;
};

const getLiveURL = (banner)=> {

    let stagingBase;

    switch(banner) {
        case 'bay':
            stagingBase = `https://www.thebay.com/editorial/${config.project.name}`; //SalesForce
            break;
        case 'lt':
            stagingBase = 'https://prev-lat.digital.hbc.com/editorial/editorial.jsp?pageId=' + config.project.name + '&timerTime='+ config.project.pubdate +'-00-00-01';
            break;
        case 'saks':
            //TODO
            stagingBase = 'https://saks.com/content-view/' + config.project.pubdate + '-' + config.project.name;
            break;
        case 'dev':
            stagingBase = 'https://apache-prev.dev.awshbc.io/editorial/editorial.jsp?pageId='+config.project.name + '&launchTime=' + config.project.pubdate + '%2012:01:00&new=true';
            break;
    }

    console.log(stagingBase);

    return stagingBase;
};

/**
 * @details Currently pointing to old host location.
 */
const getPrefix = ( banner )=> {
    let prefix;

    switch(banner) {
        case 'bay':
            prefix = '/wcsstore/TheBay/InteractiveEditorials/' + config.project.name + '/' + config.project.pubdate + '/';
            break;
        case 'lt':
            prefix = '/wcsstore/Lord%20and%20Taylor/InteractiveEditorials/' + config.project.name + '/' + config.project.pubdate + '/';
            break;
        case 'saks':
            //TODO
            prefix = '/saks/InteractiveEditorials/' + config.project.name + '/' + config.project.pubdate + '/';
            break;
        case 'dev':
            prefix = '/wcsstore/dev/InteractiveEditorials/' + config.project.name + '/' + config.project.pubdate + '/';
            break;
    }
    return prefix;
};

//Build images for Scene 7
const buildScene7image = ( fileName, outputFormat = 'default') => {
    let ext           = fileName.match(/\.[0-9a-z]+$/i);
    let fileNameNoExt = fileName.slice(0,-4);
    let prefix;
    let extras = ( ()=> {
        //Default
        if(outputFormat == 'default'){
            if(ext == '.jpg'){
              return '?scl=1&qlt=77&fmt=jpg';
            }else if(ext == '.png'){
              return '?scl=1&fmt=png-alpha';
            }else{
              return '';
            }
        }

        //Output file type: jpg
        if(outputFormat == 'jpg'){
            return '?scl=1&qlt=77&fmt=jpg';
        }

        //Output file type: png
        if(outputFormat == 'png'){
            return '?scl=1&fmt=png';
        }

        //Output file type: png (alpha)
        if(outputFormat == 'alpha'){
            return '?scl=1&fmt=png-alpha';
        }
    })();

    switch( getAutoBanner() ) {
        case 'bay':
            prefix = 'https://image.s5a.com/is/image/TheBay/';
            break;
        case 'saks':
            prefix = 'https://image.s5a.com/is/image/Saks/';
            break;
    }

    return prefix + getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-' + fileNameNoExt + extras;
};

const getScene7URL = ()=>{
    if(getAutoBanner() == 'bay'){
        return 'https://image.s5a.com/is/image/TheBay/';
    }else if(getAutoBanner() == 'saks'){
        return 'https://image.s5a.com/is/image/Saks/';
    }else{
        return 'BANNER NOT DEFINED/';
    }
};

//Build images for AWS
const buildAwsImage = ( fileName ) => {
    let prefix;

    switch( getAutoBanner() ) {
        case 'bay':
            prefix = 'https://content.hbc.com/chad/bay/editorial/';
            break;
        case 'lt':
            prefix = 'https://content.hbc.com/chad/lat/editorial/';
            break;
    }

    return prefix + config.project.pubdate + '-' + config.project.name + '/img/' + getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-' + fileName;
};

// Build Image
const getImageUrl = ( fileName , outputType = 'default') => {
    let imageReturn;

    switch( imageService ) {
        case 'scene7':
            imageReturn = buildScene7image( fileName, outputType);
            break;
        case 'aws':
            imageReturn = buildAwsImage( fileName );
            break;
    }

    return imageReturn;
};

const createPic = (imgDesk = '', alt = '')=>{
    let file     = imgDesk.split('.');
    let fileName = file[0];
    let fileExt  = file[1];

    return `
        <picture>
            <source media="(min-width: 1024px)" srcset="../src/img/${fileName}.${fileExt}">
            <source media="(max-width: 1023px)" srcset="../src/img/${fileName}-mobile.${fileExt}">
            <img src="../src/img/${fileName}.${fileExt}" alt="${alt}" loading="lazy">
        </picture>
    `;
};

const createPicCompile = (imgDesk, alt='', outputType='default')=>{
    let file     = imgDesk.split('.');
    let fileName = file[0];
    let fileExt  = file[1];

    return `
        <picture>
            <source media="(min-width: 1024px)" srcset="${getImageUrl(fileName+'.'+fileExt, outputType)}">
            <source media="(max-width: 1023px)" srcset="${getImageUrl(fileName+'-mobile.'+fileExt, outputType)}">
            <img src="${getImageUrl(fileName+'.'+fileExt, outputType)}" alt="${alt}" style="width:auto;">
        </picture>
    `;
}

/**
 * GULP
 */
const buildHtml = () => {
    return gulp.src([
            './src/html/template/header.html',
            './src/main_EN.html',
            './src/html/template/footer.html'
        ])
        .pipe( plugin.concat('index.html') )
        .pipe( plugin.data( ()=> {
            return {
                name: 'Build English',
                img: (imgName)=> {
                    return '../src/img/' + imgName;
                },
                pic: createPic
            }
        }))
        .pipe( plugin.template() )
        .pipe( plugin.htmlReplace({
            'js': {
                src : config.build_files.js.concat( config.app_files.libs, config.app_files.js ),
                tpl: '<script src="'+'.'+'%s"></script>'
            },
            'css' : 'styles/all.css',
            'typekit': config.app_files.typekit,
            'header': config.app_files.header,
            'footer': config.app_files.footer
        }) )
        //.pipe( plugin.rename('index.html') )
        .pipe( gulp.dest('./build/') )
        .pipe( plugin.livereload() );
};

const buildHtmlFr = ()=> {
    return gulp.src([
        './src/html/template/header.html',
        './src/main_FR.html',
        './src/html/template/footer.html'
    ])
    .pipe( plugin.concat('index.html') )
    .pipe( plugin.data( ()=> {
        return {
            name: 'Build French',
            img: (imgName)=> {
                return '../src/img/' + imgName;
            },
            pic: createPic
        }
    }))
    .pipe( plugin.template() )
    .pipe( plugin.htmlReplace({
        'js': {
            src : config.build_files.js.concat( config.app_files.libs, config.app_files.js ),
            tpl: '<script src="'+'.'+'%s"></script>'
        },
        'css' : 'styles/all.css',
        'typekit': config.app_files.typekit,
        'header': config.app_files.header,
        'footer': config.app_files.footer
    }) )
    //.pipe( plugin.rename('index.html') )
    .pipe( gulp.dest('./build/') )
    .pipe( plugin.livereload() );
};

const buildJs = ()=>{
    return browserify('./src/js/app.js', {debug: true})
        .transform("babelify", {
            presets: ["@babel/preset-env"],
            sourceMaps: true
        })
        .bundle()
        .on('error', (err)=>{
            plugin.plumber();
            console.log(err.stack);
            console.log(err.message);
        })
        .pipe( source('app.js') )
        .pipe( buffer() )
        .pipe( gulp.dest('./build/js') )
        .pipe( plugin.livereload() );
};

const buildStyles = ()=> {
    return  gulp.src( config.app_files.styles )
        .pipe( plugin.plumber() )
        .pipe( plugin.sourcemaps.init() )
        .pipe( plugin.sass.sync({ errLogToConsole: true }) )
        .pipe( plugin.autoprefixer({browsers: ['last 4 versions','ie >= 11','iOS >= 9']}) )
        .pipe( plugin.concat('all.css') )
        .pipe( plugin.sourcemaps.write() )
        .pipe( plugin.data( ()=> {
            return {
                name: 'Build Styles',
                img: (imgName)=> {
                    return '../../src/img/' + imgName;
                }
            }
        }))
        .pipe( plugin.template() )
        .pipe( gulp.dest('./build/styles') )
        .pipe( plugin.livereload() );
};

//const compileHtml', ['compile-clean'], ()=> {
const compileHtml = ()=> {
    return gulp.src([
            './src/html/template/header.html',
            './src/main_EN.html',
            './src/html/template/footer.html'
        ])
        .pipe( plugin.concat('compiled-EN.html') )
        .pipe( plugin.data( ()=> {
            return {
                name: 'Compile English',
                img: (fileName, outputType='default')=> {
                    return getImageUrl(fileName, outputType);
                },
                pic: createPicCompile
            }
        }))
        .pipe( plugin.template() )
        .pipe( plugin.htmlReplace({
            'js': getPrefix( getAutoBanner() ) + compiled_js,
            'css': getPrefix( getAutoBanner() ) + compiled_css
        }) )
        .pipe( gulp.dest('./bin') );
};

const compileHtmlFr = ()=> {
    return gulp.src([
        './src/html/template/header.html',
        './src/main_FR.html',
        './src/html/template/footer.html'
    ])
    .pipe( plugin.concat('compiled-FR.html') )
    .pipe( plugin.data( ()=> {
        return {
            name: 'Compile French',
            img: (fileName, outputType='default')=> {
                return getImageUrl(fileName, outputType);
            },
            pic: createPicCompile
        }
    }))
    .pipe( plugin.template() )
    .pipe( plugin.htmlReplace({
        'js': getPrefix( getAutoBanner() ) + compiled_js,
        'css': getPrefix( getAutoBanner() ) + compiled_css
    }) )
    .pipe( gulp.dest('./bin') );
};

const compileLibs = ()=>{
    if(config.app_files.libs.length > 0){
        return  gulp.src( config.app_files.libs )
            .pipe( plugin.concat('_com-libs.js') )
            .pipe( plugin.uglify({
                mangle: false,
                output: {
                    beautify: false,
                    comments: false
                },
                compress:{
                    sequences: false,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                }
            }) )
            .pipe( gulp.dest('./bin') );
    }else{
        return gulp.src('./src/js/_libs/_dev/empty.js')
            .pipe( plugin.concat('_com-libs.js') )
            .pipe( plugin.uglify( {output: {comments: false}} ))
            .pipe( gulp.dest('./bin') );
    }
}

const compileScripts = () => {
    return browserify('./src/js/app.js')
        .transform("babelify", {
            presets: ["@babel/preset-react","@babel/preset-env"],
            sourceMaps: false
        })
        .bundle()
        .on('error', (err)=>{
            plugin.plumber();
            console.log(err.stack);
            console.log(err.message);
        })
        .pipe( source('_com-app.js') )
        .pipe( buffer() )
        .pipe( plugin.uglify({
            mangle: false,
            output: {
                beautify: false,
                comments: false
            },
            compress:{
                sequences: false,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            }
        }) )
        .pipe(plugin.appendPrepend.prependText(`!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})}function n(e){return!(!e||void 0===e.length)}function t(){}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],c(e,this)}function r(e,n){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null!==t){var o;try{o=t(e._value)}catch(e){return void f(n.promise,e)}i(n.promise,o)}else(1===e._state?i:f)(n.promise,e._value)})):e._deferreds.push(n)}function i(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var t=n.then;if(n instanceof o)return e._state=3,e._value=n,void u(e);if("function"==typeof t)return void c(function(e,n){return function(){e.apply(n,arguments)}}(t,n),e)}e._state=1,e._value=n,u(e)}catch(n){f(e,n)}}function f(e,n){e._state=2,e._value=n,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;t>n;n++)r(e,e._deferreds[n]);e._deferreds=null}function c(e,n){var t=!1;try{e(function(e){t||(t=!0,i(n,e))},function(e){t||(t=!0,f(n,e))})}catch(e){if(t)return;t=!0,f(n,e)}}var a=setTimeout;o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,n){var o=new this.constructor(t);return r(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(e,n,o)),o},o.prototype.finally=e,o.all=function(e){return new o(function(t,o){function r(e,n){try{if(n&&("object"==typeof n||"function"==typeof n)){var u=n.then;if("function"==typeof u)return void u.call(n,function(n){r(e,n)},o)}i[e]=n,0==--f&&t(i)}catch(e){o(e)}}if(!n(e))return o(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);for(var f=i.length,u=0;i.length>u;u++)r(u,i[u])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(t,r){if(!n(e))return r(new TypeError("Promise.race accepts an array"));for(var i=0,f=e.length;f>i;i++)o.resolve(e[i]).then(t,r)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"Promise"in l?l.Promise.prototype.finally||(l.Promise.prototype.finally=e):l.Promise=o});var editorialPromise=new Promise(function(e,n){document.addEventListener("DOMContentLoaded",function(){$?e("jQuery Loaded!"):n("Error: jQuery did not load")})});editorialPromise.then(function(e){`))
        .pipe(plugin.appendPrepend.appendText(`console.log(e)},function(e){console.log(e)});`))
        .pipe( gulp.dest('./bin') );
};

const compileJoinFiles = ()=>{
    return gulp.src(['./bin/_com-libs.js', './bin/_com-app.js'])
        .pipe( plugin.concat( getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-main-' + version + '.js'))
        .pipe( gulp.dest('./bin') );
};

const compileStyles = ()=> {
    return  gulp.src( config.app_files.styles )
        .pipe( plugin.sass() )
        .pipe( plugin.autoprefixer({browsers: ['last 4 versions','ie >= 11','iOS >= 9']}) )
        .pipe( plugin.concat( getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-main-' + version + '.css' ) )
        .pipe( plugin.data( ()=> {
            return {
                name: 'Compile Styles',
                img: (imgName, outputType = 'default')=> {
                    return getImageUrl(imgName, outputType);
                }
            }
        }))
        .pipe( plugin.template() )
        .pipe( plugin.cleanCss() )
        .pipe( gulp.dest('./bin') );
};

const compileCopyImages = ()=> {
    return gulp.src('./src/img/*.*')
        .pipe( plugin.rename({ prefix: getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-'}) )
        .pipe( gulp.dest( './bin/img') );
};

const packageStaging = ()=> {
    return gulp.src(['./package.json' ])
        .pipe(plugin.jsonModify({
            key: 'stageURL',
            value: getStagingURL( getAutoBanner() )
        }))
        .pipe(plugin.jsonModify({
            key: 'liveURL',
            value: getLiveURL( getAutoBanner() )
        }))
        .pipe(gulp.dest('./'))
};

const createScene7File = (cb)=> {
    return fs.writeFile('./bin/scene7-links.txt', '', cb);
};

const appendScene7File = ()=> {
    return gulp.src(['./bin/scene7-links.txt'])
        .pipe(
            plugin.insert.append(function(){
                const files       = fs.readdirSync('./bin/img/');
                const getFileName = (filename)=>{
                    return filename.split('.').slice(0, -1).join('.');
                };
                const getFileExt = (filename)=>{
                    return filename.split('.').pop();
                };
                let returnedValues = '';

                returnedValues += '\n****** JPG format ******\n';

                for ( let i in files ) {
                    if(getFileExt( files[i] ) == 'png'){
                        returnedValues += ( getScene7URL() + ( getFileName( files[i] ) + '?scl=1&fmt=jpeg&qlt=75' + '\n'));
                    }
                }

                returnedValues += '\n****** PNG format ******\n';

                for ( let i in files ) {
                    if(getFileExt( files[i] ) == 'png'){
                        returnedValues += ( getScene7URL() + ( getFileName( files[i] ) + '?scl=1&fmt=png' + '\n'));
                    }
                }

                returnedValues += '\n****** PNG ALPHA format ******\n';

                for ( let i in files ) {
                    if(getFileExt( files[i] ) == 'png'){
                        returnedValues += ( getScene7URL() + ( getFileName( files[i] ) + '?scl=1&fmt=png-alpha' + '\n'));
                    }
                }

                return returnedValues;
            })
        )
        .pipe(gulp.dest('./bin'));
};

const insertCompiledEn = ()=>{
    const prefix = getPrefix( getAutoBanner() );

    return gulp.src('./bin/compiled-EN.html')
        .pipe(plugin.replace(prefix, './'))
        .pipe(plugin.replace(compiled_css + '">', compiled_css + '" inline>'))
        .pipe(plugin.replace(compiled_js + '">', compiled_js + '" inline>'))
        .pipe(plugin.inlineSource({ compress: false }))
        .pipe(gulp.dest('./bin/'));
};

const insertCompiledFr = ()=>{
    const prefix = getPrefix( getAutoBanner() );
    return gulp.src('./bin/compiled-FR.html')
        .pipe(plugin.replace(prefix, './'))
        .pipe(plugin.replace(compiled_css + '">', compiled_css + '" inline>'))
        .pipe(plugin.replace(compiled_js + '">', compiled_js + '" inline>'))
        .pipe(plugin.inlineSource({ compress: false }))
        .pipe(gulp.dest('./bin/'));
};

const buildClean = ()=> {
    return del(['build']);
};

const compileClean = ()=> {
    return del(['bin']);
};

const compileCleanTempFiles = ()=> {
    return del(['./bin/_com-app.js','./bin/_com-libs.js']);
};

const nodeClean = ()=> {
    return del([
        'node_modules',
        './package-lock.json',
        './yarn.lock'
    ]);
};

//Watch
gulp.task('watch', ()=> {
    gulp.watch(['./src/scss/*.scss','./src/**/*.scss'], buildStyles);
    gulp.watch(['./src/js/*.js','./src/**/*.js','./src/js/*.js','./src/**/**/*.js'], buildJs);
    gulp.watch(['./src/main_EN.html'], buildHtml);
    plugin.livereload.listen();
});

gulp.task('watchfr', ()=> {
    gulp.watch(['./src/scss/*.scss','./src/**/*.scss'], buildStyles);
    gulp.watch(['./src/js/*.js','./src/**/*.js','./src/js/*.js','./src/**/**/*.js'], buildJs);
    gulp.watch(['./src/main_FR.html'], buildHtmlFr);
    plugin.livereload.listen();
});

//Pre Command
const buildCode      = gulp.series(buildHtml, buildJs, buildStyles);
const buildFrCode    = gulp.series(buildHtmlFr, buildJs, buildStyles);
const scene7List     = gulp.series(createScene7File, appendScene7File);
const insertCompiled = gulp.series(insertCompiledEn, insertCompiledFr);
const compileCode    = gulp.series(compileHtml, compileHtmlFr, compileLibs, compileScripts, compileStyles, compileJoinFiles);
const compile        = gulp.series(compileClean, compileCode, compileCopyImages, scene7List, insertCompiled, packageStaging, compileCleanTempFiles );
const compileSplit   = gulp.series(compileClean, compileCode, compileCopyImages, scene7List, packageStaging );

//Commands
//Build
exports.default = buildCode;
exports.build   = buildCode;
exports.buildfr = buildFrCode;

//Compile
exports.compile          = compile;
exports['compile-split'] = compileSplit;

//Clean
exports.clean   = gulp.parallel(buildClean, compileClean);
exports.wipe    = gulp.parallel(buildClean, compileClean, nodeClean);
