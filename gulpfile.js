'use strict';

const gulp = require('gulp');
const config = require('./tasks/config');
const del = require('del');
const sync = require('./tasks/sync');

require('./tasks/scripts');
require('./tasks/templates');
require('./tasks/styles');

gulp.task('clear', () => {
  return del([
    `${config.build.path}/**/*`
  ]);
});

gulp.task('watch', ['build'], () => {
  gulp.watch(config.sources.style, [ 'styles' ]);
  gulp.watch(config.sources.template, [ 'templates' ]);
});

gulp.task('build', [
  'styles',
  'scripts',
  'templates'
]);

gulp.task('develop', [
  'build',
  'watch'
], () => {

  sync.init({
    open: false,
    injectChanges: true,
    server: {
      baseDir: config.build.path
    }
  });
});
