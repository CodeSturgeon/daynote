// Require a subject > 3 chars
if(newDoc.summary.length < 3){
    throw {summary_required: 'daynote objects MUST have summarys'};
}
