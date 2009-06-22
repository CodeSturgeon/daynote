function(doc) {
    if(doc.implements && doc.implements.daynote){
        var key2 = doc.creation_timestamp || '';
        emit([doc.date,key2],null);
    }
};
