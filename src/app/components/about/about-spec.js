import {
  it,
  describe,
  expect,
  injectAsync,
  TestComponentBuilder
} from 'angular2/testing'

import {About} from './about'

describe('About Component', () => {
  it('should include a header with "About" title', injectAsync([
    TestComponentBuilder
  ], (builder) => {
    return builder
      .createAsync(About)
      .then((fixture) => {
        let element = fixture.debugElement.nativeElement
        let header = element.querySelector('h5')
        fixture.detectChanges()
        expect(header.innerHTML).toMatch(/About/)
      })
  }))
})
