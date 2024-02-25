const Workout = require('../models/workoutsModel')
const Record = require('../models/recordModel')
const mongoose = require('mongoose')

const getAllWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: "invalid id" })
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(workout)
    console.log(req.params)
}

const createWorkout = async (req, res) => {
    const { date, title, reps, load } = req.body
    const { record_id } = req.params
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ date, title, reps, load, user_id })
        const record = await Record.findById(record_id)
        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }
        record.workout_id.push(workout._id)
        await record.save()
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteWorkout = async (req, res) => {
    const { record_id } = req.params
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'invalid id' })
    }

    const record = await Record.findById(record_id)
    if (!record) {
        return res.status(404).json({ error: 'Record not found' });
    }
    record.workout_id.splice(record.workout_id.indexOf(id), 1)
    await record.save()

    const workout = await Workout.findOneAndDelete({ _id: id })
    if (!workout) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
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

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}