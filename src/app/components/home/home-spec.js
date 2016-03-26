import {
  it,
  describe,
  expect,
  injectAsync,
  TestComponentBuilder
} from 'angular2/testing'

import {Home} from './home'

describe('Home Component', () => {
  it('should include a header with "Home" title', injectAsync([
    TestComponentBuilder
  ], (builder) => {
    return builder
      //  .overrideTemplate(SeedApp, '')
      .createAsync(Home)
      .then((fixture) => {
        let element = fixture.debugElement.nativeElement
        let header = element.querySelector('h5')
        fixture.detectChanges()
        expect(header.innerHTML).toMatch(/Home/)
      })
  }))
})
