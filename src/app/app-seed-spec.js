import {
  it,
  describe,
  expect,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder,
  MockApplicationRef
} from 'angular2/testing'

import {
  APP_BASE_HREF,
  ROUTER_PROVIDERS,
  ROUTER_PRIMARY_COMPONENT
} from 'angular2/router'

import {provide, ApplicationRef} from 'angular2/core'
import {HTTP_PROVIDERS} from 'angular2/http'
import {SeedApp} from 'app/seed-app'

describe('SeedApp Component', () => {
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS,
      provide(ROUTER_PRIMARY_COMPONENT, {
        useValue: SeedApp
      }),
      provide(APP_BASE_HREF, {
        useValue: '/'
      }),
      provide(ApplicationRef, {
        useClass: MockApplicationRef
      })
    ]
  })

  it('should include a page header element', injectAsync([
    TestComponentBuilder
  ], (builder) => {
    return builder
      //  .overrideTemplate(SeedApp, '')
      .createAsync(SeedApp)
      .then((fixture) => {
        let element = fixture.debugElement.nativeElement
        let header = element.querySelector('.page-header')
        fixture.detectChanges()
        expect(header.innerHTML).toMatch(/Seed Application/)
      })
  }))
})
