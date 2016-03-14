'use strict';

const ngCore = require('angular2/core');
const VersionComponent = require('./components/version/version.js');

module.exports = ngCore
  .Component({
    selector: 'my-app',
    templateUrl: 'app/seed-app.html',
    directives: [VersionComponent]
  })
  .Class({
    constructor() {
      this.title = 'Hello World';
    }
  });
