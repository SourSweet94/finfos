const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    workout_id: [
        {
            type: String,
            // ref: 'workout',
            required: true,
        },
    ],

    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('record', recordSchema);
