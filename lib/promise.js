/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * ES6 polyfills that use native implementation if available and do not pollute the global namespace
 *
 * Copyright (c) 2015-2017 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of es6-polyfills 
 *
 * es6-polyfills is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 **/

/* istanbul ignore next */
(function (root, factory) {
  
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['es6-promise-polyfill'], factory);
  } else if (typeof exports === 'object' && module.exports) {
    module.exports = factory(require('es6-promise-polyfill'));
  }

}(this, factory));

function factory(PromisePolyfill) {

  'use strict';

  /**
   * @internal No need to check for native Promise since es6-promise-polyfill already does that for us
   **/
  return function()
  {
    return PromisePolyfill.hasOwnProperty('Promise') ? PromisePolyfill.Promise : PromisePolyfill;
  };

}
