const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    food_id: [
        {
            type: String,
            ref: 'food',
        },
    ],

    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('record', recordSchema);
