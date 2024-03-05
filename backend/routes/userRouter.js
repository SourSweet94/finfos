const express = require('express')
const router = express.Router()

const {userLogin, userSignUp, addToCart, getCartItem} = require('../controllers/userController')
const requireAuth = require('../middlewares/requireAuth');

router.post('/login', userLogin)

router.post('/sign-up', userSignUp)

router.use(requireAuth);

router.patch('/addtocart', addToCart)

router.get('/cart', getCartItem)

module.exports = router

