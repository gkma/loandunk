import React, { useState, useEffect } from "react";
import AlgoliaPlaces from "algolia-places-react";

const process = require("process");

const Inputs = ({ content, onSelect }) => {
  const [selected, setSelected] = useState(undefined);
  const [errors, setErrors] = useState({
    emptyField: true,
  });
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const { type, options, order } = content;
  let output;

  useEffect(() => {
    if (selected) setErrors({ ...errors, emptyField: !errors.emptyField });
  }, [selected]);

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
      const input = (
        <ul className="options">
          {options.map((option, i) => {
            return (
              <li key={`option-${i + 1}`} className={`option option-${i + 1}`}>
                <AlgoliaPlaces
                  placeholder="Enter location here."
                  options={{
                    appId: process.env.PLACES_APP_ID,
                    apiKey: process.env.PLACES_API_KEY,
                  }}
                  onChange={({ suggestion }) => setLocation(suggestion.value)}
                />
              </li>
            );
          })}
        </ul>
      );

      output = (
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            if (location === "") alert("Please enter a location.");
            else {
              onSelect({ order, option: location, i: 0 });
            }
          }}
        >
          <label htmlFor="name">{input}</label>
          <input type="submit" value="Next" className="text-submit" />
        </form>
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
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            if (!selected) alert("Please select an option.");
            else {
              const option = parseFloat(selected.replace(/,/g, ""), 10);
              const i = ev.target.selectedIndex;
              onSelect({ order, option, i });
              setSelected("");
            }
          }}
        >
          <select
            className="options"
            value={selected}
            onChange={(ev) => setSelected(ev.target.value)}
          >
            {inputs}
          </select>
          <input type="submit" value="Next" className="text-submit" />
        </form>
      );
      break;
    }

    case "email":
    case "text": {
      const placeholder =
        type === "email" ? "carmen@sandiego.com" : "Carmen San Diego";
      const input = (
        <input
          type={type}
          className="modal-input"
          value={text}
          placeholder={placeholder}
          onChange={(ev) => setText(ev.target.value)}
        />
      );
      const onSubmit = (ev) => {
        ev.preventDefault();
        if (!text.length) alert("Please enter a valid response.");
        else {
          const { value } = document.querySelector(".modal-input");
          setText("");
          onSelect({ order, option: value, i: "" });
        }
      };

      output = (
        <form onSubmit={onSubmit}>
          <label htmlFor="name">{input}</label>
          <input type="submit" value="Next" className="text-submit" />
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
