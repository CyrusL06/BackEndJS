import express from "express";
import bodyParser from "body-parser";
//Install PG
import pg from "pg"

//Finds the database
const db = new pg.Client ({
  user:"postgres",
  host:"localhost",
  database: "world",
  password:"C@lyx*0626",
  port: 5342,
})

const app = express();
const port = 3000;

//Connects the database
db.connect();


let quiz= [];
// Command for the action of Query

db.query("SELECT * FROM flags",(err, res) => {
  if(err){
    console.error("Error executing query", err.stack);    
  }else {
    //rows from the table
    quiz = res.rows;
  }
  //ends it
  db.end();
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
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
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
