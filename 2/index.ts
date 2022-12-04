#! /usr/local/bin/ts-node
import { readFileSync } from "fs";

enum Shape {
  ROCK,
  PAPER,
  SCISSORS,
}

enum Outcome {
  LOSS,
  DRAW,
  WIN,
}

const translateToShape = (character: string) => {
  if (["A", "X"].includes(character)) return Shape.ROCK;
  else if (["B", "Y"].includes(character)) return Shape.PAPER;
  return Shape.SCISSORS;
};

const translateToRequiredOutcome = (character: string) => {
  if (character === "X") return Outcome.LOSS;
  else if (character === "Y") return Outcome.DRAW;
  return Outcome.WIN;
};

const getOutcome = (opponentShape: Shape, myShape: Shape) => {
  if (opponentShape === myShape) return Outcome.DRAW;
  if (opponentShape === Shape.PAPER && myShape === Shape.ROCK)
    return Outcome.LOSS;
  if (opponentShape === Shape.PAPER && myShape === Shape.SCISSORS)
    return Outcome.WIN;
  if (opponentShape === Shape.SCISSORS && myShape === Shape.ROCK)
    return Outcome.WIN;
  if (opponentShape === Shape.SCISSORS && myShape === Shape.PAPER)
    return Outcome.LOSS;
  if (opponentShape === Shape.ROCK && myShape === Shape.SCISSORS)
    return Outcome.LOSS;
  if (opponentShape === Shape.ROCK && myShape === Shape.PAPER)
    return Outcome.WIN;

  throw new Error("not a valid outcome");
};

const determineRequiredShape = (
  opponentShape: Shape,
  requiredOutcome: Outcome
) => {
  if (requiredOutcome === Outcome.DRAW) return opponentShape;
  if (requiredOutcome === Outcome.WIN && opponentShape === Shape.ROCK)
    return Shape.PAPER;
  if (requiredOutcome === Outcome.WIN && opponentShape === Shape.PAPER)
    return Shape.SCISSORS;
  if (requiredOutcome === Outcome.WIN && opponentShape === Shape.SCISSORS)
    return Shape.ROCK;
  if (requiredOutcome === Outcome.LOSS && opponentShape === Shape.ROCK)
    return Shape.SCISSORS;
  if (requiredOutcome === Outcome.LOSS && opponentShape === Shape.PAPER)
    return Shape.ROCK;
  if (requiredOutcome === Outcome.LOSS && opponentShape === Shape.SCISSORS)
    return Shape.PAPER;
  throw new Error("not a valid outcome");
};

const getPoints = (myResponse: Shape, outcome: Outcome) => {
  // hack: enums are in the right order such that we can treat them as numbers here
  return myResponse + 1 + 3 * outcome;
};

(async () => {
  const input = readFileSync("./2/INPUT.txt", "utf8");
  const lines = input.split("\n");

  // part 1
  let points = 0;

  lines.forEach((l) => {
    const [opponentShape, myShape] = l.split(" ").map(translateToShape);
    const outcome = getOutcome(opponentShape, myShape);
    points += getPoints(myShape, outcome);
  });

  console.log(`total points (part 1): ${points}`);

  // part 2
  points = 0;

  lines.forEach((l) => {
    const [opponentShapeCode, outcomeCode] = l.split(" ");
    const opponentShape = translateToShape(opponentShapeCode);
    const requiredOutcome = translateToRequiredOutcome(outcomeCode);
    const myShape = determineRequiredShape(opponentShape, requiredOutcome);

    points += getPoints(myShape, requiredOutcome);
  });

  console.log(`total points (part 2): ${points}`);
})();
