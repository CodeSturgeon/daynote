function(doc) {
    if(doc.date && doc.summary){
        var key2 = doc.creation_timestamp || '';
        emit([doc.date,key2],null);
    }
};
