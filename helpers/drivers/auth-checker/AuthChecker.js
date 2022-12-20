
class AuthChecker {
  
  static async verify (request) {
    const checkerName = AuthChecker.getCheckerName()
    const checker = require.main.require(`./helpers/drivers/auth-checker/${checkerName}.js`)
    // Should return boolean
    return await checker.verify(request)
    // return true
  }

  static getCheckerName () {
    return process.env.AUTH_CHECKER_NAME || 'RestApi'
  }
}

module.exports = AuthChecker