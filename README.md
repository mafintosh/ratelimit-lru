# ratelimit-lru

Small module for doing generic rate limiting using an LRU cache

```
npm install ratelimit-lru
```

## Usage

``` js
var http = require('http')
var ratelimit = require('ratelimit-lru')

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
```

## API

#### `var ratelimited = ratelimit([opts])`

Returns a function that tells you if a current key (usually an IP string) is being ratelimited.

Options include:

``` js
{
  cache: 1000, // how big the cache should be
  limit: 5 // how many times per second this function can be called
}
```

#### `var bool = ratelimited(key)`

Returns `true` if the key is being ratelimited, otherwise false.

## License

MIT
