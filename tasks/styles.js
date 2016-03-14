'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const sourcemaps = require('gulp-sourcemaps');
const config = require('./config');
const sync = require('./sync');

gulp.task('styles', () => {

  var styles = gulp
    .src(config.sources.style)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.build.style))
    .pipe(sync.stream({ match: '**/*.css' }));

  var resources = gulp
    .src(config.sources.image)
    .pipe(gulp.dest(config.build.image))
    .pipe(sync.stream({ match: '**/*.{png,jpg,jpeg,svg}' }));

  var libs = gulp
    .src(config.libs.style)
    .pipe(gulp.dest(config.build.style))
    .pipe(sync.stream({ match: '**/*.css' }));

  return merge(styles, resources, libs);
});
