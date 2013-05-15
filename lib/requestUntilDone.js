var async = require('async')
var request = require('request')
var inspect = require('eyespect').inspector();
var sendRequest = require('./sendRequest')
module.exports = function sendRequest(host, port, callback) {
  var url = 'http://' + host + ':' + port
  var complete = false
  async.until(
    function () {
      return complete
    },
    function(cb) {
      sendRequest(host, port, function (err, res, body) {
        if (!err && res.statusCode === 200) {
          complete = true
          return cb()
        }
        if (err.code === 'ETIMEDOUT') {
          return cb()
        }
        inspect(err, 'request error')
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
