const Workout = require('../models/workoutsModel')
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

const getWorkoutByRecordID = async (req, res) => {
    const user_id = req.user._id
    const { record_id } = req.params
    if (!mongoose.Types.ObjectId.isValid(record_id)) {
        return res.status(404).json({ err: "invalid id" })
    }
    const workout = await Workout.find({ user_id, record_id })
    if (!workout) {
        return res.status(400).json({ err: 'not found' })
    }
    res.status(200).json(workout)
    console.log(record_id)
}

const createWorkout = async (req, res) => {
    console.log('req.body:', req.body);
    const { date, title, reps, load, record_id } = req.body
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ date, title, reps, load, record_id, user_id })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'invalid id' })
    }
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
    getWorkoutByRecordID,
    createWorkout,
    deleteWorkout,
    updateWorkout
}