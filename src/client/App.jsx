/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";

import formContent from "./data/content";
import Inputs from "./components/Inputs";
import flowSequence from "./data/sequence";

// import { format } from "./helpers";

const App = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [onQuestion, setOnQuestion] = useState(1);
  const [prompt, setPrompt] = useState();

  const userProgress = {};
  let sequence;

  function saveProgress({ order, option, i }) {
    if (order === 1) {
      const selectedLoanType = ["buy", "refi", "qual"][i];
      sequence = flowSequence(selectedLoanType);
    }

    userProgress[order] = {
      question: formContent[order].question,
      answer: option,
    };

    setOnQuestion(onQuestion + 1);
  }

  function showFirst() {
    console.log(formContent[onQuestion]);
    setPrompt(formContent[onQuestion]);
  }

  function showNext() {
    console.log({ nextSequence: sequence[onQuestion] });
    const content = formContent[sequence[onQuestion]];
    console.log({ nextQuestion: content });

    if (typeof content.question !== "string") {
      const previous = userProgress[content.reference];
      content.question = content.question.filter(
        (option) => option.answered === previous.answer
      )[0].ask;
    }

    if (typeof content.options === "function") {
      const previous = userProgress[content.reference];
      console.log({ previous });
      content.options = content.options(previous.answer);
      console.log({ content });
    }

    setPrompt(content);
  }

  function onSelect({ order, option, i }) {
    saveProgress({ order, option, i });
    showNext();
  }

  return (
    <>
      <div className="modal-open">
        <button
          type="button"
          className="modal-btn"
          onClick={() => {
            setDisplayModal(!displayModal);
            showFirst();
          }}
        >
          Take Quiz
        </button>
      </div>
      {displayModal && (
        <div className="modal-box">
          <div className="modal-form">
            <span
              className="modal-close"
              onClick={() => {
                setDisplayModal(false);
              }}
            >
              &times;
            </span>
            <div className="questions">
              <div className="question">
                {prompt && (
                  <>
                    <h2>Question {onQuestion} of 20</h2>
                    <h3>{prompt.question}</h3>
                    <h5>{prompt.subtext}</h5>
                    <Inputs
                      content={{
                        type: prompt.type,
                        options: prompt.options,
                        order: prompt.order,
                      }}
                      onSelect={onSelect}
                    />
                  </>
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
