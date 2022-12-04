#! /usr/local/bin/ts-node
import { readFileSync } from "fs";

function getPriority(itemCode: string) {
  if (itemCode.match(/[a-z]/)) return itemCode.charCodeAt(0) - 96;
  if (itemCode.match(/[A-Z]/)) return itemCode.charCodeAt(0) - 38;
  throw new Error("unexpected item code");
}

(async () => {
  const input = readFileSync("./3/INPUT.txt", "utf8");
  const lines = input.split("\n");

  const packContents = lines.map((l) => l.split(""));

  // part 1
  let priority = 0;

  packContents.forEach((l) => {
    let commomItemCode: string | undefined;

    const compartments = [
      l.slice(0, l.length / 2),
      l.slice(l.length / 2, l.length),
    ];

    if (compartments[0].length !== compartments[1].length)
      throw new Error("compartments must have equal contents length");

    compartments[0].forEach((itemCode) => {
      if (compartments[1].includes(itemCode)) {
        if (commomItemCode && commomItemCode !== itemCode)
          throw new Error("should have only one item in common");
        commomItemCode = itemCode;
      }
    });
    if (!commomItemCode) throw new Error("no common item");

    priority += getPriority(commomItemCode);
  });

  console.log(`total priority (part 1): ${priority}`);

  // part 2
  priority = 0;

  for (let packIndex = 0; packIndex < lines.length; packIndex += 3) {
    let commomItemCode: string | undefined;

    packContents[packIndex].forEach((itemCode) => {
      if (
        packContents[packIndex + 1].includes(itemCode) &&
        packContents[packIndex + 2].includes(itemCode)
      ) {
        if (commomItemCode && commomItemCode !== itemCode)
          throw new Error("should have only one item in common");
        commomItemCode = itemCode;
      }
    });

    if (!commomItemCode) throw new Error("no common item");

    priority += getPriority(commomItemCode);
  }

  console.log(`total priority (part 2): ${priority}`);
})();
