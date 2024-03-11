const Food = require('../models/foodModel')
const Record = require('../models/recordModel')
const mongoose = require('mongoose')

const getAllFood = async (req, res) => {
    // const user_id = req.user._id
    // const food = await Food.find({ user_id }).sort({ createdAt: -1 })
    const food = await Food.find({}).sort({ createdAt: -1 })
    res.status(200).json(food)
}

const getSingleFood = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: "invalid id" })
    }
    const food = await Food.findById(id)
    if (!food) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(food)
    console.log(req.params)
}

const createFood = async (req, res) => {
    const { img, date, title, price } = req.body
    const { record_id } = req.params
    try {
        const user_id = req.user._id
        const formattedDate = new Date(date).toLocaleDateString();
        const food = await Food.create({ img, date: formattedDate, title, price, user_id })
        const record = await Record.findById(record_id)
        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }
        record.food_id.push(food._id)
        await record.save()
        res.status(200).json(food)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteFood = async (req, res) => {
    const { record_id } = req.params
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'invalid id' })
    }

    const record = await Record.findById(record_id)
    if (!record) {
        return res.status(404).json({ error: 'Record not found' });
    }
    record.food_id.splice(record.food_id.indexOf(id), 1)
    await record.save()

    const food = await Food.findOneAndDelete({ _id: id })
    if (!food) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(food)
}

const updateFood = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'invalid id' })
    }
    const food = await Food.findOneAndUpdate({ _id: id }, {
        ...req.body, date: new Date(req.body.date).toLocaleDateString()
    })
    if (!food) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(food)
}

module.exports = {
    getAllFood,
    getSingleFood,
    createFood,
    deleteFood,
    updateFood
}