function(newDoc, oldDoc, userCtx){
    // Remember the && is the guard operator...
    // Allow any docs to be saved
    // Validate docs with implements.daynote
    if(!newDoc._deleted && newDoc.implements && newDoc.implements.daynote){
        // Require a valid timestamp
        var ts = newDoc.creation_timestamp.replace(/-/g,'/');
        if(isNaN(Date.parse(ts))){
            throw {
                bad_timestamp:
                    'doc.creation_timestamp is not parsable ('+
                        newDoc.creation_timestamp+')'
            };
        }
        // Require a valid date
        //var ts = newDoc.creation_timestamp.replace(/-/g,'/');
        var dt = newDoc.date.replace(/-/g,'/');
        if(isNaN(Date.parse(dt))){
            throw {bad_date:'doc.date is not parseable ('+doc.date+')'};
        }
        // Require a subject > 3 chars
        if(newDoc.summary.length < 3){
            throw {summary_required: 'daynote objects MUST have summarys'};
        }
    }
}
