const fs = require("node:fs");

fs.readFile("./input_day05q1", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n\n");
  // const lines = [
  //   "seeds: 79 14 55 13",
  //   "seed-to-soil map: \n50 98 2\n52 50 48\n",
  //   "soil-to-fertilizer map:\n0 15 37 \n37 52 2 \n39 0 15 \n",
  //   "fertilizer-to-water map: \n49 53 8 \n0 11 42 \n42 0 7 \n57 7 4",
  //   "water-to-light map: \n88 18 7 \n18 25 70 \n",
  //   "light-to-temperature map: \n45 77 23 \n81 45 19 \n68 64 13",
  //   "temperature-to-humidity map: \n0 69 1 \n1 0 69 \n",
  //   "humidity-to-location map: \n60 56 37 \n56 93 4",
  // ];
  let seeds = lines.shift().split(": ")[1].trim().split(" ").map(Number);
  q1(lines, seeds);
  q2(lines, seeds);
});

const q1 = (lines, seeds) => {
  let sum = 0;
  let results = seeds.concat();
  let maps = [{}, {}, {}, {}, {}, {}, {}];
  lines.forEach((line, idx) => {
    const ranges = line
      .trim("")
      .split("\n")
      .filter((r) => r.length);
    ranges.shift();
    for (const range of ranges) {
      let [source, dest, len] = range.trim().split(" ");
      maps[idx][+source] = [+dest, +len];
    }
  });

  for (const map of maps) {
    let changed = new Array(results.length).fill(false);
    for (let [key, val] of Object.entries(map)) {
      let dest = Number(key);
      let [source, len] = val;
      results = results.map((e, i) => {
        if (!changed[i] && e >= source && e < source + len) {
          changed[i] = true;
          return dest + (e - source);
        } else {
          return e;
        }
      });
    }
  }

  console.log(`q1: ${Math.min(...results)}`);
};

const q2 = (lines, seedRanges) => {
  let maps = [{}, {}, {}, {}, {}, {}, {}];
  lines.forEach((line, idx) => {
    const ranges = line
      .trim("")
      .split("\n")
      .filter((r) => r.length);
    ranges.shift();
    for (const range of ranges) {
      let [source, dest, len] = range.trim().split(" ");
      maps[idx][+source] = [+dest, +len];
    }
  });

  const getSeed = (e) => {
    for (let i = maps.length - 1; i >= 0; i--) {
      let map = maps[i];
      for (let [key, val] of Object.entries(map)) {
        let dest = Number(key);
        let [source, len] = val;
        if (e >= dest && e < dest + len) {
          e = source + (e - dest);
          break;
        }
      }
    }
    return e;
  };

  let loc = 0;
  while (true) {
    let res = getSeed(loc);
    for (let i = 0; i < seedRanges.length - 1; i += 2) {
      if (seedRanges[i] <= res && res < seedRanges[i] + seedRanges[i + 1]) {
        console.log(`q2 seed: ${res}, location: ${loc}`);
        return res;
      }
    }
    loc++;
  }
};
