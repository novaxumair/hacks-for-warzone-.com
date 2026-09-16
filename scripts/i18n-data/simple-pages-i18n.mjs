/**
 * Native translations for the 10 simple-page overrides.
 * Structure matches simple-pages-en.mjs exactly for every locale.
 */
import { localizeHtmlLinks, localizeLinkListItem } from './link-labels.mjs';
import { phrases } from './phrases.mjs';
import { FOCUS_I18N } from './focus-i18n.mjs';
import { simplePagesEn } from './simple-pages-en.mjs';
import { PAGE_CONTENT } from './simple-page-content.mjs';
import { clampTitle, clampDesc, stripcheckoutFromMeta } from './constants.mjs';
import { PAGE_META_TAILS, SUFFIX_I18N, TOPIC_NAMES } from './pages-i18n.mjs';

/** Align visible H1 with title intent: topic + localized suffix. */
function modulePageH1(pageId, locale) {
	const topic = TOPIC_NAMES[pageId]?.[locale] ?? TOPIC_NAMES[pageId]?.en;
	const suffix = SUFFIX_I18N[locale]?.[pageId] ?? PAGE_META_TAILS[pageId]?.suffix;
	if (!topic || !suffix) return null;
	return `${topic} — ${suffix}`;
}

/** Per-locale UI labels used across simple pages. */
const UI = {
	es: {
		features: 'Funciones', store: 'Tienda', status: 'Estado', setup: 'Instalación', support: 'Soporte', faq: 'FAQ',
		gallery: 'Aspecto en juego', buy: 'Comprar Warzone Cheats', viewStore: 'Ver tienda', setupGuide: 'Guía de instalación',
		checkStatus: 'Ver estado', overview: 'Resumen Warzone Cheats', viewFeatures: 'Ver funciones', contactSupport: 'Contactar soporte',
		inGame: 'Aspecto en juego', fullGuide: 'Warzone Cheats — Guía completa',
	},
	fr: {
		features: 'Fonctions', store: 'Boutique', status: 'Statut', setup: 'Installation', support: 'Support', faq: 'FAQ',
		gallery: 'Rendu en jeu', buy: 'Acheter Warzone Cheats', viewStore: 'Voir la boutique', setupGuide: "Guide d'installation",
		checkStatus: 'Voir le statut', overview: 'Aperçu Warzone Cheats', viewFeatures: 'Voir les fonctions', contactSupport: 'Contacter le support',
		inGame: 'Rendu en jeu', fullGuide: 'Warzone Cheats — Guide complet',
	},
	de: {
		features: 'Features', store: 'Shop', status: 'Status', setup: 'Setup', support: 'Support', faq: 'FAQ',
		gallery: 'Ingame-Ansicht', buy: 'Warzone Cheats kaufen', viewStore: 'Shop ansehen', setupGuide: 'Setup-Anleitung',
		checkStatus: 'Status prüfen', overview: 'Warzone Cheats Übersicht', viewFeatures: 'Features ansehen', contactSupport: 'Support kontaktieren',
		inGame: 'Ingame-Ansicht', fullGuide: 'Warzone Cheats — Vollständiger Guide',
	},
	pt: {
		features: 'Recursos', store: 'Loja', status: 'Status', setup: 'Instalação', support: 'Suporte', faq: 'FAQ',
		gallery: 'Visual in-game', buy: 'Comprar Warzone Cheats', viewStore: 'Ver loja', setupGuide: 'Guia de instalação',
		checkStatus: 'Ver status', overview: 'Visão geral Warzone Cheats', viewFeatures: 'Ver recursos', contactSupport: 'Contactar suporte',
		inGame: 'Visual in-game', fullGuide: 'Warzone Cheats — Guia completo',
	},
	it: {
		features: 'Funzioni', store: 'Negozio', status: 'Stato', setup: 'Setup', support: 'Supporto', faq: 'FAQ',
		gallery: 'Aspetto in-game', buy: 'Acquista Warzone Cheats', viewStore: 'Vedi negozio', setupGuide: 'Guida installazione',
		checkStatus: 'Controlla stato', overview: 'Panoramica Warzone Cheats', viewFeatures: 'Vedi funzioni', contactSupport: 'Contatta supporto',
		inGame: 'Aspetto in-game', fullGuide: 'Warzone Cheats — Guida completa',
	},
	nl: {
		features: 'Functies', store: 'Winkel', status: 'Status', setup: 'Setup', support: 'Support', faq: 'FAQ',
		gallery: 'In-game weergave', buy: 'Warzone Cheats kopen', viewStore: 'Winkel bekijken', setupGuide: 'Installatiegids',
		checkStatus: 'Status controleren', overview: 'Warzone Cheats overzicht', viewFeatures: 'Functies bekijken', contactSupport: 'Contact support',
		inGame: 'In-game weergave', fullGuide: 'Warzone Cheats — Volledige gids',
	},
	pl: {
		features: 'Funkcje', store: 'Sklep', status: 'Status', setup: 'Instalacja', support: 'Wsparcie', faq: 'FAQ',
		gallery: 'Wygląd w grze', buy: 'Kup Warzone Cheats', viewStore: 'Zobacz sklep', setupGuide: 'Przewodnik instalacji',
		checkStatus: 'Sprawdź status', overview: 'Przegląd Warzone Cheats', viewFeatures: 'Zobacz funkcje', contactSupport: 'Kontakt z supportem',
		inGame: 'Wygląd w grze', fullGuide: 'Warzone Cheats — Pełny przewodnik',
	},
	ru: {
		features: 'Функции', store: 'Магазин', status: 'Статус', setup: 'Установка', support: 'Поддержка', faq: 'FAQ',
		gallery: 'Вид в игре', buy: 'Купить Warzone Cheats', viewStore: 'Открыть магазин', setupGuide: 'Гайд по установке',
		checkStatus: 'Проверить статус', overview: 'Обзор Warzone Cheats', viewFeatures: 'Смотреть функции', contactSupport: 'Связаться с поддержкой',
		inGame: 'Вид в игре', fullGuide: 'Warzone Cheats — Полный гайд',
	},
	tr: {
		features: 'Özellikler', store: 'Mağaza', status: 'Durum', setup: 'Kurulum', support: 'Destek', faq: 'SSS',
		gallery: 'Oyun içi görünüm', buy: 'Warzone Cheats satın al', viewStore: 'Mağazayı gör', setupGuide: 'Kurulum rehberi',
		checkStatus: 'Durumu kontrol et', overview: 'Warzone Cheats genel bakış', viewFeatures: 'Özellikleri gör', contactSupport: 'Destekle iletişim',
		inGame: 'Oyun içi görünüm', fullGuide: 'Warzone Cheats — Tam rehber',
	},
	ar: {
		features: 'الميزات', store: 'المتجر', status: 'الحالة', setup: 'التثبيت', support: 'الدعم', faq: 'الأسئلة الشائعة',
		gallery: 'المظهر داخل اللعبة', buy: 'اشترِ Warzone Cheats', viewStore: 'عرض المتجر', setupGuide: 'دليل التثبيت',
		checkStatus: 'تحقق من الحالة', overview: 'نظرة عامة على Warzone Cheats', viewFeatures: 'عرض الميزات', contactSupport: 'اتصل بالدعم',
		inGame: 'المظهر داخل اللعبة', fullGuide: 'Warzone Cheats — دليل كامل',
	},
	ja: {
		features: '機能', store: 'ストア', status: 'ステータス', setup: 'セットアップ', support: 'サポート', faq: 'FAQ',
		gallery: 'ゲーム内の見た目', buy: 'Warzone Cheatsを購入', viewStore: 'ストアを見る', setupGuide: 'セットアップガイド',
		checkStatus: 'ステータスを確認', overview: 'Warzone Cheats概要', viewFeatures: '機能を見る', contactSupport: 'サポートに連絡',
		inGame: 'ゲーム内の見た目', fullGuide: 'Warzone Cheats — 完全ガイド',
	},
	ko: {
		features: '기능', store: '스토어', status: '상태', setup: '설치', support: '지원', faq: 'FAQ',
		gallery: '인게임 화면', buy: 'Warzone Cheats 구매', viewStore: '스토어 보기', setupGuide: '설치 가이드',
		checkStatus: '상태 확인', overview: 'Warzone Cheats 개요', viewFeatures: '기능 보기', contactSupport: '지원 문의',
		inGame: '인게임 화면', fullGuide: 'Warzone Cheats — 전체 가이드',
	},
	zh: {
		features: '功能', store: '商店', status: '状态', setup: '安装', support: '支持', faq: '常见问题',
		gallery: '游戏内效果', buy: '购买 Warzone Cheats', viewStore: '查看商店', setupGuide: '安装指南',
		checkStatus: '查看状态', overview: 'Warzone Cheats概览', viewFeatures: '查看功能', contactSupport: '联系支持',
		inGame: '游戏内效果', fullGuide: 'Warzone Cheats — 完整指南',
	},
	hi: {
		features: 'फ़ीचर्स', store: 'स्टोर', status: 'स्टेटस', setup: 'सेटअप', support: 'सहायता', faq: 'FAQ',
		gallery: 'इन-गेम लुक', buy: 'Warzone Cheats खरीदें', viewStore: 'स्टोर देखें', setupGuide: 'सेटअप गाइड',
		checkStatus: 'स्टेटस जांचें', overview: 'Warzone Cheats अवलोकन', viewFeatures: 'फ़ीचर्स देखें', contactSupport: 'सहायता से संपर्क',
		inGame: 'इन-गेम लुक', fullGuide: 'Warzone Cheats — पूर्ण गाइड',
	},
	id: {
		features: 'Fitur', store: 'Toko', status: 'Status', setup: 'Setup', support: 'Dukungan', faq: 'FAQ',
		gallery: 'Tampilan in-game', buy: 'Beli Warzone Cheats', viewStore: 'Lihat toko', setupGuide: 'Panduan setup',
		checkStatus: 'Cek status', overview: 'Ringkasan Warzone Cheats', viewFeatures: 'Lihat fitur', contactSupport: 'Hubungi dukungan',
		inGame: 'Tampilan in-game', fullGuide: 'Warzone Cheats — Panduan lengkap',
	},
	th: {
		features: 'ฟีเจอร์', store: 'ร้านค้า', status: 'สถานะ', setup: 'ติดตั้ง', support: 'สนับสนุน', faq: 'FAQ',
		gallery: 'ลุคในเกม', buy: 'ซื้อ Warzone Cheats', viewStore: 'ดูร้านค้า', setupGuide: 'คู่มือติดตั้ง',
		checkStatus: 'ตรวจสอบสถานะ', overview: 'ภาพรวม Warzone Cheats', viewFeatures: 'ดูฟีเจอร์', contactSupport: 'ติดต่อฝ่ายสนับสนุน',
		inGame: 'ลุคในเกม', fullGuide: 'Warzone Cheats — คู่มือฉบับสมบูรณ์',
	},
	vi: {
		features: 'Tính năng', store: 'Cửa hàng', status: 'Trạng thái', setup: 'Cài đặt', support: 'Hỗ trợ', faq: 'FAQ',
		gallery: 'Giao diện trong game', buy: 'Mua Warzone Cheats', viewStore: 'Xem cửa hàng', setupGuide: 'Hướng dẫn cài đặt',
		checkStatus: 'Kiểm tra trạng thái', overview: 'Tổng quan Warzone Cheats', viewFeatures: 'Xem tính năng', contactSupport: 'Liên hệ hỗ trợ',
		inGame: 'Giao diện trong game', fullGuide: 'Warzone Cheats — Hướng dẫn đầy đủ',
	},
	uk: {
		features: 'Функції', store: 'Магазин', status: 'Статус', setup: 'Встановлення', support: 'Підтримка', faq: 'FAQ',
		gallery: 'Вигляд у грі', buy: 'Купити Warzone Cheats', viewStore: 'Переглянути магазин', setupGuide: 'Гайд з встановлення',
		checkStatus: 'Перевірити статус', overview: 'Огляд Warzone Cheats', viewFeatures: 'Дивитися функції', contactSupport: "Зв'язатися з підтримкою",
		inGame: 'Вигляд у грі', fullGuide: 'Warzone Cheats — Повний гайд',
	},
	cs: {
		features: 'Funkce', store: 'Obchod', status: 'Stav', setup: 'Instalace', support: 'Podpora', faq: 'FAQ',
		gallery: 'Vzhled ve hře', buy: 'Koupit Warzone Cheats', viewStore: 'Zobrazit obchod', setupGuide: 'Průvodce instalací',
		checkStatus: 'Zkontrolovat stav', overview: 'Přehled Warzone Cheats', viewFeatures: 'Zobrazit funkce', contactSupport: 'Kontaktovat podporu',
		inGame: 'Vzhled ve hře', fullGuide: 'Warzone Cheats — Kompletní průvodce',
	},
	ro: {
		features: 'Funcții', store: 'Magazin', status: 'Status', setup: 'Instalare', support: 'Suport', faq: 'FAQ',
		gallery: 'Aspect în joc', buy: 'Cumpără Warzone Cheats', viewStore: 'Vezi magazinul', setupGuide: 'Ghid de instalare',
		checkStatus: 'Verifică statusul', overview: 'Prezentare Warzone Cheats', viewFeatures: 'Vezi funcțiile', contactSupport: 'Contactează suportul',
		inGame: 'Aspect în joc', fullGuide: 'Warzone Cheats — Ghid complet',
	},
	sv: {
		features: 'Funktioner', store: 'Butik', status: 'Status', setup: 'Installation', support: 'Support', faq: 'FAQ',
		gallery: 'Utseende i spelet', buy: 'Köp Warzone Cheats', viewStore: 'Visa butik', setupGuide: 'Installationsguide',
		checkStatus: 'Kontrollera status', overview: 'Warzone Cheats-översikt', viewFeatures: 'Visa funktioner', contactSupport: 'Kontakta support',
		inGame: 'Utseende i spelet', fullGuide: 'Warzone Cheats — Fullständig guide',
	},
};

function locSection(sec, locale) {
	return {
		h2: sec.h2,
		paragraphs: sec.paragraphs.map((p) => localizeHtmlLinks(p, locale)),
		...(sec.list ? { list: sec.list.map((item) => localizeLinkListItem(item, locale)) } : {}),
	};
}

function buildFeatures(locale, u, p) {
	const focus = FOCUS_I18N[locale]?.features ?? 'ESP, soft aim, radar controls';
	const t = {
		es: {
			h2: ['ESP y wallhack', 'Aimbot y soft aim', 'Radar', 'Explorar temas relacionados', 'Actualizaciones y soporte'],
			p: [
				['Ve jugadores, científicos y weapon drops a través de las paredes con distancias.', 'Usa filtros para mantener el overlay claro en sitios de bomba, spike sectors y zonas PvP.'],
				['Asistencia de puntería que puedes ajustar para que se sienta natural.', 'Configura FOV, suavidad y prioridad de huesos por arma antes del match.'],
				['Un radar 2D simple para amenazas fuera de tu vista.', 'Detecta flancos cerca de sitios de bomba sin llenar toda la pantalla.'],
				['La mayoría de sitios de trucos cubren ESP, aimbot, radar, instalación y estado en páginas separadas. Usa estas guías:', 'Cada guía cubre una parte del stack de match para que compares antes del checkout.'],
				['Reconstruimos tras parches grandes de Call of Duty: Warzone o Ricochet.', 'Revisa Estado antes de jugar después de un día de parche.', 'Verifica cambios oficiales en las notas de Call of Duty: Warzone y la Wiki de Call of Duty: Warzone antes de ajustar overlays.'],
			],
			list: [
				['Cajas de jugador y distancia', 'Marcadores de weapon drops y base', 'Filtros de heli y objective'],
				['Fuerza de soft aim', 'FOV y prioridad de huesos', 'Teclas rápidas en partida'],
				['Señales de enemigos cercanos', 'Rango ajustable', 'Funciona en matches y roaming'],
				null,
				['Estado en la página de Estado', 'Guía de instalación incluida', 'Soporte por email con tu ID de pedido'],
			],
		},
		fr: {
			h2: ['ESP et wallhack', 'Aimbot et soft aim', 'Radar', 'Explorer les sujets liés', 'Mises à jour et support'],
			p: [
				['Voyez joueurs, héros et weapon drops à travers les murs avec distances.', 'Utilisez des filtres pour garder l\'overlay lisible dans les POI et zones PvP.'],
				['Aide à la visée réglable pour un rendu naturel.', 'Définissez FOV, fluidité et priorité d\'os par arme avant le match.'],
				['Un radar 2D simple pour les menaces hors champ.', 'Repérez les flancs près des POI sans remplir l\'écran.'],
				['La plupart des sites couvrent ESP, aimbot, radar, installation et statut sur des pages séparées. Utilisez ces guides :', 'Chaque guide couvre une partie du stack de match pour comparer avant le checkout.'],
				['Nous reconstruisons après les gros patchs Call of Duty: Warzone ou Ricochet.', 'Consultez Statut avant de jouer après un jour de patch.', 'Vérifiez les notes Call of Duty: Warzone et le Wiki Call of Duty: Warzone avant d\'ajuster les overlays.'],
			],
			list: [
				['Boîtes joueur et distance', 'Marqueurs de weapon drops et base', 'Filtres héli et objective'],
				['Force du soft aim', 'FOV et priorité d\'os', 'Raccourcis en match'],
				['Indices d\'ennemis proches', 'Portée réglable', 'Fonctionne en matches et roaming'],
				null,
				['Statut sur la page Statut', 'Guide d\'installation inclus', 'Support email avec votre ID commande'],
			],
		},
		de: {
			h2: ['ESP & Wallhack', 'Aimbot & Soft Aim', 'Radar', 'Verwandte Themen', 'Updates & Support'],
			p: [
				['Spieler, Wissenschaftler und Weapon drops durch Wände mit Distanzanzeige sehen.', 'Filter nutzen, damit das Overlay in Monumenten und PvP-Zonen klar bleibt.'],
				['Zielhilfe, die sich natürlich anfühlt.', 'FOV, Smoothness und Knochenpriorität pro Waffe before queueing einstellen.'],
				['Einfaches 2D-Radar für Bedrohungen außerhalb des Sichtfelds.', 'Flanken bei Monumenten erkennen, ohne den ganzen Bildschirm zu füllen.'],
				['Die meisten Cheat-Seiten behandeln ESP, Aimbot, Radar, Setup und Status auf separaten Seiten. Nutze diese Guides:', 'Jeder Guide deckt einen Teil des match stacks ab, damit du vor dem Checkout vergleichen kannst.'],
				['Wir bauen nach großen Call of Duty: Warzone- oder Ricochet-Patches neu.', 'Prüfe Status vor dem Spielen nach Patch-Tagen.', 'Offizielle Änderungen in Call of Duty: Warzone-Patchnotes und Call of Duty: Warzone Wiki prüfen, bevor du Overlays anpasst.'],
			],
			list: [
				['Spielerboxen & Distanz', 'Weapon drops- und Basis-Marker', 'Heli- und objective-Filter'],
				['Soft-Aim-Stärke', 'FOV und Knochenpriorität', 'Hotkeys im Match'],
				['Nahe Feind-Hinweise', 'Einstellbare Reichweite', 'Funktioniert in matches & Roaming'],
				null,
				['Status auf der Status-Seite', 'Setup-Guide inklusive', 'E-Mail-Support mit Bestell-ID'],
			],
		},
	};
	const content = null; // always mirror EN feature structure (menu labels stay English)
	if (!content) {
		return {
			title: clampTitle(`${u.features} 2026 | ESP, Aimbot & Radar | Warzone Cheats`),
			description: clampDesc(stripcheckoutFromMeta(`${u.features}: ${focus}. ${p.delivery}. ${p.undetected}.`)),
			h1: modulePageH1('features', locale) ?? u.features,
			intro: p.s1(`${u.features} für Call of Duty: Warzone auf ${p.win}.`),
			ctaPrimary: u.buy,
			ctaSecondary: u.viewStore,
			ctaSecondaryHref: '/pricing/',
			galleryTitle: u.inGame,
			sections: simplePagesEn.features.sections.map((sec, i) => ({
				h2: sec.h2,
				paragraphs: [p.s1(focus), p.s2()].slice(0, sec.paragraphs.length),
				...(sec.list ? { list: sec.list } : {}),
			})),
		};
	}
	const en = simplePagesEn.features;
	return {
		title: clampTitle(`${u.features} 2026 | ESP, Aimbot & Radar | Warzone Cheats`),
		description: clampDesc(stripcheckoutFromMeta(`${u.features}: ${focus}. ${p.delivery}. ${p.undetected}.`)),
		h1: modulePageH1('features', locale) ?? u.features,
		intro: p.s1(`${u.features} für Call of Duty: Warzone auf ${p.win}.`),
		ctaPrimary: u.buy,
		ctaSecondary: u.viewStore,
		ctaSecondaryHref: '/pricing/',
		galleryTitle: u.inGame,
		sections: en.sections.map((sec, i) => {
			const paras = content.p[i] ?? [p.s1(focus), p.s2()];
			while (paras.length < sec.paragraphs.length) paras.push(p.s2());
			return {
				h2: content?.h2?.[i] ?? sec.h2,
				paragraphs: paras.slice(0, sec.paragraphs.length).map((para) => localizeHtmlLinks(para, locale)),
				...(sec.list ? { list: sec.list.map((item) => localizeLinkListItem(item, locale)) } : {}),
			};
		}),
	};
}

function simplePageTitle(h1, enTitle) {
	const pipe = enTitle.indexOf('|');
	const suffix = pipe >= 0 ? enTitle.slice(pipe).replace(/\s*Guide\s*$/i, '').trim() : '| Warzone Cheats';
	return `${h1} ${suffix.startsWith('|') ? suffix : `| ${suffix}`}`.replace(/\s+/g, ' ').trim();
}

/** Build localized simple-page content for one locale. */
export function buildSimplePagesForLocale(locale) {
	if (locale === 'en') return simplePagesEn;
	const u = UI[locale] ?? UI.es;
	const p = phrases[locale];
	const pages = {};

	// Features — full native content for es/fr/de, phrase-based for others
	pages.features = buildFeatures(locale, u, p);

	// For remaining simple pages, localize EN structure with native UI labels + link localization
	for (const [pageId, enPage] of Object.entries(simplePagesEn)) {
		if (pageId === 'features') continue;
		const focus = FOCUS_I18N[locale]?.[pageId] ?? pageId;
		const h1 = modulePageH1(pageId, locale) ?? enPage.h1;
		pages[pageId] = {
			...enPage,
			title: clampTitle(simplePageTitle(h1, enPage.title)),
			description: clampDesc(
				stripcheckoutFromMeta(
					`${h1} for Call of Duty: Warzone Battle Royale and Resurgence on Windows PC — ${focus}. ${p.delivery}. Official warzone cheats at cheatsforwarzone.com.`,
				),
			),
			h1,
			intro: p.s1(`${h1}. ${focus}.`),
			ctaPrimary: u.buy,
			galleryTitle: u.inGame,
			sections: enPage.sections.map((sec) => locSection({ ...sec, h2: sec.h2 }, locale)),
		};
		// Override section h2 and content with native translations per page
		pages[pageId] = localizeSimplePageContent(pageId, pages[pageId], locale, u, p);
	}

	return pages;
}

/** Native section content for simple pages (all locales). */
function localizeSimplePageContent(pageId, draft, locale, u, p) {
	const NATIVE = getNativeSimpleContent(locale, u, p);
	const native = NATIVE[pageId];
	if (!native) return draft;
	return {
		...draft,
		...(native.title ? { title: native.title } : {}),
		...(native.description ? { description: native.description } : {}),
		...(native.h1 ? { h1: native.h1 } : {}),
		...(native.intro ? { intro: native.intro } : {}),
		...(native.ctaSecondary ? { ctaSecondary: native.ctaSecondary } : {}),
		sections: native.sections ?? draft.sections,
	};
}

function getNativeSimpleContent(locale, u, p) {
	const L = locale;
	const all = {};

	// Shared builder for pages with same structure across locales
	const mk = (pageId, data) => { all[pageId] = data; };

	// Pricing
	mk('pricing', {
		h1: modulePageH1('pricing', L) ?? u.store,
		intro: p.s1(`${u.store} — ${p.monthly} y ${p.lifetime}.`),
		ctaSecondary: u.setupGuide,
		sections: [
			{ h2: sectionTitle(L, 'whatYouGet'), paragraphs: sectionParas(L, 'pricing', 0, p), list: sectionList(L, 'pricing', 0) },
			{ h2: sectionTitle(L, 'plans'), paragraphs: sectionParas(L, 'pricing', 1, p), list: sectionList(L, 'pricing', 1) },
			{ h2: sectionTitle(L, 'beforeBuy'), paragraphs: sectionParas(L, 'pricing', 2, p), list: sectionList(L, 'pricing', 2, L) },
		],
	});

	mk('updates', {
		h1: u.status,
		intro: p.s3(),
		ctaSecondary: u.overview,
		sections: [
			{ h2: sectionTitle(L, 'currentStatus'), paragraphs: sectionParas(L, 'updates', 0, p), list: sectionList(L, 'updates', 0) },
			{ h2: sectionTitle(L, 'afterPatch'), paragraphs: sectionParas(L, 'updates', 1, p), list: sectionList(L, 'updates', 1) },
			{ h2: sectionTitle(L, 'important'), paragraphs: sectionParas(L, 'updates', 2, p), list: sectionList(L, 'updates', 2, L) },
		],
	});

	mk('hacks', {
		h1: u.fullGuide,
		intro: sectionParas(L, 'hacks', 'intro', p)[0],
		ctaSecondary: u.viewFeatures,
		sections: [
			{ h2: sectionTitle(L, 'whatAreCheats'), paragraphs: sectionParas(L, 'hacks', 0, p) },
			{ h2: sectionTitle(L, 'whatIncludes'), paragraphs: sectionParas(L, 'hacks', 1, p), list: sectionList(L, 'hacks', 1) },
			{ h2: sectionTitle(L, 'moduleGuides'), paragraphs: sectionParas(L, 'hacks', 2, p), list: sectionList(L, 'hacks', 2, L) },
			{ h2: sectionTitle(L, 'undetectedPatches'), paragraphs: sectionParas(L, 'hacks', 3, p), list: sectionList(L, 'hacks', 3, L) },
			{ h2: sectionTitle(L, 'getStarted'), paragraphs: sectionParas(L, 'hacks', 4, p), list: sectionList(L, 'hacks', 4, L) },
		],
	});

	mk('warzone-esp', {
		h1: modulePageH1('warzone-esp', L) ?? 'Call of Duty: Warzone ESP',
		intro: sectionParas(L, 'warzone-esp', 'intro', p)[0],
		sections: [
			{ h2: sectionTitle(L, 'whatEspShows'), paragraphs: sectionParas(L, 'warzone-esp', 0, p), list: sectionList(L, 'warzone-esp', 0) },
			{ h2: sectionTitle(L, 'whenToUse'), paragraphs: sectionParas(L, 'warzone-esp', 1, p), list: sectionList(L, 'warzone-esp', 1) },
			{ h2: sectionTitle(L, 'nextSteps'), paragraphs: sectionParas(L, 'warzone-esp', 2, p), list: sectionList(L, 'warzone-esp', 2, L) },
		],
	});

	mk('warzone-aimbot', {
		h1: modulePageH1('warzone-aimbot', L) ?? 'Call of Duty: Warzone Aimbot',
		intro: sectionParas(L, 'warzone-aimbot', 'intro', p)[0],
		sections: [
			{ h2: sectionTitle(L, 'controls'), paragraphs: sectionParas(L, 'warzone-aimbot', 0, p), list: sectionList(L, 'warzone-aimbot', 0) },
			{ h2: sectionTitle(L, 'playStyles'), paragraphs: sectionParas(L, 'warzone-aimbot', 1, p), list: sectionList(L, 'warzone-aimbot', 1) },
			{ h2: sectionTitle(L, 'nextSteps'), paragraphs: sectionParas(L, 'warzone-aimbot', 2, p), list: sectionList(L, 'warzone-aimbot', 2, L) },
		],
	});

	mk('radar', {
		h1: modulePageH1('radar', L) ?? 'Radar Hack',
		intro: sectionParas(L, 'radar', 'intro', p)[0],
		sections: [
			{ h2: sectionTitle(L, 'whatItShows'), paragraphs: sectionParas(L, 'radar', 0, p), list: sectionList(L, 'radar', 0) },
			{ h2: sectionTitle(L, 'withEsp'), paragraphs: sectionParas(L, 'radar', 1, p), list: sectionList(L, 'radar', 1, L) },
		],
	});

	mk('setup', {
		h1: u.setup,
		intro: sectionParas(L, 'setup', 'intro', p)[0],
		ctaSecondary: u.checkStatus,
		sections: [
			{ h2: sectionTitle(L, 'beforeInstall'), paragraphs: sectionParas(L, 'setup', 0, p), list: sectionList(L, 'setup', 0) },
			{ h2: sectionTitle(L, 'installSteps'), paragraphs: sectionParas(L, 'setup', 1, p), list: sectionList(L, 'setup', 1) },
			{ h2: sectionTitle(L, 'ifFails'), paragraphs: sectionParas(L, 'setup', 2, p), list: sectionList(L, 'setup', 2, L) },
		],
	});

	mk('support', {
		h1: u.support,
		intro: sectionParas(L, 'support', 'intro', p)[0],
		ctaSecondary: u.faq,
		sections: [
			{ h2: sectionTitle(L, 'howContact'), paragraphs: sectionParas(L, 'support', 0, p), list: sectionList(L, 'support', 0) },
			{ h2: sectionTitle(L, 'fasterAnswers'), paragraphs: sectionParas(L, 'support', 1, p), list: sectionList(L, 'support', 1, L) },
		],
	});

	mk('faq', {
		h1: modulePageH1('faq', L) ?? u.faq,
		intro: sectionParas(L, 'faq', 'intro', p)[0],
		ctaSecondary: u.support,
		sections: [
			{ h2: sectionTitle(L, 'buyingDelivery'), paragraphs: sectionParas(L, 'faq', 0, p), list: sectionList(L, 'faq', 0) },
			{ h2: sectionTitle(L, 'setupUpdates'), paragraphs: sectionParas(L, 'faq', 1, p), list: sectionList(L, 'faq', 1, L) },
			{ h2: sectionTitle(L, 'refunds'), paragraphs: sectionParas(L, 'faq', 2, p), list: sectionList(L, 'faq', 2, L) },
		],
	});

	return all;
}

// Section title translations
const SECTION_TITLES = {
	whatYouGet: { es: 'Qué obtienes', fr: 'Ce que vous obtenez', de: 'Was du bekommst', pt: 'O que você recebe', it: 'Cosa ottieni', nl: 'Wat je krijgt', pl: 'Co otrzymujesz', ru: 'Что вы получаете', tr: 'Ne alırsınız', ar: 'ما تحصل عليه', ja: '含まれるもの', ko: '포함 내용', zh: '您将获得', hi: 'आपको क्या मिलता है', id: 'Apa yang Anda dapatkan', th: 'สิ่งที่คุณได้รับ', vi: 'Những gì bạn nhận được', uk: 'Що ви отримуєте', cs: 'Co získáte', ro: 'Ce primești', sv: 'Vad du får' },
	plans: { es: 'Planes', fr: 'Formules', de: 'Pläne', pt: 'Planos', it: 'Piani', nl: 'Plannen', pl: 'Plany', ru: 'Тарифы', tr: 'Planlar', ar: 'الخطط', ja: 'プラン', ko: '요금제', zh: '方案', hi: 'प्लान', id: 'Paket', th: 'แพ็กเกจ', vi: 'Gói', uk: 'Тарифи', cs: 'Plány', ro: 'Planuri', sv: 'Planer' },
	beforeBuy: { es: 'Antes de comprar', fr: 'Avant d\'acheter', de: 'Vor dem Kauf', pt: 'Antes de comprar', it: 'Prima di acquistare', nl: 'Voor je koopt', pl: 'Przed zakupem', ru: 'Перед покупкой', tr: 'Satın almadan önce', ar: 'قبل الشراء', ja: '購入前', ko: '구매 전', zh: '购买前', hi: 'खरीदने से पहले', id: 'Sebelum membeli', th: 'ก่อนซื้อ', vi: 'Trước khi mua', uk: 'Перед покупкою', cs: 'Před nákupem', ro: 'Înainte de cumpărare', sv: 'Innan du köper' },
	currentStatus: { es: 'Estado actual', fr: 'Statut actuel', de: 'Aktueller Status', pt: 'Status atual', it: 'Stato attuale', nl: 'Huidige status', pl: 'Aktualny status', ru: 'Текущий статус', tr: 'Güncel durum', ar: 'الحالة الحالية', ja: '現在のステータス', ko: '현재 상태', zh: '当前状态', hi: 'वर्तमान स्थिति', id: 'Status saat ini', th: 'สถานะปัจจุบัน', vi: 'Trạng thái hiện tại', uk: 'Поточний статус', cs: 'Aktuální stav', ro: 'Status actual', sv: 'Aktuell status' },
	afterPatch: { es: 'Después de un parche', fr: 'Après un patch', de: 'Nach einem Patch', pt: 'Após um patch', it: 'Dopo una patch', nl: 'Na een patch', pl: 'Po patchu', ru: 'После патча', tr: 'Yama sonrası', ar: 'بعد التصحيح', ja: 'パッチ後', ko: '패치 후', zh: '补丁后', hi: 'पैच के बाद', id: 'Setelah patch', th: 'หลังแพตช์', vi: 'Sau bản vá', uk: 'Після патчу', cs: 'Po patchi', ro: 'După patch', sv: 'Efter patch' },
	important: { es: 'Importante', fr: 'Important', de: 'Wichtig', pt: 'Importante', it: 'Importante', nl: 'Belangrijk', pl: 'Ważne', ru: 'Важно', tr: 'Önemli', ar: 'مهم', ja: '重要', ko: '중요', zh: '重要', hi: 'महत्वपूर्ण', id: 'Penting', th: 'สำคัญ', vi: 'Quan trọng', uk: 'Важливо', cs: 'Důležité', ro: 'Important', sv: 'Viktigt' },
	whatAreCheats: { es: '¿Qué son los trucos de Call of Duty: Warzone?', fr: 'Que sont les triches Call of Duty: Warzone ?', de: 'Was sind Warzone Cheats?', pt: 'O que são cheats de Call of Duty: Warzone?', it: 'Cosa sono i cheat Call of Duty: Warzone?', nl: 'Wat zijn Warzone cheats?', pl: 'Czym są cheaty Call of Duty: Warzone?', ru: 'Что такое читы Call of Duty: Warzone?', tr: 'Call of Duty: Warzone hileleri nedir?', ar: 'ما هي غش Call of Duty: Warzone؟', ja: 'Call of Duty: Warzoneチートとは？', ko: 'Call of Duty: Warzone 치트란?', zh: '什么是Call of Duty: Warzone作弊？', hi: 'Warzone cheats क्या हैं?', id: 'Apa itu cheat Call of Duty: Warzone?', th: 'Warzone cheats คืออะไร?', vi: 'Cheat Call of Duty: Warzone là gì?', uk: 'Що таке чіти Call of Duty: Warzone?', cs: 'Co jsou warzone cheaty?', ro: 'Ce sunt cheats Call of Duty: Warzone?', sv: 'Vad är Warzone cheats?' },
	whatIncludes: { es: 'Qué incluye Warzone Cheats', fr: 'Ce que Warzone Cheats inclut', de: 'Was Warzone Cheats enthält', pt: 'O que o Warzone Cheats inclui', it: 'Cosa include Warzone Cheats', nl: 'Wat Warzone Cheats bevat', pl: 'Co zawiera Warzone Cheats', ru: 'Что входит в Warzone Cheats', tr: 'Warzone Cheats neleri içerir', ar: 'ماذا يتضمن Warzone Cheats', ja: 'Warzone Cheatsの内容', ko: 'Warzone Cheats 포함 사항', zh: 'Warzone Cheats包含什么', hi: 'Warzone Cheats में क्या शामिल है', id: 'Apa yang termasuk Warzone Cheats', th: 'Warzone Cheats รวมอะไรบ้าง', vi: 'Warzone Cheats bao gồm gì', uk: 'Що входить до Warzone Cheats', cs: 'Co obsahuje Warzone Cheats', ro: 'Ce include Warzone Cheats', sv: 'Vad Warzone Cheats innehåller' },
	moduleGuides: { es: 'Guías de módulos', fr: 'Guides des modules', de: 'Modul-Guides', pt: 'Guias de módulos', it: 'Guide ai moduli', nl: 'Modulegidsen', pl: 'Przewodniki modułów', ru: 'Гайды по модулям', tr: 'Modül rehberleri', ar: 'أدلة الوحدات', ja: 'モジュールガイド', ko: '모듈 가이드', zh: '模块指南', hi: 'मॉड्यूल गाइड', id: 'Panduan modul', th: 'คู่มือโมดูล', vi: 'Hướng dẫn module', uk: 'Гайди модулів', cs: 'Průvodce moduly', ro: 'Ghiduri module', sv: 'Modulguider' },
	undetectedPatches: { es: 'Estado indetectable y parches', fr: 'Statut indétectable et patchs', de: 'Undetected-Status & Patches', pt: 'Status indetectável e patches', it: 'Stato indetectable e patch', nl: 'Undetected status en patches', pl: 'Status undetected i patche', ru: 'Undetected статус и патчи', tr: 'Undetected durumu ve yamalar', ar: 'الحالة غير المكتشفة والتصحيحات', ja: 'Undetectedステータスとパッチ', ko: 'Undetected 상태 및 패치', zh: 'Undetected状态和补丁', hi: 'Undetected स्थिति और पैच', id: 'Status undetected dan patch', th: 'สถานะ undetected และแพตช์', vi: 'Trạng thái undetected và bản vá', uk: 'Undetected статус і патчі', cs: 'Undetected stav a patche', ro: 'Status undetected și patch-uri', sv: 'Undetected-status och patchar' },
	getStarted: { es: 'Cómo empezar', fr: 'Comment commencer', de: 'So startest du', pt: 'Como começar', it: 'Come iniziare', nl: 'Aan de slag', pl: 'Jak zacząć', ru: 'Как начать', tr: 'Nasıl başlanır', ar: 'كيف تبدأ', ja: '始め方', ko: '시작 방법', zh: '如何开始', hi: 'कैसे शुरू करें', id: 'Cara memulai', th: 'วิธีเริ่มต้น', vi: 'Cách bắt đầu', uk: 'Як почати', cs: 'Jak začít', ro: 'Cum să începi', sv: 'Kom igång' },
	whatEspShows: { es: 'Qué muestra el ESP', fr: 'Ce que l\'ESP affiche', de: 'Was ESP zeigt', pt: 'O que o ESP mostra', it: 'Cosa mostra l\'ESP', nl: 'Wat ESP toont', pl: 'Co pokazuje ESP', ru: 'Что показывает ESP', tr: 'ESP ne gösterir', ar: 'ماذا يعرض ESP', ja: 'ESPの表示内容', ko: 'ESP 표시 내용', zh: 'ESP显示什么', hi: 'ESP क्या दिखाता है', id: 'Apa yang ditampilkan ESP', th: 'ESP แสดงอะไร', vi: 'ESP hiển thị gì', uk: 'Що показує ESP', cs: 'Co ESP zobrazuje', ro: 'Ce arată ESP', sv: 'Vad ESP visar' },
	whenToUse: { es: 'Cuándo usarlo', fr: 'Quand l\'utiliser', de: 'Wann nutzen', pt: 'Quando usar', it: 'Quando usarlo', nl: 'Wanneer gebruiken', pl: 'Kiedy używać', ru: 'Когда использовать', tr: 'Ne zaman kullanılır', ar: 'متى تستخدمه', ja: '使いどき', ko: '사용 시기', zh: '何时使用', hi: 'कब उपयोग करें', id: 'Kapan menggunakan', th: 'เมื่อไหร่ควรใช้', vi: 'Khi nào sử dụng', uk: 'Коли використовувати', cs: 'Kdy použít', ro: 'Când să folosești', sv: 'När du använder det' },
	nextSteps: { es: 'Próximos pasos', fr: 'Étapes suivantes', de: 'Nächste Schritte', pt: 'Próximos passos', it: 'Prossimi passi', nl: 'Volgende stappen', pl: 'Następne kroki', ru: 'Следующие шаги', tr: 'Sonraki adımlar', ar: 'الخطوات التالية', ja: '次のステップ', ko: '다음 단계', zh: '下一步', hi: 'अगले कदम', id: 'Langkah selanjutnya', th: 'ขั้นตอนถัดไป', vi: 'Bước tiếp theo', uk: 'Наступні кроки', cs: 'Další kroky', ro: 'Pașii următori', sv: 'Nästa steg' },
	controls: { es: 'Controles', fr: 'Contrôles', de: 'Steuerung', pt: 'Controles', it: 'Controlli', nl: 'Bediening', pl: 'Sterowanie', ru: 'Управление', tr: 'Kontroller', ar: 'عناصر التحكم', ja: 'コントロール', ko: '컨트롤', zh: '控制', hi: 'नियंत्रण', id: 'Kontrol', th: 'การควบคุม', vi: 'Điều khiển', uk: 'Керування', cs: 'Ovládání', ro: 'Controale', sv: 'Kontroller' },
	playStyles: { es: 'Estilos de juego', fr: 'Styles de jeu', de: 'Spielstile', pt: 'Estilos de jogo', it: 'Stili di gioco', nl: 'Speelstijlen', pl: 'Style gry', ru: 'Стили игры', tr: 'Oyun stilleri', ar: 'أنماط اللعب', ja: 'プレイスタイル', ko: '플레이 스타일', zh: '游戏风格', hi: 'खेल शैलियाँ', id: 'Gaya bermain', th: 'สไตล์การเล่น', vi: 'Phong cách chơi', uk: 'Стилі гри', cs: 'Herní styly', ro: 'Stiluri de joc', sv: 'Spelstilar' },
	whatItShows: { es: 'Qué muestra', fr: 'Ce qu\'il affiche', de: 'Was es zeigt', pt: 'O que mostra', it: 'Cosa mostra', nl: 'Wat het toont', pl: 'Co pokazuje', ru: 'Что показывает', tr: 'Ne gösterir', ar: 'ماذا يعرض', ja: '表示内容', ko: '표시 내용', zh: '显示内容', hi: 'क्या दिखाता है', id: 'Apa yang ditampilkan', th: 'แสดงอะไร', vi: 'Hiển thị gì', uk: 'Що показує', cs: 'Co zobrazuje', ro: 'Ce arată', sv: 'Vad det visar' },
	withEsp: { es: 'Con ESP', fr: 'Avec ESP', de: 'Mit ESP', pt: 'Com ESP', it: 'Con ESP', nl: 'Met ESP', pl: 'Z ESP', ru: 'С ESP', tr: 'ESP ile', ar: 'مع ESP', ja: 'ESPと併用', ko: 'ESP와 함께', zh: '配合ESP', hi: 'ESP के साथ', id: 'Dengan ESP', th: 'กับ ESP', vi: 'Với ESP', uk: 'З ESP', cs: 'S ESP', ro: 'Cu ESP', sv: 'Med ESP' },
	beforeInstall: { es: 'Antes de instalar', fr: 'Avant d\'installer', de: 'Vor der Installation', pt: 'Antes de instalar', it: 'Prima di installare', nl: 'Voor installatie', pl: 'Przed instalacją', ru: 'Перед установкой', tr: 'Kurulumdan önce', ar: 'قبل التثبيت', ja: 'インストール前', ko: '설치 전', zh: '安装前', hi: 'इंस्टॉल से पहले', id: 'Sebelum instalasi', th: 'ก่อนติดตั้ง', vi: 'Trước khi cài', uk: 'Перед встановленням', cs: 'Před instalací', ro: 'Înainte de instalare', sv: 'Före installation' },
	installSteps: { es: 'Pasos de instalación', fr: 'Étapes d\'installation', de: 'Installationsschritte', pt: 'Passos de instalação', it: 'Passi di installazione', nl: 'Installatiestappen', pl: 'Kroki instalacji', ru: 'Шаги установки', tr: 'Kurulum adımları', ar: 'خطوات التثبيت', ja: 'インストール手順', ko: '설치 단계', zh: '安装步骤', hi: 'इंस्टॉल चरण', id: 'Langkah instalasi', th: 'ขั้นตอนติดตั้ง', vi: 'Các bước cài đặt', uk: 'Кроки встановлення', cs: 'Kroky instalace', ro: 'Pași de instalare', sv: 'Installationssteg' },
	ifFails: { es: 'Si algo falla', fr: 'Si quelque chose échoue', de: 'Wenn etwas schiefgeht', pt: 'Se algo falhar', it: 'Se qualcosa non funziona', nl: 'Als iets misgaat', pl: 'Gdy coś nie działa', ru: 'Если что-то не работает', tr: 'Bir şey başarısız olursa', ar: 'إذا فشل شيء', ja: '問題が発生した場合', ko: '문제 발생 시', zh: '如果出现问题', hi: 'यदि कुछ विफल हो', id: 'Jika ada masalah', th: 'หากมีปัญหา', vi: 'Nếu có lỗi', uk: 'Якщо щось не працює', cs: 'Pokud něco selže', ro: 'Dacă ceva nu funcționează', sv: 'Om något misslyckas' },
	howContact: { es: 'Cómo contactarnos', fr: 'Comment nous contacter', de: 'So erreichst du uns', pt: 'Como nos contactar', it: 'Come contattarci', nl: 'Hoe contact opnemen', pl: 'Jak się skontaktować', ru: 'Как связаться', tr: 'Nasıl iletişime geçilir', ar: 'كيف تتواصل معنا', ja: 'お問い合わせ方法', ko: '문의 방법', zh: '如何联系我们', hi: 'हमसे कैसे संपर्क करें', id: 'Cara menghubungi', th: 'วิธีติดต่อเรา', vi: 'Cách liên hệ', uk: 'Як зв\'язатися', cs: 'Jak nás kontaktovat', ro: 'Cum ne contactezi', sv: 'Hur du kontaktar oss' },
	fasterAnswers: { es: 'Respuestas más rápidas', fr: 'Réponses plus rapides', de: 'Schnellere Antworten', pt: 'Respostas mais rápidas', it: 'Risposte più veloci', nl: 'Snellere antwoorden', pl: 'Szybsze odpowiedzi', ru: 'Быстрые ответы', tr: 'Daha hızlı yanıtlar', ar: 'إجابات أسرع', ja: 'より早い回答', ko: '빠른 답변', zh: '更快获得答案', hi: 'तेज़ जवाब', id: 'Jawaban lebih cepat', th: 'คำตอบที่เร็วขึ้น', vi: 'Trả lời nhanh hơn', uk: 'Швидші відповіді', cs: 'Rychlejší odpovědi', ro: 'Răspunsuri mai rapide', sv: 'Snabbare svar' },
	buyingDelivery: { es: 'Compra y entrega', fr: 'Achat et livraison', de: 'Kauf & Lieferung', pt: 'Compra e entrega', it: 'Acquisto e consegna', nl: 'Koop & levering', pl: 'Zakup i dostawa', ru: 'Покупка и доставка', tr: 'Satın alma ve teslimat', ar: 'الشراء والتسليم', ja: '購入と配信', ko: '구매 및 배송', zh: '购买和交付', hi: 'खरीद और डिलीवरी', id: 'Pembelian & pengiriman', th: 'การซื้อและการจัดส่ง', vi: 'Mua và giao hàng', uk: 'Покупка та доставка', cs: 'Nákup a doručení', ro: 'Cumpărare și livrare', sv: 'Köp och leverans' },
	setupUpdates: { es: 'Instalación y actualizaciones', fr: 'Installation et mises à jour', de: 'Setup & Updates', pt: 'Instalação e atualizações', it: 'Setup e aggiornamenti', nl: 'Setup en updates', pl: 'Instalacja i aktualizacje', ru: 'Установка и обновления', tr: 'Kurulum ve güncellemeler', ar: 'التثبيت والتحديثات', ja: 'セットアップと更新', ko: '설치 및 업데이트', zh: '安装和更新', hi: 'सेटअप और अपडेट', id: 'Setup dan pembaruan', th: 'การติดตั้งและอัปเดต', vi: 'Cài đặt và cập nhật', uk: 'Встановлення та оновлення', cs: 'Instalace a aktualizace', ro: 'Instalare și actualizări', sv: 'Installation och uppdateringar' },
	refunds: { es: 'Reembolsos', fr: 'Remboursements', de: 'Rückerstattungen', pt: 'Reembolsos', it: 'Rimborsi', nl: 'Restituties', pl: 'Zwroty', ru: 'Возвраты', tr: 'İadeler', ar: 'المبالغ المستردة', ja: '返金', ko: '환불', zh: '退款', hi: 'रिफंड', id: 'Refund', th: 'การคืนเงิน', vi: 'Hoàn tiền', uk: 'Повернення коштів', cs: 'Vrácení peněz', ro: 'Rambursări', sv: 'Återbetalningar' },
};

function sectionTitle(locale, key) {
	return SECTION_TITLES[key]?.[locale] ?? SECTION_TITLES[key]?.es ?? key;
}

// Paragraph and list content per page — native translations for all locales
function sectionParas(locale, page, section, p) {
	const paras = PAGE_CONTENT[page]?.[section]?.[locale] ?? PAGE_CONTENT[page]?.[section]?.es ?? [p.s1(''), p.s2()];
	// Ensure minimum 2 paragraphs to match EN structure
	while (paras.length < 2) paras.push(p.s2());
	return paras;
}

function sectionList(locale, page, section) {
	const items = PAGE_CONTENT[page]?.[`list${section}`]?.[locale] ?? PAGE_CONTENT[page]?.[`list${section}`]?.es;
	if (!items) return undefined;
	if (typeof items[0] === 'string' && items[0].includes('<a ')) {
		return items.map((item) => localizeLinkListItem(item, locale));
	}
	return items;
}

export { UI };
