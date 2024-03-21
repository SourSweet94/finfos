const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    food_id: [
        {
            type: String,
            ref: 'Food',
        },
    ],

    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
