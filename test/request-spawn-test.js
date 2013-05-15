var should = require('should');
var sendRequest = require('../lib/sendRequest')
describe('Request Spawn', function () {
  it('should request spawn', function (done) {
    var host = 'localhost'
    var port = 6000
    sendRequest(host, port, function (err) {
      should.not.exist(err)
      done()
    })
  })
})
