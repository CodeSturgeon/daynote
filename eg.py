#!/usr/bin/env python

from easygui import *
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

summary = enterbox(msg='Daynote', title='New daynote', strip=True)

dn = DayNote(summary=summary)
dn.store(db)

print dn.id
