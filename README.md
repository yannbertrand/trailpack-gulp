# trailpack-gulp

:package: Gulp Trailpack.

## 1. Intallation
With yo : 

```
npm install -g yo generator-trails
yo trails:trailpack trailpack-gulp
```

With npm (you will have to create config file manually) :
 
`npm install --save trailpack-gulp`


## 2. Configure

### a. Configure Trails
```js
// config/main.js

module.exports = {
  ...
  packs: [
    ...
    require('trailpack-gulp')
  ]
  ...
}
```
### b. Configure Gulp

This trailpack uses standard [Gulp Configuration](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).

```js
// config/gulp.js

const gulp = require('gulp')
const watch = require('gulp-watch')
const sass = require('gulp-sass')
const del = require('del')

const src = './assets'
const sassDest = './assets/css'
const dest = './.tmp/public'

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
}

module.exports = {

  defaultTaskName : 'default',

  tasks: {
      default: ['clean', 'compileCss', 'copyAssets', 'compileTemplate'],
      production: ['clean', 'compileCss', 'minify', 'concat', 'copyAssetsProd', 'compileTemplateProd'],
      clean: (done) => {
        del.sync([dest + '/**/*', sassDest + '/**/*'])
        done()
      },
      compileCss: (done) => {
        gulp.src(src + '/sass/**/*.scss')
          .pipe(watch(src + '/sass/**/*.scss'))
          .pipe(sass(sassOptions))
          .pipe(gulp.dest(sassDest))
        done()
      },
      copyAssets: (done) => {
        gulp
          .src([src + '/**/*', '!**/*.scss'])
          .pipe(watch(src, {base: src}))
          .pipe(gulp.dest(dest))
        done()
      },
      compileTemplate: (done) => {
        //TODO Replace <!--SCRIPT--> by js files Replace <!--STYLES--> by css files
        done()
      },
      compileTemplateProd: (done) => {
        //TODO Replace <!--SCRIPT--> by js concat file Replace <!--STYLES--> by css concat file
        done()
      },
      minify: (done) => {
        //TODO minify css/js
        done()
      },
      concat: (done) => {
        //TODO concat js/css in one file
        done()
      },
      copyAssetsProd: (done) => {
        gulp
          .src([src + '/**/*', '!**/*.scss'])//TODO don't copy css and js files, only min.js and min.css
          .pipe(watch(src, {base: src}))
          .pipe(gulp.dest(dest))
        done()
      }
    }

}
```

## 3. Start!

```sh
$ npm start
```
## 4. Production build
You can override the `defaultTaskName` to run like this : 

```js
// config/env/production.js

module.exports = {
  ...
  gulp : {
    defaultTaskName : 'production'
  }
  ...
}
```


## License
MIT

## Maintained By
