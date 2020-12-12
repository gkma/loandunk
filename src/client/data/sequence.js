export default (type) => {
  switch (type) {
    case "buy":
      return [
        1,
        2,
        11,
        4,
        14,
        5,
        15,
        6,
        19,
        13,
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
      ];
    case "refi":
      return [
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
      ];
    default:
      return [];
  }
};
