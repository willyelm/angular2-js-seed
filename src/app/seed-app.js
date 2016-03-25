'use strict'

import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

import {Version} from 'app/components/version'
import {Home} from 'app/components/home'
import {About} from 'app/components/about'

@Component({
  selector: 'my-app',
  templateUrl: 'app/seed-app.html',
  directives: [Version, ROUTER_DIRECTIVES]
})

@RouteConfig([{
  path: '/home',
  component: Home,
  name: 'Home',
  useAsDefault: true
}, {
  path: '/about',
  component: About,
  name: 'About'
}])

export class SeedApp {
  constructor () {
    this.title = 'My App'
  }
}
