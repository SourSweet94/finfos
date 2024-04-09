const Record = require('../models/recordModel')
const Food = require('../models/foodModel')
const mongoose = require('mongoose')

const getAllRecords = async (req, res) => {
    // no need user_id since only one admin
    // const record = await Record.find({ req.user_id }).sort({ createdAt: -1 })
    const record = await Record.find({}).sort({ createdAt: -1 })
    res.status(200).json(record)
}

const getSingleRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: "invalid id" })
    }
    const record = await Record.findById(id)
    if (!record) {
        return res.status(400).json({ err: 'not found' })
    }
    return res.status(200).json(record)
}

const createRecord = async (req, res) => {
    const { startDate, endDate } = req.body
    try {
        // if (startDate > endDate) {
        //     return res.status(400).json({ error: "Start date cannot be greater than end date" });

        // }
        const record = await Record.create({
            startDate,
            endDate,
            opened: true,
            user_id: req.user._id
        })
        return res.status(200).json(record)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const deleteRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'invalid id' })
    }
    const record = await Record.findOneAndDelete({ _id: id })
    await Food.deleteMany({ _id: { $in: record.food_id } });
    if (!record) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(record)
}

// const updateRecord = async (req, res) => {
//     const { id } = req.params
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ err: 'invalid id' })
//     }
//     console.log(req.body)
//     const record = await Record.findOneAndUpdate({ _id: id }, {
//         ...req.body
//     })
//     if (!record) {
//         return res.status(400).json({ err: 'not found' })
//     }
//     console.log(record)
//     return res.status(200).json(record)
// }

const updateRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'invalid id' })
    }
    const record = await Record.findById({ _id: id });
    const { opened, ...other } = req.body;
    if (opened) {
        record.opened = !record.opened;
    }
    Object.assign(record, other);
    await record.save()
    if (!record) {
        return res.status(400).json({ err: 'not found' })
    }
    return res.status(200).json(record)
}

module.exports = {
    getAllRecords,
    getSingleRecord,
    createRecord,
    deleteRecord,
    updateRecord
}