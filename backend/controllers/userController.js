const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET,
        // { expiresIn: '2d' }
    )
}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const userSignUp = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addToCart = async (req, res) => {
    const { _id } = req.body // food_id
    try {
        const user_id = req.user._id
        const user = await User.findById(user_id)

        if (user.cart.find(item => item.food_id === _id)) {
            return
        }

        user.cart.push({ food_id: _id, qty: 1, purchased: false })
        await user.save()
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getCartItem = async (req, res) => {
    try {
        const user_id = req.user._id
        const user = await User.findById(user_id)
        const item = user.cart
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteCartItem = async (req, res) => {
    const { _id } = req.body // food_id

    try {
        const user_id = req.user._id
        const user = await User.findById(user_id)
        user.cart.splice(user.cart.indexOf(_id), 1)
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = { userLogin, userSignUp, addToCart, getCartItem, deleteCartItem }