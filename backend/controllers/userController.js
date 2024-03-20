const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET,
        // { expiresIn: '10s' }
    )
}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        const user_id = user._id
        return res.status(200).json({ email, token, user_id })
    } catch (error) {
        return res.status(400).json({ error: error.message })
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
        const user = await User.findById(req.user._id)

        if (user.cart.find(item => item.food_id === _id)) {
            console.log('already')
            return res.status(200).json(user)
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

const deleteSingleCartItem = async (req, res) => {
    const { _id } = req.params // food_id
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

const deleteAllCartItem = async (req, res) => {
    try {
        const user_id = req.user._id
        const user = await User.findById(user_id)
        user.cart = []
        await user.save()
        res.status(200).json(user.cart)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getOrder = async (req, res) => {
    try {
        const user_id = req.user._id
        const user = await User.findById(user_id)
        const item = user.order
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addOrder = async (req, res) => {
    const { cartItem } = req.body
    try {
        const user_id = req.user._id
        const user = await User.findById(user_id)

        // if (user.cart.find(item => item.food_id === cartItem)) {
        //     return
        // }

        user.order.push(cartItem)
        await user.save()
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    userLogin,
    userSignUp,
    addToCart,
    getCartItem,
    deleteSingleCartItem,
    deleteAllCartItem,
    getOrder,
    addOrder
}