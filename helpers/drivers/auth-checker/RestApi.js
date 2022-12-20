const axios = require('axios')

class RestApi {
  
  static async verify (request) {
    if (!request?.headers?.authorization) { return false }
    let response = false
    // Requesting to main backend for user profile info
    try {
      response = await axios.get(process.env.AUTH_CHECKER_URI, {
        headers: {
          'Authorization': request.headers.authorization
        }
      })
    } catch (e) {
      console.log(e?.response?.data)
      return false
    }
    // Check is user admin
    return response?.data?.role?.title === 'admin'
  }
}

module.exports = RestApi