const fs = require("node:fs");

fs.readFile("./input_day06q1", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  lines.pop();
  // const lines = ["Time:      7  15   30", "Distance:  9  40  200"];
  q1(lines);
  q2(lines);
});

const q1 = (lines) => {
  let prod = 1;
  let [times, distance] = lines;
  times = times.match(/\d+/g).map(Number);
  distance = distance.match(/\d+/g).map(Number);

  for (let i = 0; i < times.length; i++) {
    let t = 0;
    while (t < times[i] && t * (times[i] - t) <= distance[i]) {
      t++;
    }
    prod *= t == times[i] ? 0 : +times[i] + 1 - 2 * t;
  }
  console.log(`q1: ${prod}`);
};

const q2 = (lines) => {
  let prod = 1;
  let [times, distance] = lines;
  times = +times.match(/\d+/g).join("");
  distance = +distance.match(/\d+/g).join("");
  console.log(times);

  let t = 0;
  while (t < times && t * (times - t) <= distance) {
    t++;
  }
  prod *= t == times ? 0 : +times + 1 - 2 * t;

  console.log(`q2: ${prod}`);
};
