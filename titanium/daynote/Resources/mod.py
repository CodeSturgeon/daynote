import couchdb

server = couchdb.Server('http://localhost:5984/')
db = server['relaxer']

def save():
    Titanium.API.debug('--save--')

def pyonclick(evt):
    Titanium.API.debug('click (%s)'%evt.target.id)
    if evt.target.id == 'save_and_new':
        js_lookup(jQuery('form'),0).reset()

def go():
    Titanium.API.debug('loading')
    jQuery('textarea#detail').attr('value', db.name)
    jQuery('textarea#detail').click(pyonclick)
    jQuery('button#save').click(pyonclick)
    jQuery('button#save_and_new').click(pyonclick)
    jQuery('form').attr('action','javascript:save()')

jQuery(document).ready(js_callback(go))
