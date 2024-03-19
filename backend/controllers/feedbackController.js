const Feedback = require('../models/feedbackModel')

const getAllFeedback = async (req, res) => {
  const feedback = await Feedback.find({}).sort({ createdAt: -1 })
  res.status(200).json(feedback)

}

const updateFeedback = async (req, res) => {
  const { food_id } = req.params
  const { comment } = req.body

  const feedback = await Feedback.findOneAndUpdate(
    { food_id: food_id },
    { $push: { feedback: { user_id: req.user._id, comment } } },
    { new: true, upsert: true }
  );

  res.status(200).json({ message: 'Feedback updated successfully', feedback });
}

module.exports = {
  getAllFeedback,
  updateFeedback
}