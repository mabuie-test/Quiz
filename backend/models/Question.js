const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  text:        { type: String, required: true },
  options:     [{ text: String, isCorrect: Boolean }],
  explanation: { type: String, required: true },
  category:    { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});
module.exports = mongoose.model('Question', QuestionSchema);
