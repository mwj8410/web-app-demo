'use strict'

// Evaluate Environment
require('./config/environment')

const sql = require('./connections/sql')
sql.authenticate()

const host = require('./host.js')

host.initialize()
host.startup()
