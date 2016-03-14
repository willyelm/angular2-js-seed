'use strict';

const ng = require('angular2/testing');
const ngBrowser = require('angular2/platform/testing/browser');

ng.setBaseTestProviders(
  ngBrowser.TEST_BROWSER_PLATFORM_PROVIDERS,
  ngBrowser.TEST_BROWSER_APPLICATION_PROVIDERS);
