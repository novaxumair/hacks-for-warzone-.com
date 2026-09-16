/**
 * Default Trusted Types policy so CSP `require-trusted-types-for 'script'`
 * does not break same-origin module scripts (Astro client bundles).
 */
(() => {
	if (!window.trustedTypes || !window.trustedTypes.createPolicy) return;
	try {
		window.trustedTypes.createPolicy('default', {
			createHTML: (input) => input,
			createScript: (input) => input,
			createScriptURL: (input) => input,
		});
	} catch {
		// Policy may already exist from a previous navigation.
	}
})();
