# ES6 polyfills
A collection of [ES6](https://en.wikipedia.org/wiki/ECMAScript#ES6) polyfills that use native implementations if available and do not pollute the global namespace

## List of polyfills

Polyfill implementations are from different projects:

* **Object** (*Object.assign*): https://github.com/ljharb/object.assign
* **Promise**: https://github.com/lahmatiy/es6-promise-polyfill

## Installation

Clone the sources and install the package (In the source directory) on command line using `npm`:

```sh
npm install
```

## Testing

*TODO*

## Usage

### AMD

```javascript

define(['es6-polyfills/lib/promise'], function(Promise) {

 var p = new Promise(function(resolve, reject){
  resolve(); 
 });

});


```

### Node.js

```javascript

var Promise = require('es6-polyfills/lib/promise');
var p = new Promise(function(resolve, reject){
  resolve();
});

```

### Browser globals (Okay, it *can* pollute the global namespace)

```javascript

var p = new Promise(function(resolve, reject){
  resolve();
});

```

## License and copyright

Copyright (c) 2015-2016 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **GNU General Public License Version 3**. See each polyfill implementation for their respective licensing terms.
