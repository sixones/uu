# Underscore Underscore

Underscore Underscore simplifies creating global classes and building namespaced
objects in Javascript applications.

## Usage

### Creating a class

  // create a class called example.Hello
  __.create('example.Hello', {
    world: function() {
      alert('Hello World!');
    }
  });

  // call Hello#world as a static class
  example.Hello.world();

  // call Hello#world on an instance
  var hello = new example.Hello();
  hello.world();

### Creating different static and instance declarations

  // create a class called example.Hello with different methods on the static
  // and instanced versions
  __.create('example.Hello', {
    world: function() {
      alert('Hello Static World!');
    }
  }, {
    world: function() {
      alert('Hello Instanced World!');
    }
  });

  // alert Hello Static World!
  example.Hello.world();

  // alert Hello Instanced World!
  var hello = new example.Hello();
  hello.world();

### Extending a class

  __.create('example.Talker', {
    speak: function() {
      alert('Foobar!');
    }
  });

  __.extend('example.Hello', example.Talker, {
    speak: function() {
      alert('Hello World!');
    }
  });

  // alert Foobar!
  example.Talker.speak();

  // alert Hello World!
  example.Hello.speak();

### Inside Node.JS / Rhino

Talker.js

  require('__');

  __.create('example.Talker', {
    speak: function() {
      console.log('Foobar!');
    }
  });

main.js
  
  // we dont need to assign the require as __ registers the classes to the Node.JS
  // global variables, so example.Talker will always be available after the require
  require('Talker');

  // outputs Foobar!
  var talker = new example.Talker();
  talker.speak();

## Compatibility

- Google Chrome
- Firefox
- Safari
- Internet Explorer 8+
- Rhino
- Node.JS

## License

The MIT License (MIT)

Copyright (c) 2013 Adam Livesley - @sixones, Dan Glegg - @angryamoeba

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.