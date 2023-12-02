const fs = require("node:fs");

fs.readFile("./input_day1q1", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  lines.pop();
  q1(lines);
  q2(lines);
});

const digitMap = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
};

const q1 = (lines) => {
  let sum = 0;
  lines.forEach((line) => {
    const matches = line.match(/\d/g);
    sum += +(matches[0] + matches[matches.length - 1]);
  });

  console.log(`q1: ${sum}`);
};

const q2 = (lines) => {
  let sum = 0;
  lines.forEach((line) => {

    for (const [k,v] of Object.entries(digitMap)) {
      line = line.replace(new RegExp(`${k}`, 'g'), v)
    }
    const matches = line.match(
      /(\d)/g
    );
    sum += +("" + matches[0] + matches[matches.length - 1]);
  });

  console.log(`q2: ${sum}`);
};
