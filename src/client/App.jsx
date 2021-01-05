/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from "react";
import axios from "axios";

import Inputs from "./components/Inputs";
import Checks from "./components/Checks";
import flowSequence from "./data/sequence";

const App = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayChecks, setDisplayChecks] = useState();
  const [displayThankYou, setDisplayThankYou] = useState(false);
  const [onQuestion, setOnQuestion] = useState(0);
  const [loanType, setLoanType] = useState("");
  const [sequence, setSequence] = useState([]);
  const [prompt, setPrompt] = useState();
  const [userProgress, setUserProgress] = useState({});

  // User exits form
  useEffect(() => {
    const handleEscape = (ev) => {
      if (ev.key === "Escape") setDisplayModal(false);
    };

    window.addEventListener("keyup", handleEscape);

    return () => window.removeEventListener("keyup", handleEscape);
  }, []);

  // Preanswer QUESTION #14 if user selects REFI
  useEffect(() => {
    const firstQuestion = flowSequence(loanType)[0];
    setPrompt(firstQuestion);

    if (loanType === "refi") {
      setUserProgress({
        ...userProgress,
        14: {
          question: "Have you located a property to buy?",
          answer: "Yes",
        },
      });
    }
  }, [loanType]);

  // Set, save, and submit form
  useEffect(() => {
    async function submitForm() {
      try {
        await axios.post("/api/submit", userProgress);
      } catch (error) {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
        console.log(error);
      }
    }

    if (onQuestion === 1) {
      const type = ["buy", "refi"][userProgress[1].i];
      setLoanType(type);
      setSequence(flowSequence(type));
    }

    if (onQuestion === 22) {
      setPrompt(null);
      setDisplayChecks(true);
      submitForm();
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
          Take Quiz
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
                    <h1 className="feat-h1">You passed!</h1>
                    <h4 className="feat-h4">Your mortgage teammate is:</h4>
                    <div className="featured-man">
                      <img
                        className="loan-me"
                        src="assets/loan-me-v1.png"
                        alt=""
                      />
                    </div>
                    <h4 className="feat-h4 gm-name">Garron Ma</h4>
                    <h4 className="feat-h4 gm-nmls">NMLS #1969903</h4>
                    <h6 className="gm-msg">
                      &quot;I&apos;m thrilled to partner with you. Let&apos;s
                      get to work!&quot;
                    </h6>
                    <p>
                      You&apos;ll be receiving an introductory email from me
                      shortly.
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
