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
    this.output1    =  '';
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
            let flag3 = false;            
            arrayObject = array[index].slice(loc + 1).split('$$')[0];
            let count1 = 0;
            let flag2 = false;
            for (let l = index + 1; l < array.length; l++) {                 
                let loc1 = array[l].lastIndexOf('#');   
                if(headerArray[0] != array[l].slice(0, loc1 - 1).split("##")[0]) break;
                if(arrayObject == array[l].slice(loc1 + 1).split('$$')[0]) {flag2 = true; break}                              
            }
            for (let l = index + 1; l < array.length; l++) {                 
                let loc1 = array[l].lastIndexOf('#');   
                if(headerArray[0] != array[l].slice(0, loc1 - 1).split("##")[0]) break;
                if(arrayObject != array[l].slice(loc1 + 1).split('$$')[0]) count1 ++;                            
            }            
            if(count1 == 0) flag2 = false;
            if(flag2){
                for (let l = index; l < array.length;) {
                    let loc2 = array[l].lastIndexOf('#'); 
                    this.output1 += '{'
                    if(headerArray[0] != array[l].slice(0, loc2 - 1).split("##")[0]) break;
                    for (let valKey = 0; valKey < count1; valKey++) {
                        if(array[l + valKey]){
                            if(valKey == count1 - 1)
                                this.output1 += '"' + array[l + valKey].slice(loc2 + 1).split("$$")[0] + '"' + ':' + '"' + array[l + valKey].slice(loc2 + 1).split("$$")[1] + '"'  ;
                            
                            else   
                                this.output1 += '"' + array[l + valKey].slice(loc2 + 1).split("$$")[0] + '"' + ':' + '"' + array[l + valKey].slice(loc2 + 1).split("$$")[1] + '"' + ',' ;
                               
                        }
                    }
                    
                    this.output1 += '},';
                    l += count1;                                    
                }
                this.output1 = this.output1.slice(0, this.output1.lastIndexOf(','));
            }
            else if(count1 && !flag2){
                if(headerArray.length == 1){
                    flag3 = true;
                    for (let i = index + 1; i < array.length; i++) {
                        if(headerArray[0] == array[i].slice(0, loc - 1).split("##")[0]){
                            count ++;
                            headerArray.length ++;                        
                        }                                             
                        else break;
                    }
                }
                
            }
            if(headerArray.length == 1){
                flag1 = true;
                for (let i = index + 1; i < array.length; i++) {
                    if(headerArray[0] == array[i].slice(0, loc - 1).split("##")[0]){
                        count ++;
                        headerArray.length ++;                        
                    }                                             
                    else break;
                }
                nagbar = array[index].slice(loc + 1).split("$$")[0];
                flag = false;
            }
            else{
                k = headerArray.length;
                for (let j = index + k; j < array.length; j++) {       
                    if(headerArray[0] == array[j].slice(0, loc - 1).split("##")[0] && headerArray[1] == array[j].slice(0, loc - 1).split("##")[1]){
                        headerArray.length ++;                                                  
                    }                    
                    else break;
                }               
                flag = false                
                if(flag3) k = 0;
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
                if(count)
                    this.output += '"' + nagbar + '"' + ":[";
                else
                    this.output += '"' + nagbar + '"' + ":";
                keyArray.forEach( element => {
                    this.output += '"' + element + '"' + ",";
                });
            }
            else{                
                headerArray.forEach( element => {
                    this.output += '"' + element + '"' + ": {";
                });

                if(flag2){
                    this.output = this.output.slice(0, this.output.lastIndexOf('{')) + '[';
                    this.output += this.output1 + ',';
                } 
                if(!flag2)
                    keyValueArray.forEach( element => {
                        this.output += '"' + element[0] + '"' + ":" + '"' + element[1] + '"' +",";
                });
            }           
            if(flag && !flag3) for (let index = 0; index < headerArray.length; index++) last += '}';           
            if(!k) last = '}';
            else for(var m = 0; m < k; m ++) last += '}';
            if(flag1 && count) last =']}';
            if(flag2) last =']}'
            last += ',';
            this.output = this.output.slice(0, this.output.lastIndexOf(',')) + last + '\n';
            keyValueArray = new Array(); 
            keyArray = new Array();
            index += headerArray.length;
            last = '';
            count = 0;            
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
            count = 0;
            index ++;
            continue;
        }          
      }
      if(last != null ) 
        this.output = this.output.slice(0, this.output.lastIndexOf(',')) + last + '\n';
      if(this.output[this.output.length - 2] == ','){
        this.output = this.output.slice(0, this.output.lastIndexOf(','));
      }
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
  