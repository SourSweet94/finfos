const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const {
    getAllFood,
    getSingleFood,
    createFood,
    deleteFood,
    updateFood
    
} = require('../controllers/foodController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getAllFood)

router.get('/:record_id/:id', getSingleFood)

router.post("/upload-image", upload.single("image"), async (req, res) => {
    console.log(req.body)
})

router.post('/:record_id', createFood)

router.delete('/:record_id/:id', deleteFood)

router.patch('/:record_id/:id', updateFood)

module.exports = router