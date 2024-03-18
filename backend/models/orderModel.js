const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

  buyer_id: {
    type: String,
    require: true
  },
  buyer_email: {
    type: String,
    require: true
  },
  items: [
    {
      food_id: {
        type: String,
        require: true
      },
      food_title: {
        type: String,
        require: true
      },
      food_price: {
        type: Number,
        require: true
      },
      food_date: {
        type: Date,
        require: true
      }
    }
  ],
  amount: {
    type: Number,
    require: true
  }

})

module.exports = mongoose.model('Order', OrderSchema)