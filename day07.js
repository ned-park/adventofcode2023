const fs = require("node:fs");

fs.readFile("./input_day07q1", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split("\n");
  lines.pop();
  // const lines = ["32T3K 765", "T55J5 684", "KK677 28", "KTJJT 220", "QQQJA 483"];
  q1(lines);
  q2(lines);
});

const identifyHand = (hand) => {
  const values = Object.values(hand);
  if (values.length === 5) {
    return 1;
  } else if (values.length === 1) {
    return 7;
  } else if (values.length === 4) {
    return 2;
  } else if (values.length === 2) {
    if (values[0] * values[1] == 4) return 6;
    else return 5;
  } else if (values[0] * values[1] * values[2] === 3) {
    return 4;
  } else {
    return 3;
  }
};

const arrangeHands = (hands, cardRanks) => {
  for (const val of Object.values(hands)) {
    val.sort((a, b) => {
      for (let i = 0; i < a.cards.length; i++) {
        if (cardRanks.indexOf(a.cards[i]) < cardRanks.indexOf(b.cards[i])) return 1;
        if (cardRanks.indexOf(a.cards[i]) > cardRanks.indexOf(b.cards[i])) return -1;
      }
    });
  }
};

const findSum = (hands) => {
  let sum = 0;
  let rank = 1;
  for (let i = 1; i <= 7; i++) {
    if (!hands.hasOwnProperty(i)) continue;
    for (const v of hands[i]) {
      sum += rank * v.bid;
      rank++;
    }
  }
  return sum;
};

const q1 = (lines) => {
  let hands = {};
  lines.forEach((line) => {
    let hand = {};
    let [cards, bid] = line.split(" ");
    for (const c of cards) {
      hand[c] = (hand[c] || 0) + 1;
    }

    let handType = identifyHand(hand);
    if (!hands.hasOwnProperty(handType)) hands[handType] = [];
    hands[handType].push({ cards, bid: Number(bid) });
    let values = Object.values(hand);
  });

  arrangeHands(hands, ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]);
  let sum = findSum(hands);
  console.log(`q1: ${sum}`);
};

const q2 = (lines) => {
  let hands = {};
  lines.forEach((line) => {
    let hand = {};
    let [cards, bid] = line.split(" ");
    for (const c of cards) {
      hand[c] = (hand[c] || 0) + 1;
    }
    if (hand.hasOwnProperty("J")) {
      let wild = hand["J"];
      if (wild !== 5) {
        delete hand["J"];
        let max;
        for (const [k, v] of Object.entries(hand)) {
          if (!max || v > hand[max]) {
            max = k;
          }
        }
        hand[max] += wild;
      }
    }

    let handType = identifyHand(hand);
    if (!hands.hasOwnProperty(handType)) hands[handType] = [];
    hands[handType].push({ cards, bid: Number(bid) });
    let values = Object.values(hand);
  });

  arrangeHands(hands, ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]);
  let sum = findSum(hands);
  console.log(`q1: ${sum}`);
};
