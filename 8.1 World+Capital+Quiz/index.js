import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

//===========================
//Calling out the pg
const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database: "world",
  password:"C@lyx*0626",
  port: 5342,
})
//Connects the db
db.connect();


//=============================

//Array of 3 objects that record database
let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

//record in the db
db.query("SELECT * FROM capitals", (err, res) => {
  if(err){
    console.log("Error Executing", err.stack());
  } else {
    quiz = res.rowCount;
  }
  db.end();
  
})

//Score Keeper
let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//object
let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  //sends question here
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  // trim to get rid of spaces
  let answer = req.body.answer.trim();
  let isCorrect = false;
  // Checks if its right or not && turning them to lowercase
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  // randomize object
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
