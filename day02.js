const fs = require("node:fs");

fs.readFile("./input_day02q1", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  lines.pop();
  q1(lines);
  q2(lines);
});

const maxAllowedRGB = {
  red: 12,
  green: 13,
  blue: 14,
};

const q1 = (lines) => {
  let sum = 0;
  lines.forEach((line) => {
    let [game, draws] = line.split(": ");
    let gameNum = +game.split(" ")[1];
    draws = draws.split("; ").map((draw) => draw.split(", "));

    let underMax = true;
    for (const draw of draws) {
      draw.forEach((d) => {
        let [n, t] = d.split(" ");
        if (maxAllowedRGB[t] < n) underMax = false;
      });
      console.log(draw);
    }

    if (underMax) sum += gameNum;
  });

  console.log(`q1: ${sum}`);
};

const q2 = (lines) => {
  let sum = 0;
  lines.forEach((line) => {
    let [game, draws] = line.split(": ");
    let gameNum = +game.split(" ")[1];
    draws = draws.split("; ").map((draw) => draw.split(", "));
    const cubesSeen = {};

    for (const draw of draws) {
      draw.forEach((d) => {
        let [n, t] = d.split(" ");
        cubesSeen[t] = cubesSeen.hasOwnProperty(t)
          ? Math.max(+n, cubesSeen[t])
          : +n;
      });
    }

    let powerOfCubeSet = 1;
    for (const v of Object.values(cubesSeen)) powerOfCubeSet *= v;
    sum += powerOfCubeSet;
  });

  console.log(`q2: ${sum}`);
};
