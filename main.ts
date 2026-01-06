import { Frame } from "@matmen/imagescript";
import { Coords, solve, SolveOpts } from "./algorithm.ts";
import { createGif, getFrame } from "./frame.ts";
import { CellType } from "./constants.ts";

const INPUT_PATH = "input.txt";

async function main() {
  const input = (await Deno.readTextFile(INPUT_PATH)).split(
    "\r\n"
  ) as CellType[];

  const frames: Frame[] = [];

  const fn = async (input: CellType[], next: Coords) => {
    replace({
      char: "x",
      input,
      next,
    });

    const xFrame = await getFrame(input);
    frames.push(xFrame);

    replace({
      char: ".",
      input,
      next,
    });

    const dotFrame = await getFrame(input);
    frames.push(dotFrame);
  };

  const result = await solve({ input, fn });

  await createGif(frames);

  return result;
}

type ReplaceOpts = Pick<SolveOpts, "input"> & {
  char: string;
  next: Coords;
};

function replace(opts: ReplaceOpts) {
  for (
    let iterator = 0, len = opts.next.length;
    iterator < len;
    iterator += 1
  ) {
    const { row, column } = opts.next[iterator];

    opts.input[row] = `${opts.input[row].slice(0, column)}${
      opts.char
    }${opts.input[row].slice(column + 1)}` as CellType;
  }
}

if (import.meta.main) {
  console.log(await main());
}
