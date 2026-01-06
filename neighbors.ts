const EIGHT_NEIGHBOR_OFFSETS = [
  [-1, -1], // top-left
  [0, -1], // top
  [1, -1], // top-right
  [-1, 0], // left
  [1, 0], // right
  [-1, 1], // bottom-left
  [0, 1], // bottom
  [1, 1], // bottom-right
] as const;

type IsInRangeOpts = {
  row: number;
  column: number;
  length: number;
};

function isInRange(opts: IsInRangeOpts): boolean {
  return (
    opts.row >= 0 &&
    opts.row < opts.length &&
    opts.column >= 0 &&
    opts.column < opts.length
  );
}

export type GetNeighborsOpts = IsInRangeOpts;

export type GetNeighborsData = Pick<GetNeighborsOpts, "row" | "column">[];

export function getNeighbors(opts: GetNeighborsOpts): GetNeighborsData {
  const neighbors: GetNeighborsData = [];

  for (
    let iterator = 0, len = EIGHT_NEIGHBOR_OFFSETS.length;
    iterator < len;
    iterator += 1
  ) {
    const nextRow = opts.row + EIGHT_NEIGHBOR_OFFSETS[iterator][0];
    const nextColumn = opts.column + EIGHT_NEIGHBOR_OFFSETS[iterator][1];

    if (
      isInRange({
        row: nextRow,
        column: nextColumn,
        length: opts.length,
      })
    ) {
      neighbors.push({ row: nextRow, column: nextColumn });
    }
  }

  return neighbors;
}
