// Styles
require("application.scss");

// jQuery
window.$ = window.jQuery = require("jquery");

// Rails UJS
require("jquery-ujs");

// Turbolinks
const Turbolinks = require("turbolinks");
Turbolinks.start();

// Hi!
const hello = require("hello");
console.log(hello("Webpack"));
