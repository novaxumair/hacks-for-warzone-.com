#!/usr/bin/env node
/**
 * Cloudflare Workers Builds: npm clean-install, then `npx wrangler deploy`.
 * Ensure dist/ exists after install and replace the wrangler CLI shim so deploy
 * builds dist/ when the dashboard build command is empty.
 */
import { chmodSync, existsSync, lstatSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { isWorkersBuilds } from "./is-workers-builds.mjs";

if (!isWorkersBuilds()) {
	process.exit(0);
}

const root = process.cwd();
const wrapper = join(root, "scripts/wrangler-with-build.mjs");

if (!existsSync(join(root, "dist/index.html"))) {
	console.log("[workers-ci] dist/ missing after install — running npm run build");
	const build = spawnSync("npm", ["run", "build"], {
		cwd: root,
		stdio: "inherit",
	});
	if (build.status !== 0) {
		process.exit(build.status ?? 1);
	}
}

const wranglerBin = join(root, "node_modules/.bin/wrangler");
if (!existsSync(wranglerBin)) {
	process.exit(0);
}

try {
	if (lstatSync(wranglerBin).isSymbolicLink()) {
		unlinkSync(wranglerBin);
	}
} catch {
	// ignore
}

const launcher = `#!/usr/bin/env node
import { spawnSync } from "node:child_process";
const wrapper = ${JSON.stringify(wrapper)};
const result = spawnSync(process.execPath, [wrapper, ...process.argv.slice(2)], {
	stdio: "inherit",
});
process.exit(result.status ?? 1);
`;

writeFileSync(wranglerBin, launcher, "utf8");
chmodSync(wranglerBin, 0o755);
