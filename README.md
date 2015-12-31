# trailpack-gulp

:package: Gulp Trailpack.

## 1. Install
```sh
$ npm install trailpack-gulp --save
```

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

module.exports = {
  defaultTaskName : 'default',
  tasks: {
    'default' : function (next) {
      //Do what you want with your assets
      next()
    },
    'production' : function (next) {
      //Do what you want with your assets
      next()
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
