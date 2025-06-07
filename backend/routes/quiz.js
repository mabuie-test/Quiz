const router   = require('express').Router();
const Question = require('../models/Question');

// Iniciar quiz: escolhe N questões aleatórias de uma categoria
router.post('/start', async (req, res) => {
  const { categoryId, numQuestions = 10 } = req.body;
  const questions = await Question.aggregate([
    { $match: { category: require('mongoose').Types.ObjectId(categoryId) }},
    { $sample: { size: numQuestions }}
  ]);
  // retiramos flag isCorrect para o cliente
  const payload = questions.map(q => ({
    _id: q._id, text: q.text, options: q.options.map(o => o.text)
  }));
  res.json(payload);
});

// Responder questão
router.post('/answer', async (req, res) => {
  const { questionId, selectedOptionIndex } = req.body;
  const q = await Question.findById(questionId);
  const correct = q.options[selectedOptionIndex].isCorrect;
  res.json({ correct, explanation: q.explanation });
});

module.exports = router;
