const express = require('express')
const router = express.Router()

const {
  getAllRecords,
  getSingleRecord,
  createRecord,
  deleteRecord,
  updateRecord

} = require('../controllers/recordController')

const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getAllRecords)

router.get('/:id', getSingleRecord)

router.post('/', createRecord)

router.delete('/:id', deleteRecord)

router.patch('/:id', updateRecord)

module.exports = router