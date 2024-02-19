const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutsSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    record_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("workout", workoutsSchema)