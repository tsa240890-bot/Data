const QUESTIONS = [
  {
    q: "Which function of management involves setting goals and deciding the course of action to achieve them?",
    options: ["Organising", "Planning", "Staffing", "Controlling"],
    answer: 1,
  },
  {
    q: "The 4 Ps of the marketing mix are Product, Price, Place, and ______.",
    options: ["People", "Promotion", "Process", "Packaging"],
    answer: 1,
  },
  {
    q: "Which of these is a current liability on a balance sheet?",
    options: ["Land & Building", "Trade Payables", "Goodwill", "Investments"],
    answer: 1,
  },
  {
    q: "Span of control refers to:",
    options: [
      "The number of products a firm sells",
      "The number of subordinates a manager can effectively supervise",
      "The geographic reach of a business",
      "The duration of a manager's tenure",
    ],
    answer: 1,
  },
  {
    q: "Which type of business organisation has unlimited liability for its single owner?",
    options: ["Joint Stock Company", "Sole Proprietorship", "Cooperative Society", "Public Limited Company"],
    answer: 1,
  },
  {
    q: "Break-even point is the level of sales where:",
    options: [
      "Total revenue equals total cost",
      "Profit is maximum",
      "Fixed costs are zero",
      "Variable costs exceed revenue",
    ],
    answer: 0,
  },
  {
    q: "Which source of finance is considered a long-term source?",
    options: ["Trade credit", "Bank overdraft", "Debentures", "Commercial paper"],
    answer: 2,
  },
  {
    q: "Maslow's hierarchy of needs places 'Self-actualisation' at which level?",
    options: ["Lowest", "Second from bottom", "Middle", "Highest"],
    answer: 3,
  },
  {
    q: "Which of the following is an example of a secondary sector activity?",
    options: ["Farming", "Manufacturing", "Banking", "Mining"],
    answer: 1,
  },
  {
    q: "A SWOT analysis examines Strengths, Weaknesses, Opportunities, and:",
    options: ["Trends", "Targets", "Threats", "Tactics"],
    answer: 2,
  },
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  if (!container) return;

  const questions = shuffle(QUESTIONS);

  container.innerHTML = questions
    .map(
      (item, qIndex) => `
      <div class="question-card" data-correct="${item.answer}">
        <p><strong>Q${qIndex + 1}.</strong> ${item.q}</p>
        <ul class="options">
          ${item.options
            .map(
              (opt, oIndex) => `
              <li class="option-card">
                <label>
                  <input type="radio" name="q${qIndex}" value="${oIndex}" />
                  ${opt}
                </label>
              </li>`
            )
            .join("")}
        </ul>
      </div>`
    )
    .join("");

  const form = document.getElementById("quiz-form");
  const result = document.getElementById("quiz-result");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0;

    container.querySelectorAll(".question-card").forEach((card, qIndex) => {
      const correct = Number(card.dataset.correct);
      const selected = card.querySelector(`input[name="q${qIndex}"]:checked`);
      const optionCards = card.querySelectorAll(".option-card");

      optionCards.forEach((opt, oIndex) => {
        opt.classList.remove("correct", "incorrect");
        if (oIndex === correct) opt.classList.add("correct");
      });

      if (selected) {
        const chosen = Number(selected.value);
        if (chosen === correct) {
          score++;
        } else {
          optionCards[chosen].classList.add("incorrect");
        }
      }
    });

    result.textContent = `You scored ${score} out of ${questions.length}!`;
  });

  const retry = document.getElementById("quiz-retry");
  if (retry) {
    retry.addEventListener("click", () => {
      result.textContent = "";
      renderQuiz();
    });
  }
}

document.addEventListener("DOMContentLoaded", renderQuiz);
