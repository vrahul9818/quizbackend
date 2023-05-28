const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");


const app = express();

const router = express.Router();

//schema import
const Quiz = require("../model/schema")

// Middleware
app.use(express.json());
app.use(bodyParser.json());

router.post('/', async (req, res) => {
    try {
      const quiz = new Quiz(req.body);
      await quiz.save();
      res.status(201).json({ message: 'Quiz created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.get('/all', async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  
  router.get('/active', async (req, res) => {
    try {
      const currentDate = new Date();
      const quizzes = await Quiz.find({
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
      }).select('question');
  
      if (quizzes.length === 0) {
        res.status(404).json({ message: 'No active quizzes found' });
      } else {
        res.json(quizzes);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


  router.get('/:id/result', async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
      } else {
        if (quiz.endDate < new Date()) {
          quiz.status = 'finished';
          await quiz.save();
        }
        res.json({ result: quiz.rightAnswer });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
   


router.get("/routes", (req, res) => {
  res.send("okk");
});

module.exports = router;
