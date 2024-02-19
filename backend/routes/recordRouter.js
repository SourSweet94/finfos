const express = require('express')
const router = express.Router()

const {
  getAllRecords,
  createRecord,
  deleteRecord

} = require('../controllers/recordController')

const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getAllRecords)

router.post('/', createRecord)

router.delete('/:id', deleteRecord)

module.exports = router