(function() {

    'use strict';

    var define;

    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }

    define(['object.assign'], function(ObjectAssign) {

	if ('assign' in Object) {
	    return Object;
	} else {

	    var polyfill = {};
	    
	    Object.getOwnPropertyNames(Object).forEach(function(prop) {
		polyfill[prop] = Object[prop];
	    });
	    
	    polyfill.assign = ObjectAssign.getPolyfill();
	    
	    return polyfill;

	}
	    
    });

})();