'use strict';

const config = require('./tasks/config');
const path = require('path');

module.exports = function(karma){

  karma.set({
    basePath : './',
    files : [
      `${config.sources.path}/polyfills.js`,
      `${config.sources.path}/vendor.js`,
      `${config.sources.path}/app-spec.js`, //Initial Config Spec
      `${config.sources.path}/**/*-spec.js`, //All Other Specs
      {
        pattern: `${config.build.path}/**/*.html`,
        included: false,
        watched: true
      },
      {
        pattern: `${config.build.path}/**/*.css`,
        included: false,
        watched: true
      }
    ],
    proxies: {
      '/app/': path.join(__dirname, config.build.path, 'app/'),
      '/css/': path.join(__dirname, config.build.path, 'css/')
    },
    preprocessors: {
      'src/**/*.js': [ 'browserify' ]
    },
    browserify: {
      debug: false,
      transform: [ 'es6ify' ]
    },
    autoWatch : true,
    frameworks: ['browserify', 'jasmine'],
    browsers : ['Chrome'],
    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-browserify'
    ]
  });
};
