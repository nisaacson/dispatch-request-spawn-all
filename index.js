#! /usr/bin/env node
var inspect = require('eyespect').inspector();
var argv = require('optimist').demand(['host', 'port']).argv
var host = argv.host
var port = argv.port
var requestUntilDone = require('./lib/requestUntilDone')
requestUntilDone(host, port, function (err, reply) {
  if (err) {
    inspect(err, 'request spawn error')
    return
  }
  inspect(reply,'spawn completed')
})
