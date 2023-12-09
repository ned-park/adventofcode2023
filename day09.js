const fs = require("node:fs");

fs.readFile("./input_day09", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  lines.pop();
  // const lines = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];
  q1(lines);
  q2(lines);
});

const q1 = (lines) => {
  let sum = 0;
  lines.forEach((line) => {
    let seq = [line.split(" ").map(Number)];
    while (seq[seq.length - 1].some((n) => n != 0))
      seq.push(seq[seq.length - 1].map((n, i) => n - (seq[seq.length - 1][i - 1] || 0)).slice(1));

    for (let i = seq.length - 1; i >= 0; i--)
      seq[i].push(seq[i][seq[i].length - 1] + (i == seq.length - 1 ? 0 : seq[i + 1][seq[i + 1].length - 1]));

    sum += seq[0].pop();
  });

  console.log(`q1: ${sum}`);
};

const q2 = (lines) => {
  let sum = 0;
  lines.forEach((line) => {
    let seq = [line.split(" ").map(Number)];
    while (seq[seq.length - 1].some((n) => n != 0))
      seq.push(seq[seq.length - 1].map((n, i) => n - (seq[seq.length - 1][i - 1] || 0)).slice(1));

    for (let i = seq.length - 1; i >= 0; i--) seq[i].unshift(seq[i][0] - (i + 1 == seq.length ? 0 : seq[i + 1][0]));

    sum += seq[0][0];
  });

  console.log(`q2: ${sum}`);
};
