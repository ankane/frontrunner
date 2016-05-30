# Frontrunner

:fire: Webpack for Rails

Why Webpack?

- Manage your JavaScript and CSS dependencies with [npm](https://www.npmjs.com/), the JavaScript package manager
- Use modules to keep your code organized
- *Optional* Use hot module replacement for faster iteration

But there are also a few drawbacks:

- More complex development process
- Longer build times, as there is currently no way to [cache between builds](https://github.com/webpack/webpack/issues/250)

As with the Rails asset pipeline (Sprockets), you also get:

- Minification and compression
- Digests for long-term caching
- Coffeescript and Sass support
- Source maps (Sprockets 4+)
- ES6 support (Sprockets 4+)
- *Optional* JSX support for React

Frontrunner plays nicely with the Rails asset pipeline. This makes it easy to transition existing apps at your own pace. While it may be tempting to remove Sprockets, some Rails engines like [RailsAdmin](https://github.com/sferik/rails_admin) depend on it.  You never know when you’ll want to add one of these, so we recommend keeping it around.

Like Rails, [jQuery](https://github.com/jquery/jquery), [jQuery UJS](https://github.com/rails/jquery-ujs), and [Turbolinks](https://github.com/turbolinks/turbolinks) are added to start, but these can be easily removed if desired.

## The Setup

Here are the files and directories we’ll use.

Files | Description
--- | ---
package.json | Gemfile for npm
npm-shrinkwrap.json | Gemfile.lock for npm
webpack.config.js | Webpack config
node_modules | npm packages
app/webpack | app/assets equivalent

## Installation

Add this line to your application’s Gemfile

```ruby
gem 'frontrunner'
```

And run:

```sh
bundle install
```

Generate files

```sh
rails generate frontrunner:install
```

And run:

```sh
npm install && npm shrinkwrap --dev
```

Then, add to your layout:

```erb
<%= webpack_include_tag "application" %>
```

## Development

Run:

```sh
npm run server
```

This will start the [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) at `http://localhost:8080`.

It’s possible to serve Webpack assets through Sprockets rather than a separate web server in development, but this can be significantly slower.

If you use [Foreman](https://github.com/ddollar/foreman), you can create a `Procfile.dev` with:

```
web: bin/rails server
webpack: npm run server
```

And run it with:

```sh
foreman start -f Procfile.dev
```

## Packages

Add new packages with npm.

```sh
npm install underscore -S
```

Use the `-S` option to save it to `package.json`.

You can now include the package in your JavaScript.

```js
var _ = require("underscore");
var trips = _.map([1, 2, 3], function (i) { return i * 3; });
console.log(trips);
```

### Bootstrap

Run:

```sh
npm install bootstrap-sass -S
```

For CSS, in `application.scss`, add:

```scss
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
@import "bootstrap-sass/assets/stylesheets/bootstrap";
```

Or only include specific components with:

```scss
@import "bootstrap-sass/assets/stylesheets/bootstrap/variables";
@import "bootstrap-sass/assets/stylesheets/bootstrap/mixins";
@import "bootstrap-sass/assets/stylesheets/bootstrap/alerts";
```

For JavaScript, in `application.js`, add:

```js
require("bootstrap-sass/assets/javascripts/bootstrap");
```

Or only include specific components with:

```js
require("bootstrap-sass/assets/javascripts/bootstrap/alert");
```

### React

Run:

```sh
npm install react react-dom -S
```

Support for `jsx` is already included.

Add the [React Hot Loader](http://gaearon.github.io/react-hot-loader/) with:

```sh
npm install react-hot-loader -D
```

See [Hot Module Replacement](#hot-module-replacement) for how to activate.

## Entry Points

During installation, a single [entry point](https://webpack.github.io/docs/multiple-entry-points.html) - `application` - is created.

To add another entry point - for instance, for a blog - create `blog.js` and add it to `webpack.config.js`.

```js
{
  entry: {
    application: "application",
    blog: "blog"
  }
}
```

To include it in your views, use:

```erb
<%= webpack_include_tag "blog" %>
```

## Hot Module Replacement

Use [hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html) to update code without reloading the page.

Just run `npm run server:hot` instead of `npm run server`.

If you use React, this includes the [React Hot Loader](http://gaearon.github.io/react-hot-loader/).

## Deployment

Node.js is required to build the assets. As part of the build process, run:

```sh
npm run assets:precompile
```

### Heroku

On Heroku, you’ll need to use multiple buildpacks.

```sh
heroku buildpacks:clear
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/ruby
```

And ask Heroku to install dev dependencies from `package.json`.

```sh
heroku config:set NPM_CONFIG_PRODUCTION=false
```

And in `package.json`, under `scripts`, add:

```json
{
  "scripts": {
    "heroku-postbuild": "npm run assets:precompile"
  }
}
```

## Contributing

Everyone is encouraged to help improve this project. Here are a few ways you can help:

- [Report bugs](https://github.com/ankane/frontrunner/issues)
- Fix bugs and [submit pull requests](https://github.com/ankane/frontrunner/pulls)
- Write, clarify, or fix documentation
- Suggest or add new features
