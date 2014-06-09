var Formatter = require('./formatter');

var FormatterHtml = Formatter.prototype.constructor;
FormatterHtml.prototype = new Formatter;

FormatterHtml.prototype.format_link = function(str){
  console.log(str);
  return str.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
};

FormatterHtml.prototype.format_autolink = function(str){
  return str.replace(/<<(\S*?)>>/g, '<a href="$1">$1</a>');
};

FormatterHtml.prototype.format_emphasis = function(str){
  str = str.replace(/_(.+?)_/g, '<i>$1</i>');
  str = str.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  return str;
};

FormatterHtml.prototype.format_string = function(str){
  console.log(str);
  str = this.format_link(str);
  str = this.format_autolink(str);
  str = this.format_emphasis(str);
  return str;
};

module.exports = FormatterHtml;