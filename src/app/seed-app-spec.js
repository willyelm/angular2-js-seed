'use strict'

import {
  it,
  describe,
  expect,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing'

import {HTTP_PROVIDERS} from 'angular2/http'
import {SeedApp} from './seed-app'

describe('SeedApp Component', () => {
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS
    ]
  })

  it('should include a page header element', injectAsync([
    TestComponentBuilder
  ], (builder) => {
    return builder
      //  .overrideTemplate(AppComponent, '')
      .createAsync(SeedApp)
      .then((fixture) => {
        let element = fixture.debugElement.nativeElement
        let header = element.querySelector('.page-header')
        fixture.detectChanges()
        expect(header.innerHTML).toMatch(/Angular2 Seed/)
      })
  }))
})
