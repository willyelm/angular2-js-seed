# angular2-seed

[![Travis](https://img.shields.io/travis/willyelm/angular2-js-seed.svg?style=flat-square)](https://travis-ci.org/willyelm/angular2-js-seed)
[![Standard](https://img.shields.io/badge/code%20style-standard-yellow.svg?style=flat-square)](http://standardjs.com/)
[![Gitter](https://img.shields.io/gitter/room/willyelm/angular2-js-seed.svg?style=flat-square)](https://gitter.im/willyelm/angular2-js-seed)

This Project uses `Gulp` to bundle the application vendors, `SystemJS`
to modularize the sources, and `Babel` to use `ES6` great features

> `Babel` disabled the decorators experimental feature in the
> latest version but while they add it back I am using  [`babel-plugin-transform-decorators-legacy`](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy).
> So we end up with well modular application
> without **Typings**, "Typescript is a good tool but I am fan of it."

This initial application also includes `Twitter Bootstrap4`, `Tether`
and `jQuery`.

## Getting Started

Clone or fork this repository and run the following command to install
the necessary dependencies.

```bash
npm install
```

### Usage

and then to start the development server at [`http://localhost:3000`](http://localhost:3000):

```bash
npm start
```

> The port `3000` may change if it is already in use.

To just compile a compressed version of the application without dev server,
run the following command:

```bash
npm run build
```

### Directory Layout

```bash
src
├── app
│   ├── components                # All application specific modules
│   │   ├── about
│   │   │   ├── about-spec.js     # About unit test
│   │   │   ├── about.jade        # About template
│   │   │   └── index.js          # About module
│   │   ├── home
│   │   │   ├── home-spec.js      # Home unit test
│   │   │   ├── home.jade         # Home template
│   │   │   └── index.js          # Home module
│   │   └── version
│   │       ├── index.js          # Version module
│   │       ├── version-spec.js   # Version unit test
│   │       └── version.jade      # Version template
│   ├── services                  # All application shared services
│   │   ├── github-spec.js        # Github unit test
│   │   └── github.js             # Github service module
│   ├── seed-app-spec.js          # Application unit test module
│   ├── seed-app.jade             # Main application template
│   └── seed-app.js               # Main application main module
├── app-spec.js                   # Bootstrap unit test config
├── app.js                        # Bootstrap main application
├── app.scss                      # Default stylesheet
├── bootstrap.js                  # SystemJS import app
├── index.jade                    # Default Index template
```

### Unit Tests

To lint the files I am using [`standard`](http://standardjs.com/) and
karma for unit testing, run the following command to test both:

```bash
npm test
```

<!-- run it once:

```bash
npm run test:single
``` -->
