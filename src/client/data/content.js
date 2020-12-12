import { range } from "../helpers";

const formContent = {
  1: {
    order: 1,
    question: "What is the purpose of your loan?",
    subtext: "Please select an option below.",
    type: "button",
    options: ["Buy a home", "Refinance my property"],
  },
  2: {
    order: 2,
    question: "Are you a first-time home buyer?",
    subtext: "If so, you may qualify for low down payment loan.",
    type: "button",
    options: ["Yes", "No"],
  },
  3: {
    order: 3,
    reference: 1,
    question: "Which goal best suits your needs?",
    subtext: "",
    type: "button",
    options: (type) => {
      switch (type) {
        case "Buy a home":
          return [
            "Lowest rate",
            "Shortest terms",
            "Less down payment",
            "Cover fees",
          ];
        case "Refinance my property":
          return [
            "Lower rate",
            "Cash out",
            "Lower payment",
            "Consolidate debt",
          ];
        default:
          return [];
      }
    },
  },
  4: {
    order: 4,
    question: "Are you a US veteran?",
    subtext: "Those who served may qualify for a low-to-no down payment loan.",
    type: "button",
    options: ["Yes", "No"],
  },
  5: {
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
  6: {
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
  7: {
    order: 7,
    question: "What's your credit score?",
    subtext: "Give your honest and best guess if unsure.",
    type: "button",
    options: ["700+", "600-699", "500-599", "Below 500"],
  },
  8: {
    order: 8,
    question: "How are you currently employed?",
    subtext: "Please answer as of your last 2 years.",
    type: "button",
    options: ["Full-time", "Part-time", "Self-employed", "Other"],
  },
  9: {
    order: 9,
    question: "What's your monthly gross income?",
    subtext:
      "This may include court-ordered payments like child support or alimony.",
    type: "select",
    options: ["Please select", ...range(1000, 9900, 100), "10,000+"],
  },
  10: {
    order: 10,
    question: "What's your estimated monthly debts?",
    subtext:
      "This may include housing costs, credit card debts, court-ordered payments, auto bills, student loan repayment, etc.",
    type: "select",
    options: ["Please select", ...range(0, 9900, 100), "10,000+"],
  },
  11: {
    order: 11,
    question: "Will you have a co-borrower?",
    subtext:
      "Consider one for possibly better rates and increased loan amount.",
    type: "button",
    options: ["Yes", "No"],
  },
  12: {
    order: 12,
    question: "Enter your total current assets.",
    subtext:
      "This may include cash, personal property, retirement & brokerage funds, and business equity.",
    type: "select",
    options: ["Please select", ...range(0, 1000000, 10000)],
  },
  13: {
    order: 13,
    reference: 6,
    question: "How much down payment will you make?",
    subtext: "Please give an estimate.",
    type: "select",
    options: (ref) => ["Please select", ...range(0, ref, 5000)],
  },
  14: {
    order: 14,
    question: "Have you located your desired property?",
    subtext: "",
    type: "button",
    options: ["Yes", "No"],
  },
  15: {
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
  16: {
    order: 16,
    question: "Have you filed for bankrupty in the past two years?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  17: {
    order: 17,
    question: "Do you have an offer accepted or in contract?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  18: {
    order: 18,
    question: "Are you currently working with a realtor?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  19: {
    order: 19,
    reference: 6,
    question: "How much are you looking to borrow?",
    subtext: "",
    type: "select",
    options: (ref) => ["Please select", ...range(0, ref, 10000)],
  },
  20: {
    order: 20,
    question: "Were you referred by somebody?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  21: {
    order: 21,
    question: "Enter your email to receive your quiz grade.",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  22: {
    order: 22,
    question: "How much did you purchase the property for?",
    subtext: "",
    type: "select",
    options: ["Please select", ...range(100000, 1500000, 5000)],
  },
  23: {
    order: 23,
    reference: 22,
    question: "What is the remaining loan balance?",
    subtext: "",
    type: "select",
    options: (ref) => ["Please select", ...range(5000, ref, 5000)],
  },
  24: {
    order: 24,
    question: "Does your current loan have a prepayment penalty?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  25: {
    order: 25,
    question: "Are you currently paying mortgage insurance?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  26: {
    order: 26,
    question: "Do you have any additional loans on the property?",
    type: "button",
    subtext: "Such as a second mortgage or line of equity.",
    options: ["Yes", "No"],
  },
  27: {
    order: 27,
    question:
      "Have you received an appraisal on the property in the last three months?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  28: {
    order: 28,
    question: "What year did you purchase the property?",
    subtext: "",
    type: "select",
    options: ["Please select", ...range(1920, 2020, 1)],
  },
};

export default formContent;
