// Require a valid timestamp
var ts = newDoc.creation_timestamp.replace(/-/g,'/');
if(isNaN(Date.parse(ts))){
    throw {
        bad_timestamp:
            'doc.creation_timestamp is not parsable ('+
                newDoc.creation_timestamp+')'
    };
}
