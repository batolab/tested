// Lab API test: apply ice/frost-nova onto a sample scene via the documented core API.
import { writeFileSync } from "node:fs";
import { createFrame, clearFrame, createFx, composite } from "./src/core/index.js";
import * as frostNova from "./src/fx/ice/frost-nova.js";
import { encodePNG } from "./tools/lib/png.mjs";

const W = 320, H = 180;
const frame = createFrame(W, H);
const fx = createFx(frostNova, { x: 160, y: 140 });
const dt = 1 / 30;
// sample scene: night-sky gradient + ground band, drawn as a plain color array
const bg = new Uint8ClampedArray(W * H * 4);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = (y * W + x) * 4, g = y > 140 ? [26, 34, 30] : [10 + y / 8, 14 + y / 8, 30 + y / 6];
  bg[i] = g[0]; bg[i + 1] = g[1]; bg[i + 2] = g[2]; bg[i + 3] = 255;
}
let saved = 0;
for (let f = 0; f < 103; f++) {
  fx.update(dt);
  clearFrame(frame);
  fx.draw(frame, "back"); fx.draw(frame, "front");
  if (f % 17 === 0) {
    const img = new Uint8ClampedArray(bg);
    composite(frame, img, null);
    writeFileSync(`./api-scene/frame-${String(f).padStart(3, "0")}.png`, encodePNG(W, H, img));
    saved++;
  }
}
console.log(`API test done: saved ${saved} composited frames of frost-nova over the sample scene`);
