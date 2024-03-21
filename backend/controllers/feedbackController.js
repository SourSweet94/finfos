const Feedback = require('../models/feedbackModel')

const getAllFeedback = async (req, res) => {
  const feedback = await Feedback.find({}).sort({ createdAt: -1 }).populate({
    path: 'food_id',
    model: 'Food',
    select: 'title'
  })
  .populate({
    path: 'feedback.user_id',
    model: 'User',
    select: 'email'
  });
  const formattedFeedback = feedback.map(item => ({
    food_id: item.food_id,
    // food_title: item.food_id.title,
    feedback: item.feedback.map(fb => ({
      user_email: fb.user_id.email,
      comment: fb.comment,
    })),
  }));
  res.status(200).json(formattedFeedback)

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

const deleteAllFeedback = async (req, res) => {

  const feedback = await Feedback.deleteMany()

  res.status(200).json(feedback);
}

module.exports = {
  getAllFeedback,
  updateFeedback,
  deleteAllFeedback
}