const express = require('express')
const router = express.Router()
const fileController = require('../controllers/file')
const isUserCanManageMiddleware = require.main.require('./middlewares/isUserCanMange')

router.get('/link/:id', fileController.do('getLink'))

router.get('/f/:alias', fileController.do('getFile'))

router.post('/f', isUserCanManageMiddleware(), fileController.do('upload'))

router.delete('/f/:id', isUserCanManageMiddleware(), fileController.do('delete'))

router.get('/', (req, res) => res.sendStatus(200))

module.exports = router