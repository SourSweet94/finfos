const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    // recordNumber: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    name: {
        type: String, 
        required: true
    },
    
    // workoutDetails_id: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'workout',
    //         required: true,
    //     },
    // ],

    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('record', recordSchema);
