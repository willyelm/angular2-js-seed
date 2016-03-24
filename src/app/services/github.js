'use strict';

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

var path = 'https://raw.githubusercontent.com';

@Injectable()
@Reflect.metadata('design:paramtypes', [Http])

export class Github {

  constructor(http){
    this.http = http;
  }

  get version() {

    let url = `${path}/willyelm/angular2-js-seed/master/package.json`;

    return this
      .http
      .get(url)
      .map(res => res.json());
  }
};
