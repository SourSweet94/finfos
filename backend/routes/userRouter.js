const express = require('express')
const router = express.Router()

const {userLogin, userSignUp, addToCart} = require('../controllers/userController')

const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.post('/login', userLogin)

router.post('/sign-up', userSignUp)

router.patch('/addtocart', addToCart)

module.exports = router

