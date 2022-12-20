const AuthChecker = require.main.require('./helpers/drivers/auth-checker/AuthChecker')

function isUserCanManage (model) {

  return async function (req, res, next) {

    const isUserCan = await AuthChecker.verify(req)
    if (!isUserCan) { return res.status(401).json({ message: 'Not enough permissions', status: 401 }) }

    next()
  }
}

module.exports = isUserCanManage