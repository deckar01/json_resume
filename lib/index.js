var FormatterHtml = require('./formatter_html');
var FormatterLatex = require('./formatter_latex');
var FormatterMd = require('./formatter_md');

var fs = require('fs');
var request = require('request');

var Reader = function(json_input, callback){
  callback = callback || function(){};

  this.hash = {};
  
  var parse = function(json_string){
    try{
      this.hash = JSON.parse(json_string);
    } catch(e) {
      throw new Error("Either you entered a file without .json extension or JSON string is wrong: " + e.message)
    }

    callback();
  }.bind(this);

  if(/.json$/.test(json_input)){
    // Parse JSON from file.
    fs.readFile(json_input, {encoding: 'utf-8'}, function(err, data){ parse(data || ''); });
  }
  else if(/^(http|https|www)/.test(json_input)){
    // Parse JSON from URL.
    request.post( json_input, {}, function(error, response, body){ parse(body || ''); });
  } else {
    // Parse JSON from input.
    parse(json_input);
  }
};

Reader.prototype.format = function(output_type){
  output_type = output_type || 'html';

  var formatters = {
    latex: FormatterLatex,
    html: FormatterHtml,
    md: FormatterMd
  };

  //Hack: clone the hash to pass it by value.
  var hash = JSON.parse(JSON.stringify(this.hash));
  return new formatters[output_type](hash).format().hash;
};

module.exports = Reader;
