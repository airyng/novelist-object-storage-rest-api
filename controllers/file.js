const DefaultController = require('./classes/Default')
const File = require.main.require('./models/file')
const getItemByIdMiddleware = require.main.require('./middlewares/getItemById')
const mime = require('mime-types')
const Encryptor = require.main.require('./helpers/Encryptor')
const fs = require('fs')

class FileController extends DefaultController {

  constructor (model) {

    super(model)
    this.middlewaresRelations.getLink = [getItemByIdMiddleware]
  }

  async getLink (req, res) {
    // TODO: нужно научить метод строить сразу url с правильным protocol (http/https)
    res.send(`http://${req.hostname}${process.env.PORT ? ':'+process.env.PORT : ''}/f/${res.item.alias}`)
  }

  async getFile (req, res) {
    if (!req.params.alias) { res.sendStatus(400); return }

    const file = await this.model.findOne({ alias: req.params.alias })

    if (!file) { res.sendStatus(404); return }
    res.sendFile(file.location, { root: './', maxAge: process.env.FILE_CACHE_EXPIRES })
  }

  upload (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.', status: 400 })
    }
    const receivedFile = req.files.file
    const uploadPath = `uploads/${Date.now()}_${receivedFile.md5}.${mime.extension(receivedFile.mimetype)}`

    // mv() method used to place the file somewhere on server
    const that = this
    receivedFile.mv(uploadPath, async function (err) {
      
      if (err) return res.status(500).json({ message: err.message, status: 500 })

      // Success
      const item = new that.model({
        location: uploadPath,
        original_name: receivedFile.name,
        alias: Encryptor.hash(`${Date.now()}_${receivedFile.md5}`, 'md5')
      })
      try {
        const newItem = await item.save()

        res.status(201).json({
          _id: newItem._id,
          created_at: newItem.created_at
        })
      } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
      }
    })
  }

  async delete (req, res) {
    // TODO: Здесь нужно делать проверку на авторизацию превелигированного пользователя
    try {
      fs.unlinkSync(res.item.location)
      await super.delete(req, res)
    } catch (err) {
      return res.status(500).json({ message: err.message, status: 500 })
    }
  }
}

module.exports = new FileController(File)