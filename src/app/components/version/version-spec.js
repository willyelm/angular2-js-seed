'use strict'

import {provide} from 'angular2/core'
import {MockBackend} from 'angular2/http/testing'
import {ROUTER_PROVIDERS} from 'angular2/router'

import {
  HTTP_PROVIDERS,
  Response,
  XHRBackend
} from 'angular2/http'

import {
  it,
  describe,
  expect,
  beforeEachProviders,
  injectAsync,
  TestComponentBuilder
} from 'angular2/testing'

import {Github} from 'app/services/github'
import {Version} from './index'

describe('Version Component', () => {
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS,
      provide(XHRBackend, { useClass: MockBackend }),
      Github
    ]
  })

  it('should render version number',
    injectAsync([XHRBackend, TestComponentBuilder],
      (backend, builder) => {
        backend.connections.subscribe((connection) => {
          connection.mockRespond(new Response({
            body: {
              version: '1.0.0'
            }
          }))
        })
        return builder
          .createAsync(Version)
          .then((fixture) => {
            let element = fixture.debugElement.nativeElement
            fixture.detectChanges()
            expect(element.innerHTML).toMatch(/Version\: 1\.0\.0/)
          })
      }))
})
