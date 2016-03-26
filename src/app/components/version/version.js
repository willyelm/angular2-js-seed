'use strict'

import {Component} from 'angular2/core'
import {Github} from 'app/services/github'

var config = {
  selector: 'my-version',
  templateUrl: 'app/components/version/version.html',
  providers: [Github]
}

@Component(config)
@Reflect.metadata('design:paramtypes', config.providers)

export class Version {

  constructor (github) {
    github
      .version
      .subscribe(({ version }) => {
        this.version = version
      })
  }
}
