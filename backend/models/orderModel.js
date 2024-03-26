const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

  buyer_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  buyer_email: {
    type: String,
    require: true
  },
  items: [
    {
      food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
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
      },
      food_image: {
        type: String,
      }
    }
  ],
  amount: {
    type: Number,
    require: true
  }

}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)