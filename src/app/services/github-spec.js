import {provide} from 'angular2/core'
import {MockBackend} from 'angular2/http/testing'

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
  injectAsync
} from 'angular2/testing'

import {Github} from 'app/services/github'

describe('Github Service', () => {
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, { useClass: MockBackend }),
      Github
    ]
  })

  it('should return version from service',
    injectAsync([Github, XHRBackend],
      (github, backend) => {
        backend.connections.subscribe((connection) => {
          connection.mockRespond(new Response({
            body: {
              version: '1.5.0'
            }
          }))
        })
        return new Promise((resolve, reject) => {
          github.version.subscribe(
            ({version}) => {
              expect(version).toBe('1.5.0')
              resolve()
            },
            (err) => reject(err))
        })
      }))
})
