'use strict'

// This is a 0 export module intended to bootstrap and test environment

const env_vars = [
  'DB_HOST',
  'DB_NAME',
  'DB_PORT',
  'DB_PASS',
  'DB_USER',
  'HOST_PORT'
]

let NODE_ENV = process.env.NODE_ENV

// if not in the production or CI environment, bootstrap the environment variables
// otherwise the variables should be available
if (NODE_ENV !== 'production' || NODE_ENV !== 'ci') {
  if (!NODE_ENV) {
    NODE_ENV = 'development'
  }
  const config = require('dotenv').config({ path: `${ process.cwd() }/config/${ NODE_ENV }.env` })
  if (config.error) {
    console.error('environment', 'Failed to bootstrap non production environment.', config.error)
    process.exit()
  }
}

// Validate that the environment is complete
env_vars.forEach((variable) => {
  if (typeof process.env[variable] === 'undefined') {
    console.error('Failed to bootstrap non production environment.')
    console.warn(`Missing environment variable '${variable}'!`)
    console.warn(`Configured environment is '${NODE_ENV}'.`)
    console.warn('Check the Docker Compose file if \'procuction\' or \'ci\'')
    console.warn(`Check the './env/${NODE_ENV}.env' otherwise`)
    process.exit()
  }
})
