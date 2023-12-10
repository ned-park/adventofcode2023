const fs = require("node:fs");

const getStart = (lines) => {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] == "S") return [i, j];
    }
  }
};

const getMap = (lines) => {
  const map = [];
  lines.forEach((line) => {
    map.push(line.split(""));
  });

  return map;
};

fs.readFile("./input_day10", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  lines.pop();
  // prettier-ignore
  // const lines = [
  // "7-F7-",
  // ".FJ|7",
  // "SJLL7",
  // "|F--J",
  // "LJ.LJ",
  // ];
  const map = getMap(lines);
  const start = getStart(map);
  q1(map, start);
  q2(lines);
});

// prettier-ignore
const movements = (t) => {
  switch(t) {
    case "|": return [[-1, 0], [1, 0]];
    case "-": return [[0, -1], [0, 1]];
    case "L": return [[-1, 0], [0, 1]];
    case "J": return [[-1, 0], [0, -1]];
    case "7": return [[1, 0], [0,-1]];
    case "F": return [[1, 0], [0, 1]];
    case "S": return [[0, 1]]; 
  }
};

const q1 = (map, start) => {
  let steps = 0;
  let pos = start.concat();
  let lastPos = pos.concat();

  while (pos.some((n, i) => n != start[i]) || steps == 0) {
    let moves = movements(map[pos[0]][pos[1]]);
    if (map[pos[0]][pos[1]] == "|") {
      if (pos[0] - lastPos[0] == -1) moves.pop();
      else moves.shift();
    } else if (map[pos[0]][pos[1]] == "-") {
      if (pos[1] - lastPos[1] == 1) moves.shift();
      else moves.pop();
    } else if (map[pos[0]][pos[1]] == "L") {
      if (pos[1] != lastPos[1]) moves.pop();
      else moves.shift();
    } else if (map[pos[0]][pos[1]] == "J") {
      if (pos[1] != lastPos[1]) moves.pop();
      else moves.shift();
    } else if (map[pos[0]][pos[1]] == "7") {
      if (pos[1] != lastPos[1]) moves.pop();
      else moves.shift();
    } else if (map[pos[0]][pos[1]] == "F") {
      if (pos[1] != lastPos[1]) moves.pop();
      else moves.shift();
    }

    steps++;
    lastPos = pos.concat();
    console.log(map[pos[0]][pos[1]]);
    pos = [pos[0] + moves[0][0], pos[1] + moves[0][1]];
  }
  console.log(`q1: ${steps / 2}`);
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
