'use strict'

const gulp = require('gulp')
const gutil = require('gulp-util')
const gulpIf = require('gulp-if')
const del = require('del')
const babel = require('gulp-babel')
const jade = require('gulp-jade')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const config = require('./config')
const sync = require('browser-sync')
const merge = require('merge-stream')
const sourcemaps = require('gulp-sourcemaps')
const changed = require('gulp-changed')
const spawn = require('child_process').spawn
const argv = require('yargs')
  .usage('Usage: --env [production, development]')
  .example('--env dev', 'set enviroment')
  .demand(['env'])
  .argv
// compress flag
var compress = argv.env === 'production'
// uglify settings
function uglifier () {
  return uglify({
    mangle: false,
    comments: 'm/\/\/# sourceMappingURL.*?/g'
  }).on('error', gutil.log)
}
// babel settings
function babelifier () {
  return babel({
    comments: false,
    presets: ['es2015'],
    plugins: ['transform-decorators-legacy']
  }).on('error', gutil.log)
}

function buildTemplate () {
  return gulp
    .src(config.sources.templates)
    .pipe(changed(config.path, { extension: '.html' }))
    .pipe(jade())
    .pipe(gulp.dest(config.path))
}

function buildStyle () {
  return gulp
    .src(config.sources.styles, { extension: '.css' })
    .pipe(changed(config.path))
    .pipe(sass())
    .pipe(gulp.dest(config.path))
}

function buildScript () {
  return gulp
    .src(config.sources.scripts)
    .pipe(changed(config.path))
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(babelifier())
      .pipe(gulpIf(compress, uglifier()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.path))
}

function buildVendor () {
  var js = gulp
    .src(config.polyfills.concat(config.vendor.scripts))
    .pipe(changed(config.path))
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(concat('vendor.js'))
      .pipe(gulpIf(compress, uglifier()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.path))
  var css = gulp
    .src(config.vendor.styles, { extension: '.css' })
    .pipe(changed(config.path))
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(concat('vendor.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.path))
  return merge(js, css)
}

gulp.task('build:clear', (cb) => {
  return del([`${config.path}/**`], cb)
})

gulp.task('build:template', ['build:clear'], buildTemplate)
gulp.task('build:vendor', ['build:template'], buildVendor)
gulp.task('build:script', ['build:vendor'], buildScript)
gulp.task('build:style', ['build:script'], buildStyle)

gulp.task('watch:vendor', buildVendor)
gulp.task('watch:script', buildScript)
gulp.task('watch:style', buildStyle)
gulp.task('watch:template', buildTemplate)
gulp.task('watch', ['build:style'], () => {
  if (argv.server) {
    sync.init({
      open: false,
      injectChanges: true,
      server: {
        baseDir: 'dist'
      },
      files: [
        'dist/**/*.css',
        'dist/**/*.js',
        'dist/**/*.html'
      ]
    })
  }
  gulp.watch(config.sources.templates, ['watch:template'])
  gulp.watch(config.sources.styles, ['watch:style'])
  gulp.watch(config.sources.scripts, ['watch:script'])
  gulp.watch(config.polyfills.concat(config.vendor.scripts), ['watch:vendor'])

  gulp.watch(['gulpfile.js', 'config.json'], ['reload'])
})

gulp.task('reload', function () {
  sync.exit()
  spawn('gulp', [
    'watch',
    '--env', argv.env,
    '--server', argv.server
  ], {
    stdio: 'inherit'
  })
  process.exit()
})

gulp.task('develop', ['watch'])
gulp.task('build', ['build:style'])
