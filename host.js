'use strict'

// core modules
const path = require('path')

// packages
const bodyParser = require('body-parser')
const express = require('express')
const Phlog = require('@phaesynthe/phlog')

// internal packages
const {fileAccumulator} = require('./lib/helpers-fs')
const { name, version } = require('./package.json')

// values
const app = express()
const log = new Phlog('Host')
const port = process.env.HOST_PORT
let server

module.exports = {
  getAppInstance: () => app,
  initialize,
  startup,
  stop
}

function initialize() {
  log.notice('initialize', `initializing server`)
  const startTime = new Date()
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    // sessionSettings.cookie.secure = true // serve secure cookies
  }

  log.notice('initialize', `configuring middleware`)
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(bodyParser.text())

  log.notice('initialize', `configuring headers`)
  app.use((req, res, next) => {
    // CORS - Send only the origin that matches the request
    let origin = req.headers.origin
    // if (hostConfig.host.origins.includes(origin)) {
    //   res.header('Access-Control-Allow-Origin', origin)
    // }
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Headers', 'Authorization')
    next()
  })

  log.detail('initialize', `globalizing server`)
  global.app = app

  log.notice('initialize', `detecting routes`)
  _mountRoutes()
}

function startup() {
  server = app.listen(port, () => {
    log.notice('startup', `${name} API version ${version} listening on port: ${port}.`)
  })
}

function stop() {
  try {
    server.close(() => {
      log.notice('stop', 'server is shut down.')
    })
  } catch (e) {
    // ToDo: log error
  }
}

// Private
function _mountRoutes () {
  fileAccumulator([ process.cwd(), 'routes/'].join(path.sep))
    .filter((filePath) => /\.js$/.test(filePath))
    .forEach((handlerPath) => {
      const handler = require(handlerPath)

      switch (handler.method) {
        case 'DELETE':
          app.delete(handler.uri, handler.handler)
          log.info('_mountRoutes', `registered route: ${handler.method} ${handler.uri}`)
          break
        case 'GET':
          app.get(handler.uri, handler.handler)
          log.info('_mountRoutes', `registered route: ${handler.method} ${handler.uri}`)
          break
        case 'PATCH':
          app.patch(handler.uri, handler.handler)
          log.info('_mountRoutes', `registered route: ${handler.method} ${handler.uri}`)
          break
        case 'POST':
          app.post(handler.uri, handler.handler)
          log.info('_mountRoutes', `registered route: ${handler.method} ${handler.uri}`)
          break
        case 'PUT':
          app.put(handler.uri, handler.handler)
          log.info('_mountRoutes', `registered route: ${handler.method} ${handler.uri}`)
          break
        case 'UPDATE':
          app.update(handler.uri, handler.handler)
          log.info('_mountRoutes', `registered route: ${handler.method} ${handler.uri}`)
          break
        default:
          log.warning('_mountRoutes', `failed to deted method for handler at ${handlerPath}`)
          break;
      }
    })
}
