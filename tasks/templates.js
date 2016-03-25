'use strict'

const gulp = require('gulp')
const jade = require('gulp-jade')
const config = require('./config')
const sync = require('./sync')
const gutil = require('gulp-util')

gulp.task('templates', ['scripts'], () => {
  return gulp
    .src(config.sources.template)
    .pipe(jade().on('error', gutil.log))
    .pipe(gulp.dest(config.build.path))
    .pipe(sync.stream())
})
