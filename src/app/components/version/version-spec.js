'use strict';

const ng = require('angular2/testing');
const VersionComponent = require('./version');

describe('Version Component: show version number', () => {

  ng.it('should have a valid version number', () => {

    let version = new VersionComponent();

    expect(version.version).toEqual('0.0.1');
  });

  ng.it('should have the version in the html element', ng.injectAsync([
    ng.TestComponentBuilder
  ], (tcb) => {

    return tcb
      //.overrideTemplate(AppComponent, '')
      .createAsync(VersionComponent)
      .then((fixture) => {

        let compiled;

        fixture.detectChanges();
        compiled = fixture.debugElement.nativeElement;
        expect(compiled.innerHTML).toMatch(/0\.0\.1/);
      });
  }));

});
