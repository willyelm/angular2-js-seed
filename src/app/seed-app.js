'use strict'

import {Component} from 'angular2/core'
import {Version} from './components/version/version'

@Component({
  selector: 'my-app',
  templateUrl: 'app/seed-app.html',
  directives: [Version]
})

export class SeedApp {

  constructor () {
    this.title = 'Hello World'
  }
}
