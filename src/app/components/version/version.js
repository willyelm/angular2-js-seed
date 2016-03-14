'use strict';

const ngCore = require('angular2/core');

module.exports = ngCore
  .Component({
    selector: 'my-version',
    templateUrl: 'app/components/version/version.html'
  })
  .Class({
    constructor() {
      this.version = this.getVersion();
    },
    getVersion() {
      return '0.0.1';
    }
  });
