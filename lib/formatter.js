var Formatter = function(hash){
  this.hash = hash;
};

Formatter.prototype.add_linkedin_github_url = function(){
  if (this.hash["bio_data"] && this.hash["bio_data"]["website"]){
    this.hash["raw_website"] = this.hash["bio_data"]["website"].replace(/^https?:\/\//,'');
  }

  if (this.hash["linkedin_id"]){
    this.hash["linkedin_url"] = "http://linkedin.com/in/" + this.hash["linkedin_id"];
  }

  if (this.hash["github_id"]){
    this.hash["github_url"] = "http://github.com/" + this.hash["github_id"];
  }
};

Formatter.prototype.add_last_marker_on_stars = function(){
  if (!this.hash['bio_data']['stars']) return;

  this.hash["bio_data"]["stars"] = {
    "items": this.hash["bio_data"]["stars"].map(function(i){ return {"name": i}; })
  };

  var length = this.hash["bio_data"]["stars"]["items"].length;
  if(length) this.hash["bio_data"]["stars"]["items"][length - 1]["last"] = true;
};

Formatter.prototype.add_last_marker_on_skills = function(){
  if (!this.hash['bio_data']['skills']) return;

  this.hash['bio_data']['skills']['details'].forEach(function(item){
    item['items'] = item['items'].map(function(x){ return {'name': x}; });

    var length = item['items'].length;
    item['items'][length - 1]['last'] = true;
  });
};

Formatter.prototype.add_last_marker_on_tools = function(){
  if (!this.hash['bio_data']['other_projects']) return;

  this.hash['bio_data']['other_projects']['items'].forEach(function(item){
    if (!item['technology_used']) return;

    item['technology_used']['tools'] = item['technology_used']['tools'].map(function(x){ return {'name': x}; });

    var length = item['technology_used']['tools'].length;
    item['technology_used']['tools'][length - 1]['last'] = true;
  });
};

Formatter.prototype.add_last_marker_on_field = function(field_name){
  if (!this.hash['bio_data'][field_name]) return;

  this.hash['bio_data'][field_name]['items'].forEach(function(item){
    if (!item['technology_used']) return;
    item['technology_used']['tools'].map(function(x){ return {'name': x}; });

    var length = item['technology_used']['tools'].length;
    item['technology_used']['tools'][length - 1]['last'] = true;
  });
};

Formatter.prototype.cleanse = function(){
  //this.hash.delete_if &this.hash_proc
  return this;
};

Formatter.prototype.format_to_output_type = function(){
  var format_proc = function(v){
    switch(typeof v){
      case 'object':
        Object.getOwnPropertyNames(v).forEach(function(name){ format_proc(v[name]); });
        break;

      case 'string':
        this.format_string(v);
        break;
    }
  }.bind(this);

  format_proc(this.hash);
  return this;
};

Formatter.prototype.format_string = function(str){
  throw new Error("format_string not impl in formatter");
};

Formatter.prototype.is_false = function(item){
  return !item || item == 'false';
};

Formatter.prototype.purge_gpa = function(){
  if (!this.hash['bio_data']['education']) return;

  var gpas = this.hash["bio_data"]["education"]["schools"].filter(function(sch){ return sch["gpa"] && sch["gpa"].length; });

  if (this.is_false(this.hash["bio_data"]["education"]["show_gpa"]) || gpas.length == 0){
    this.hash["bio_data"]["education"].delete("show_gpa")
  }
};

Formatter.prototype.format = function(){
  if (!this.hash["bio_data"]) return;
  
  this.cleanse();

  this.format_to_output_type();

  this.add_last_marker_on_stars();

  this.add_last_marker_on_skills();

  this.add_last_marker_on_field('experience');
  this.add_last_marker_on_field('other_projects');
  
  this.purge_gpa();

  this.add_linkedin_github_url();

  return this;
};

module.exports = Formatter;