/*!
 *  JSON2Plain Converter.
 *
 *  @author Chan Chan <@Chan Chan.com>
 *  @created Thur 29 Aug 2019 11:25:58 AM
 */

/**
 *  JSON2Plain constructor.
 *
 *  @param json {Object|String} - valid JSON struct to convert.
 *  @param options {Object} - options object containing any or all of:
 *    depth     {Number}   - amount of indentation to start with, defaults to 1.
 *    newline   {String}   - string to use for newline, defaults to '\n'.
 *    prefix    {String}   - inserted before the output, defaults to '\n'.
 *    header    {String}   - appended to the recent value.
 *    list      {String}   - 'numbered' will list numbered array keys, defaults to '- '.
 *  @returns JSON2Plain {Object} - this instance.
 */

var JSON2Plain = function(json, options) {
  var options = options || {};
  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  }

  json = JSON.parse(json);

  this.depth      = options.depth     || 1;
  this.newline    = options.newline   || '\n';
  this.list       = options.list      || '## ';
  this.value      = options.value     || '$$ ';
  this.output     = options.prefix    || '\n';
  this.header     = new Array(50);
  this.formatKey  = options.formatKey;
  this.__process(this.depth, json);
  
  return this;
};

/**
 *  Recursive processing.
 *
 *  @param depth {Number} - indentation depth.
 *  @param json {Object} - valid JSON object.
 *  @returns JSON2Plain {Object} - this instance.
 */

JSON2Plain.prototype.__process = function(depth, json) {
  var count = 0;
  for (var key in json) {

    if (count !== 0) {
      this.output += this.newline;
    }

    if (typeof json[key] === 'object') {   

      if(depth > 1){
        if(isNaN(key))
          this.header[depth] = this.header[depth - 1] + key + this.list;
        else
          this.header[depth] = this.header[depth - 1];
        
      }else{

        if(Array.isArray(json[key])){   
          this.header[depth] = key; 
          array = true;
        }else
          this.header[depth] = key + this.list;

      }

      this.__process(depth +1, json[key]);
    }else {    
      if(isNaN(key)){

        if(this.header[depth - 1])
          this.output += this.header[depth - 1] + key + this.value + this.formatKey(json[key].toString());
        else
          this.output += key + this.value + this.formatKey(json[key].toString());

      }
      else{

        if(this.header[depth - 1])
          this.output += this.header[depth - 1] + this.value + this.formatKey(json[key].toString());
        else
          this.output += this.value + this.formatKey(json[key].toString());

      }      
    }

    count++;

  }

  return this;
};

/**
 *  Expose the JSON2Plain.
 *
 *  @param depth {Number} - indentation depth.
 *  @param json {Object} - valid JSON object.
 *  @returns output {String} - Plain text.
 */

module.exports = function(json, options) {
  return new JSON2Plain(json, options).output;
};
