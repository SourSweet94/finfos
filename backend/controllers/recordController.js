const Record = require('../models/recordModel')
const mongoose = require('mongoose')

const getAllRecords = async (req, res) => {
    const user_id = req.user._id
    const record = await Record.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(record)
}

const createRecord = async (req, res) => {
    console.log('req.body:', req.body);
    const { name } = req.body
    try {
        const user_id = req.user._id
        const record = await Record.create({ name, user_id })
        res.status(200).json(record)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'invalid id' })
    }
    const record = await Record.findOneAndDelete({ _id: id })
    if (!record) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(record)
}

const updateRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'invalid id' })
    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!workout) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(workout)
}

module.exports = { getAllRecords, createRecord, deleteRecord, updateRecord }