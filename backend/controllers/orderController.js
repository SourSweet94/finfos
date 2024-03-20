const Order = require('../models/orderModel')
const User = require('../models/userModel')

const getOrder = async (req, res) => {
  const user_id = req.user._id
  // const food = await Food.find({ user_id }).sort({ createdAt: -1 })
  const order = await Order.find({}).sort({ createdAt: -1 })
  res.status(200).json(order)
}

const getSingleUserOrder = async (req, res) => {
  const order = await Order.find({ buyer_id: req.user._id })
  if (!order) {
    return res.status(400).json({ err: 'not found' })
  }
  res.status(200).json(order)
}


const createOrder = async (req, res) => {
  const { cartItem, amount } = req.body
  try {
    const user = await User.findById(req.user._id)

    const items = cartItem.map(item => ({
      food_id: item._id,
      food_title: item.title,
      food_price: item.price,
      food_date: item.date,
      food_image: item.image
    }));
    const order = await Order.create({
      buyer_id: req.user._id, buyer_email: user.email, items, amount
    })
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteAllOrder = async (req, res) => {

  const order = await Order.deleteMany()

  res.status(200).json(order);
}

module.exports = {
  getOrder,
  getSingleUserOrder,
  createOrder,
  deleteAllOrder
}