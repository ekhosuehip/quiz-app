const quizQuestions = [
  {
    question: "What does `typeof null` return in JavaScript?",
    options: ["'null'", "'object'", "'undefined'", "'boolean'"],
    answer: "'object'"
  },
  {
    question: "Which method is used to remove the last element from an array?",
    options: ["push()", "pop()", "shift()", "splice()"],
    answer: "pop()"
  },
  {
    question: "What is the output of `console.log(2 + '2')`?",
    options: ["4", "22", "'NaN'", "Error"],
    answer: "22"
  },
  {
    question: "Which keyword is used to define a constant in JavaScript?",
    options: ["let", "var", "const", "static"],
    answer: "const"
  },
  {
    question: "What is the result of `[] == ![]` in JavaScript?",
    options: ["true", "false", "undefined", "null"],
    answer: "true"
  },
  {
    question: "Which of these is not a JavaScript data type?",
    options: ["Number", "String", "Character", "Undefined"],
    answer: "Character"
  },
  {
    question: "How do you declare an asynchronous function in JavaScript?",
    options: ["async function", "function async", "async() => {}", "All of the above"],
    answer: "async function"
  },
  {
    question: "What does `Array.prototype.map()` return?",
    options: [
      "A new array with modified elements",
      "A boolean value",
      "The original array",
      "The index of each element"
    ],
    answer: "A new array with modified elements"
  },
  {
    question: "What is the difference between `==` and `===`?",
    options: [
      "`==` checks value and type, `===` checks value only",
      "`==` checks value only, `===` checks value and type",
      "Both check value and type",
      "Both check value only"
    ],
    answer: "`==` checks value only, `===` checks value and type"
  },
  {
    question: "Which of the following is a way to create an object in JavaScript?",
    options: [
      "Object literal notation",
      "Object.create()",
      "Using a constructor function",
      "All of the above"
    ],
    answer: "All of the above"
  }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionTitle = document.getElementById("question-title");
const answerOptions = document.getElementById("answer-options");
const progressText = document.getElementById("progress-text");
const nextButton = document.getElementById("next-button");
const resultsContainer = document.querySelector(".results-container");
const quizContainer = document.querySelector(".quiz-container");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

// Display a question
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;
  answerOptions.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.classList.add("option");
    li.addEventListener("click", () => selectAnswer(li, currentQuestion.answer));
    answerOptions.appendChild(li);
  });

  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
}

// Handle answer selection
function selectAnswer(selectedOption, correctAnswer) {
  const options = document.querySelectorAll(".option");
  options.forEach(option => option.classList.remove("selected"));
  selectedOption.classList.add("selected");

  if (selectedOption.textContent === correctAnswer) {
    score++;
  }
}

// Move to the next question
function nextQuestion() {
  const selectedOption = document.querySelector(".option.selected");

  if (!selectedOption) {
    alert("Please select an answer before moving to the next question.");
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    displayResults();
  }
}

// Display the final results
function displayResults() {
  quizContainer.style.display = "none";
  resultsContainer.style.display = "block";
  finalScore.textContent = `You scored: ${score}/${quizQuestions.length}`;
}

// Restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.style.display = "block";
  resultsContainer.style.display = "none";
  displayQuestion();
}

// Event Listeners
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Initialize the quiz
displayQuestion();
