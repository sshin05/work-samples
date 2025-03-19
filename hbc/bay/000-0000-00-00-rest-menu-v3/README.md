Gulp Light Workflow
==========================
Author: Joseph Luzquinos
==========================
Workflow Version: 1.0.4
==========================
##Tested Node:
Node: 10.15.3
npm: 6.4.1
or
yarn: 1.12.3
==========================
Gulp CLI version: 3.9.1
Gulp Local version: 3.9.1
==========================

## Dependencies
- npm
- bower
- gulp
- sass
- [LiveReload](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei) (optional, useful with `gulp watch`)

## Setup

#### Create new project folder 
1. copy the `000-YYYY-MM-DD-project-name` folder
2. paste into `Bay-templates/projects` or `LT-templates/projects`
3. rename the duplicate accordingly (e.g. 022316_designer_shoe_handbag)
4. copy contents of `package-bay.txt` or `package-lt.txt` and paste into `package.json`.
5. open `package.json` and edit the following objects accordingly: 
    - `name`
    - `pubdate`
    - `stagingurl`
    - `cmcprefix`
    - `scene7fullpath` 

#### Create local server with node.js
1. `cd` into `../htmltemplates/`
2. `npm start`

#### Install project dependencies

1. `cd` into project folder of choice
    - e.g. `cd htmltemplates/LT-templates/projects/022316_designer_shoe_handbag`
2. `npm install`
3. `bower install`

#### ...then build
- `gulp build` || `gulp buildfr` || `gulp watch`
    - `gulp build` builds English version
    - `gulp buildfr` builds French version
    - `gulp watch` builds English version every time you save a file
    - `gulp watchfr` builds French version every time you save a file

#### ...or compile
- `gulp compile`
    - this will automatically compile both languages
    - it is not necessary to build before compile

#### ...or compile with inlined assets
- `gulp compile-inline`
    - this will automatically inline the css/js files into your compiled markup 

#### View in browser
- point browser to [http://localhost:3000/](http://localhost:3000/) for a list of projects
- ...or point to a specific project directly
    - e.g. [http://localhost:3000/projects/022316_designer_shoe_handbag/build/](http://localhost:3000/projects/022316_designer_shoe_handbag/build/)


## Architecture

The `src/` directory contains all code used in the application.

```
src/
  |- img/
  |  |- image-one-en.jpg
  |  |- image-one-fr.jpg
  |- js/
  |  |- app.js
  |- scss/
  |  |- modules/
  |  |- partials/
  |  |- french-style-fix.scss
  |  |- main.scss
  |- plugins/
  |- main_EN.html
  |- main_FR.html
```

- `src/` - application-specific code.
- `src/img/` - Images in jpg or png format.
- `src/thrirdparty/` - third-party libraries or components likely to be reused in
  another application.
- `src/scss/` - SCSS CSS files.
- `src/main_EN.html` and `src/main_FR.html` - These files have the markup for English and French versions of the single page App.

### comp.js
#### Specify files to build and compile.
* `./` is the root of the app.
*  `app_files` object includes files for the **build** and **compile** process, in order.
* `build_files` object includes files to be ignored in the **compile** process, but included in the **build** process in order.

```
module.exports = {
  app_files:{
    js:[
      './src/thirdparty/hbc-carousel/hbc-carousel-bay.min.js', //HBC Carousel
      './src/js/app.js' //APP File must be included
    ] ,
    styles :[
      './src/thirdparty/hbc-carousel/hbc-carousel-bay.min.css', //HBC Carousel
      './src/scss/main.scss',             //main.scss must be included
      './src/scss/french-style-fix.scss'  //French File must be included after main.scss
    ]

    },
  // Load these files only for build, these files will not compile
  build_files:{
    js:[
      './vendor/jquery/jquery.js'
    ]
  }
};
```

### The Markup
#### For English:
```
<div id="dsg-editorial" class="dsg-editorial dsg-en">
    <header>
        <h1>English!</h1>
    </header>
    <section>
      <img src="<%=img('image-en.jpg')%>" />
    </section>
    <footer>
    </footer>
</div>
```
#### For French:
```
<div id="dsg-editorial" class="dsg-editorial dsg-fr">
    <header>
        <h1>Français!</h1>
    </header>
    <section>
    <img src="<%=img('image-fr.jpg')%>" />
    </section>
    <footer>
    </footer>
</div>
```

### Gulpfile Updates

##### v0.1.6
* Fixed `gulp watch` failing on error

##### v1.0.0
* Updated file to ES6

##### v1.0.1
* Updated to alternate between scene7 and aws

##### v1.0.2
* Changed logic for PNG > jpg, PNG > alpha
##### v1.0.3
* added scene7-links.txt with list of images to clear cache.
##### v1.0.4
* fixed prev URL for LT projects