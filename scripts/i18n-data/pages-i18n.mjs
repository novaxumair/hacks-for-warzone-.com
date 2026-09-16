import { HERO_IMAGES, clampTitle, clampDesc, section, stripcheckoutFromMeta } from './constants.mjs';
import { phrases } from './phrases.mjs';
import { PAGE_IMAGE_ALTS } from './image-alts.mjs';
import { FOCUS_I18N } from './focus-i18n.mjs';
import { LEGAL_I18N } from './legal-i18n.mjs';

/** Page-specific translated meta for home across locales. */
export const PAGE_META_HOME = {
	es: { title: 'Warzone Cheats 2026 | ESP, Wallhack y Aimbot', desc: 'Trucos Call of Duty: Warzone indetectables para Call of Duty: Warzone en PC. ESP wallhack, radar hack y Aimbot con mantenimiento Ricochet. Entrega digital instantánea.', h1: 'cheats indetectables para Call of Duty: Warzone', intro: 'Paquete undetected para Call of Duty: Warzone en Windows PC: ESP wallhack, radar y Aimbot con mantenimiento Ricochet tras cada parche.', imageAlt: 'Call of Duty: Warzone ESP — etiquetas de jugador hack', gallery: 'Galería Warzone Cheats — ESP, Aimbot y wallhack', cta2: 'Ver funciones', h2a: 'Por qué eligen Warzone Cheats en 2026', h2b: 'ESP wallhack, radar y Aimbot en una licencia', topicA: 'Ideal para leer escuadrones enemigos en BR y Resurgence sessions.', topicB: 'Una licencia en lugar de herramientas separadas.' },
	fr: { title: 'Warzone Cheats 2026 | ESP, Wallhack et Aimbot', desc: 'Triches Call of Duty: Warzone indétectables pour Call of Duty: Warzone sur PC. ESP wallhack, radar hack et Aimbot avec maintenance Ricochet. Livraison numérique instantanée.', h1: 'triches indétectables pour Call of Duty: Warzone', intro: 'Pack undetected pour Call of Duty: Warzone sur PC Windows : ESP wallhack, radar et Aimbot avec maintenance Ricochet après chaque patch.', imageAlt: 'Call of Duty: Warzone ESP — tags joueur hack', gallery: 'Galerie Warzone Cheats — ESP, Aimbot et wallhack', cta2: 'Voir les fonctions', h2a: 'Pourquoi choisir Warzone Cheats en 2026', h2b: 'ESP wallhack, radar et Aimbot en une licence', topicA: 'Parfait pour lire les équipes ennemies en BR et Resurgence sessions.', topicB: 'Une licence au lieu d\'outils séparés.' },
	de: { title: 'Warzone Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected Warzone Cheats für Call of Duty: Warzone auf PC. ESP Wallhack, Radar Hack und Aimbot mit Ricochet-Wartung. Sofortige digitale Lieferung.', h1: 'undetected Cheats für Call of Duty: Warzone', intro: 'Undetected Windows PC Paket für Call of Duty: Warzone: ESP Wallhack, Radar und Aimbot mit Ricochet-Wartung nach jedem Patch.', imageAlt: 'Call of Duty: Warzone ESP — Spieler-Tags Hack', gallery: 'Warzone Cheats Galerie — ESP, Aimbot und Wallhack', cta2: 'Features ansehen', h2a: 'Warum Warzone Cheats 2026 führt', h2b: 'ESP Wallhack, Radar und Aimbot in einer Lizenz', topicA: 'Ideal um feindliche Squads in BR und Resurgence sessions zu lesen.', topicB: 'Eine Lizenz statt separater Tools.' },
	pt: { title: 'Warzone Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheats Call of Duty: Warzone indetectáveis para Call of Duty: Warzone no PC. ESP wallhack, radar hack e Aimbot com manutenção Ricochet. Entrega digital instantánea.', h1: 'cheats indetectáveis para Call of Duty: Warzone', intro: 'Pacote undetected para Call of Duty: Warzone no Windows PC: ESP wallhack, radar e Aimbot com manutenção Ricochet após cada patch.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Galeria Warzone Cheats — ESP, Aimbot e wallhack', cta2: 'Ver recursos', h2a: 'Por que escolher Warzone Cheats em 2026', h2b: 'ESP wallhack, radar e Aimbot numa licença', topicA: 'Ideal para ler equipes inimigos em BR e Resurgence sessions.', topicB: 'Uma licença em vez de ferramentas separadas.' },
	it: { title: 'Warzone Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheat Call of Duty: Warzone indetectable per Call of Duty: Warzone su PC. ESP wallhack, radar hack e Aimbot con manutenzione Ricochet. Consegna digitale istantanea.', h1: 'cheat indetectable per Call of Duty: Warzone', intro: 'Pacchetto undetected per Call of Duty: Warzone su PC Windows: ESP wallhack, radar e Aimbot con manutenzione Ricochet dopo ogni patch.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Galleria Warzone Cheats — ESP, Aimbot e wallhack', cta2: 'Vedi funzioni', h2a: 'Perché scegliere Warzone Cheats nel 2026', h2b: 'ESP wallhack, radar e Aimbot in una licenza', topicA: 'Ideale per leggere squadre nemiche in BR e Resurgence sessions.', topicB: 'Una licenza invece di tool separati.' },
	nl: { title: 'Warzone Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected warzone cheats voor Call of Duty: Warzone op PC. ESP wallhack, radar hack en Aimbot met Ricochet-onderhoud. Directe digitale levering.', h1: 'undetected cheats voor Call of Duty: Warzone', intro: 'Undetected Windows PC pakket voor Call of Duty: Warzone: ESP wallhack, radar en Aimbot met Ricochet-onderhoud na elke patch.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Warzone Cheats galerij — ESP, Aimbot en wallhack', cta2: 'Bekijk functies', h2a: 'Waarom Warzone Cheats in 2026', h2b: 'ESP wallhack, radar en Aimbot in één licentie', topicA: 'Ideaal om vijandelijke squads te lezen in BR en Resurgence sessions.', topicB: 'Eén licentie in plaats van losse tools.' },
	pl: { title: 'Warzone Cheats 2026 | ESP, Wallhack i Aimbot', desc: 'Undetected cheaty Call of Duty: Warzone dla Call of Duty: Warzone na PC. ESP wallhack, radar hack i Aimbot z konserwacją Ricochet. Natychmiastowa dostawa cyfrowa.', h1: 'undetected cheaty dla Call of Duty: Warzone', intro: 'Pakiet undetected dla Call of Duty: Warzone na Windows PC: ESP wallhack, radar i Aimbot z konserwacją Ricochet po każdym patchu.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Galeria Warzone Cheats — ESP, Aimbot i wallhack', cta2: 'Zobacz funkcje', h2a: 'Dlaczego Warzone Cheats w 2026', h2b: 'ESP wallhack, radar i Aimbot w jednej licencji', topicA: 'Idealny do czytania wrogich squadów w BR i Resurgence sessions.', topicB: 'Jedna licencja zamiast osobnych narzędzi.' },
	ru: { title: 'Warzone Cheats 2026 | ESP, Wallhack и Aimbot', desc: 'Undetected читы Call of Duty: Warzone для Call of Duty: Warzone на PC. ESP wallhack, radar hack и Aimbot с обслуживанием Ricochet. Мгновенная цифровая доставка.', h1: 'undetected читы для Call of Duty: Warzone', intro: 'Undetected пакет для Call of Duty: Warzone на Windows PC: ESP wallhack, radar и Aimbot с обслуживанием Ricochet после патчей.', imageAlt: 'Call of Duty: Warzone ESP — теги игроков hack', gallery: 'Галерея Warzone Cheats — ESP, Aimbot и wallhack', cta2: 'Смотреть функции', h2a: 'Почему выбирают Warzone Cheats в 2026', h2b: 'ESP wallhack, radar и Aimbot в одной лицензии', topicA: 'Идеально для чтения вражеских отрядов в BR и Resurgence sessions.', topicB: 'Одна лицензия вместо отдельных инструментов.' },
	tr: { title: 'Warzone Cheats 2026 | ESP, Wallhack ve Aimbot', desc: 'Call of Duty: Warzone için undetected hileler. ESP wallhack, radar hack ve Aimbot — Ricochet bakımı. Anında dijital teslimat.', h1: 'Call of Duty: Warzone için undetected hileler', intro: 'Call of Duty: Warzone Windows PC undetected paketi: ESP wallhack, radar ve Aimbot — Ricochet bakımı dahil.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Warzone Cheats galeri — ESP, Aimbot ve wallhack', cta2: 'Özellikleri gör', h2a: '2026\'da neden Warzone Cheats', h2b: 'ESP wallhack, radar ve Aimbot tek lisans', topicA: 'BR ve Resurgence sessions\'da düşman squad okumak için ideal.', topicB: 'Ayrı araçlar yerine tek lisans.' },
	ar: { title: 'Warzone Cheats 2026 | ESP وWallhack وAimbot', desc: 'غش Call of Duty: Warzone undetected لـ Call of Duty: Warzone على PC. ESP wallhack ورadar hack وAimbot مع صيانة Ricochet. تسليم رقمي فوري.', h1: 'غش غير مكتشف لـ Call of Duty: Warzone', intro: 'حزمة undetected لـ Call of Duty: Warzone على Windows PC: ESP wallhack ورadar وAimbot مع صيانة Ricochet.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'معرض Warzone Cheats — ESP وAimbot وwallhack', cta2: 'عرض الميزات', h2a: 'لماذا Warzone Cheats في 2026', h2b: 'ESP wallhack ورadar وAimbot في ترخيص واحد', topicA: 'مثالي لقراءة فرق العدو في BR وResurgence sessions.', topicB: 'ترخيص واحد بدلاً من أدوات منفصلة.' },
	ja: { title: 'Warzone Cheats 2026 | ESP・Wallhack・Aimbot', desc: 'Call of Duty: Warzone向けundetectedチート。ESP wallhack、radar hack、Aimbot、Ricochetメンテナンス。即時デジタル配信。', h1: 'Call of Duty: Warzone向けundetectedチート', intro: 'Call of Duty: Warzone Windows PC向けundetectedパッケージ：ESP wallhack、radar、Aimbot、Ricochetメンテナンス付き。', imageAlt: 'warzone cheats operator ESP aimbot wallhack', gallery: 'Warzone Cheatsギャラリー — ESP、Aimbot、wallhack', cta2: '機能を見る', h2a: '2026年にWarzone Cheatsを選ぶ理由', h2b: 'ESP wallhack、radar、Aimbotが1ライセンス', topicA: 'BRとResurgence sessionsで敵スクワッドを読むのに最適。', topicB: '別ツールではなく1ライセンス。' },
	ko: { title: 'Warzone Cheats 2026 | ESP, Wallhack, Aimbot', desc: 'Call of Duty: Warzone undetected 치트. ESP wallhack, radar hack, Aimbot, Ricochet 유지보수. 즉시 디지털 배송.', h1: 'Call of Duty: Warzone용 undetected 치트', intro: 'Call of Duty: Warzone Windows PC undetected 패키지: ESP wallhack, radar, Aimbot, Ricochet 유지보수 포함.', imageAlt: 'warzone cheats operator ESP aimbot wallhack', gallery: 'Warzone Cheats 갤러리 — ESP, Aimbot, wallhack', cta2: '기능 보기', h2a: '2026년 Warzone Cheats를 선택하는 이유', h2b: 'ESP wallhack, radar, Aimbot 단일 라이선스', topicA: 'BR 및 Resurgence sessions에서 적 분대 읽기에 이상적.', topicB: '별도 도구 대신 단일 라이선스.' },
	zh: { title: 'Warzone Cheats 2026 | ESP、Wallhack、Aimbot', desc: 'Call of Duty: Warzone undetected作弊。ESP wallhack、radar hack、Aimbot、Ricochet维护。即时数字交付。', h1: 'Call of Duty: Warzone的undetected外挂', intro: 'Call of Duty: Warzone Windows PC undetected套餐：ESP wallhack、radar、Aimbot，含Ricochet维护。', imageAlt: 'warzone cheats operator ESP aimbot wallhack', gallery: 'Warzone Cheats图库 — ESP、Aimbot、wallhack', cta2: '查看功能', h2a: '2026年选择Warzone Cheats的原因', h2b: 'ESP wallhack、radar、Aimbot单一许可证', topicA: '适合在BR和Resurgence sessions中读取敌方小队。', topicB: '一个许可证而非多个工具。' },
	hi: { title: 'Warzone Cheats 2026 | ESP, Wallhack और Aimbot', desc: 'Call of Duty: Warzone undetected hacks. ESP wallhack, radar hack, Aimbot, Ricochet maintenance. Instant digital delivery.', h1: 'Call of Duty: Warzone ke liye undetected cheats', intro: 'Call of Duty: Warzone Windows PC undetected पैकेज: ESP wallhack, radar, Aimbot, Ricochet maintenance सहित.', imageAlt: 'warzone cheats operator ESP aimbot wallhack', gallery: 'Warzone Cheats gallery — ESP, Aimbot, wallhack', cta2: 'फ़ीचर्स देखें', h2a: '2026 में Warzone Cheats क्यों', h2b: 'ESP wallhack, radar, Aimbot एक लाइसेंस में', topicA: 'BR और Resurgence sessions में दुश्मन squad पढ़ने के लिए आदर्श.', topicB: 'अलग टूल्स के बजाय एक लाइसेंस.' },
	id: { title: 'Warzone Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Call of Duty: Warzone undetected untuk Call of Duty: Warzone di PC. ESP wallhack, radar hack, Aimbot, pemeliharaan Ricochet. Pengiriman digital instan.', h1: 'cheat undetected untuk Call of Duty: Warzone', intro: 'Paket undetected Call of Duty: Warzone di Windows PC: ESP wallhack, radar, Aimbot dengan pemeliharaan Ricochet.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Galeri Warzone Cheats — ESP, Aimbot, wallhack', cta2: 'Lihat fitur', h2a: 'Mengapa Warzone Cheats di 2026', h2b: 'ESP wallhack, radar, Aimbot dalam satu lisensi', topicA: 'Ideal membaca squad musuh di BR dan Resurgence sessions.', topicB: 'Satu lisensi alih-alih alat terpisah.' },
	th: { title: 'Warzone Cheats 2026 | ESP, Wallhack และ Aimbot', desc: 'Cheat Call of Duty: Warzone undetected สำหรับ Call of Duty: Warzone บน PC. ESP wallhack, radar hack, Aimbot, Ricochet maintenance. จัดส่งดิจิทัลทันที.', h1: 'cheat undetected สำหรับ Call of Duty: Warzone', intro: 'แพ็ก undetected สำหรับ Call of Duty: Warzone บน Windows PC: ESP wallhack, radar, Aimbot พร้อม Ricochet maintenance', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'แกลเลอรี Warzone Cheats — ESP, Aimbot, wallhack', cta2: 'ดูฟีเจอร์', h2a: 'ทำไมเลือก Warzone Cheats ปี 2026', h2b: 'ESP wallhack, radar, Aimbot ในใบอนุญาตเดียว', topicA: 'เหมาะสำหรับอ่าน squad ศัตรูใน BR และ Resurgence sessions', topicB: 'ใบอนุญาตเดียวแทนเครื่องมือแยก' },
	vi: { title: 'Warzone Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Call of Duty: Warzone undetected cho Call of Duty: Warzone trên PC. ESP wallhack, radar hack, Aimbot, bảo trì Ricochet. Giao hàng kỹ thuật số tức thì.', h1: 'cheat undetected cho Call of Duty: Warzone', intro: 'Gói undetected Call of Duty: Warzone trên Windows PC: ESP wallhack, radar, Aimbot với bảo trì Ricochet.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Thư viện Warzone Cheats — ESP, Aimbot, wallhack', cta2: 'Xem tính năng', h2a: 'Vì sao chọn Warzone Cheats 2026', h2b: 'ESP wallhack, radar, Aimbot trong một giấy phép', topicA: 'Lý tưởng đọc squad địch trong BR và Resurgence sessions.', topicB: 'Một giấy phép thay vì công cụ riêng.' },
	uk: { title: 'Warzone Cheats 2026 | ESP, Wallhack і Aimbot', desc: 'Undetected чіти Call of Duty: Warzone для Call of Duty: Warzone на PC. ESP wallhack, radar hack, Aimbot, обслуговування Ricochet. Мгновенная цифровая доставка.', h1: 'undetected чіти для Call of Duty: Warzone', intro: 'Undetected пакет для Call of Duty: Warzone на Windows PC: ESP wallhack, radar, Aimbot з обслуговуванням Ricochet.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Галерея Warzone Cheats — ESP, Aimbot, wallhack', cta2: 'Дивитися функції', h2a: 'Чому Warzone Cheats у 2026', h2b: 'ESP wallhack, radar і Aimbot в одній ліцензії', topicA: 'Ідеально для читання ворожих загонів у BR і Resurgence sessions.', topicB: 'Одна ліцензія замість окремих інструментів.' },
	cs: { title: 'Warzone Cheats 2026 | ESP, Wallhack a Aimbot', desc: 'Undetected warzone cheaty pro Call of Duty: Warzone na PC. ESP wallhack, radar hack, Aimbot, údržba Ricochet. Okamžité digitální doručení.', h1: 'undetected cheaty pro Call of Duty: Warzone', intro: 'Undetected balíček pro Call of Duty: Warzone na Windows PC: ESP wallhack, radar, Aimbot s údržbou Ricochet.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Galerie Warzone Cheats — ESP, Aimbot, wallhack', cta2: 'Zobrazit funkce', h2a: 'Proč Warzone Cheats v roce 2026', h2b: 'ESP wallhack, radar a Aimbot v jedné licenci', topicA: 'Ideální pro čtení nepřátelských squadů v BR a Resurgence sessions.', topicB: 'Jedna licence místo samostatných nástrojů.' },
	ro: { title: 'Warzone Cheats 2026 | ESP, Wallhack și Aimbot', desc: 'Cheats Call of Duty: Warzone undetected pentru Call of Duty: Warzone pe PC. ESP wallhack, radar hack, Aimbot, mentenanță Ricochet. Livrare digitală instantă.', h1: 'cheat-uri undetected pentru Call of Duty: Warzone', intro: 'Pachet undetected Call of Duty: Warzone pe Windows PC: ESP wallhack, radar, Aimbot cu mentenanță Ricochet.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Galerie Warzone Cheats — ESP, Aimbot, wallhack', cta2: 'Vezi funcții', h2a: 'De ce Warzone Cheats în 2026', h2b: 'ESP wallhack, radar și Aimbot într-o licență', topicA: 'Ideal pentru citirea squad-urilor inamice în BR și Resurgence sessions.', topicB: 'O licență în loc de instrumente separate.' },
	sv: { title: 'Warzone Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected warzone cheats för Call of Duty: Warzone på PC. ESP wallhack, radar hack, Aimbot, Ricochet-underhåll. Omedelbar digital leverans.', h1: 'undetected cheats för Call of Duty: Warzone', intro: 'Undetected paket för Call of Duty: Warzone på Windows PC: ESP wallhack, radar, Aimbot med Ricochet-underhåll.', imageAlt: 'Call of Duty: Warzone ESP player tags hack', gallery: 'Warzone Cheats galleri — ESP, Aimbot, wallhack', cta2: 'Se funktioner', h2a: 'Varför Warzone Cheats 2026', h2b: 'ESP wallhack, radar och Aimbot i en licens', topicA: 'Ideal för att läsa fiendesquads i BR och Resurgence sessions.', topicB: 'En licens istället för separata verktyg.' },
};

export function buildHome(locale) {
	const p = phrases[locale];
	const m = PAGE_META_HOME[locale];
	return {
		title: clampTitle(stripcheckoutFromMeta(m.title)),
		description: clampDesc(stripcheckoutFromMeta(m.desc)),
		h1: m.h1,
		intro: m.intro,
		imageAlt: m.imageAlt,
		galleryTitle: m.gallery,
		heroImage: HERO_IMAGES.home,
		ctaPrimary: p.buy,
		ctaSecondary: m.cta2,
		ctaSecondaryHref: '/features/',
		sections: [
			section(m.h2a, p.s1(m.topicA), p.s2()),
			section(m.h2b, p.s1(m.topicB), p.s3()),
		],
	};
}

/** Unique title/desc tails per page — English base + locale overrides for agent H1/subtitle. */
export const PAGE_META_TAILS = {
	'warzone-esp': { suffix: 'Player Boxes & Wallhack', focus: 'player boxes, operator markers, and wallhack overlays', altKeyword: 'ESP wallhack overlay' },
	'warzone-aimbot': { suffix: 'Soft Aim Controls', focus: 'soft aim, FOV, and per-weapon Aimbot profiles', altKeyword: 'aimbot combat' },
	features: { suffix: 'Full Feature List', focus: 'ESP, soft aim, radar controls', altKeyword: 'cheats package ESP aimbot' },
	pricing: { suffix: 'Monthly & Lifetime', focus: '$35 monthly or $150 lifetime licenses', altKeyword: 'cheats pricing' },
	setup: { suffix: 'PC Setup Guide', focus: 'Windows PC activation and first-launch setup', altKeyword: 'setup PC activation' },
	updates: { suffix: 'Live Status Log', focus: 'Ricochet patch status and rebuild notes', altKeyword: 'updates Ricochet maintenance' },
	faq: { suffix: 'Common Answers', focus: 'ESP, soft aim, delivery, and Ricochet questions', altKeyword: 'FAQ ESP aimbot' },
	support: { suffix: 'Help & Contact', focus: 'order help and license support contact', altKeyword: 'support license help' },
	undetected: { suffix: 'Ricochet Safe Status', focus: 'undetected maintenance after Ricochet patches', altKeyword: 'undetected cheats ESP' },
	wallhack: { suffix: 'ESP Visibility', focus: 'wallhack ESP for players, weapon drops, and distance', altKeyword: 'wallhack ESP visibility' },
	radar: { suffix: '2D Threat Overlay', focus: '2D radar cues for flanks and rotations', altKeyword: 'radar hack overlay' },
	ricochet: { suffix: 'Patch Maintenance', focus: 'how Ricochet updates are handled for Warzone cheats', altKeyword: 'Ricochet bypass ESP aimbot' },
	'cheats-2026': { suffix: 'Buyer Guide', focus: '2026 warzone cheats checklist before checkout', altKeyword: 'hacks 2026 ESP aimbot' },
	hacks: { suffix: 'ESP Aimbot Guide', focus: 'Warzone Cheats pillar for ESP and Aimbot', altKeyword: 'hacks ESP aimbot' },
	'cheat-download': { suffix: 'Instant Access', focus: 'digital license download after payment', altKeyword: 'cheat download ESP aimbot' },
	'mod-menu': { suffix: 'In-Game Toggles', focus: 'in-client ESP and soft aim toggles', altKeyword: 'mod menu ESP aimbot' },
	'soft-aim': { suffix: 'Smooth Aim Settings', focus: 'smooth soft aim settings for Windows PC', altKeyword: 'soft aim aimbot' },
	'best-cheats': { suffix: 'Buyer Checklist', focus: 'what to compare before buying warzone cheats', altKeyword: 'best hacks ESP aimbot' },
	'aimbot-hack': { suffix: 'Soft Aim Assist', focus: 'undetected Aimbot hack assist for Call of Duty: Warzone', altKeyword: 'aimbot hack combat' },
	'esp-hack': { suffix: 'Boxes & Weapon drops', focus: 'ESP hack boxes, weapon drops pins, and distance', altKeyword: 'ESP hack wallhack' },
	'unlock-all': { suffix: 'What It Means', focus: 'unlock-all searches vs real ESP and Aimbot tools', altKeyword: 'unlock all items ESP aimbot' },
};

/** Localized H1 suffixes (title/subtitle language change on product pages). */
export const SUFFIX_I18N = {
	es: {
		'warzone-esp': 'Cajas de jugador y wallhack',
		'warzone-aimbot': 'Controles soft aim',
		features: 'Lista completa de funciones',
		pricing: 'Mensual y de por vida',
		setup: 'Guía de instalación PC',
		updates: 'Registro de estado',
		faq: 'Preguntas frecuentes',
		support: 'Ayuda y contacto',
		undetected: 'Estado indetectable',
		wallhack: 'Visibilidad ESP',
		radar: 'Radar 2D de amenazas',
		ricochet: 'Mantenimiento de parches',
		'cheats-2026': 'Guía del comprador',
		hacks: 'Guía ESP y Aimbot',
		'cheat-download': 'Acceso instantáneo',
		'mod-menu': 'Controles en partida',
		'soft-aim': 'Ajustes soft aim',
		'best-cheats': 'Lista de compra',
		'aimbot-hack': 'Asistencia soft aim',
		'esp-hack': 'Cajas y weapon drops',
		'unlock-all': 'Qué significa',
	},
	fr: {
		'warzone-esp': 'Boîtes joueur et wallhack',
		'warzone-aimbot': 'Contrôles soft aim',
		features: 'Liste complète des fonctions',
		pricing: 'Mensuel et à vie',
		setup: 'Guide d\'installation PC',
		updates: 'Journal de statut',
		faq: 'Questions fréquentes',
		support: 'Aide et contact',
		undetected: 'Statut indétectable',
		wallhack: 'Visibilité ESP',
		radar: 'Radar 2D des menaces',
		ricochet: 'Maintenance des patchs',
		'cheats-2026': 'Guide acheteur',
		hacks: 'Guide ESP et Aimbot',
		'cheat-download': 'Accès instantané',
		'mod-menu': 'Contrôles en jeu',
		'soft-aim': 'Réglages soft aim',
		'best-cheats': 'Checklist acheteur',
		'aimbot-hack': 'Assistance soft aim',
		'esp-hack': 'Boîtes et weapon drops',
		'unlock-all': 'Ce que ça signifie',
	},
	de: {
		'warzone-esp': 'Spielerboxen & Wallhack',
		'warzone-aimbot': 'Soft-Aim Steuerung',
		features: 'Vollständige Feature-Liste',
		pricing: 'Monatlich & Lifetime',
		setup: 'PC Setup-Anleitung',
		updates: 'Wartungsprotokoll',
		faq: 'Häufige Fragen',
		support: 'Hilfe & Kontakt',
		undetected: 'Undetected Status',
		wallhack: 'ESP Sichtbarkeit',
		radar: '2D Bedrohungsradar',
		ricochet: 'Patch-Wartung',
		'cheats-2026': 'Käuferleitfaden',
		hacks: 'ESP Aimbot Guide',
		'cheat-download': 'Sofortzugang',
		'mod-menu': 'In-Game Toggles',
		'soft-aim': 'Soft-Aim Einstellungen',
		'best-cheats': 'Käufer-Checkliste',
		'aimbot-hack': 'Soft-Aim Assist',
		'esp-hack': 'Boxen & Weapon drops',
		'unlock-all': 'Was es bedeutet',
	},
	pt: {
		'warzone-esp': 'Caixas de jogador e wallhack',
		'warzone-aimbot': 'Controles soft aim',
		features: 'Lista completa de recursos',
		pricing: 'Mensal e vitalício',
		setup: 'Guia de instalação PC',
		updates: 'Registro de estado',
		faq: 'Perguntas frequentes',
		support: 'Ajuda e contato',
		undetected: 'Status indetectável',
		wallhack: 'Visibilidade ESP',
		radar: 'Radar 2D de ameaças',
		ricochet: 'Manutenção de patches',
		'cheats-2026': 'Guia do comprador',
		hacks: 'Guia ESP e Aimbot',
		'cheat-download': 'Acesso instantâneo',
		'mod-menu': 'Controles in-game',
		'soft-aim': 'Ajustes soft aim',
		'best-cheats': 'Checklist do comprador',
		'aimbot-hack': 'Assistência soft aim',
		'esp-hack': 'Caixas e weapon drops',
		'unlock-all': 'O que significa',
	},
	it: {
		'warzone-esp': 'Box giocatore e wallhack',
		'warzone-aimbot': 'Controlli soft aim',
		features: 'Elenco completo funzioni',
		pricing: 'Mensile e lifetime',
		setup: 'Guida setup PC',
		updates: 'Log manutenzione',
		faq: 'Domande frequenti',
		support: 'Aiuto e contatto',
		undetected: 'Stato indetectable',
		wallhack: 'Visibilità ESP',
		radar: 'Radar 2D minacce',
		ricochet: 'Manutenzione patch',
		'cheats-2026': 'Guida acquirente',
		hacks: 'Guida ESP e Aimbot',
		'cheat-download': 'Accesso istantaneo',
		'mod-menu': 'Toggle in-game',
		'soft-aim': 'Impostazioni soft aim',
		'best-cheats': 'Checklist acquirente',
		'aimbot-hack': 'Assist soft aim',
		'esp-hack': 'Box e weapon drops',
		'unlock-all': 'Cosa significa',
	},
	ru: {
		'warzone-esp': 'Боксы игроков и wallhack',
		'warzone-aimbot': 'Управление soft aim',
		features: 'Полный список функций',
		pricing: 'Месяц и lifetime',
		setup: 'Гайд по установке',
		updates: 'Журнал обновлений',
		faq: 'Частые вопросы',
		support: 'Помощь и контакт',
		undetected: 'Статус undetected',
		wallhack: 'Видимость ESP',
		radar: '2D радар угроз',
		ricochet: 'Обслуживание патчей',
		'cheats-2026': 'Гайд покупателя',
		hacks: 'Гайд ESP и Aimbot',
		'cheat-download': 'Мгновенный доступ',
		'mod-menu': 'Игровые переключатели',
		'soft-aim': 'Настройки soft aim',
		'best-cheats': 'Чеклист покупателя',
		'aimbot-hack': 'Soft aim ассист',
		'esp-hack': 'Боксы и лут',
		'unlock-all': 'Что это значит',
	},
};

function productPage(locale, pageKey, topicName, cta2href) {
	const p = phrases[locale];
	const home = PAGE_META_HOME[locale];
	const meta = PAGE_META_TAILS[pageKey] ?? { suffix: 'Warzone Cheats', focus: 'ESP wallhack, radar, and Aimbot', altKeyword: 'ESP aimbot wallhack' };
	const focus = FOCUS_I18N[locale]?.[pageKey] ?? meta.focus;
	const suffix = SUFFIX_I18N[locale]?.[pageKey] ?? meta.suffix;
	const titleBase = `${topicName} | ${suffix}`;
	return {
		title: clampTitle(stripcheckoutFromMeta(titleBase)),
		description: clampDesc(
			stripcheckoutFromMeta(
				`${topicName} for Call of Duty: Warzone Battle Royale and Resurgence on Windows PC — ${focus}. ${p.delivery}. ${p.undetected}. Official warzone cheats at cheatsforwarzone.com.`,
			),
		),
		h1: topicName,
		intro: p.s1(`${topicName}.`),
		imageAlt: PAGE_IMAGE_ALTS[pageKey] || `${topicName} — Warzone Cheats screenshot`,
		galleryTitle: topicName,
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: p.buy,
		ctaSecondary: home.cta2,
		ctaSecondaryHref: cta2href,
		sections: [
			section(topicName, p.s1(`${focus}.`), p.s2()),
			section(`${p.undetected}`, p.s3(), p.s2()),
			section(p.delivery, p.s2(), p.legal()),
		],
	};
}

export const TOPIC_NAMES = {
	'warzone-esp': { en: 'Call of Duty: Warzone ESP', es: 'ESP Call of Duty: Warzone', fr: 'ESP Call of Duty: Warzone', de: 'Call of Duty: Warzone ESP', pt: 'ESP Call of Duty: Warzone', it: 'ESP Call of Duty: Warzone', nl: 'Call of Duty: Warzone ESP', pl: 'ESP Call of Duty: Warzone', ru: 'ESP Call of Duty: Warzone', tr: 'Call of Duty: Warzone ESP', ar: 'ESP Call of Duty: Warzone', ja: 'Call of Duty: Warzone ESP', ko: 'Call of Duty: Warzone ESP', zh: 'Call of Duty: Warzone ESP', hi: 'Call of Duty: Warzone ESP', id: 'ESP Call of Duty: Warzone', th: 'Call of Duty: Warzone ESP', vi: 'ESP Call of Duty: Warzone', uk: 'ESP Call of Duty: Warzone', cs: 'Call of Duty: Warzone ESP', ro: 'ESP Call of Duty: Warzone', sv: 'Call of Duty: Warzone ESP' },
	'warzone-aimbot': { en: 'Call of Duty: Warzone Aimbot', es: 'Aimbot Call of Duty: Warzone', fr: 'Aimbot Call of Duty: Warzone', de: 'Call of Duty: Warzone Aimbot', pt: 'Aimbot Call of Duty: Warzone', it: 'Aimbot Call of Duty: Warzone', nl: 'Call of Duty: Warzone Aimbot', pl: 'Aimbot Call of Duty: Warzone', ru: 'Aimbot Call of Duty: Warzone', tr: 'Call of Duty: Warzone Aimbot', ar: 'Aimbot Call of Duty: Warzone', ja: 'Call of Duty: Warzone Aimbot', ko: 'Call of Duty: Warzone Aimbot', zh: 'Call of Duty: Warzone Aimbot', hi: 'Call of Duty: Warzone Aimbot', id: 'Aimbot Call of Duty: Warzone', th: 'Call of Duty: Warzone Aimbot', vi: 'Aimbot Call of Duty: Warzone', uk: 'Aimbot Call of Duty: Warzone', cs: 'Call of Duty: Warzone Aimbot', ro: 'Aimbot Call of Duty: Warzone', sv: 'Call of Duty: Warzone Aimbot' },
	features: { en: 'Features', es: 'Funciones', fr: 'Fonctions', de: 'Features', pt: 'Recursos', it: 'Funzioni', nl: 'Functies', pl: 'Funkcje', ru: 'Функции', tr: 'Özellikler', ar: 'الميزات', ja: '機能', ko: '기능', zh: '功能', hi: 'फ़ीचर्स', id: 'Fitur', th: 'ฟีเจอร์', vi: 'Tính năng', uk: 'Функції', cs: 'Funkce', ro: 'Funcții', sv: 'Funktioner' },
	pricing: { en: 'Pricing', es: 'Precios', fr: 'Tarifs', de: 'Preise', pt: 'Preços', it: 'Prezzi', nl: 'Prijzen', pl: 'Cennik', ru: 'Цены', tr: 'Fiyatlar', ar: 'الأسعار', ja: '料金', ko: '가격', zh: '价格', hi: 'कीमत', id: 'Harga', th: 'ราคา', vi: 'Giá', uk: 'Ціни', cs: 'Ceny', ro: 'Prețuri', sv: 'Priser' },
	setup: { en: 'Setup', es: 'Instalación', fr: 'Installation', de: 'Setup', pt: 'Instalação', it: 'Setup', nl: 'Setup', pl: 'Instalacja', ru: 'Установка', tr: 'Kurulum', ar: 'التثبيت', ja: 'セットアップ', ko: '설치', zh: '安装', hi: 'सेटअप', id: 'Setup', th: 'ติดตั้ง', vi: 'Cài đặt', uk: 'Встановлення', cs: 'Instalace', ro: 'Instalare', sv: 'Installation' },
	updates: { en: 'Updates', es: 'Actualizaciones', fr: 'Mises à jour', de: 'Updates', pt: 'Atualizações', it: 'Aggiornamenti', nl: 'Updates', pl: 'Aktualizacje', ru: 'Обновления', tr: 'Güncellemeler', ar: 'التحديثات', ja: '更新', ko: '업데이트', zh: '更新', hi: 'अपडेट', id: 'Pembaruan', th: 'อัปเดต', vi: 'Cập nhật', uk: 'Оновлення', cs: 'Aktualizace', ro: 'Actualizări', sv: 'Uppdateringar' },
	faq: { en: 'FAQ', es: 'FAQ', fr: 'FAQ', de: 'FAQ', pt: 'FAQ', it: 'FAQ', nl: 'FAQ', pl: 'FAQ', ru: 'FAQ', tr: 'SSS', ar: 'الأسئلة', ja: 'FAQ', ko: 'FAQ', zh: '常见问题', hi: 'FAQ', id: 'FAQ', th: 'FAQ', vi: 'FAQ', uk: 'FAQ', cs: 'FAQ', ro: 'FAQ', sv: 'FAQ' },
	support: { en: 'Support', es: 'Soporte', fr: 'Support', de: 'Support', pt: 'Suporte', it: 'Supporto', nl: 'Support', pl: 'Wsparcie', ru: 'Поддержка', tr: 'Destek', ar: 'الدعم', ja: 'サポート', ko: '지원', zh: '支持', hi: 'सहायता', id: 'Dukungan', th: 'สนับสนุน', vi: 'Hỗ trợ', uk: 'Підтримка', cs: 'Podpora', ro: 'Suport', sv: 'Support' },
	undetected: { en: 'Undetected Cheats', es: 'Trucos indetectables', fr: 'Triches indétectables', de: 'Undetected Cheats', pt: 'Cheats indetectáveis', it: 'Cheat indetectable', nl: 'Undetected Cheats', pl: 'Cheaty undetected', ru: 'Undetected читы', tr: 'Undetected hileler', ar: 'غش undetected', ja: 'Undetectedチート', ko: 'Undetected 치트', zh: 'Undetected作弊', hi: 'Undetected cheats', id: 'Cheat undetected', th: 'Cheats undetected', vi: 'Cheat undetected', uk: 'Undetected чіти', cs: 'Undetected cheaty', ro: 'Cheats undetected', sv: 'Undetected cheats' },
	wallhack: { en: 'Call of Duty: Warzone Wallhack', es: 'Call of Duty: Warzone Wallhack', fr: 'Call of Duty: Warzone Wallhack', de: 'Call of Duty: Warzone Wallhack', pt: 'Call of Duty: Warzone Wallhack', it: 'Call of Duty: Warzone Wallhack', nl: 'Call of Duty: Warzone Wallhack', pl: 'Call of Duty: Warzone Wallhack', ru: 'Call of Duty: Warzone Wallhack', tr: 'Call of Duty: Warzone Wallhack', ar: 'Call of Duty: Warzone Wallhack', ja: 'Call of Duty: Warzone Wallhack', ko: 'Call of Duty: Warzone Wallhack', zh: 'Call of Duty: Warzone Wallhack', hi: 'Call of Duty: Warzone Wallhack', id: 'Call of Duty: Warzone Wallhack', th: 'Call of Duty: Warzone Wallhack', vi: 'Call of Duty: Warzone Wallhack', uk: 'Call of Duty: Warzone Wallhack', cs: 'Call of Duty: Warzone Wallhack', ro: 'Call of Duty: Warzone Wallhack', sv: 'Call of Duty: Warzone Wallhack' },
	radar: { en: 'Radar Hack', es: 'Radar hack', fr: 'Radar hack', de: 'Radar Hack', pt: 'Radar hack', it: 'Radar hack', nl: 'Radar Hack', pl: 'Radar hack', ru: 'Radar hack', tr: 'Radar hack', ar: 'Radar hack', ja: 'Radar Hack', ko: 'Radar Hack', zh: 'Radar Hack', hi: 'Radar Hack', id: 'Radar hack', th: 'Radar Hack', vi: 'Radar hack', uk: 'Radar hack', cs: 'Radar Hack', ro: 'Radar hack', sv: 'Radar Hack' },
	ricochet: { en: 'Ricochet Bypass', es: 'Bypass Ricochet', fr: 'Bypass Ricochet', de: 'Ricochet Bypass', pt: 'Bypass Ricochet', it: 'Bypass Ricochet', nl: 'Ricochet Bypass', pl: 'Bypass Ricochet', ru: 'Bypass Ricochet', tr: 'Ricochet bypass', ar: 'Bypass Ricochet', ja: 'Ricochet Bypass', ko: 'Ricochet Bypass', zh: 'Ricochet Bypass', hi: 'Ricochet Bypass', id: 'Bypass Ricochet', th: 'Ricochet Bypass', vi: 'Bypass Ricochet', uk: 'Bypass Ricochet', cs: 'Ricochet Bypass', ro: 'Bypass Ricochet', sv: 'Ricochet Bypass' },
	'cheats-2026': { en: 'Warzone Cheats 2026', es: 'Trucos Call of Duty: Warzone 2026', fr: 'Triches Call of Duty: Warzone 2026', de: 'Warzone Cheats 2026', pt: 'Cheats Call of Duty: Warzone 2026', it: 'Cheat Call of Duty: Warzone 2026', nl: 'Warzone Cheats 2026', pl: 'Cheaty Call of Duty: Warzone 2026', ru: 'Читы Call of Duty: Warzone 2026', tr: 'Call of Duty: Warzone Hileleri 2026', ar: 'غش Call of Duty: Warzone 2026', ja: 'Warzone Cheats 2026', ko: 'Warzone Cheats 2026', zh: 'Call of Duty: Warzone作弊 2026', hi: 'Warzone Cheats 2026', id: 'Cheat Call of Duty: Warzone 2026', th: 'Warzone Cheats 2026', vi: 'Cheat Call of Duty: Warzone 2026', uk: 'Чіти Call of Duty: Warzone 2026', cs: 'warzone cheaty 2026', ro: 'Cheats Call of Duty: Warzone 2026', sv: 'Warzone Cheats 2026' },
	hacks: { en: 'Warzone Cheats', es: 'Trucos Call of Duty: Warzone', fr: 'Triches Call of Duty: Warzone', de: 'Warzone Cheats', pt: 'Cheats Call of Duty: Warzone', it: 'Cheat Call of Duty: Warzone', nl: 'Warzone Cheats', pl: 'Cheaty Call of Duty: Warzone', ru: 'Читы Call of Duty: Warzone', tr: 'Call of Duty: Warzone Hileleri', ar: 'غش Call of Duty: Warzone', ja: 'Warzone Cheats', ko: 'Warzone Cheats', zh: 'Call of Duty: Warzone作弊', hi: 'Warzone Cheats', id: 'Cheat Call of Duty: Warzone', th: 'Warzone Cheats', vi: 'Cheat Call of Duty: Warzone', uk: 'Чіти Call of Duty: Warzone', cs: 'warzone cheaty', ro: 'Cheats Call of Duty: Warzone', sv: 'Warzone Cheats' },
	'cheat-download': { en: 'Call of Duty: Warzone Cheat Download', es: 'Descarga Warzone Cheats', fr: 'Téléchargement Warzone Cheats', de: 'Call of Duty: Warzone Cheat Download', pt: 'Download Warzone Cheats', it: 'Download Warzone Cheats', nl: 'Call of Duty: Warzone Cheat Download', pl: 'Pobieranie Warzone Cheats', ru: 'Скачать Warzone Cheats', tr: 'Call of Duty: Warzone Hile İndir', ar: 'تحميل Warzone Cheats', ja: 'Call of Duty: Warzone Cheat Download', ko: 'Call of Duty: Warzone Cheat Download', zh: 'Call of Duty: Warzone作弊下载', hi: 'Call of Duty: Warzone Cheat Download', id: 'Download Cheat Call of Duty: Warzone', th: 'ดาวน์โหลด Warzone Cheats', vi: 'Tải Cheat Call of Duty: Warzone', uk: 'Завантаження Warzone Cheats', cs: 'Stáhnout Warzone Cheats', ro: 'Descărcare Warzone Cheats', sv: 'Call of Duty: Warzone Cheat Download' },
	'mod-menu': { en: 'Call of Duty: Warzone Mod Menu', es: 'Menú mod Call of Duty: Warzone', fr: 'Menu mod Call of Duty: Warzone', de: 'Call of Duty: Warzone Mod-Menü', pt: 'Menu mod Call of Duty: Warzone', it: 'Mod menu Call of Duty: Warzone', nl: 'Call of Duty: Warzone Mod Menu', pl: 'Mod menu Call of Duty: Warzone', ru: 'Мод-меню Call of Duty: Warzone', tr: 'Call of Duty: Warzone Mod Menü', ar: 'قائمة مود Call of Duty: Warzone', ja: 'Call of Duty: Warzone Mod Menu', ko: 'Call of Duty: Warzone 모드 메뉴', zh: 'Call of Duty: Warzone修改菜单', hi: 'Call of Duty: Warzone Mod Menu', id: 'Menu mod Call of Duty: Warzone', th: 'เมนูมอด Call of Duty: Warzone', vi: 'Mod menu Call of Duty: Warzone', uk: 'Мод-меню Call of Duty: Warzone', cs: 'Call of Duty: Warzone mod menu', ro: 'Meniu mod Call of Duty: Warzone', sv: 'Call of Duty: Warzone Mod-meny' },
	'soft-aim': { en: 'Call of Duty: Warzone Soft Aim', es: 'Soft aim Call of Duty: Warzone', fr: 'Soft aim Call of Duty: Warzone', de: 'Call of Duty: Warzone Soft Aim', pt: 'Soft aim Call of Duty: Warzone', it: 'Soft aim Call of Duty: Warzone', nl: 'Call of Duty: Warzone Soft Aim', pl: 'Soft aim Call of Duty: Warzone', ru: 'Soft aim Call of Duty: Warzone', tr: 'Call of Duty: Warzone Soft Aim', ar: 'Soft aim Call of Duty: Warzone', ja: 'Call of Duty: Warzone Soft Aim', ko: 'Call of Duty: Warzone Soft Aim', zh: 'Call of Duty: Warzone Soft Aim', hi: 'Call of Duty: Warzone Soft Aim', id: 'Soft aim Call of Duty: Warzone', th: 'Call of Duty: Warzone Soft Aim', vi: 'Soft aim Call of Duty: Warzone', uk: 'Soft aim Call of Duty: Warzone', cs: 'Call of Duty: Warzone Soft Aim', ro: 'Soft aim Call of Duty: Warzone', sv: 'Call of Duty: Warzone Soft Aim' },
	'best-cheats': { en: 'Best Warzone Cheats', es: 'Mejores trucos Call of Duty: Warzone', fr: 'Meilleures triches Call of Duty: Warzone', de: 'Beste Warzone Cheats', pt: 'Melhores cheats Call of Duty: Warzone', it: 'Migliori cheat Call of Duty: Warzone', nl: 'Beste Warzone Cheats', pl: 'Najlepsze cheaty Call of Duty: Warzone', ru: 'Лучшие читы Call of Duty: Warzone', tr: 'En İyi Call of Duty: Warzone Hileleri', ar: 'أفضل غش Call of Duty: Warzone', ja: '最強Call of Duty: Warzoneチート', ko: '최고의 Call of Duty: Warzone 치트', zh: '最佳Call of Duty: Warzone作弊', hi: 'सर्वश्रेष्ठ Warzone Cheats', id: 'Cheat Call of Duty: Warzone terbaik', th: 'Cheat Call of Duty: Warzone ที่ดีที่สุด', vi: 'Cheat Call of Duty: Warzone tốt nhất', uk: 'Найкращі чіти Call of Duty: Warzone', cs: 'Nejlepší warzone cheaty', ro: 'Cele mai bune cheats Call of Duty: Warzone', sv: 'Bästa Warzone Cheats' },
	'aimbot-hack': { en: 'Call of Duty: Warzone Aimbot Hack', es: 'Hack aimbot Call of Duty: Warzone', fr: 'Hack aimbot Call of Duty: Warzone', de: 'Call of Duty: Warzone Aimbot Hack', pt: 'Hack aimbot Call of Duty: Warzone', it: 'Hack aimbot Call of Duty: Warzone', nl: 'Call of Duty: Warzone Aimbot Hack', pl: 'Hack aimbot Call of Duty: Warzone', ru: 'Хак aimbot Call of Duty: Warzone', tr: 'Call of Duty: Warzone Aimbot Hilesi', ar: 'هاك Aimbot Call of Duty: Warzone', ja: 'Call of Duty: Warzone Aimbot Hack', ko: 'Call of Duty: Warzone 에임봇 핵', zh: 'Call of Duty: Warzone自瞄外挂', hi: 'Call of Duty: Warzone Aimbot Hack', id: 'Hack aimbot Call of Duty: Warzone', th: 'Hack Aimbot Call of Duty: Warzone', vi: 'Hack aimbot Call of Duty: Warzone', uk: 'Хак aimbot Call of Duty: Warzone', cs: 'Call of Duty: Warzone Aimbot hack', ro: 'Hack aimbot Call of Duty: Warzone', sv: 'Call of Duty: Warzone Aimbot Hack' },
	'esp-hack': { en: 'Call of Duty: Warzone ESP Hack', es: 'Hack ESP Call of Duty: Warzone', fr: 'Hack ESP Call of Duty: Warzone', de: 'Call of Duty: Warzone ESP Hack', pt: 'Hack ESP Call of Duty: Warzone', it: 'Hack ESP Call of Duty: Warzone', nl: 'Call of Duty: Warzone ESP Hack', pl: 'Hack ESP Call of Duty: Warzone', ru: 'Хак ESP Call of Duty: Warzone', tr: 'Call of Duty: Warzone ESP Hilesi', ar: 'هاك ESP Call of Duty: Warzone', ja: 'Call of Duty: Warzone ESP Hack', ko: 'Call of Duty: Warzone ESP 핵', zh: 'Call of Duty: Warzone ESP外挂', hi: 'Call of Duty: Warzone ESP Hack', id: 'Hack ESP Call of Duty: Warzone', th: 'Hack ESP Call of Duty: Warzone', vi: 'Hack ESP Call of Duty: Warzone', uk: 'Хак ESP Call of Duty: Warzone', cs: 'Call of Duty: Warzone ESP hack', ro: 'Hack ESP Call of Duty: Warzone', sv: 'Call of Duty: Warzone ESP Hack' },
	'unlock-all': { en: 'Call of Duty: Warzone Unlock All', es: 'Unlock all Call of Duty: Warzone', fr: 'Unlock all Call of Duty: Warzone', de: 'Call of Duty: Warzone Unlock All', pt: 'Unlock all Call of Duty: Warzone', it: 'Unlock all Call of Duty: Warzone', nl: 'Call of Duty: Warzone Unlock All', pl: 'Unlock all Call of Duty: Warzone', ru: 'Unlock all Call of Duty: Warzone', tr: 'Call of Duty: Warzone Unlock All', ar: 'Unlock all Call of Duty: Warzone', ja: 'Call of Duty: Warzone Unlock All', ko: 'Call of Duty: Warzone Unlock All', zh: 'Call of Duty: Warzone Unlock All', hi: 'Call of Duty: Warzone Unlock All', id: 'Unlock all Call of Duty: Warzone', th: 'Call of Duty: Warzone Unlock All', vi: 'Unlock all Call of Duty: Warzone', uk: 'Unlock all Call of Duty: Warzone', cs: 'Call of Duty: Warzone Unlock All', ro: 'Unlock all Call of Duty: Warzone', sv: 'Call of Duty: Warzone Unlock All' },
};

export const CTA2_HREF = {
	'warzone-esp': '/warzone-cheats/',
	'warzone-aimbot': '/warzone-esp/',
	features: '/pricing/',
	pricing: '/setup/',
	setup: '/support/',
	updates: '/warzone-cheats/',
	faq: '/support/',
	support: '/setup/',
	undetected: '/warzone-cheats/',
	wallhack: '/warzone-esp/',
	radar: '/warzone-esp/',
	ricochet: '/updates/',
	'cheats-2026': '/warzone-cheats/',
	hacks: '/features/',
	'cheat-download': '/setup/',
	'mod-menu': '/features/',
	'soft-aim': '/warzone-aimbot/',
	'best-cheats': '/pricing/',
	'aimbot-hack': '/warzone-aimbot/',
	'esp-hack': '/warzone-esp/',
	'unlock-all': '/features/',
};

export function buildLegal(locale, pageKey, kind) {
	const p = phrases[locale];
	const titles = {
		privacy: { es: 'Política de privacidad', fr: 'Politique de confidentialité', de: 'Datenschutz', pt: 'Política de privacidade', it: 'Informativa privacy', nl: 'Privacybeleid', pl: 'Polityka prywatności', ru: 'Политика конфиденциальности', tr: 'Gizlilik politikası', ar: 'سياسة الخصوصية', ja: 'プライバシーポリシー', ko: '개인정보 처리방침', zh: '隐私政策', hi: 'गोपनीयता नीति', id: 'Kebijakan privasi', th: 'นโยบายความเป็นส่วนตัว', vi: 'Chính sách bảo mật', uk: 'Політика конфіденційності', cs: 'Zásady ochrany soukromí', ro: 'Politica de confidențialitate', sv: 'Integritetspolicy' },
		refund: { es: 'Política de reembolso', fr: 'Politique de remboursement', de: 'Rückerstattung', pt: 'Política de reembolso', it: 'Politica di rimborso', nl: 'Restitutiebeleid', pl: 'Polityka zwrotów', ru: 'Политика возврата', tr: 'İade politikası', ar: 'سياسة الاسترداد', ja: '返金ポリシー', ko: '환불 정책', zh: '退款政策', hi: 'रिफंड नीति', id: 'Kebijakan refund', th: 'นโยบายการคืนเงิน', vi: 'Chính sách hoàn tiền', uk: 'Політика повернення', cs: 'Zásady vrácení peněz', ro: 'Politica de rambursare', sv: 'Återbetalningspolicy' },
		terms: { es: 'Términos de uso', fr: 'Conditions d\'utilisation', de: 'Nutzungsbedingungen', pt: 'Termos de uso', it: 'Termini di utilizzo', nl: 'Gebruiksvoorwaarden', pl: 'Warunki użytkowania', ru: 'Условия использования', tr: 'Kullanım şartları', ar: 'شروط الاستخدام', ja: '利用規約', ko: '이용 약관', zh: '使用条款', hi: 'उपयोग की शर्तें', id: 'Syarat penggunaan', th: 'ข้อกำหนดการใช้งาน', vi: 'Điều khoản sử dụng', uk: 'Умови використання', cs: 'Podmínky použití', ro: 'Termeni de utilizare', sv: 'Användarvillkor' },
	};
	const h1 = titles[kind][locale] ?? (kind === 'privacy' ? 'Privacy Policy' : kind === 'refund' ? 'Refund Policy' : 'Terms of Use');
	const L = LEGAL_I18N[locale];
	const pageCopy = L?.[kind] ?? {};
	const h2 = pageCopy.h2 ?? ['Information we collect', 'How we use data', 'Your rights'];
	return {
		title: clampTitle(stripcheckoutFromMeta(`${h1} | Warzone Cheats`)),
		description: clampDesc(stripcheckoutFromMeta(`${h1} ${L?.descFor ?? 'for Warzone Cheats — ESP wallhack, Aimbot'}, ${p.win}.`)),
		h1,
		intro: p.s1(`${h1} ${L?.introTopic ?? 'for cheatsforwarzone.com and Call of Duty: Warzone licenses.'}`),
		imageAlt: 'Warzone Cheats',
		galleryTitle: 'Warzone Cheats',
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: L?.emailSupport ?? 'Email support',
		ctaSecondary:
			kind === 'privacy'
				? L?.readTerms ?? 'Read terms'
				: L?.readPrivacy ?? 'Read privacy',
		ctaSecondaryHref: kind === 'privacy' ? '/terms/' : '/privacy-policy/',
		sections: [
			section(
				h2[0],
				p.s1(L?.sec1p1 ?? 'Contact email, checkout order references, and basic site security data.'),
				kind === 'privacy'
					? L?.privacy?.sec1p2 ?? 'Payment details are processed by secure checkout — not stored on cheatsforwarzone.com.'
					: p.s2(),
			),
			section(
				h2[1],
				p.s1(L?.privacy?.sec2p1 ?? 'Support responses, order resolution, and legal compliance when required.'),
				kind === 'terms'
					? L?.terms?.sec2p2 ?? 'Using cheats may violate Activision terms — you assume all ban risk.'
					: p.s3(),
			),
			section(h2[2], p.legal(), `${L?.emailLabel ?? 'Email:'} support@cheatsforwarzone.com`),
		],
	};
}

/** Build all pages for a non-English locale. */
export function buildPagesForLocale(locale) {
	const pages = { home: buildHome(locale) };
	for (const [pageKey, names] of Object.entries(TOPIC_NAMES)) {
		pages[pageKey] = productPage(locale, pageKey, names[locale], CTA2_HREF[pageKey]);
	}
	for (const kind of ['privacy', 'refund', 'terms']) {
		pages[kind] = buildLegal(locale, kind, kind);
	}
	return pages;
}
