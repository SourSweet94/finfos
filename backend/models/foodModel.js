const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodSchema = new Schema({
    image: {
        type: String
    },

    date: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Food", foodSchema)