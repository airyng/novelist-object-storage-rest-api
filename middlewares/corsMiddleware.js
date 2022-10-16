function corsMiddleware (req, res, next) {

  const availableOrigins = process.env.ALLOW_ORIGIN?.split(',')

  if (process.env.ALLOW_ORIGIN) {
    res.append('Access-Control-Allow-Origin', availableOrigins)
  }
  res.append('Access-Control-Allow-Methods', '*')
  res.append('Access-Control-Allow-Headers', '*')
  next()
}

module.exports = corsMiddleware
