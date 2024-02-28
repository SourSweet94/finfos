const express = require('express')
const router = express.Router()

const {
    getAllFood,
    getSingleFood,
    createFood,
    deleteFood,
    updateFood
    
} = require('../controllers/foodController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/:record_id/food', getAllFood)

router.get('/:record_id/food/:id', getSingleFood)

router.post('/:record_id/food', createFood)

router.delete('/:record_id/food/:id', deleteFood)

router.patch('/:record_id/food/:id', updateFood)

module.exports = router