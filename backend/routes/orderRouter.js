const express = require('express')
const router = express.Router()

const {
  getAllOrders,
  getSingleUserOrder,
  createOrder,
  deleteAllOrders

} = require('../controllers/orderController')

const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getAllOrders)

router.get('/user', getSingleUserOrder)

router.post('/', createOrder)

// for testing only
router.delete('/', deleteAllOrders)

module.exports = router