'use strict'

const config = require('./tasks/config')
const path = require('path')
const argv = require('yargs').argv

module.exports = function (karma) {
  karma.set({
    basePath: './',
    files: [
      `${config.sources.path}/polyfills.js`,
      `${config.sources.path}/vendor.js`,
      `${config.sources.path}/app-spec.js`, //  Initial Setup
      `${config.sources.path}/**/*-spec.js`, // All Other Specs
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
      paths: [`${config.sources.path}`],
      transform: [ ['babelify', {
        presets: [
          'es2015'
        ],
        plugins: ['transform-decorators-legacy'],
        ignore: /\/node_modules\//
      }]]
    },
    autoWatch: true,
    frameworks: ['browserify', 'jasmine'],
    browsers: [ argv.browser || 'Chrome' ], // PhantomJS, Chrome
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    reporters: ['suite'],
    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-browserify',
      'jasmine-suite-reporter/karma'
    ]
  })
}
