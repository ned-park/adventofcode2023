const fs = require("node:fs");

fs.readFile("./input_day04q1", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  lines.pop();
  // const lines = [
  //   "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  //   "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  //   "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  //   "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  //   "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  //   "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
  // ];
  q1(lines);
  q2(lines);
});

const q1 = (lines) => {
  let sum = 0;
  lines.forEach((line) => {
    let [want, have] = line.split(" | ");
    want = want.split(": ")[1];
    let set = new Set(want.match(/\d+/g));
    let matches = have.match(/\d+/g);
    let count = 0;
    for (const match of matches) {
      if (set.has(match)) count++;
    }
    sum += count == 0 ? count : 2 ** (count - 1);
  });

  console.log(`q1: ${sum}`);
};

const q2 = (lines) => {
  let sum = 0;
  let cards = { 1: 1 };
  lines.forEach((line, idx) => {
    if (!cards[idx + 1]) cards[idx + 1] = 1;
    let [want, have] = line.split(" | ");
    want = want.split(": ")[1];
    let set = new Set(want.match(/\d+/g));
    let matches = have.match(/\d+/g);
    let count = 0;

    for (const match of matches) {
      if (set.has(match)) count++;
    }
    for (let i = 1; i <= count; i++) {
      cards[idx + i + 1] = (cards[idx + i + 1] || 1) + cards[idx + 1];
    }
    // console.log(cards);
    sum += cards[idx + 1];
  });

  console.log(`q2: ${sum}`);
};
