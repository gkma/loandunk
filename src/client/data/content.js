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
    question: "Are you a first time home buyer?",
    subtext: "You may qualify for a low down payment loan.",
    type: "button",
    options: ["Yes", "No"],
  },
  3: {
    order: 3,
    reference: 1,
    question: [
      {
        answered: "Buy a home",
        ask: "Which loan goal best suits your purchase?",
      },
      {
        answered: "Refinance my property",
        ask: "Which loan goal best suits your refinance?",
      },
    ],
    subtext: "Please select an option below.",
    type: "button",
    options: (type) => {
      switch (type) {
        case "Buy a home":
          return [
            "Lowest rate",
            "Shortest term",
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
        ask: "What is the property's address?",
      },
      {
        answered: "No",
        ask: "Enter zip code or city of the desired area.",
      },
    ],
    subtext: "Please enter it below.",
    type: "search",
    options: ["Start typing here..."],
  },
  6: {
    order: 6,
    reference: 14,
    question: [
      {
        answered: "Yes",
        ask: "How much is the property worth today?",
      },
      {
        answered: "No",
        ask: "How much does the property cost?",
      },
    ],
    subtext: "Round up using a home estimator tool.",
    type: "select",
    options: ["Please select", ...range(100000, 5000000, 5000)],
  },
  7: {
    order: 7,
    question: "What's your credit score?",
    subtext: "Give your best guess if unsure.",
    type: "button",
    options: ["700+", "600-699", "500-599", "Below 500"],
  },
  8: {
    order: 8,
    question: "How are you employed?",
    subtext: "Please answer for the last 2 years.",
    type: "button",
    options: ["Full-time", "Part-time", "Self-employed", "Retired"],
  },
  9: {
    order: 9,
    question: "What's your monthly gross (pre-tax) income?",
    subtext:
      "This may include court-ordered payments like child support or alimony.",
    type: "select",
    options: ["Please select", ...range(1000, 9900, 100), "10,000+"],
  },
  10: {
    order: 10,
    question: "What's your monthly debts?",
    subtext:
      "This may include housing costs, credit card debts, court-ordered payments, auto bills, student loan repayment, etc.",
    type: "select",
    options: ["Please select", ...range(0, 9900, 100), "10,000+"],
  },
  11: {
    order: 11,
    question: "Will you have a co-borrower?",
    subtext:
      "Consider adding a family member or spouse for possibly better rates or an increased loan amount.",
    type: "button",
    options: ["Yes", "No"],
  },
  12: {
    order: 12,
    question: "What is your total current assets worth?",
    subtext:
      "This may include cash, personal property, retirement & brokerage funds, and business equity.",
    type: "select",
    options: ["Please select", ...range(0, 5000000, 5000)],
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
    question: "Have you located a property to buy yet?",
    subtext: "Please select an option below.",
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
        ask: "What type of property will it be?",
      },
    ],
    subtext: "Please select an option below.",
    type: "button",
    options: ["Single Family", "Townhouse", "Condominium", "Multi-Unit"],
  },
  16: {
    order: 16,
    question: "Have you filed for bankruptcy in the past two years?",
    type: "button",
    subtext: "",
    options: ["No", "Yes"],
  },
  17: {
    order: 17,
    question: "Do you have an accepted offer or under contract?",
    type: "button",
    subtext: "",
    options: ["Yes", "No"],
  },
  18: {
    order: 18,
    question: "Are you working with a realtor?",
    type: "button",
    subtext: "Please select an option below.",
    options: ["Yes", "No"],
  },
  19: {
    order: 19,
    reference: 6,
    question: "How much do you need to borrow?",
    subtext: "Please estimate by rounding up.",
    type: "select",
    options: (ref) => ["Please select", ...range(0, ref, 5000)],
  },
  20: {
    order: 20,
    question: "Were you referred to Loan Dunk by somebody?",
    type: "button",
    subtext: "Please select an option below.",
    options: ["Yes", "No"],
  },
  21: {
    order: 21,
    question: "Enter your email to receive your quiz grade.",
    type: "button",
    subtext: "Please enter it below.",
    options: ["Yes", "No"],
  },
  22: {
    order: 22,
    question: "How much did you purchase the property for?",
    subtext: "Please select an option below.",
    type: "select",
    options: ["Please select", ...range(100000, 1500000, 5000)],
  },
  23: {
    order: 23,
    reference: 22,
    question: "What is the remaining loan balance?",
    subtext: "Please select an option below.",
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
    subtext: "Such as a second mortgage or home equity line of credit (HELOC).",
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
    subtext: "Please select an option below.",
    type: "select",
    options: ["Please select", ...range(2020, 1920, -1)],
  },
  29: {
    order: 29,
    question: "How will this property be occupied?",
    subtext: "Please select an option below.",
    type: "button",
    options: [
      "Primary Residence",
      "Secondary Residence",
      "Investment Property",
      "Other",
    ],
  },
  30: {
    order: 30,
    question: "What is your current interest rate?",
    subtext: "",
    type: "select",
    options: ["Please select", ...range(15, 1, -1)],
  },
  31: {
    order: 31,
    question: "What is your legal name?",
    subtext: "Please enter first and last name.",
    type: "text",
    options: [],
  },
  32: {
    order: 32,
    question: "Where do we email your quiz score?",
    subtext: "Please enter it below.",
    type: "email",
    options: [],
  },
};

export default formContent;
