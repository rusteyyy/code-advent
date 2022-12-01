#! /usr/local/bin/ts-node
import { readFileSync } from "fs";

(async () => {
  const input = readFileSync("./1/INPUT.txt", "utf8");
  const lines = input.split("\n");

  let calorieSum = 0;
  const caloriesCarried: number[] = [];

  lines.forEach((l) => {
    if (l === "") {
      caloriesCarried.push(calorieSum);

      calorieSum = 0;

      return;
    }

    calorieSum += parseInt(l, 10);
  });

  const sortedDecreasing = caloriesCarried.sort((a, b) => b - a);

  console.log(
    `Max calories amongst ${caloriesCarried.length} reindeer: ${sortedDecreasing[0]}`
  );

  console.log(
    `Calories carried by top 3: ${sortedDecreasing
      .slice(0, 3)
      .reduce((acc, n) => acc + n, 0)}`
  );
})();
