// Small padding function
var pad2 = function(number){ return (number<10) ? '0' + number : number; }

var wordCount = function(str){
    var newStr = str;
    // Sanitize whitespace
    newStr = newStr.replace(/^\s+/,'');
    newStr = newStr.replace(/\s+$/,'');
    newStr = newStr.replace(/\s+/g,' ');
    newStr = newStr.replace(/\s+\n/,'\n');
    var splitStr = newStr.split(' ');
    return splitStr.length;
}
var getTimestamp = function(){
    var ts = '';
    var now = new Date();
    ts += [now.getUTCFullYear(), pad2(now.getUTCMonth()+1),
            pad2(now.getUTCDate())].join('/');
    ts += ' '+[pad2(now.getUTCHours()), pad2(now.getUTCMinutes()),
            pad2(now.getUTCSeconds())].join(':');
    ts += ' +0000'
    return ts;
}
