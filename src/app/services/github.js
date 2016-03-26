'use strict'

import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'

@Injectable()
@Reflect.metadata('design:paramtypes', [Http])
export class Github {

  constructor (http) {
    this.baseUrl = 'https://raw.githubusercontent.com'
    this.http = http
  }

  get version () {
    let url = `${this.baseUrl}/willyelm/angular2-js-seed/master/package.json`
    return this
      .http
      .get(url)
      .map((res) => res.json())
  }
};
