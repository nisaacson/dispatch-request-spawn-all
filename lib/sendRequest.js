var async = require('async')
var request = require('request')
var inspect = require('eyespect').inspector();
module.exports = function sendRequest(host, port, cb) {
  var url = 'http://' + host + ':' + port + '/spawnall'
  var opts = {
    url: url,
    timeout: 5000 // wait 5 seconds before timing out, timeout value is in milliseconds
  }
  inspect(opts,'sending request')
  request(opts, cb)
}
