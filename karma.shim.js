/* global __karma__, jasmine */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000

__karma__.loaded = function () {}

System.config({
  baseURL: './',
  map: {
    'base/src/app': ['dist/src/app']
  },
  packages: {
    app: {
      defaultExtension: 'js'
    }
  }
})

var specFiles = Object
  .keys(__karma__.files)
  .filter(function (file) {
    return /-spec\.js/.test(file)
  })

System
  .import('angular2/testing')
  .then(function (testing) {
    // Setup angular testing
    return System
      .import('angular2/platform/testing/browser')
      .then(function (providers) {
        testing.setBaseTestProviders(providers.TEST_BROWSER_PLATFORM_PROVIDERS,
          providers.TEST_BROWSER_APPLICATION_PROVIDERS)
      })
  })
  .then(function () {
    specFiles.unshift('rxjs/Rx') // Adding rxjs
    var specs = specFiles.map(function (path) {
      return System.import(path)
    })
    return Promise.all(specs)
  })
  .then(function () {
    __karma__.start()
  }, function (err) {
    __karma__.error(err.message)
  })
