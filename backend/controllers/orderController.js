const Order = require('../models/orderModel')

const getOrder  = async (req, res) => {
  const user_id = req.user._id
  // const food = await Food.find({ user_id }).sort({ createdAt: -1 })
  const order = await Order.find({}).sort({ createdAt: -1 })
  res.status(200).json(order)
}

const getSingleUserOrder = async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id)
  if (!order) {
      return res.status(400).json({ err: 'not found' })
  }
  res.status(200).json(order)
}


const createOrder = async (req, res) => {
  const { cartItem, amount } = req.body
  console.log(cartItem)
  console.log(req.user)
  try {
    const user_id = req.user._id
    const items = cartItem.map(item => ({
      food_id: item._id,
      food_title: item.title,
    }));
    const order = await Order.create({ buyer_id: user_id, items, amount })
    // const record = await Record.findById(record_id)
    // if (!record) {
    //     return res.status(404).json({ error: 'Record not found' });
    // }
    // record.food_id.push(food._id)
    // await record.save()
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getOrder,
  getSingleUserOrder,
  createOrder
}