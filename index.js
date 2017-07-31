var lru = require('lru')
var speedometer = require('speedometer')

module.exports = function (opts) {
  if (!opts) opts = {}
  var hits = lru(opts.cache || 1000)
  var rate = opts.limit || 5
  return function (name) {
    var r = hits.get(name)
    if (!r) {
      r = speedometer()
      hits.set(name, r)
    }
    return r(1) > rate
  }
}
