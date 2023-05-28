// server.js
const express = require('express');
const mongoose = require('mongoose');



const app = express();
const SERVER_PORT = process.env.PORT || 8080;

// Set up middleware
app.use(express.json());


//files importes
const quizRoute = require("./routes/quizRoute")
const cronJob   = require("./routes/cron")
const rateLimiter = require("./rateLimiter/rateLimiter")

////DB

  const DB = 'mongodb+srv://rahul:rahul@cluster0.8efe9kh.mongodb.net/ops?retryWrites=true&w=majority'
mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to mongoose atlas");
  })
  .catch((err) => {
    console.log(err, "no connection");
  });



//routes
app.use("/quizzes", rateLimiter,quizRoute);
app.use(cronJob);
app.use(rateLimiter);



// Define routes
// app.get('/', (req, res) => {
//   res.send('Quiz App API');
// });


// Start the server
app.listen(SERVER_PORT,rateLimiter, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
