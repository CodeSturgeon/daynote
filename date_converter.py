#!/usr/bin/env python

# small tool to tweak exsisting daynote's datetime format to ISO 8601

import couchdb
from couchdb.schema import Document, TextField

import logging
logging.basicConfig(level=logging.DEBUG)
log = logging.getLogger()

server = couchdb.Server('http://localhost:5984/')
db = server['relaxer']

class DayNote(Document):
    date = TextField()
    creation_timestamp = TextField()
    summary = TextField()
    detail = TextField()

# FIXME should be daynote/daylist... but does not work?
view_result = db.view('_design/daynote/_view/daylist', reduce=False)

log.warn('working on %d documents'%len(view_result))

for row in view_result:
    log.info('working on: %s'%row.id)
    dn = DayNote.load(db, row.id)
    log.debug('initial date: %s'%dn.date)
    dn.date = dn.date.replace('/','-')
    log.debug('new date: %s'%dn.date)
    log.debug('initial ts: %s'%dn.creation_timestamp)
    dn.creation_timestamp = dn.creation_timestamp.replace('/','-')
    log.debug('new ts: %s'%dn.creation_timestamp)
    dn.store(db)
