/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from "react";

// import formContent from "./data/content";
import Inputs from "./components/Inputs";
import flowSequence from "./data/sequence";

import Checks from "./components/Checks";

// import { format } from "./helpers";

const App = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayChecks, setDisplayChecks] = useState();
  const [displayThankYou, setDisplayThankYou] = useState(false);
  const [startQuiz, setStartQuiz] = useState("Take Quiz");
  const [onQuestion, setOnQuestion] = useState(0);
  const [loanType, setLoanType] = useState("");
  const [sequence, setSequence] = useState([]);
  const [prompt, setPrompt] = useState();
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    const firstQuestion = flowSequence(loanType)[0];
    setPrompt(firstQuestion);

    if (loanType === "refi") {
      setUserProgress({
        ...userProgress,
        14: {
          answer: "Yes",
        },
      });
    }
  }, [loanType]);

  useEffect(() => {
    if (onQuestion === 1) {
      const type = ["buy", "refi"][userProgress[1].i];
      setLoanType(type);
      setSequence(flowSequence(type));
      setStartQuiz("Resume Quiz");
    } else if (onQuestion === 20) setStartQuiz("See Your Match");

    if (
      sequence.length &&
      sequence.length === Object.keys(userProgress).length
    ) {
      setPrompt(null);
      setDisplayChecks(true);
    }
  }, [onQuestion, userProgress]);

  useEffect(() => {
    if (onQuestion > 0 && onQuestion <= sequence.length) {
      const next = sequence[onQuestion];

      if (next?.question && typeof next.question !== "string") {
        const previous = userProgress[next.reference];
        next.question = next.question.filter(
          (option) => option.answered === previous.answer
        )[0].ask;
      }

      if (next?.options && typeof next.options === "function") {
        const previous = userProgress[next.reference];
        next.options = next.options(previous.answer);
      }

      setPrompt(next);
    }
  }, [sequence, onQuestion]);

  useEffect(() => {
    if (typeof displayChecks === "boolean" && !displayChecks) {
      setDisplayThankYou(true);
    }
  }, [displayChecks]);

  function saveProgress({ order, option, i }) {
    setUserProgress({
      ...userProgress,
      [order]: {
        question: prompt.question,
        answer: option,
        i,
      },
    });

    console.log({ userProgress });
  }

  function showNext() {
    setOnQuestion((prevQuestion) => prevQuestion + 1);
  }

  function handleSelect({ order, option, i }) {
    saveProgress({ order, option, i });
    showNext();
  }

  return (
    <>
      <div className="modal-open">
        <button
          type="button"
          className="modal-btn"
          onClick={() => setDisplayModal(!displayModal)}
        >
          {startQuiz}
        </button>
      </div>
      {displayModal && (
        <div className="modal-box">
          <div className="modal-form">
            <span
              className="modal-close"
              onClick={() => setDisplayModal(false)}
            >
              &times;
            </span>
            <div className="questions">
              <div className="question">
                {prompt && (
                  <>
                    <h2>Question {onQuestion + 1} of 22</h2>
                    <h3>{prompt.question}</h3>
                    <h5>{prompt.subtext}</h5>
                    <Inputs
                      content={{
                        type: prompt.type,
                        options: prompt.options,
                        order: prompt.order,
                      }}
                      onSelect={handleSelect}
                    />
                  </>
                )}
                {displayChecks && <Checks toggle={setDisplayChecks} />}
                {displayThankYou && (
                  <div className="featured">
                    <h1 className="feat-h1">
                      High five for taking the first step!
                    </h1>
                    <h4 className="feat-h4">Your mortgage teammate is:</h4>
                    <div className="featured-man">
                      <img
                        className="loan-me"
                        src="assets/loan-me-v1.png"
                        alt=""
                      />
                    </div>
                    <h4>Garron Ma</h4>
                    <p>
                      Having been on both sides of the loan shopping table, I
                      know how it feels to be beyond your depth when it comes to
                      buying or refinancing your home. I cannot wait to work
                      with you. Youll be receiving an email from me within 24
                      hrs.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
