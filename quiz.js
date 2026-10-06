const questions = [
  { q: "What does HTML stand for?", options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: 0 },
  { q: "Which language runs in a web browser?", options: ["Python", "JavaScript", "C++"], answer: 1 },
  { q: "What does CSS control?", options: ["Structure", "Behavior", "Styling"], answer: 2 },
  { q: "Which company maintains React?", options: ["Google", "Meta", "Microsoft"], answer: 1 },
  { q: "What does API stand for?", options: ["Application Programming Interface", "Applied Program Integration", "Advanced Programming Input"], answer: 0 },
];

let current = 0, score = 0, answered = false;

const qEl = document.getElementById("question");
const oEl = document.getElementById("options");
const fEl = document.getElementById("feedback");
const sEl = document.getElementById("score");
const nextBtn = document.getElementById("next");

function showQuestion() {
  answered = false;
  fEl.textContent = "";
  nextBtn.style.display = "none";
  const item = questions[current];
  qEl.textContent = \`Question \${current + 1} of \${questions.length}: \${item.q}\`;
  oEl.innerHTML = "";
  item.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => pick(i, btn);
    oEl.appendChild(btn);
  });
}

function pick(i, btn) {
  if (answered) return;
  answered = true;
  const item = questions[current];
  const buttons = oEl.querySelectorAll("button");
  if (i === item.answer) {
    score++;
    btn.classList.add("correct");
    fEl.textContent = "Correct!";
  } else {
    btn.classList.add("wrong");
    buttons[item.answer].classList.add("correct");
    fEl.textContent = \`Wrong! The answer is: \${item.options[item.answer]}\`;
  }
  sEl.textContent = \`Score: \${score} / \${questions.length}\`;
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) showQuestion();
  else {
    qEl.textContent = \`Quiz complete! Final score: \${score} / \${questions.length}\`;
    oEl.innerHTML = "";
    fEl.textContent = "Refresh the page to try again.";
    nextBtn.style.display = "none";
  }
};

showQuestion();
