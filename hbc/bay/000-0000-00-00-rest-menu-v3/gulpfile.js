/**
 * DSG Editorial 2019 Workflow
 * ES6 Gulpfile
 * Author: Joseph A. Luzquinos
 */

const version  = '1.0.4';
const gulp     = require('gulp');
const plugin   = require('gulp-load-plugins')();
const config   = require('./config.js');
const fs       = require('fs');
const del      = require('del');
const sequence = require('run-sequence');
const imageService = 'scene7'; //Keywords (default: 'scene7'): 'aws', 'scene7'

// Auto obtain the banner by folder name
const getAutoBanner = ()=> {
    if(__dirname.search("Bay-templates") > 0){
        return 'bay';
    }

    if(__dirname.search("LT-templates") > 0){
        return 'lt';
    }

    if(__dirname.search("Saks-templates") > 0){
        return 'saks';
    }

    return false;
};

const compiled_js  = getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-main-' + version + '.js';
const compiled_css = getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-main-' + version + '.css';

const getStagingURL = (banner)=> {

    let stagingBase;

    switch(banner) {
        case 'bay':
            stagingBase = 'http://apache-prev.bay.awshbc.io/editorial/editorial.jsp?pageId='+config.project.name + '&launchTime=' + config.project.pubdate + '%2012:00:00&new=true';
            break;
        case 'lt':
            stagingBase = 'http://prev-lat.digital.hbc.com/editorial/editorial.jsp?pageId=' + config.project.name + '&timerTime='+ config.project.pubdate +'-00-00-01';
            break;
        case 'saks':
            //TODO
            stagingBase = 'http://saks.com/content-view/' + config.project.pubdate + '-' + config.project.name;
            break;
    }

    return stagingBase;
};

//
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
              return '?scl=1&fmt=jpeg&qlt=97';
            }else if(ext == '.png'){
              return '?scl=1&fmt=png-alpha';
            }else{
              return '';
            }
        }

        //Output file type: jpg
        if(outputFormat == 'jpg'){
            return '?scl=1&fmt=jpeg&qlt=97';
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
        case 'lt':
            prefix = 'https://image.s5a.com/is/image/LordandTaylor/';
            break;
    }

    return prefix + getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-' + fileNameNoExt + extras;
};

const getScene7URL = ()=>{
    if(getAutoBanner() == 'bay'){
        return 'https://image.s5a.com/is/image/TheBay/';
    }else if(getAutoBanner() == 'lt'){
        return 'https://image.s5a.com/is/image/LordandTaylor/';
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

// inline your compiled css/js files into the compiled markup!
// NOTE: make sure to add the following to package.json:
// "gulp-inline-source": "^3.1.0",
// "gulp-replace": "^0.6.1",
gulp.task('compile-inline-flat',['compile-flat'], ()=> {

    const prefix = getPrefix(getAutoBanner());
    const files = [
        './bin/compiled-EN.html',
        './bin/compiled-FR.html'
    ];

    for (let i = 0; i < files.length; i++) {

        gulp.src([files[i]])
            .pipe(plugin.replace(prefix, './'))
            .pipe(plugin.replace(compiled_css + '">', compiled_css + '" inline>'))
            .pipe(plugin.replace(compiled_js + '">', compiled_js + '" inline>'))
            .pipe(plugin.inlineSource({ compress: false }))
            .pipe(gulp.dest('./bin/'));
    }

});

/**
 * Build
 */
gulp.task('build-html', () => {
    return gulp.src('./src/main_EN.html')
    .pipe( plugin.data( ()=> {
        return {
            name: 'Build English',
            img: (imgName)=> {
              return '../src/img/' + imgName;
            }
        }
    }))
    .pipe( plugin.template() )
    .pipe( plugin.htmlReplace({
        'js': {
            src : config.build_files.js.concat( config.app_files.js ),
            tpl: '<script src="'+'.'+'%s"></script>'
        },
        'css' : 'styles/all.css',
        'typekit': config.app_files.typekit,
        'header': config.app_files.header,
        'footer': config.app_files.footer
    }) )
    .pipe( plugin.rename('index.html') )
    .pipe( gulp.dest('./build/') )
    .pipe( plugin.livereload() );
});

gulp.task('build-html-fr', ()=> {
    return gulp.src('./src/main_FR.html')
    .pipe( plugin.data( ()=> {
        return {
            name: 'Build French',
            img: function(imgName){
              return '../src/img/' + imgName;
            }
        }
    }))
    .pipe( plugin.template() )
    .pipe( plugin.htmlReplace({
        'js': {
            src : config.build_files.js.concat(config.app_files.js),
            tpl: '<script src="'+'.'+'%s"></script>'
        },
        'css': 'styles/all.css',
        'typekit': config.app_files.typekit,
        'header': config.app_files.header,
        'footer': config.app_files.footer
    }) )
    .pipe( plugin.rename('index.html') )
    .pipe( gulp.dest('./build/') )
    .pipe( plugin.livereload() );
});

gulp.task('build-styles', ()=> {
    return  gulp.src( config.app_files.styles )

    .pipe( plugin.plumber() )
    .pipe( plugin.sourcemaps.init() )
    .pipe( plugin.sass.sync({
        errLogToConsole: true
    }) )
    .pipe( plugin.autoprefixer({browsers: ['last 2 versions','ie >= 9','iOS >= 8']}) )
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
});

gulp.task('build-js', ()=> {

});

/**
 * Compile
 */
gulp.task('compile-html', ['compile-clean'], ()=> {
    return gulp.src('./src/main_EN.html')
    .pipe( plugin.data( ()=> {
        return {
            name: 'Compile English',
            img: (fileName, outputType='default')=> {
                return getImageUrl(fileName, outputType);
            }
        }
    }))
    .pipe( plugin.template() )
    .pipe( plugin.htmlReplace({
        'js': getPrefix(getAutoBanner()) + compiled_js,
        'css': getPrefix(getAutoBanner()) + compiled_css
    }) )
    .pipe( plugin.rename('compiled-EN.html') )
    .pipe( gulp.dest('./bin') );
});

gulp.task('compile-html-fr', ['compile-clean'], ()=> {
    return gulp.src('./src/main_FR.html')
    .pipe( plugin.data( ()=> {
        return {
            name: 'Compile French',
            img: (fileName, outputType = 'default')=> {
                return getImageUrl(fileName, outputType);
            }
        }
    }))
    .pipe( plugin.template() )
    .pipe( plugin.htmlReplace({
        'js': getPrefix(getAutoBanner()) + compiled_js,
        'css': getPrefix(getAutoBanner()) + compiled_css
    }) )
    .pipe( plugin.rename('compiled-FR.html') )
    .pipe( gulp.dest('./bin') );
});

gulp.task('compile-scripts', ['compile-clean'], ()=> {
    return gulp.src( config.app_files.js )
        .pipe( plugin.eslint() )
        .pipe( plugin.eslint.format() )
        .pipe( plugin.concat( getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-main-' + version + '.js' ) )
        .pipe( plugin.uglify({
            sequences: false,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        }) )
        .pipe( gulp.dest('./bin') );
});

gulp.task('compile-styles', ['compile-clean'], ()=> {
    return  gulp.src( config.app_files.styles )
        .pipe( plugin.sass() )
        .pipe( plugin.autoprefixer({browsers: ['last 2 versions','ie >= 9','iOS >= 8']}) )
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
        .pipe( gulp.dest('./bin') )
});

gulp.task('compile-copy-images', ['compile-clean'], ()=> {
  return gulp.src('./src/img/*.*')
    .pipe( plugin.rename({ prefix: getAutoBanner() + '-' + config.project.name + '-' + config.project.pubdate + '-'}) )
    .pipe( gulp.dest( './bin/img') );
});

//Replace staging URL in package.json
gulp.task('package-staging', ()=> {
  return gulp.src(['./package.json' ])
    .pipe(plugin.jsonModify({
      key: 'stagingurl',
      value: getStagingURL( getAutoBanner() )
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('create-scene7-file', (cb)=> {
    fs.writeFile('./bin/scene7-links.txt', '', cb);
});

gulp.task('append-scene7-file', ()=> {
    gulp.src(['./bin/scene7-links.txt'])
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
                        returnedValues += ( getScene7URL() + ( getFileName( files[i] ) + '?scl=1&fmt=jpeg&qlt=97' + '\n'));
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
});

/**
 * Watch scripts, styles and markup for Dev
 */
// Watch and build English
gulp.task('watch', ()=> {
    gulp.watch(['./src/scss/*.scss','./src/**/*.scss'], ['build-styles']);
    gulp.watch(['./src/js/*.js'], ['build']);
    gulp.watch(['./src/main_EN.html'], ['build']);

    plugin.livereload.listen();
});

// Watch and build French
gulp.task('watchfr', ()=> {
    gulp.watch(['./src/scss/*.scss','./src/**/*.scss'], ['build-styles']);
    gulp.watch(['./src/js/*.js'], ['buildfr']);
    gulp.watch(['./src/main_FR.html'], ['buildfr']);

    plugin.livereload.listen();
});

/**
 * Main Commands
 */
gulp.task('build', ['build-styles', 'build-html', 'package-staging']);

gulp.task('buildfr',['build-styles', 'build-html-fr']);

gulp.task('compile', (done)=> {
    sequence('compile-flat', 'scene7List', done);
});

gulp.task('compile-inline', (done)=> {
    sequence('compile-inline-flat', 'scene7List', done);
});

gulp.task('compile-flat',[
    'compile-html',
    'compile-html-fr',
    'compile-scripts',
    'compile-styles',
    'compile-copy-images'
]);

//Create Scene7 clear cache file
gulp.task('scene7List', (done)=> {
    sequence('create-scene7-file', 'append-scene7-file', done);
});

/**
 * Clean Commands
 */
gulp.task('clean',[
    'build-clean',
    'compile-clean'
]);

gulp.task('wipe',[
    'build-clean',
    'compile-clean',
    'node-clean',
    'bower-clean'
]);

gulp.task('build-clean', ()=> {
    return del(['build']);
});

gulp.task('compile-clean', ()=> {
    return del(['bin']);
});

gulp.task('node-clean', ()=> {
    return del([
        'node_modules',
        './package-lock.json',
        './yarn.lock'
    ]);
});

gulp.task('bower-clean', ()=> {
    return del([
        'vendor',
        'bower_components'
    ]);
});
