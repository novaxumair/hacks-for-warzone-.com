/** True on Cloudflare Workers Builds (/opt/buildhome/repo). */
export function isWorkersBuilds() {
	if (process.env.WORKERS_CI === "1") return true;
	return (
		process.env.CI === "true" &&
		process.cwd().includes("/opt/buildhome")
	);
}
