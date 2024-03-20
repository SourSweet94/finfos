const express = require('express')
const router = express.Router()

const {
  getOrder,
  getSingleUserOrder,
  createOrder,
  deleteAllOrder

} = require('../controllers/orderController')

const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getOrder)

router.get('/user', getSingleUserOrder)

router.post('/', createOrder)

// for testing only
router.delete('/', deleteAllOrder)

module.exports = router