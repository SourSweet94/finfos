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

router.get('/:record_id', getAllFood)

router.get('/:record_id/:id', getSingleFood)

router.post('/:record_id', createFood)

router.delete('/:record_id/:id', deleteFood)

router.patch('/:record_id/:id', updateFood)

module.exports = router