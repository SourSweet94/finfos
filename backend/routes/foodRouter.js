const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')

const {
    getAllFood,
    getSingleFood,
    createFood,
    deleteFood,
    updateFood,
    deleteAllFood
} = require('../controllers/foodController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getAllFood)

router.get('/:record_id/:id', getSingleFood)

router.post('/:record_id', upload.single('image'), createFood)

router.delete('/:record_id/:id', deleteFood)

router.patch('/:record_id/:id', upload.single('image'), updateFood)

//testing
router.delete('/', deleteAllFood)

module.exports = router