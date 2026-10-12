import { spawn } from "node:child_process";

// Dev uses its own build directory so `next build` (production) and `next dev`
// can never corrupt each other's artifacts. See next.config.mjs (distDir).
process.env.NEXT_DIST_DIR = process.env.NEXT_DIST_DIR || ".next-dev";

const args = ["dev", ...process.argv.slice(2)];
const child = spawn("next", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));
child.on("error", (err) => {
  console.error("Failed to start next dev:", err);
  process.exit(1);
});
