const Food = require('../models/foodModel')
const Record = require('../models/recordModel')
const Feedback = require('../models/feedbackModel')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');

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
}

const createFood = async (req, res) => {
    const { date, title, price } = req.body
    const { record_id } = req.params
    const image = req.file?.originalname
    try {
        const food = await Food.create({ date, title, price, user_id: req.user._id, image })
        const record = await Record.findById(record_id)
        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }
        record.food_id.push(food._id)
        await record.save()
        await Feedback.create({ food_id: food._id })
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

    const imagePath = path.join(__dirname, '../../frontend/public/uploads', food.image);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    if (!food) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(food)
}

const updateFood = async (req, res) => {
    const { id } = req.params
    let image = req.file?.originalname
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'invalid id' })
    }
    if (!image) {
        const food = await Food.findById(id)
        image = food.image
    }
    const food = await Food.findOneAndUpdate({ _id: id }, {
        ...req.body, image: image
    })
    if (!food) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(food)
}

// testing
const deleteAllFood = async (req, res) => {
    const food = await Food.deleteMany()
    const feedback = await Feedback.deleteMany()
    res.status(200).json({ food, feedback })
}

module.exports = {
    getAllFood,
    getSingleFood,
    createFood,
    deleteFood,
    updateFood,
    deleteAllFood
}