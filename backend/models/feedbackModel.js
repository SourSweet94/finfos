const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feedbackSchema = new Schema({

  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },

  feedback: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true,
    }
  }],

}, { timestamps: true })

module.exports = mongoose.model("Feedback", feedbackSchema)