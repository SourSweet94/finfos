const express = require('express')
const router = express.Router()

const {
  getOrder,
  getSingleUserOrder,
  createOrder

} = require('../controllers/orderController')

const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getOrder)

router.get('/user', getSingleUserOrder)

router.post('/', createOrder)



module.exports = router