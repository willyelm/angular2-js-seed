'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const es6ify = require('es6ify');
const watchify = require('watchify');
const sourcemaps = require('gulp-sourcemaps');
const config = require('./config');
const condition = require('./condition');
const argv = require('yargs').argv;
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const assign = require('lodash/assign');
const path = require('path');
const sync = require('./sync');

var options = assign({}, watchify.args, {
  entries: [
    `${config.sources.path}/polyfills.js`,
    `${config.sources.path}/vendor.js`,
    `${config.sources.path}/app.js`
  ],
  noParse: [
    path.join(__dirname, '../', 'node_modules', 'zone.js', 'dist'),
    path.join(__dirname, '../', 'node_modules', 'angular2')
  ],
  ignore: /\-spec\.js/,
  debug: argv.debug || false
});

var b;

if(!argv.c){
  b = watchify(browserify(options));
} else {
  b = browserify(options);
}

b.transform(es6ify);

function bundle(){

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(condition(argv.c, uglify({
        mangle: false,
        compress: true,
        comments: 'm/\/\/# sourceMappingURL.*?/g'
      })))
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.build.script))
    .pipe(sync.stream({ match: '**/*.js' }));
}

if(!argv.c){
  b.on('update', bundle);
}

b.on('log', gutil.log);
b.on('error', gutil.log);

gulp.task('scripts', ['styles'], () => {
  return bundle();
});
