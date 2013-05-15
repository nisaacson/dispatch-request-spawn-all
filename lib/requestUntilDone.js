var async = require('async')
var request = require('request')
var inspect = require('eyespect').inspector();
module.exports = function sendRequest(host, port, callback) {
  var url = 'http://' + host + ':' + port + '/spawnall'
  var complete = false
  var count = 0
  var maxAttempts = 100
  async.until(
    function () {
      return false
    },
    function(cb) {
      inspect('sending request')
      var opts = {
        url: url,
        timeout: 5000 // wait 5 seconds before timing out, timeout value is in milliseconds
      }
      inspect(opts,'sending request')
      request(opts, function (err, res, body) {
        inspect('request sent')
        count += 1
        if (count > maxAttempts) {
          return cb({
            message: 'failed to spawn all commands',
            error: 'server failed to respond within given number of attempts',
            attempt: count,
            stack: new Error().stack
          })
        }
        if (!err && res.statusCode === 200) {
          complete = true
          return cb()
        }
        inspect(err, 'request error, trying again')
        if (err.code === 'ETIMEDOUT') {
          return cb()
        }
        inspect(res.statusCode, 'status code')
        return cb({
          message: 'failed to spawn all commands',
          error: err,
          stack: new Error().stack
        })
      })
    },
    callback
  )
}
