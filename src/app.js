'use strict'

import {bootstrap} from 'angular2/platform/browser'
// import {enableProdMode} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http'
import {SeedApp} from './app/seed-app'
import log from 'console'

// enableProdMode();

module.exports = bootstrap(SeedApp, [
  HTTP_PROVIDERS
])
.catch(err => log.error(err))
