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

router.get('/:record_id/', getAllWorkouts)

router.get('/:record_id/:id', getSingleWorkout)

router.post('/:record_id', createWorkout)

router.delete('/:record_id/:id', deleteWorkout)

router.patch('/:record_id/:id', updateWorkout)

module.exports = router