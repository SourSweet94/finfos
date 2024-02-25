const express = require('express')
const router = express.Router()

const {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
    
} = require('../controllers/workoutsController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/:record_id/workouts', getAllWorkouts)

router.get('/:record_id/workouts/:id', getSingleWorkout)

router.post('/:record_id/workouts', createWorkout)

router.delete('/:record_id/workouts/:id', deleteWorkout)

router.patch('/:record_id/workouts/:id', updateWorkout)

module.exports = router