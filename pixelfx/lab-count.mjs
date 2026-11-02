// Lab count check: how many effects are really in here?
import { allIds } from "./tools/lib/fxlib.mjs";
import { readdirSync } from "node:fs";

const ids = allIds();
const cats = new Set(ids.map((i) => i.split("/")[0]));
let files = 0;
for (const c of readdirSync("src/fx", { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name))
  files += readdirSync(`src/fx/${c}`).filter((f) => f.endsWith(".js") && f !== "_lib.js").length;

console.log("registry allIds() :", ids.length, "effects in", cats.size, "categories");
console.log("files in src/fx   :", files, "(excluding _lib.js helpers)");
