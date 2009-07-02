// Require a valid date
var dt = newDoc.date.replace(/-/g,'/');
if(isNaN(Date.parse(dt))){
    throw {bad_date:'doc.date is not parseable ('+newDoc.date+')'};
}
