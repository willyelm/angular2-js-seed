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

// function coroutine (fn) {
//   var gen = fn()
//   function next (err, res) {
//     var ret = gen.next(res)
//     if (ret.done) return
//     ret.value(next)
//   }
//   next()
// }
