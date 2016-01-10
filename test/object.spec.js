/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file. 
*
* ES6 polyfills that use native implementation if available and do not pollute the global namespace
*
* Copyright (c) 2015-2016 University Of Helsinki (The National Library Of Finland)
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
	
	describe('object', function() {

	    afterEach(function() {
		removeModuleFromCache(require.toUrl('../lib/object').replace(new RegExp('/\\.\\.'), '') + '.js');
	    });

	    it('Should return a native Object', function(done) {

		var native_assign;

		if (Object.hasOwnProperty('assign')) {
		    native_assign = Object.assign;
		    delete Object.assign;
		}

		Object.assign = function(){};

		require(['../lib/object'], function(ObjectPolyfill) {

		    expect(ObjectPolyfill.assign).to.be.a('function');
		    expect(ObjectPolyfill).to.eql(Object);
		    expect(new ObjectPolyfill()).to.be.an.instanceOf(ObjectPolyfill);

		    if (native_assign) {
			Object.assign = native_assign;
		    } else {
			delete Object.assign;
		    }

		    done();

		});		
	    });

	    it('Should return a polyfill to Object', function(done) {

		var native_assign;

		if ('assign' in Object) {
		    native_assign = Object.assign;
		    delete Object.assign;
		}

		require(['../lib/object'], function(ObjectPolyfill) {

		    expect(ObjectPolyfill.assign).to.be.a('function');
		    expect(ObjectPolyfill).not.to.eql(Object);
		    expect(new ObjectPolyfill()).to.be.an.instanceOf(ObjectPolyfill);

		    if (native_assign) {
			Object.assign = native_assign;
		    } else {
			delete Object.assign;
		    }

		    done();

		});


	    });

	    it('Should assign properties to the other object', function(done) {
		require(['../lib/object'], function(Object) {

		    var source = {
			a: 0,
			b: 1,
			c: 2
		    };
		    var target = {};

		    Object.assign(target, source);

		    expect(Object.keys(target).sort()).to.eql(Object.keys(source).sort());

		    done();


		});
	    });

	});

    });

}());