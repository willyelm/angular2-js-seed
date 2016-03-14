'use strict';

const ngBrowser = require('angular2/platform/browser');
const ngCore = require('angular2/core');
const log = require('console');

var AppComponent = require('./app/seed-app');

ngCore.enableProdMode();

ngBrowser
  .bootstrap(AppComponent)
  .catch(err => log.error(err));
