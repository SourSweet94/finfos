const express = require('express');
const router = express.Router();

const { getAllFeedback, updateFeedback } = require('../controllers/feedbackController')

const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getAllFeedback)

router.patch('/:food_id', updateFeedback)

module.exports = router;
