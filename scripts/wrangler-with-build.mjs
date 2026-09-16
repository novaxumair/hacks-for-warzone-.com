#!/usr/bin/env node
/**
 * Wrangler entry used on Cloudflare Workers Builds when the dashboard deploy
 * command is `npx wrangler deploy` with no separate build step.
 */
import { execSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const realWrangler = join(root, "node_modules/wrangler/bin/wrangler.js");

function ensureDist() {
	if (existsSync(join(root, "dist/index.html"))) return;
	console.log("[workers-ci] dist/ missing — running npm run build");
	execSync("npm run build", { cwd: root, stdio: "inherit" });
}

ensureDist();

const result = spawnSync(
	process.execPath,
	[realWrangler, ...process.argv.slice(2)],
	{ cwd: root, stdio: "inherit" },
);

process.exit(result.status ?? 1);
