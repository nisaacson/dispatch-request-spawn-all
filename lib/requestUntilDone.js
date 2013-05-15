var moment = require('moment')
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
      return complete
    },
    function(cb) {
      inspect('sending request')
      var opts = {
        url: url,
        timeout: 5000 // wait 5 seconds before timing out, timeout value is in milliseconds
      }
      request(opts, function (err, res, body) {
        count += 1
        if (count > maxAttempts) {
          return cb({
            message: 'failed to spawn all commands',
            error: 'server failed to respond within given number of attempts',
            attempt: count,
            stack: new Error().stack
          })
        }
        if (!err && res && res.statusCode === 200) {
          complete = true
          inspect(body, 'server response received')
          inspect(JSON.parse(body), 'server json')
          return cb()
        }
        var timestamp = moment().format('YYYY-MM-DD HH:mm:ss.sss Z')
        err.timestamp = timestamp
        err.attempt = count
        err.maxAttempts = maxAttempts
        inspect(err, 'request error, trying again')
        if (err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
          // wait 5 seconds between requests
          setTimeout(cb, 5000)
          return
        }
        if (res) {
          inspect(res.statusCode, 'status code')
        }
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
