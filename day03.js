const fs = require("node:fs");

fs.readFile("./input_day03q1", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  lines.pop();
  // const lines = [
  //   "467..114..",
  //   "...*......",
  //   "..35..633.",
  //   "......#...",
  //   "617*......",
  //   ".....+.58.",
  //   "..592.....",
  //   "......755.",
  //   "...$.*....",
  //   ".664.598..",
  // ];
  q1(lines);
  q2(lines);
});

const q1 = (lines) => {
  let sum = 0;
  lines.forEach((line, lnIdx) => {
    const matches = line.matchAll(/\d+/g);
    for (const match of matches) {
      let idx = match.index;
      let len = match[0].length;
      let testStr = `${line[idx - 1 >= 0 ? idx - 1 : 0]}${line[idx + len < line.length ? idx + len : 0]}`;
      if (lnIdx - 1 >= 0) testStr += lines[lnIdx - 1].slice(Math.max(0, idx - 1), idx + len + 1);
      if (lnIdx + 1 < lines.length) testStr += lines[lnIdx + 1].slice(Math.max(0, idx - 1), idx + len + 1);
      if (/[^\d.]/.test(testStr)) {
        sum += Number(match[0]);
      }
    }
  });

  console.log(`q1: ${sum}`);
};

const q2 = (lines) => {
  let sum = 0;
  let cogs = {};
  lines.forEach((line, lnIdx) => {
    const matches = line.matchAll(/[*]/g);
    for (const match of matches) {
      let idx = match.index;
      cogs[`${lnIdx},${idx}`] = [];
    }
  });

  lines.forEach((line, lnIdx) => {
    const matches = line.matchAll(/\d+/g);
    for (const match of matches) {
      let idx = match.index;
      let len = match[0].length;
      let added = false;
      for (let i = lnIdx - 1; !added && i <= lnIdx + 1; i++) {
        for (let j = idx - 1; j <= idx + len; j++) {
          if (cogs.hasOwnProperty(`${i},${j}`)) {
            cogs[`${i},${j}`].push(+match[0]);
            added = true;
            break;
          }
        }
      }
    }
  });

  for (const arr of Object.values(cogs)) {
    if (arr.length == 2) {
      sum += arr[0] * arr[1];
    }
  }

  console.log(`q2: ${sum}`);
};
