var toggleDay = function(dayKey){
    var dayUL = jQuery('#'+dayKey);
    if(expandedDays[dayKey]){
        expandedDays[dayKey] = false;
        dayUL.empty()
    }else{
        expandedDays[dayKey] = true;
        populateDay(dayKey, dayUL);
    }
}
var toggler = function(dayKey){
    var toggleDayCap = function(){
        var dayUL = jQuery('#'+dayKey);
        if(expandedDays[dayKey]){
            expandedDays[dayKey] = false;
            dayUL.empty()
        }else{
            expandedDays[dayKey] = true;
            populateDay(dayKey, dayUL);
        }
    }
    return toggleDayCap;
}
// Updates UL that lists days
var updateDayList = function(limit){
    var options = {
        'success': function(data, testStatus){
            var daysUL = $('#daysUL');
            var docFrag = document.createDocumentFragment();
            for(var rowNum in data['rows']){
                var row = data['rows'][rowNum];
                var dayKey = row['key'][0];
                var dayNoteNum = row['value'];
                var dayDate = new Date(dayKey);
                //var dayTitle = (dayDate.getMonth()+1);
                //dayTitle += '/'+pad2(dayDate.getDate());
                var dayTitle = dayKey;
                var dayLI = $('<li>'+dayTitle+' ['+dayNoteNum+']</li>');
                docFrag.appendChild(dayLI[0]);
                dayLI.bind('click', toggler(dayKey));
                var dayUL = $('<ul id="'+dayKey+'"></ul>');
                docFrag.appendChild(dayUL[0]);
                if(expandedDays[dayKey]){
                    populateDay(dayKey, dayUL);
                }
            }
            // for each expandedDays populateDay
            daysUL.empty().append(docFrag);
        },
        'group':'true',
        'group_level':'1',
        'descending':'true'
    };
    options['limit'] = limit || 5;
    DB.view(design+'/daylist',options);
}
var populateDay = function(dayKey, dayUL){
    var docFrag = document.createDocumentFragment();
    DB.view(design+'/daylist', {
        'success': function(data, testStatus){
            var futonViewUrl = '/_utils/document.html?'+dbname+'/'
            for(var rowNum in data['rows']){
                var row = data['rows'][rowNum];
                // Text for tooltip
                var noteDetail = '';
                var noteHtml = '<li';
                if(row['doc']['detail']){
                    noteDetail = row['doc']['detail'];
                    noteHtml += ' title="'+noteDetail+'"';
                }
                noteHtml += '>';
                // Link to the futon doument viewer
                noteHtml += '<a href="'+futonViewUrl+row['id']+'">';
                noteHtml += row['doc']['summary'] || '**MISSING SUMMARY**';
                noteHtml += '</a>';
                // If there is a Detail, do a word count
                if(noteDetail){
                    noteHtml += ' <small>'+wordCount(noteDetail)+'</small>';
                }
                noteHtml += '</li>';
                var noteLi = $(noteHtml)
                docFrag.appendChild(noteLi[0]);
            }
            dayUL.empty().append(docFrag);
        },
        'reduce':'false',
        'include_docs':'true',
        'startkey':[dayKey],
        'endkey':[dayKey,{}]
    });
}
