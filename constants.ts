export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 800;

export const CELL_TYPES = ["@", ".", "x"] as const;
export const CELL_OFFSET = 1;

export type CellType = (typeof CELL_TYPES)[number];

export const theme = {
  background: "#666",
  cells: {
    "@": "#003ef3",
    ".": "#4477aa",
    x: "#F7AF00",
  } satisfies Record<CellType, string>,
} as const;
