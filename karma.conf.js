'use strict'

const argv = require('yargs').argv

module.exports = function (karma) {
  karma.set({
    basePath: './',
    files: [
      'dist/vendor.js',
      'node_modules/angular2/bundles/testing.dev.js',
      'karma.shim.js',
      { pattern: 'dist/**/*.js', included: false, watched: true },
      { pattern: 'dist/**/*.html', included: false, watched: true },
      { pattern: 'src/**/*-spec.js', included: false, watched: true }
    ],
    proxies: {
      '/app/': '/base/dist/app/',
      '/base/src/app/': '/base/dist/app/'
    },
    autoWatch: true,
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/*-spec.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        comments: false,
        presets: ['es2015'],
        plugins: ['transform-decorators-legacy']
      }
    },
    browsers: [ argv.browser || 'Chrome' ], // PhantomJS, Chrome
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    reporters: ['suite'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-babel-preprocessor',
      'jasmine-suite-reporter/karma'
    ]
  })
}
