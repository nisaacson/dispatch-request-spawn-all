var async = require('async')
var request = require('request')
var inspect = require('eyespect').inspector();
var sendRequest = require('./sendRequest')
module.exports = function sendRequest(host, port, callback) {
  var url = 'http://' + host + ':' + port
  var complete = false
  var count = 0
  var maxAttempts = 100
  async.until(
    function () {
      return complete
    },
    function(cb) {
      sendRequest(host, port, function (err, res, body) {
        count += 1
        if (count > maxAttempts) {
          if (err) {
            return cb({
              message: 'failed to spawn all commands',
              error: 'server failed to respond within given number of attempts',
              attempt: count,
              stack: new Error().stack
            })
          }

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
