#! /usr/bin/env node
var argv = require('optimist').demand(['host', 'port']).argv
var host = argv.host
var port = argv.port
var requestUntilDone = require('./lib/requestUntilDone')
requestUntilDone(host, port)
