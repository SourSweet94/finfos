const express = require('express');
const router = express.Router();

const { getAllFeedback, updateFeedback, deleteAllFeedback } = require('../controllers/feedbackController')

const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)

router.get('/', getAllFeedback)

router.patch('/:food_id', updateFeedback)

// for testing only
router.delete('/', deleteAllFeedback)

module.exports = router;
