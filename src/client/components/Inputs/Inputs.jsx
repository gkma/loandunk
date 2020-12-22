import React, { useState } from "react";

const Inputs = ({ content, onSelect }) => {
  const [selected] = useState("");
  const [text, setText] = useState("");
  const { type, options, order } = content;
  let output;

  switch (type) {
    case "button": {
      output = (
        <ul className="options">
          {options.map((option, i) => {
            return (
              <li key={`option-${i + 1}`} className={`option option-${i + 1}`}>
                <input
                  type={type}
                  className="modal-option"
                  onClick={() => onSelect({ order, option, i })}
                  value={option}
                />
              </li>
            );
          })}
        </ul>
      );
      break;
    }
    case "search": {
      output = (
        <ul className="options">
          {options.map((option, i) => {
            return (
              <li key={`option-${i + 1}`} className={`option option-${i + 1}`}>
                <input
                  type={type}
                  className="modal-option auto-search"
                  onClick={() => onSelect({ order, option, i })}
                  placeholder={option}
                  value={option}
                />
              </li>
            );
          })}
        </ul>
      );
      break;
    }
    case "select": {
      const isYear = (option) =>
        Math.floor(option / 100) === 19 || Math.floor(option / 100) === 20;

      const addSign = (position) => position !== 0;

      const inputs = options.map((option, i) => (
        <option
          className={`option option-${i + 1} income-select`}
          value={`${i ? option : ""}`}
          key={`option-${i + 1}`}
        >
          {addSign(i) && !isYear(option) ? "$" : ""}
          {option}
        </option>
      ));

      output = (
        <select
          className="options"
          value={selected}
          onChange={(ev) => {
            const option = parseFloat(ev.target.value.replace(/,/g, ""), 10);
            const i = ev.target.selectedIndex;
            onSelect({ order, option, i });
          }}
        >
          {inputs}
        </select>
      );
      break;
    }

    case "email":
    case "text": {
      const input = (
        <input
          type={type}
          className="modal-input"
          value={text}
          onChange={(ev) => setText(ev.target.value)}
        />
      );
      const onSubmit = (ev) => {
        ev.preventDefault();
        const { value } = document.querySelector(".modal-input");
        setText("");
        onSelect({ order, option: value, i: "" });
      };

      output = (
        <form onSubmit={onSubmit}>
          <label htmlFor="name">{input}</label>
          <input type="submit" value="Go" />
        </form>
      );
      break;
    }
    default: {
      return [];
    }
  }

  return output;
};

export default Inputs;
