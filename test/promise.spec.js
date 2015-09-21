/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file. 
*
* ES6 polyfills that use native implementation if available and do not pollute the global namespace
*
* Copyright (c) 2015 University Of Helsinki (The National Library Of Finland)
*
* This file is part of es6-polyfills 
*
* es6-polyfills is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this page.
*
**/

(function() {

    'use strict';
    
    var define;

    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }

    function removeModuleFromCache(module_path)
    {
	if (require.cache && module_path in require.cache) {
	    delete require.cache[module_path];
	}
    }

    define(['require', 'chai'], function(require, chai) {
	
	var expect = chai.expect;
	
	function removeModuleFromCache(module_path)
	{
	    if (require.cache && module_path in require.cache) {
		delete require.cache[module_path];
	    }
	}
	
	describe('promise', function() {
	    
	    afterEach(function() {
		/**
		 * @todo amdefine's require doesn't normalize the path correctly. Report&|Contribute
		 */
		removeModuleFromCache(require.toUrl('../lib/promise').replace(new RegExp('/\\.\\.'), '') + '.js');
	    });
	    
	    it('Should return a native Promise', function(done) {

		var no_native_promise, Promise;

		if (typeof Promise !== 'function') {

		    Promise = function() {			
			this.then = function(){};
			this.catch = function(){};
		    };		

		    Promise.prototype.all = function() {};
		    Promise.prototype.race = function() {};
		    Promise.prototype.resolve = function() {};
		    Promise.prototype.reject = function() {};

		}

		require(['../lib/promise'], function(PromisePolyfill) {

		    expect(PromisePolyfill).to.be.a('function');
		    expect(Object.getOwnPropertyNames(PromisePolyfill)).to.include.members(Object.keys(Promise.prototype));
		    expect(new PromisePolyfill(function(){})).to.respondTo('then').and.to.respondTo('catch');

		    if (no_native_promise) {
			Promise = undefined;
		    }

		    done();

		});		
	    });

	    it('Should return a polyfill to Promise', function(done) {
		
		var NativePromise;

		if (typeof Promise === 'function') {
		    NativePromise = Promise;
		    Promise = undefined;
		}

		require(['../lib/promise'], function(PromisePolyfill) {

		    expect(PromisePolyfill).to.be.a('function');
		    expect(new PromisePolyfill(function(){})).to.respondTo('then').and.to.respondTo('catch');

		    if (NativePromise) {
			Promise = NativePromise;
		    }

		    done();

		});

	    });	
	  
	    it('Should resolve', function(done) {
		require(['../lib/promise'], function(PromisePolyfill) {
		    new PromisePolyfill(function(resolve, reject) {
			resolve();
		    }).then(function() {
			done();
		    });
		});
	    });

  
	});

    });

}());