const DefaultController = require('./classes/Default')
const File = require.main.require('./models/file')

class FileController extends DefaultController {

  constructor (model) {
    super(model)
  }

  async getFile (req, res) {
    if (!req.params.alias) { res.sendStatus(400); return }

    const file = await this.model.findOne({ alias: req.params.alias })

    if (!file) { res.sendStatus(404); return }
    res.sendFile(file.location, { root: './', maxAge: process.env.FILE_CACHE_EXPIRES })
  }
}

module.exports = new FileController(File)