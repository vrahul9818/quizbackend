const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const Quiz = require("../model/schema");

const router = express.Router();

// Middleware
router.use(express.json());
router.use(bodyParser.json());

// cron job
cron.schedule('0 */1 * * *', async () => {
  try {
    const currentDate = new Date();
    const quizzes = await Quiz.find();
 
    quizzes.forEach(async (quiz) => {
      if (quiz.endDate < currentDate) {
        quiz.status = 'finished';
      } else if (currentDate >= quiz.startDate && currentDate <= quiz.endDate) {
        quiz.status = 'active';
      } else {
        quiz.status = 'inactive';
      }
      await quiz.save();
    });
  } catch (error) {
    console.error('Cron job error:', error);
  }
});

module.exports = router;
