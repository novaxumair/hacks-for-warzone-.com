#!/usr/bin/env node
/** Print git commit in CI logs so stale-build issues are easy to spot. */
import { execSync } from 'node:child_process';

try {
	const sha = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
	const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
	console.log(`build-info: branch=${branch} commit=${sha} redirects=worker`);
} catch {
	console.log('build-info: redirects=worker (git unavailable)');
}
