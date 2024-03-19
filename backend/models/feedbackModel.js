const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feedbackSchema = new Schema({

  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'food',
    required: true
  },

  feedback: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    comment: {
      type: String,
      required: true,
    }
  }],

}, { timestamps: true })

module.exports = mongoose.model("feedback", feedbackSchema)