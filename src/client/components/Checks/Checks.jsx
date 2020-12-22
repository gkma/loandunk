import React, { useState, useEffect } from "react";

const Checks = ({ toggle }) => {
  const [checkOne, setCheckOne] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);
  const [checkThree, setCheckThree] = useState(false);

  useEffect(() => {
    const timerOne = setTimeout(() => {
      setCheckOne(!checkOne);
    }, 1000);
    return () => clearTimeout(timerOne);
  }, []);

  useEffect(() => {
    const timerTwo = setTimeout(() => {
      setCheckTwo(!checkTwo);
    }, 3000);
    return () => clearTimeout(timerTwo);
  }, []);

  useEffect(() => {
    const timerThree = setTimeout(() => {
      setCheckThree(!checkThree);
    }, 5000);
    return () => clearTimeout(timerThree);
  }, []);

  useEffect(() => {
    if (checkThree) {
      const goNextPage = () => toggle(false);
      const timer = setTimeout(goNextPage, 2000);
      return () => clearTimeout(timer);
    }
    return "";
  }, [checkThree, toggle]);

  return (
    <div className="checks">
      <div className="check">
        <h2>Collecting your answers...</h2>
        {checkOne ? (
          <img className="check-box" src="assets/checkbox-one.gif" alt="" />
        ) : (
          <img className="loading" src="assets/loading.gif" alt="" />
        )}
      </div>

      <div className="check">
        <h2>Scoring your quiz...</h2>
        {checkTwo ? (
          <img className="check-box" src="assets/checkbox-two.gif" alt="" />
        ) : (
          <img className="loading" src="assets/loading.gif" alt="" />
        )}
      </div>

      <div className="check">
        <h2>Matching you 1 on 1...</h2>
        {checkThree ? (
          <img className="check-box" src="assets/checkbox-three.gif" alt="" />
        ) : (
          <img className="loading" src="assets/loading.gif" alt="" />
        )}
      </div>
    </div>
  );
};

export default Checks;
