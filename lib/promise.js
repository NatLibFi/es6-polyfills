(function() {

    'use strict';

    var define;

    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }

    define(['es6-promise-polyfill'], function(PromisePolyfill) {
	return typeof Promise === 'undefined' ? PromisePolyfill : Promise;
    });

})();