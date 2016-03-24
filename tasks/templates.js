'use strict';

const gulp = require('gulp');
const jade = require('gulp-jade');
const config = require('./config');
const sync = require('./sync');

gulp.task('templates', ['scripts'], function() {

  return gulp
    .src(config.sources.template)
    .pipe(jade())
    .pipe(gulp.dest(config.build.path))
    .pipe(sync.stream());
});
