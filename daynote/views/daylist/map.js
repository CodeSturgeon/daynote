function(doc) {
    if(doc.date && doc.summary){
        emit(doc.date,null);
    }
};
