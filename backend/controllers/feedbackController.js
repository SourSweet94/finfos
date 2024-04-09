const Feedback = require('../models/feedbackModel')

const getAllFeedback = async (req, res) => {
  const feedback = await Feedback.find({}).populate({
    path: 'food_id',
    model: 'Food',
    select: 'title date'
  })
    .populate({
      path: 'feedback.user_id',
      model: 'User',
      select: 'email'
    });
  const formattedFeedback = feedback.map(item => {
    if (item.food_id === null) {
      return null
    }
    return {
      food: {
        _id: item.food_id._id,
        title: item.food_id.title,
        date: item.food_id.date
      },
      feedback: item.feedback.map(fb => ({
        user: {
          _id: fb.user_id._id,
          email: fb.user_id.email,
          comment: fb.comment
        }
      }))
    }
  })
  .filter(item => item !== null);
  res.status(200).json(formattedFeedback.sort((a, b) => (new Date(a.food.date - new Date(b.food.date)))))

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

  try {
    const result = await Feedback.updateMany({}, { $set: { feedback: [] } });

    // Check if any documents were updated
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'All feedback cleared successfully.' });
    } else {
      res.status(404).json({ message: 'No feedback found to clear.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllFeedback,
  updateFeedback,
  deleteAllFeedback
}