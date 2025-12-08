import { Frame } from "@matmen/imagescript";
import { solve } from "./algorithm.ts";
import { createGif, getFrame } from "./frame.ts";

const INPUT_PATH = "input.txt";

async function main() {
  const input = (await Deno.readTextFile(INPUT_PATH)).split("\r\n");

  const frames: Frame[] = [];

  const fn = async (input: string[]) => {
    const frame = await getFrame(input);
    frames.push(frame);
  };

  const result = await solve({ input, fn });

  await createGif(frames);

  return result;
}

if (import.meta.main) {
  console.log(await main());
}
