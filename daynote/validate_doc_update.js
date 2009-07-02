function(newDoc, oldDoc, userCtx){
    // Remember the && is the guard operator...
    // Allow any docs to be saved
    // Validate docs with implements.daynote
    if(!newDoc._deleted && newDoc.implements && newDoc.implements.daynote){
        // !code lib/validation/*.js
    }
}
