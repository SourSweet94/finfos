const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

  buyer_id: {
    type: String,
    require: true
  },

  items: [
    {
      food_id: {
        type: String,
        require: true
      },
      qty: {
        type: Number,
        require: true
      },
      amount: {
        type: Number,
        require: true
      }
    }
  ]

})

module.exports = mongoose.model('Order', OrderSchema)