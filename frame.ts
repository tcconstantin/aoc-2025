import { Frame, GIF, Image } from "@matmen/imagescript";
import { createCanvas as createCanvasLib } from "canvas";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CELL_OFFSET,
  CellType,
  theme,
} from "./constants.ts";

function createCanvas(input: string[]) {
  const canvas = createCanvasLib(CANVAS_WIDTH, CANVAS_HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = theme.background;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const len = input.length;
  const cellSize = CANVAS_WIDTH / input.length;

  for (let row = 0; row < len; row += 1) {
    for (let column = 0; column < len; column += 1) {
      const type = input[row][column] as CellType;

      ctx.fillStyle = theme.cells[type];
      ctx.fillRect(
        row * cellSize,
        column * cellSize,
        cellSize - CELL_OFFSET,
        cellSize - CELL_OFFSET
      );
    }
  }

  return canvas.toBuffer();
}

export async function getFrame(input: string[]) {
  const buffer = createCanvas(input);
  const image = await Image.decode(buffer);

  return Frame.from(image);
}

export async function createGif(frames: Frame[]) {
  const gif = new GIF(frames);

  await Deno.writeFile("animation.gif", await gif.encode(1));
}
