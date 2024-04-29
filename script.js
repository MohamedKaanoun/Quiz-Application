const questions = [
  {
    question: "Question 1 :",
    answers: [
      {
        text: "A1",
        correct: false,
      },
      {
        text: "A2",
        correct: false,
      },
      {
        text: "A3",
        correct: false,
      },
      {
        text: "A4",
        correct: true,
      },
    ],
  },
  {
    question: "Question 2 :",
    answers: [
      {
        text: "A1",
        correct: false,
      },
      {
        text: "A2",
        correct: true,
      },
      {
        text: "A3",
        correct: false,
      },
      {
        text: "A4",
        correct: false,
      },
    ],
  },
  {
    question: "Question 3 :",
    answers: [
      {
        text: "A1",
        correct: false,
      },
      {
        text: "A2",
        correct: false,
      },
      {
        text: "A3",
        correct: true,
      },
      {
        text: "A4",
        correct: false,
      },
    ],
  },
  {
    question: "Question 4 :",
    answers: [
      {
        text: "A1",
        correct: false,
      },
      {
        text: "A2",
        correct: false,
      },
      {
        text: "A3",
        correct: false,
      },
      {
        text: "A4",
        correct: true,
      },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const next = document.getElementById("next");

let current = 0;
let score = 0;

function startQuiz() {
  resetState();
  current = 0;
  score = 0;
  next.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[current];
  let questionN = current + 1;
  questionElement.innerHTML = questionN + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  next.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  next.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  next.innerHTML = "Play again";
  next.style.display = "block";
}

function handleNExtButton() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

next.addEventListener("click", () => {
  if (current < questions.length) {
    handleNExtButton();
  } else {
    startQuiz();
  }
});
startQuiz();
