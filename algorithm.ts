import { CellType } from "./constants.ts";
import {
  getNeighbors,
  GetNeighborsData,
  GetNeighborsOpts,
} from "./neighbors.ts";

const MAX_ITERATIONS = 10_000;

export type SolveOpts = {
  input: CellType[];
  fn: (input: CellType[], next: Coords) => Promise<void>;
};

export type Coords = GetNeighborsData;

export async function solve(opts: SolveOpts) {
  const len = opts.input.length;

  let sum = 0;
  let safeIterator = 0;

  while (safeIterator < MAX_ITERATIONS) {
    const next: Coords = [];

    for (let row = 0; row < len; row += 1) {
      for (let column = 0; column < len; column += 1) {
        if (opts.input[row][column] === ".") {
          continue;
        }

        if (isValid({ row, column, length: len, input: opts.input })) {
          next.push({ row, column });
        }
      }
    }

    if (next.length === 0) {
      break;
    }

    await opts.fn(opts.input, next);

    sum += next.length;
    safeIterator += 1;
  }

  return sum;
}

const MAX_AT_NEIGHBORS = 4;

type IsValidOpts = GetNeighborsOpts & Pick<SolveOpts, "input">;

function isValid(opts: IsValidOpts): boolean {
  let count = 0;

  const neighbors = getNeighbors({
    row: opts.row,
    column: opts.column,
    length: opts.length,
  });

  for (
    let iterator = 0, len = neighbors.length;
    iterator < len;
    iterator += 1
  ) {
    const { row: neighborRow, column: neighborColumn } = neighbors[iterator];

    if (opts.input[neighborRow][neighborColumn] === "@") {
      count += 1;
    }
  }

  return count < MAX_AT_NEIGHBORS;
}
