'use strict'

// Evaluate Environment
require('./config/environment')

async function startup() {
  const sql = require('./connections/sql')
  await sql.authenticate()

  const host = require('./host.js')

  host.initialize()
  host.startup()
}

startup()

