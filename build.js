var jsonResume = require('./lib/');
var mustache = require('mustache');

var fs = require('fs');

var extension = {
  html: 'html',
  latex: 'tex',
  md: 'md'
};

var convert = function(resume, type){
  var result = resume.format(type);

  fs.readFile('./templates/default_' + type + '.mustache', {encoding: 'utf-8'}, function(err, template){
    var output = mustache.render(template, result);
    fs.writeFile('bin/resume.' + extension[type], output, function(err){ if(err) console.log(err); });
  });
};

var resume = new jsonResume(process.argv[2], function(){
  convert(resume, 'md');
  convert(resume, 'html');
  convert(resume, 'latex');
});
