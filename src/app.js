import {bootstrap} from 'angular2/platform/browser'
import {provide, enableProdMode} from 'angular2/core'
import {HTTP_PROVIDERS} from 'angular2/http'
import {SeedApp} from './app/seed-app'

import {
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router'

enableProdMode()

bootstrap(SeedApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {
    useClass: HashLocationStrategy
  })
])
.catch((err) => console.error(err))
