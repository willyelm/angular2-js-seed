System.config({
  baseURL: './',
  packages: {
    app: {
      defaultExtension: 'js'
    }
  }
})

Promise
  .all([
    System.import('rxjs/Rx'), // rxjs for angular2/http
    System.import('app.js') // import app
  ])
  .catch((err) => {
    console.error(err)
  })
