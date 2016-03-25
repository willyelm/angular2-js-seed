'use strict'

const gulp = require('gulp')
const uglify = require('gulp-uglify')
const browserify = require('browserify')
const watchify = require('watchify')
const babelify = require('babelify')
const sourcemaps = require('gulp-sourcemaps')
const config = require('./config')
const condition = require('./condition')
const argv = require('yargs').argv
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const gutil = require('gulp-util')
const assign = require('lodash/assign')
const sync = require('./sync')
const path = require('path')

var options = assign({}, watchify.args, {
  entries: [
    `${config.sources.path}/polyfills.js`,
    `${config.sources.path}/vendor.js`,
    `${config.sources.path}/app.js`
  ],
  noParse: [
    path.join(__dirname, '../node_modules', 'zone.js', 'dist'),
    path.join(__dirname, '../node_modules', 'angular2', 'bundles')
  ],
  ignore: /\-spec\.js/,
  debug: argv.debug || false,
  paths: [`${config.sources.path}`]
})

var b = browserify(options)
  .transform(babelify, {
    presets: [
      // 'stage-0',
      'es2015'
    ],
    plugins: ['transform-decorators-legacy'],
    ignore: /\/node_modules\//
  })

if (!argv.c) {
  b = watchify(b)
}

b.on('log', msg => {
  process.stderr.write('\n')
  gutil.log(gutil.colors.cyan('Bundled'), msg)
})

function bundle () {
  var total = 0

  b.on('file', (file, id) => {
    var name = gutil.colors.magenta(id)
    var r = gutil.colors.cyan(total++)
    process.stderr.cursorTo(0)
    process.stderr.write(`Bundle files ${r} current [${name}]`)
    process.stderr.clearLine(1)
  })

  return b
    .bundle()
    .on('error', err => gutil.log(gutil.colors.red(err.message)))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(condition(argv.c, uglify({
        mangle: false,
        compress: true,
        comments: 'm/\/\/# sourceMappingURL.*?/g'
      }).on('error', gutil.log)))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.build.script))
    .pipe(sync.stream({ match: '**/*.js' }))
}

if (!argv.c) {
  b.on('update', bundle)
}

gulp.task('scripts', ['styles'], () => {
  return bundle()
})
