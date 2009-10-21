import couchdb
import datetime
from couchdb.schema import Document, TextField, DateField

server = couchdb.Server('http://localhost:5984/')
db = server['relaxer']

h5 = datetime.timedelta(hours=5)
nowish = datetime.datetime.now()-h5
dn = None

class DayNote(Document):
    date = DateField(default=nowish)
    creation_timestamp = TextField(default=datetime.datetime.now)
    summary = TextField(default='')
    detail = TextField(default='')

def save():
    global dn
    Titanium.API.debug('--save--')
    subject = jQuery('input#subject').val()
    detail = jQuery('textarea#detail').val()
    if dn is None:
        Titanium.API.debug('--new dn--')
        dn = DayNote()
    dn.subject = subject
    dn.detail = detail
    dn.store(db)
    Titanium.API.debug('--saved: %s--'%dn.id)

def pyonclick(evt):
    global dn
    Titanium.API.debug('click (%s)'%evt.target.id)
    save()
    if evt.target.id == 'save_and_new':
        js_lookup(jQuery('form'),0).reset()
        jQuery('input#note_date').attr('value', nowish.strftime('%Y-%m-%d'))
        dn = None

def go():
    Titanium.API.debug('loading')
    jQuery('input#note_date').attr('value', nowish.strftime('%Y-%m-%d'))
    #jQuery('textarea#detail').click(pyonclick)
    jQuery('button#save').click(pyonclick)
    jQuery('button#save_and_new').click(pyonclick)
    jQuery('form').attr('action','javascript:save()')

jQuery(document).ready(js_callback(go))
