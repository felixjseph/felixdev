import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const nextRoot = path.resolve(".next");
const chunksRoot = path.join(nextRoot, "static", "chunks");
const routeRoot = path.join(nextRoot, "server", "app", "work");
const builderSignatures = [
  "Build a Sayu drink",
  "Menu rules awaiting approval",
];

const chunkFiles = (await readdir(chunksRoot)).filter((file) => file.endsWith(".js"));
const builderChunks = [];

for (const file of chunkFiles) {
  const contents = await readFile(path.join(chunksRoot, file), "utf8");
  if (builderSignatures.every((signature) => contents.includes(signature))) {
    builderChunks.push(file);
  }
}

if (builderChunks.length === 0) {
  throw new Error("No production client chunk contains the Sayu builder UI signatures.");
}

function referencedScripts(html) {
  return new Set(
    [...html.matchAll(/src="[^"]*\/([^/"?]+\.js)(?:\?[^"]*)?"/g)].map(
      (match) => match[1],
    ),
  );
}

for (const route of ["sayu-cafe", "solara", "pach-drugmart"]) {
  const html = await readFile(path.join(routeRoot, `${route}.html`), "utf8");
  const scripts = referencedScripts(html);
  const referencesBuilder = builderChunks.some((chunk) => scripts.has(chunk));

  if (route === "sayu-cafe" && !referencesBuilder) {
    throw new Error("The Sayu production HTML does not reference its builder client chunk.");
  }

  if (route !== "sayu-cafe" && referencesBuilder) {
    throw new Error(`The ${route} production HTML references the Sayu builder client chunk.`);
  }
}

console.log(
  `Verified Sayu-only client bundle isolation via production HTML (${builderChunks.join(", ")}).`,
);
