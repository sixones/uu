var cc = require('closure-compiler');
var fs = require('fs');

var source = fs.readFileSync('./__.js');

fs.mkdir('build', function() {
  
});
fs.writeFileSync('build/__.js', source);

cc.compile(source, {
  //'compilation_level': 'ADVANCED_OPTIMIZATIONS'
}, function(e, stdout, stderr) {
  if (e) {
    throw e;
  }

  var minified = stdout;

  fs.writeFileSync('build/__.min.js', minified);
});