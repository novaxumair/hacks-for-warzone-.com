/**
 * Mobile nav toggle — works before Astro/React islands hydrate.
 * Toggles `.is-open` on `[data-nav]` (not data-nav-open).
 */
(() => {
	function header() {
		return document.querySelector('[data-nav]');
	}

	function menuBtn() {
		const h = header();
		return h ? h.querySelector('.site-menu') : null;
	}

	function isOpen() {
		const h = header();
		return Boolean(h && h.classList.contains('is-open'));
	}

	function setOpen(open) {
		const h = header();
		const btn = menuBtn();
		if (!h || !btn) return;

		h.classList.toggle('is-open', open);
		btn.setAttribute('aria-expanded', open ? 'true' : 'false');

		const openLabel = btn.getAttribute('data-label-open') || 'Open menu';
		const closeLabel = btn.getAttribute('data-label-close') || 'Close menu';
		btn.setAttribute('aria-label', open ? closeLabel : openLabel);

		document.body.classList.toggle('nav-lock', open);
	}

	function close() {
		if (isOpen()) setOpen(false);
	}

	function toggle() {
		setOpen(!isOpen());
	}

	document.addEventListener(
		'click',
		(event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;

			if (target.closest('.site-menu') && header()?.contains(target.closest('.site-menu'))) {
				event.preventDefault();
				toggle();
				return;
			}

			if (target.closest('[data-nav-close]')) {
				close();
			}
		},
		true,
	);

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') close();
	});

	window.addEventListener('resize', () => {
		if (window.matchMedia('(min-width: 1025px)').matches) close();
	});

	document.addEventListener('astro:page-load', close);
})();
