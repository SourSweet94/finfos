const express = require('express')
const router = express.Router()

const {
  login,
  signUp,
  addToCart,
  getCartItem,
  deleteSingleCartItem,
  deleteAllCartItem,
  getOrder,
  addOrder
} = require('../controllers/userController')
const requireAuth = require('../middlewares/requireAuth');

router.post('/login', login)

router.post('/sign-up', signUp)

router.use(requireAuth);

router.patch('/addtocart', addToCart)

router.get('/cart', getCartItem)

router.delete('/cart/:food_id', deleteSingleCartItem)

router.delete('/cart', deleteAllCartItem)

// router.get('/order', getOrder)

// router.post('/order', addOrder)

module.exports = router

