import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

// No dependencies: this must be able to explain a broken lock BEFORE npm installs.
export function validateLockfile(manifest, lock) {
  const errors = [];
  const root = lock.packages?.[""];
  if (lock.lockfileVersion !== 3 || !root) return ["Expected a complete npm v3 lockfile."];
  for (const field of ["name", "version", "dependencies", "devDependencies", "engines"]) {
    if (!isDeepStrictEqual(manifest[field], root[field])) errors.push(`package.json and lockfile disagree on ${field}.`);
  }

  const version = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[\da-zA-Z-]+(?:\.[\da-zA-Z-]+)*)?(?:\+[\da-zA-Z-]+(?:\.[\da-zA-Z-]+)*)?$/;
  for (const [name, entry] of Object.entries(lock.packages)) {
    if (!name) continue;
    if (entry.link) {
      errors.push(`${name}: local links are not supported in this standalone deployment.`);
      continue;
    }
    if (typeof entry.version !== "string" || !version.test(entry.version)) {
      errors.push(`${name}: missing or invalid version (npm can fail with "Invalid Version").`);
    }
    // Bundled packages are verified by the parent tarball's integrity hash.
    if (!entry.inBundle) {
      if (!entry.resolved?.startsWith("https://registry.npmjs.org/")) errors.push(`${name}: missing public-registry tarball URL.`);
      if (!/^sha(512|384|256|1)-[\w+/=]+$/.test(entry.integrity ?? "")) errors.push(`${name}: missing tarball integrity hash.`);
    }
  }

  // Validate dependencies of every platform variant, including bundled WASM
  // packages. Windows can otherwise pass while Linux npm rejects a missing node.
  for (const [name, entry] of Object.entries(lock.packages)) {
    const dependencies = { ...entry.dependencies, ...(!name ? entry.devDependencies : {}) };
    for (const dependency of Object.keys(dependencies)) {
      let parent = name;
      let found = false;
      while (parent) {
        if (lock.packages[`${parent}/node_modules/${dependency}`]) {
          found = true;
          break;
        }
        const index = parent.lastIndexOf("/node_modules/");
        parent = index < 0 ? "" : parent.slice(0, index);
      }
      if (!found && !lock.packages[`node_modules/${dependency}`]) {
        errors.push(`${name || "root"}: dependency ${dependency} is missing from the lockfile.`);
      }
    }
  }
  return errors;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));
  const errors = validateLockfile(manifest, lock);
  if (errors.length) {
    console.error(`Lockfile validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
    process.exitCode = 1;
  } else {
    console.log(`Lockfile valid: ${Object.keys(lock.packages).length - 1} packages with complete versions and integrity metadata.`);
  }
}
