'use strict';

const ng = require('angular2/testing');
const $ = require('jquery');

const AppComponent = require('./seed-app');

describe('SeedApp Component: can start', () => {

  ng.it('should have a title', () => {

    let app = new AppComponent();

    expect(app.title).toEqual('Hello World');
  });

  ng.it('should include a page header element', ng.injectAsync([
    ng.TestComponentBuilder
  ], (tcb) => {

    return tcb
      //.overrideTemplate(AppComponent, '')
      .createAsync(AppComponent)
      .then((fixture) => {

        let compiled;
        let header;

        fixture.detectChanges();
        compiled = fixture.debugElement.nativeElement;
        // header = compiled.querySelector('.page-header').innerHTML;
        header = $(compiled).find('.page-header');
        expect(header.html()).toMatch(/Angular2 Seed/);
      });
  }));

});
