(function() {

    'use strict';

    var define;

    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }

    define(['./object', './promise'], function(Object, Promise) {
	return {
	    Object: Object,
	    Promise: Promise
	};
    });

})();