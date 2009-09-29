#!/usr/bin/env python

import optparse
import datetime
import sys
import couchdb
from couchdb.schema import Document, TextField, DateField

server = couchdb.Server('http://localhost:5984/')
db = server['relaxer']

h5 = datetime.timedelta(hours=5)
nowish = datetime.datetime.now()-h5

class DayNote(Document):
    date = DateField(default=nowish)
    creation_timestamp = TextField(default=datetime.datetime.now)
    summary = TextField(default='')
    detail = TextField(default='')

if len(sys.argv)==1:
    sys.exit('no note?')
elif len(sys.argv)>2:
    sys.exit('too many args... did you forget the quotes?')

dn = DayNote(summary=sys.argv[1])
dn.store(db)
