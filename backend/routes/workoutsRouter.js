const express = require('express')
const router = express.Router()

const {
    getAllWorkouts,
    getSingleWorkout,
    getWorkoutByRecordID,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutsController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getAllWorkouts)

router.get('/:id', getSingleWorkout)

router.get('/:record/:record_id', getWorkoutByRecordID)

router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

module.exports = router