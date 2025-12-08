import { getNeighbors } from "./neighbors.ts";

const MAX_ITERATIONS = 10_000;

type SolveOpts = {
  input: string[];
  fn: (input: string[]) => Promise<void>;
};

export async function solve(opts: SolveOpts) {
  const len = opts.input.length;

  let sum = 0;
  let safeIterator = 0;

  while (safeIterator < MAX_ITERATIONS) {
    const next = [];

    for (let row = 0; row < len; row += 1) {
      for (let column = 0; column < len; column += 1) {
        if (opts.input[row][column] === ".") {
          continue;
        }

        const neighbors = getNeighbors({
          row,
          column,
          length: len,
        });

        let count = 0;

        for (
          let iterator = 0, len = neighbors.length;
          iterator < len;
          iterator += 1
        ) {
          const { row: neighborRow, column: neighborColumn } =
            neighbors[iterator];

          if (opts.input[neighborRow][neighborColumn] === "@") {
            count += 1;
          }
        }

        if (count < 4) {
          next.push({ row, column });
        }
      }
    }

    if (next.length === 0) {
      break;
    }

    for (let iterator = 0, len = next.length; iterator < len; iterator += 1) {
      const { row, column } = next[iterator];

      opts.input[row] = `${opts.input[row].slice(0, column)}x${opts.input[
        row
      ].slice(column + 1)}`;
    }

    await opts.fn(opts.input);

    for (let iterator = 0, len = next.length; iterator < len; iterator += 1) {
      const { row, column } = next[iterator];

      opts.input[row] = `${opts.input[row].slice(0, column)}.${opts.input[
        row
      ].slice(column + 1)}`;
    }

    await opts.fn(opts.input);

    sum += next.length;
    safeIterator += 1;
  }

  return sum;
}
