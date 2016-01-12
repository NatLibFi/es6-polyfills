(function() {

    'use strict';

    function formatPath(path) {
	return path.replace(new RegExp('^/base/'), '').replace(/\.js$/, '');
    }

    var spec_list = [];
    
    Object.keys(window.__karma__.files).forEach(function(file) {
	if (new RegExp('^/base/test/').test(file) === true && new RegExp('spec\.js$', 'i').test(file) === true) {
	    spec_list.push(formatPath(file));
	}
    });
    
    require.config({
	baseUrl: '/base',
	paths: {
	    'chai': 'node_modules/chai/chai',
	    'es6-object-assign': 'node_modules/es6-object-assign',
	    'es6-promise-polyfill': 'node_modules/es6-promise-polyfill/promise'
	},
	deps: spec_list,
	callback: window.__karma__.start
    });
    
})();