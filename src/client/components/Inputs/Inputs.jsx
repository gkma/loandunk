import React from "react";

const Inputs = ({ content, onSelect }) => {
  console.log({ content, onSelect });
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
    default: {
      return [];
    }
  }

  return output;
};

export default Inputs;
