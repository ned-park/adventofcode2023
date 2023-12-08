const fs = require("node:fs");

fs.readFile("./input_day08", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let [directions, nodes] = data.split("\n\n");
  nodes = nodes.split("\n");
  nodes.pop();
  // const nodes = [
  //   "11A = (11B, XXX)",
  //   "11B = (XXX, 11Z)",
  //   "11Z = (11B, XXX)",
  //   "22A = (22B, XXX)",
  //   "22B = (22C, 22C)",
  //   "22C = (22Z, 22Z)",
  //   "22Z = (22B, 22B)",
  //   "XXX = (XXX, XXX)",
  // ];
  // const directions = "LR";
  q1(directions, nodes);
  q2(directions, nodes);
});

const q1 = (directions, nodes) => {
  let steps = 0;
  let places = {};
  let place = "AAA";
  for (const node of nodes) {
    let matches = node.match(/[a-z]{3}/gi);
    places[matches[0]] = { L: matches[1], R: matches[2] };
  }

  while (place != "ZZZ") {
    place = places[place][directions[steps % directions.length]];
    steps++;
  }

  console.log(`q1: ${steps}`);
};

const q2 = (directions, nodes) => {
  let steps = 0;
  let places = {};
  let place = [];
  for (const node of nodes) {
    let matches = node.match(/[a-z0-9]{3}/gi);
    places[matches[0]] = { L: matches[1], R: matches[2] };
    if (matches[0][2] == "A") place.push(matches[0]);
  }

  let minSteps = new Array(place.length).fill(0);
  while (minSteps.reduce((prod, s) => prod * s, 1) == 0) {
    for (let i = 0; i < place.length; i++) {
      place[i] = places[place[i]][directions[steps % directions.length]];
      if (place[i][2] === "Z" && minSteps[i] == 0) {
        minSteps[i] = steps + 1;
      }
    }
    steps++;
  }
  steps = minSteps.reduce((prod, s) => (prod * s) / gcd(prod, s), 1);

  console.log(`q2: ${steps}`);
};

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
