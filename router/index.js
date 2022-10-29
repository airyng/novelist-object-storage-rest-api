const express = require('express')
const router = express.Router()
const fileController = require('../controllers/file')


router.get('/link/:id', fileController.do('getLink'))

router.get('/f/:alias', fileController.do('getFile'))

router.post('/f', fileController.do('upload'))

router.delete('/f/:id', fileController.do('delete'))

router.get('/', (req, res) => res.sendStatus(200))

module.exports = router