var Formatter = require('./formatter');

var FormatterMd = Formatter.prototype.constructor;
FormatterMd.prototype = new Formatter;

FormatterMd.prototype.format_link = function(str){
  return str.replace(/\[(.*?)\]\((.*?)\)/g, '{\\color{see} \\href{$2}{$1}}');
};

FormatterMd.prototype.format_autolink = function(str){
  return str.replace(/<<(\S*?)>>/g, '{\\color{see} \\url{$1}}');
};

FormatterMd.prototype.format_emphasis = function(str){
  str = str.replace(/_(.+?)_/g, '\\textit{$1}');
  str = str.replace(/\*\*(.+?)\*\*/g, '\\textbf{$1}');
  return str;
};

FormatterMd.prototype.format_superscripts = function(str){
  str = str.replace(/<sup>(.*?)<\/sup>/g, '\$^{$1}\$');
  str = str.replace(/<sub>(.*?)<\/sub>/g, '\$_{$1}\$');
  return str;
};

FormatterMd.prototype.format_symbols = function(str){
  str = str.replace(/%/g, '\\%');
  str = str.replace(/_/g, '\\_');
  return str;
};

FormatterMd.prototype.format_string = function(str){
  str = this.format_link(str);
  str = this.format_autolink(str);
  str = this.format_emphasis(str);
  str = this.format_symbols(str);
  str = this.format_superscripts(str);
  return str;
};

module.exports = FormatterMd;
