/*!
 *  Plain2JSON Converter.
 *
 *  @author Chan Chan <@Chan Chan.com>
 *  @created Fri 30 Aug 2019 16:25:58 AM
 */

/**
 *  Plain2JSON constructor.
 *
 *  @param plain {String} - valid plain string.
 *  @returns Plain2Json {Object} - this instance.
 */

var Plain2JSON = function(plain) {
    this.output     =  '';
    this.__process(plain);
    return this;
  };
  
  /**
   *  Recursive processing.
   *
   *  @param plain {String} - valid String.
   *  @returns Plain2Json {Object} - this instance.
   */
  
  Plain2JSON.prototype.__process = function(plain) {
      let array = new Array();    
      let headerArray = new Array();
      let keyValueArray = new Array();
      array = plain.split('\n');  
      let flag = true;
      let index = 0;
      let last = '';
      let count = 0;      
      let keyArray = new Array();
      let loc = 0;
      while (index < array.length) {
        loc = array[index].lastIndexOf('#');
        if(!array[index]) break;
        if (loc != -1) {
            let prefix = array[index].slice(0, loc - 1);            
            last = " ";
            headerArray = prefix.split("##");
            let k = 0;
            let flag = true;
            let flag1 = false;
            let nagbar = '';
            if(headerArray.length == 1){
                flag1 = true;
                for (let i = index + 1; i < array.length; i++) {
                    if(headerArray[0] == array[i].slice(0, loc - 1).split("##")[0]){
                        headerArray.length ++;                        
                    }                                             
                    else break;
                }
                nagbar = array[index].slice(loc + 1).split("$$")[0];
                flag = false;
            }
            else{
                k = headerArray.length;
                let basic = array[index].slice(loc + 1).split("$$")[0];
                for (let j = index + k; j < array.length; j++) {       
                    if(headerArray[0] == array[j].slice(0, loc - 1).split("##")[0] && headerArray[1] == array[j].slice(0, loc - 1).split("##")[1]){
                        headerArray.length ++;                                                  
                    }                    
                    else break;
                }               
                flag = false
            }
            for (let key = index; key < index + headerArray.length; key++) {
                suffix = array[key].slice(loc + 1);
                keyArray[key - index] = array[key].slice(loc + 1).split('$$')[1];
                keyValueArray[key - index] = suffix.split('$$');                
            }
            if(flag1){                
                headerArray.forEach( element => {
                    this.output += '"' + element + '"' + ": {";
                });
                this.output += '"' + nagbar + '"' + ":[";
                keyArray.forEach( element => {
                    this.output += '"' + element + '"' + ",";
                });
            }else{                
                headerArray.forEach( element => {
                    this.output += '"' + element + '"' + ": {";
                });
                keyValueArray.forEach( element => {
                    this.output += '"' + element[0] + '"' + ":" + '"' + element[1] + '"' +",";
                });
            }
           
            if(flag)
                for (let index = 0; index < headerArray.length; index++) {
                    last += '}';            
                }
            else if(!k)
                last += '}';
            else
                for(var m = 0; m < k; m ++) last += '}';
            if(flag1) last =']}'
            last += ',';
            this.output = this.output.slice(0, this.output.lastIndexOf(',')) + last + '\n';
            keyValueArray = new Array(); 
            index += headerArray.length;
            last = '';
            
        }
        else{
            preBuf = array[index].split("$$");
            if(array[index + 1] && (array[index + 1].indexOf('##') != -1 || preBuf[0] != array[index + 1].split('$$')[0])){
                if(flag)
                    this.output += '"' + preBuf[0] + '"' + ":" + '"' + preBuf[1].replace(/_/g, " ") + '"' + ',' + '\n';
                else{
                    this.output += '"' + preBuf[1].replace(/_/g, " ") + '"' +  ',' + '\n';
                    flag = true;
                    last = "],"
                    this.output = this.output.slice(0, this.output.lastIndexOf(',')) + last + '\n';
                }
            }
            else{
                if(array[index + 1] && preBuf[0] == array[index + 1].split('$$')[0])
                    count ++;
                if(flag && count)
                    this.output += '"' + preBuf[0] + '"' + ": [" + '"' + preBuf[1].replace(/_/g, " ") + '"' + ',';
                else if(flag && !count)
                    this.output += '"' + preBuf[0] + '"' + ':' + '"' + preBuf[1].replace(/_/g, " ") + '"' + ',';
                else
                    this.output += '"' + preBuf[1].replace(/_/g, " ") + '"' + ',';            
                flag = false;
            }
            if(!count) last = ''
            else last = "],";

            index ++;
            continue;
        }  
        
      }
      
      this.output = this.output.slice(0, this.output.lastIndexOf(',')) + last + '\n';    
  };
  
//   /**
//    *  Expose the Plain2JSON.
//    *
//    *  @param plain {Object} - valid JSON object.
//    *  @returns output {String} - Plain text.
//    */
  
  module.exports = function(plain) {
    return new Plain2JSON(plain).output;
  };
  