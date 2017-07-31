var http = require('http')
var ratelimit = require('./')

var ratelimited = ratelimit({
  cache: 1000, // store up to 1000 in the cache
  limit: 5 // 5 per second
})

var server = http.createServer(function (req, res) {
  if (ratelimited(req.connection.address().host)) {
    res.end('you are rate limited')
    return
  }
  res.end('ok')
})

// try accessing this a bunch of times in your browser
server.listen(8080)
