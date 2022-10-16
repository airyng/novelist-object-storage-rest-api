const express = require('express')
const router = express.Router()
const fileController = require('../controllers/file')


router.get('/f/:alias', fileController.do('getFile'))

router.post('/f', fileController.do('create'))

router.get('/', (req, res) => res.sendStatus(200))

module.exports = router