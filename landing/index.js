// utils
function getElement(name) {
  return document.getElementsByClassName(`${name}`)[0];
}

function format(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function range(from, to, step) {
  console.log({ from, to, step });
  return [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => {
    if (from > 1900 && to < 2100) return from + i * step;
    else return format(from + i * step);
  });
}

function toggleOn(el) {
  el.style.display = "block";
}

function toggleOff(el) {
  el.style.display = "none";
}

// constants
const modal = getElement("modal-box");
const form = getElement("questions");
const btn = getElement("modal-btn");
const close = getElement("modal-close");
const nextQuestion = getElement("question");

// flow order
const typeSequence = {
  buy: [1, 2, 11, 4, 14, 5, 15, 6, 19, 13, 7, 16, 8, 9, 10, 12, 17, 18, 3, 20],
  refi: [
    1,
    3,
    7,
    5,
    15,
    28,
    22,
    6,
    23,
    24,
    25,
    26,
    27,
    4,
    8,
    9,
    10,
    12,
    16,
    20,
  ],
};

const userProgress = {
  type: (i) => ["buy", "refi", "qual"][i],
  sequence: (type) => typeSequence[type],
  onQuestion: 0,
  answers: {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
    12: {},
    13: {},
    14: { answer: "Yes" },
    15: {},
    16: {},
    17: {},
    18: {},
    19: {},
    20: {},
  },
};

const formContent = [
  {
    order: 1,
    question: "What is the purpose of your loan?",
    subtext: "Please select an option below.",
    type: "button",
    options: ["Buy a home", "Refinance my property"],
  },
  {
    order: 2,
    question: "Are you a first-time home buyer?",
    subtext: "If so, you may qualify for low down payment loan.",
    type: "button",
    options: ["Yes", "No"],
  },
  {
    order: 3,
    reference: 1,
    question: "Which goal best suits your needs?",
    subtext: "",
    type: "button",
    options: (ref) => {
      switch (userProgress.type) {
        case "buy":
          return [
            "Lowest rate",
            "Shortest terms",
            "Less down payment",
            "Cover fees",
          ];
        case "refi":
          return [
            "Lower rate",
            "Cash out",
            "Lower payment",
            "Consolidate debt",
          ];
      }
    },
  },
  {
    order: 4,
    question: "Are you a US veteran?",
    subtext: "Those who served may qualify for a low-to-no down payment loan.",
    type: "button",
    options: ["Yes", "No"],
  },
  {
    order: 5,
    reference: 14,
    question: [
      {
        answered: "Yes",
        ask: "Where is the property located?",
      },
      {
        answered: "No",
        ask: "Enter the city or zip code of desired area.",
      },
    ],
    subtext: "",
    type: "search",
    options: ["Start typing..."],
  },
  {
    order: 6,
    reference: 14,
    question: [
      {
        answered: "Yes",
        ask: "What is the current value of the property?",
      },
      {
        answered: "No",
        ask: "How much will your desired home cost?",
      },
    ],
    subtext: "Please give an estimate.",
    type: "select",
    options: ["Please select", ...range(100000, 1500000, 5000)],
  },
  {
    order: 7,
    question: "What's your credit score?",
    subtext: "Give your honest and best guess if unsure.",
    type: "button",
    options: ["700+", "600-699", "500-599", "Below 500"],
  },
  {
    order: 8,
    question: "How are you currently employed?",
    subtext: "Please answer as of your last 2 years.",
    type: "button",
    options: ["Full-time", "Part-time", "Self-employed", "Other"],
  },
  {
    order: 9,
    question: "What's your monthly gross income?",
    subtext:
      "This may include court-ordered payments like child support or alimony.",
    type: "select",
    options: ["Please select", ...range(1000, 9900, 100), "10,000+"],
  },
  {
    order: 10,
    question: "What's your estimated monthly debts?",
    subtext:
      "This may include housing costs, credit card debts, court-ordered payments, auto bills, student loan repayment, etc.",
    type: "select",
    options: ["Please select", ...range(0, 9900, 100), "10,000+"],
  },
  {
    order: 11,
    question: "Will you have a co-borrower?",
    subtext:
      "Consider one for possibly better rates and increased loan amount.",
    type: "button",
    options: ["Yes", "No"],
  },
  {
    order: 12,
    question: "Enter your total current assets.",
    subtext:
      "This may include cash, personal property, retirement & brokerage funds, and business equity.",
    type: "select",
    options: ["Please select", ...range(0, 1000000, 10000)],
  },
  {
    order: 13,
    reference: 6,
    question: "How much down payment will you make?",
    subtext: "Please give an estimate.",
    type: "select",
    options: (ref) => ["Please select", ...range(0, ref, 5000)],
  },
  {
    order: 14,
    question: "Have you located your desired property?",
    subtext: "",
    type: "button",
    options: ["Yes", "No"],
  },
  {
    order: 15,
    reference: 14,
    question: [
      {
        answered: "Yes",
        ask: "What kind of property is it?",
      },
      {
        answered: "No",
        ask: "What kind of property are you looking for?",
      },
    ],
    subtext: "",
    type: "button",
    options: ["Single Family", "Townhouse", "Condominium", "Multi-Unit"],
  },
  {
    order: 16,
    question: "Have you filed for bankrupty in the past two years?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  {
    order: 17,
    question: "Do you have an offer accepted or in contract?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  {
    order: 18,
    question: "Are you currently working with a realtor?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  {
    order: 19,
    reference: 6,
    question: "How much are you looking to borrow?",
    subtext: "",
    type: "select",
    options: (ref) => ["Please select", ...range(0, ref, 10000)],
  },
  {
    order: 20,
    question: "Were you referred by somebody?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  {
    order: 21,
    question: "Enter your email to receive your quiz grade.",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  {
    order: 22,
    question: "How much did you purchase the property for?",
    subtext: "",
    type: "select",
    options: ["Please select", ...range(100000, 1500000, 5000)],
  },
  {
    order: 23,
    reference: 22,
    question: "What is the remaining loan balance?",
    subtext: "",
    type: "select",
    options: (ref) => ["Please select", ...range(5000, ref, 5000)],
  },
  {
    order: 24,
    question: "Does your current loan have a prepayment penalty?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  {
    order: 25,
    question: "Are you currently paying mortgage insurance?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  {
    order: 26,
    question: "Do you have any additional loans on the property?",
    type: "button",
    subtext: "Such as a second mortgage or line of equity.",
    options: ["Yes", "No"],
  },
  {
    order: 27,
    question:
      "Have you received an appraisal on the property in the last three months?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  {
    order: 28,
    question: "What year did you purchase the property?",
    subtext: "",
    type: "select",
    options: ["Please select", ...range(1920, 2020, 1)],
  },
];

btn.onclick = () => {
  toggleOn(modal);
  showNext();
};
close.onclick = () => toggleOff(modal);
window.onclick = (e) => {
  if (e.target == modal) toggleOff(modal);
};

function showDone() {
  const question = getElement("question");
  const done = getElement("done");
  question.style.display = "none";
  done.style.display = "block";
}

function saveProgress({ order, option, i }) {
  if (order === 1) {
    userProgress.type = userProgress.type(i);
    userProgress.sequence = userProgress.sequence(userProgress.type);
  }
  userProgress.answers[order] = {
    question: formContent[order - 1].question,
    answer: option,
  };
  console.log(userProgress);
}

function showNext() {
  const { onQuestion, sequence } = userProgress;
  let content, current;

  if (onQuestion === 0) {
    current = onQuestion;
    content = formContent[current];
  } else {
    current = sequence[onQuestion];
    content = formContent[current - 1];
  }

  if (onQuestion !== 20) {
    if (typeof content.question !== "string") {
      const previous = userProgress.answers[content.reference];
      content.question = content.question.filter(
        (option) => option.answered === previous.answer
      )[0].ask;
    }

    if (typeof content.options === "function") {
      const previous = userProgress.answers[content.reference];
      content.options = content.options(previous.answer);
    }

    const { question, subtext } = content;

    const choices = generateInputs(content);

    nextQuestion.innerHTML = `<h2>Question ${
      onQuestion + 1
    } of 20</h2><h3>${question}</h3><h5>${subtext}</h5>${choices}`;

    userProgress.onQuestion++;
  } else {
    showDone();
  }
}

function onSelect(choice) {
  // console.log({ choice });
  const { order, option, i } = choice;
  saveProgress({ order, option, i });
  showNext();
}

function generateInputs({ type, options, order }) {
  let output = "";
  let inputs = "";

  options.forEach((option, i) => {
    switch (type) {
      case "button": {
        inputs += `<li class="option option-${
          i + 1
        }"><input type="${type}" class="modal-option" value="${option}" onclick="onSelect({ order: ${order}, option: '${option}', i: ${i}})"></li>`;
        output = `<ul class="options">${inputs}</ul>`;
        break;
      }
      case "search": {
        inputs += `<li class="option option-${
          i + 1
        }"><input type="${type}" class="modal-option auto-search" placeholder="${option}" onclick="onSelect({ order: ${order}, option: '${option}', i: ${i}})"></li>`;
        output = `<ul class="options">${inputs}</ul>`;
        break;
      }
      case "select": {
        const isYear =
          Math.floor(option / 100) === 19 || Math.floor(option / 100) === 20;
        const sign = i === 0 ? "" : isYear ? "" : "$";
        inputs += `
        <option class="option option-${i + 1} income-select" value="${
          i ? option : i
        }">
        ${sign}${option}
        </option>`;
        output = `<select class="options" onchange="handleSelect({order: ${order}, i: ${i}})">${inputs}</select>`;
        break;
      }
      default:
        console.warn("Not applicable option");
    }
  });
  return output;
}

// places({
//   appId: "plZEVQE867P4",
//   apiKey: "031a6f11a85781789390cc4bf2f699e3",
//   container: document.querySelector(".auto-search"),
// });
