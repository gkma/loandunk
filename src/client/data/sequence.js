import data from "./content";

export default (type) => {
  let questionSequence = [];
  switch (type) {
    case "buy":
      questionSequence = [
        1,
        2,
        11,
        4,
        14,
        5,
        15,
        29,
        6,
        19,
        7,
        16,
        8,
        9,
        10,
        12,
        17,
        18,
        3,
        20,
        31,
        32,
      ];
      break;
    case "refi":
      questionSequence = [
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
        31,
        32,
      ];
      break;
    default:
      questionSequence = [1];
  }

  return questionSequence.map((q) => {
    return data[q];
  });
};
