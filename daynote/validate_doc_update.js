function(newDoc, oldDoc, userCtx){
    // Remember the && is the guard operator...
    // Allow any docs to be saved
    // Validate docs with implements.daynote
    if(!newDoc._deleted && newDoc.implements && newDoc.implements.daynote){
        // Require a valid timestamp
        if(isNaN(Date.parse(newDoc.creation_timestamp))){
            throw {bad_timestamp:'doc.creation_timestamp is not parsable'};
        }
        // Require a valid date
        if(isNaN(Date.parse(newDoc.date))){
            throw {bad_date:'doc.date is not parseable'};
        }
    }
}
