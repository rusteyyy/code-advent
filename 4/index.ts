#! /usr/local/bin/ts-node
import { readFileSync } from "fs";

const REGEX = /([\d]*)-([\d]*),([\d]*)-([\d]*)/;

(async () => {
  const input = readFileSync("./4/INPUT.txt", "utf8");
  const lines = input.split("\n");

  const parsedAssignments = lines.map(
    (l) => l.match(REGEX)?.slice(1).map(parseFloat) as number[]
  );

  const withFullOverlap = parsedAssignments.filter(
    ([aStart, aEnd, bStart, bEnd]) => {
      if (aStart <= bStart && aEnd >= bEnd) return true;
      if (aStart >= bStart && aEnd <= bEnd) return true;
      return false;
    }
  );

  console.log(`fully overlapping assignments: ${withFullOverlap.length}`);

  const withNoOverlap = parsedAssignments.filter(
    ([aStart, aEnd, bStart, bEnd]) => {
      if (aEnd < bStart) return true;
      if (aStart > bEnd) return true;
      return false;
    }
  );

  console.log(
    `partially overlapping assignments: ${
      parsedAssignments.length - withNoOverlap.length
    }`
  );
})();
