#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const files = ['scripts/i18n-data/pages-en.mjs', 'scripts/generate-blog-posts.mjs'];
const pairs = [
	["Activision's", "Activision'"],
	['Activision\u2019', "Activision'"],
	['Activision services', 'Activision services'],
	['Activision service', 'Activision service'],
	['Activision platform', 'Activision platform'],
	['Activision outages', 'launcher outages'],
	['Activision bans', 'Activision bans'],
	['Activision security', 'Ricochet security'],
	['Activision Status', 'Call of Duty: Warzone on PC'],
	['Activision Call of Duty: Warzone's, 'Call of Duty: Warzone's],
	['Activision Support', 'Call of Duty: Warzone on PC'],
	['Activision', 'Activision'],
	['EAC guide', 'Ricochet guide'],
	['undetected EAC notes', 'undetected Ricochet notes'],
	['status.epicgames.com', 'store.steampowered.com/app/376210/The_Isle'],
	['www.epicgames.com/rust', 'store.steampowered.com/app/376210/The_Isle'],
	['www.rust.com/official server', 'store.steampowered.com/app/376210/The_Isle'],
	['https://www.rust.com/', 'https://www.callofduty.com/warzone'],
	['Call of Duty: Warzone.com', 'Call of Duty: Warzone's],
	['Call of Duty: Warzone Competitive', 'Call of Duty: Warzone's],
];

for (const f of files) {
	let c = readFileSync(f, 'utf8');
	const orig = c;
	for (const [a, b] of pairs) c = c.split(a).join(b);
	if (c !== orig) {
		writeFileSync(f, c);
		console.log('updated', f);
	} else {
		console.log('no change', f);
	}
}
