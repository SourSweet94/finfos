const express = require('express')
const router = express.Router()

const {userLogin, userSignUp} = require('../controllers/userController')

router.post('/login', userLogin)

router.post('/sign-up', userSignUp)

module.exports = router

