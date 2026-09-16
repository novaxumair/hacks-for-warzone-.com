import type { LocaleCode } from './locales';

export type GalleryUi = {
	eyebrow: string;
	title: string;
	subtitle: string;
	lead: string;
	highlights: { title: string; copy: string }[];
	updatesLabel: string;
	updatesShort: string;
};

export const galleryUi: Record<LocaleCode, GalleryUi> = {
	en: {
		eyebrow: 'Warzone Cheats',
		title: 'Warzone Cheats gallery',
		subtitle: 'Simple warzone cheats visuals — ESP, wallhack, aimbot, and radar for Call of Duty: Warzone on PC.',
		lead: 'Warzone Cheats helps you spot players, agents, abilities, and bomb sites with ESP, aimbot, and radar in one license.',
		highlights: [
			{ title: 'warzone cheats esp', copy: 'See players through walls with warzone cheats esp and wallhack overlays.' },
			{ title: 'warzone cheats radar', copy: 'Track nearby threats with warzone cheats radar before you push or rotate.' },
			{ title: 'warzone cheats aimbot', copy: 'Use soft aim and aimbot controls tuned for Call of Duty: Warzone matches on Windows PC.' },
		],
		updatesLabel: 'warzone cheats updates',
		updatesShort: 'Updates',
	},
	es: {
		eyebrow: 'Warzone Cheats',
		title: 'Galería Call of Duty: Warzone',
		subtitle: 'Visuales de Call of Duty: Warzone con loadouts, peleas de equipo y combate match — junto a herramientas ESP, radar y Aimbot.',
		lead: 'Warzone Cheats está pensado para el loop competitivo de Call of Duty: Warzone: leer el mapa, rastrear escuadrones enemigos, weapon dropsear y ganar rondas.',
		highlights: [
			{ title: 'ESP de players y escuadrones', copy: 'Detecta players enemigos y contornos de equipo en mapas y loadout drop routes para elegir peleas con mejor información.' },
			{ title: 'Marcadores de weapon drops y cofres', copy: 'Resalta loadouts, cofres y weapon drops de alto nivel sin saturar la pantalla en plena partida.' },
			{ title: 'Controles Aimbot Call of Duty: Warzone', copy: 'Ajusta suavidad, prioridad de objetivo y teclas para AR, SMG y francotirador antes de comprar.' },
		],
		updatesLabel: 'Actualizaciones Warzone Cheats',
		updatesShort: 'Updates',
	},
	fr: {
		eyebrow: 'Warzone Cheats',
		title: 'Galerie Call of Duty: Warzone',
		subtitle: 'Visuels Call of Duty: Warzone — loadouts, combats d\'équipe et match — avec ESP, radar et Aimbot.',
		lead: 'Warzone Cheats suit la boucle competitivo de Call of Duty: Warzone : lire la carte, suivre les équipes, weapon drops et gagner les rounds.',
		highlights: [
			{ title: 'ESP players & équipes', copy: 'Repérez les players ennemis sur cartes et loadout drop routes pour choisir vos engagements.' },
			{ title: 'Marqueurs weapon drops & coffres', copy: 'Mettez en évidence loadouts, coffres et weapon drops haut niveau sans encombrer l\'écran.' },
			{ title: 'Réglages Aimbot Call of Duty: Warzone', copy: 'Ajustez fluidité, priorité cible et raccourcis pour AR, SMG et sniper.' },
		],
		updatesLabel: 'Mises à jour Warzone Cheats',
		updatesShort: 'Updates',
	},
	de: {
		eyebrow: 'Warzone Cheats',
		title: 'Call of Duty: Warzone Galerie',
		subtitle: 'Call of Duty: Warzone-Bilder zu Loadouts, Squad-Kämpfen und match — mit ESP, Radar und Aimbot.',
		lead: 'Warzone Cheats passt zur Raid-Schleife von Call of Duty: Warzone: Karte lesen, Gegner tracken, weapon dropsen und matches überleben.',
		highlights: [
			{ title: 'Player- & Squad-ESP', copy: 'Erkenne feindliche Playeren auf Karten und loadout drop routes für bessere Rotationsentscheidungen.' },
			{ title: 'Weapon drops- & Vertragsmarker', copy: 'Hebe Loadout-Drops, Verträge und High-Tier-Weapon drops hervor ohne Screen-Spam.' },
			{ title: 'Call of Duty: Warzone Aimbot Steuerung', copy: 'Feinjustiere Glätte, Zielpriorität und Hotkeys für AR, SMG und Sniper.' },
		],
		updatesLabel: 'Warzone Cheats Updates',
		updatesShort: 'Updates',
	},
	pt: {
		eyebrow: 'Warzone Cheats',
		title: 'Galeria Call of Duty: Warzone',
		subtitle: 'Visuais de Call of Duty: Warzone com loadouts, combates de esquadrão e match — com ESP, radar e Aimbot.',
		lead: 'Warzone Cheats segue o loop BR do Call of Duty: Warzone: ler o mapa, rastrear equipes, weapon dropsar e sobreviver ao extract.',
		highlights: [
			{ title: 'ESP de players e equipes', copy: 'Detecte players inimigos em mappe e loadout drop routes para escolher lutas com melhor intel.' },
			{ title: 'Marcadores de weapon drops e cofres', copy: 'Destaque loadouts, cofres e weapon drops de alto nível sem poluir a tela.' },
			{ title: 'Controles Aimbot Call of Duty: Warzone', copy: 'Ajuste suavidade, prioridade de alvo e atalhos para AR, SMG e sniper.' },
		],
		updatesLabel: 'Atualizações Warzone Cheats',
		updatesShort: 'Updates',
	},
	it: {
		eyebrow: 'Warzone Cheats',
		title: 'Galleria Call of Duty: Warzone',
		subtitle: 'Immagini Call of Duty: Warzone — loadout, scontri di squadra e match — con ESP, radar e Aimbot.',
		lead: 'Warzone Cheats è pensato per il loop BR di Call of Duty: Warzone: leggere la mappa, tracciare squadre nemiche, weapon drops e sopravvivere al extract.',
		highlights: [
			{ title: 'ESP playeri e squadre', copy: 'Individua playeri nemici su mappe e loadout drop routes per scegliere i fight con più intel.' },
			{ title: 'Marker weapon drops e coffreti', copy: 'Evidenzia loadout, coffreti e weapon drops di alto livello senza riempire lo schermo.' },
			{ title: 'Controlli Aimbot Call of Duty: Warzone', copy: 'Regola smoothness, priorità bersaglio e hotkey per AR, SMG e sniper.' },
		],
		updatesLabel: 'Aggiornamenti Warzone Cheats',
		updatesShort: 'Updates',
	},
	nl: {
		eyebrow: 'Warzone Cheats',
		title: 'Call of Duty: Warzone galerij',
		subtitle: 'Call of Duty: Warzone-beelden van loadouts, squadgevechten en match — met ESP, radar en Aimbot.',
		lead: 'Warzone Cheats volgt de match-loop va Call of Duty: Warzone: kaart lezen, vijandelijke squads volgen, jagen en buy stations overleven.',
		highlights: [
			{ title: 'Player- & squad-ESP', copy: 'Spot vijandelijke players op mappe en loadout drop routes voor betere rotatiebeslissingen.' },
			{ title: 'Weapon drops- & chestmarkers', copy: 'Markeer loadout-drops, chesten en high-tier weapon drops zonder schermoverlast.' },
			{ title: 'Call of Duty: Warzone Aimbot instellingen', copy: 'Stel smoothness, doelprioriteit en hotkeys af voor AR, SMG en sniper.' },
		],
		updatesLabel: 'Warzone Cheats updates',
		updatesShort: 'Updates',
	},
	pl: {
		eyebrow: 'Warzone Cheats',
		title: 'Galeria Call of Duty: Warzone',
		subtitle: 'Grafiki Call of Duty: Warzone — loadouty, walki drużynowe i match — z ESP, radar i Aimbot.',
		lead: 'Warzone Cheats pasuje do pętli BR Call of Duty: Warzone: czytaj mapę, śledź wrogie drużyny, weapon dropsuj i przeżyj extract.',
		highlights: [
			{ title: 'ESP players i drużyn', copy: 'Wykrywaj wrogich players na mapy i loadout drop routes dla lepszych decyzji rotacyjnych.' },
			{ title: 'Markery weapon dropsu i skrzyń', copy: 'Podświetlaj loadouty, petity i wysokiej klasy weapon drops bez zaśmiecania ekranu.' },
			{ title: 'Sterowanie Aimbot Call of Duty: Warzone', copy: 'Dostosuj płynność, priorytet celu i skróty dla AR, SMG i snajperki.' },
		],
		updatesLabel: 'Aktualizacje Warzone Cheats',
		updatesShort: 'Updates',
	},
	ru: {
		eyebrow: 'Warzone Cheats',
		title: 'Галерея Call of Duty: Warzone',
		subtitle: 'Визуалы Call of Duty: Warzone — лоадауты, бои отрядов и match — с ESP, радаром и Aimbot.',
		lead: 'Warzone Cheats создан для рейд-циклу Call of Duty: Warzone: читать карту, отслеживать вражеские отряды, лут и выживать в extract.',
		highlights: [
			{ title: 'ESP игроков и отрядов', copy: 'Замечайте вражеских игроков на карты и loadout drop routes для лучших решений по ротации.' },
			{ title: 'Маркеры лута и сундуков', copy: 'Подсвечивайте loadout, сундуки и высокий лут без перегрузки экрана.' },
			{ title: 'Настройки Aimbot Call of Duty: Warzone', copy: 'Настройте плавность, приоритет цели и горячие клавиши для AR, SMG и снайперки.' },
		],
		updatesLabel: 'Обновления Warzone Cheats',
		updatesShort: 'Updates',
	},
	tr: {
		eyebrow: 'Warzone Cheats',
		title: 'Call of Duty: Warzone galerisi',
		subtitle: 'Loadout, takım savaşları ve match görselleri — ESP, radar ve Aimbot ile.',
		lead: 'Warzone Cheats, Call of Duty: Warzone BR döngüsü için: haritayı oku, düşman takımları izle, weapon drops al ve extract\'da hayatta kal.',
		highlights: [
			{ title: 'Player ve takım ESP', copy: 'haritalar ve loadout drop routes\'da düşman playerleri görerek daha iyi rotasyon kararları alın.' },
			{ title: 'Weapon drops ve kontrat işaretleri', copy: 'Loadout, kontrat ve üst seviye weapon drops\'u ekranı doldurmadan vurgulayın.' },
			{ title: 'Call of Duty: Warzone Aimbot kontrolleri', copy: 'AR, SMG ve sniper için yumuşaklık, hedef önceliği ve kısayolları ayarlayın.' },
		],
		updatesLabel: 'Warzone Cheats güncellemeleri',
		updatesShort: 'Updates',
	},
	ar: {
		eyebrow: 'Warzone Cheats',
		title: 'معرض Call of Duty: Warzone',
		subtitle: 'صور Call of Duty: Warzone — loadouts ومعارك الفرق وsession — مع ESP ورادار وAimbot.',
		lead: 'Warzone Cheats مبني لحلقة BR في Call of Duty: Warzone: قراءة الخريطة، تتبع الفرق، جمع اللوت والنجاة في extract.',
		highlights: [
			{ title: 'ESP للمشغلين والفرق', copy: 'اكتشف players المعادين على خرائط وloadout drop routes لاختيار القتالات بذكاء.' },
			{ title: 'علامات اللوت والصناديق', copy: 'أبرز loadouts والصناديق واللوت العالي دون ازدحام الشاشة.' },
			{ title: 'تحكم Aimbot Call of Duty: Warzone', copy: 'اضبط النعومة وأولوية الهدف والاختصارات للـ AR وSMG والقناص.' },
		],
		updatesLabel: 'تحديثات Warzone Cheats',
		updatesShort: 'Updates',
	},
	ja: {
		eyebrow: 'Warzone Cheats',
		title: 'Call of Duty: Warzone ギャラリー',
		subtitle: 'ロードアウト、スクワッド戦、BRコンバットのCall of Duty: Warzoneビジュアル — ESP、レーダー、エイムボット付き。',
		lead: 'Warzone CheatsはCall of Duty: WarzoneのBRループ向け：マップを読み、敵スクワッドを追跡し、ルートしてextractを生き延びる。',
		highlights: [
			{ title: 'players＆スクワッドESP', copy: 'マップとloadout drop routesで敵playersを把握し、ローテ判断を改善。' },
			{ title: 'ルート＆チェストマーカー', copy: 'ロードアウト、チェスト、高ティアルートを画面を埋めずに表示。' },
			{ title: 'Call of Duty: Warzoneエイムボット設定', copy: 'AR、SMG、スナイパー向けにスムーズさ、ターゲット優先度、ホットキーを調整。' },
		],
		updatesLabel: 'Warzone Cheats更新',
		updatesShort: 'Updates',
	},
	ko: {
		eyebrow: 'Warzone Cheats',
		title: 'Call of Duty: Warzone 갤러리',
		subtitle: '로드아웃, 스쿼드 전투, BR 컴뱃 Call of Duty: Warzone 비주얼 — ESP, 레이더, 에임봇 포함.',
		lead: 'Warzone Cheats는 Call of Duty: Warzone survival loop용: 맵 읽기, 적 스쿼드 추적, 루트 수집, extract 생존.',
		highlights: [
			{ title: 'players & 스쿼드 ESP', copy: '맵과 loadout drop routes에서 적 players를 파악해 로테이션 결정을 개선.' },
			{ title: '루트 & 상자 마커', copy: '로드아웃, 상자, 고티어 루트를 화면을 가리지 않고 강조.' },
			{ title: 'Call of Duty: Warzone 에임봇 컨트롤', copy: 'AR, SMG, 스나이퍼용 부드러움, 타겟 우선순위, 단축키 조정.' },
		],
		updatesLabel: 'Warzone Cheats 업데이트',
		updatesShort: 'Updates',
	},
	zh: {
		eyebrow: 'Warzone Cheats',
		title: 'Call of Duty: Warzone 图库',
		subtitle: 'Call of Duty: Warzone 视觉 — 配装、小队战斗和大逃杀 — 配合 ESP、雷达和自瞄。',
		lead: 'Warzone Cheats 为 Call of Duty: Warzone match loop设计：读图、追踪敌方小队、搜刮并在 base survival。',
		highlights: [
			{ title: 'players与小队 ESP', copy: '在 地图和 loadout drop routes 发现敌方players，做出更好的转点决策。' },
			{ title: '物资与宝箱标记', copy: '高亮配装、宝箱和高级物资，不遮挡屏幕。' },
			{ title: 'Call of Duty: Warzone 自瞄控制', copy: '调整 AR、SMG 和狙击的平滑度、目标优先级和热键。' },
		],
		updatesLabel: 'Warzone Cheats 更新',
		updatesShort: 'Updates',
	},
	hi: {
		eyebrow: 'Warzone Cheats',
		title: 'Call of Duty: Warzone गैलरी',
		subtitle: 'Loadout, team fights और match visuals — ESP, radar और Aimbot के साथ।',
		lead: 'Warzone Cheats Call of Duty: Warzone match loop के लिए: map पढ़ें, enemy squads track करें, weapon drops करें और base survival करें।',
		highlights: [
			{ title: 'Player & Squad ESP', copy: 'मैप और loadout drop routes पर enemy players spot करें बेहतर rotation decisions के लिए।' },
			{ title: 'Weapon drops & Chest Markers', copy: 'Loadout drops, chests और high-tier weapon drops highlight करें screen clutter के बिना।' },
			{ title: 'Call of Duty: Warzone Aimbot Controls', copy: 'AR, SMG और sniper के लिए smoothness, target priority और hotkeys tune करें।' },
		],
		updatesLabel: 'Warzone Cheats updates',
		updatesShort: 'Updates',
	},
	id: {
		eyebrow: 'Warzone Cheats',
		title: 'Galeri Call of Duty: Warzone',
		subtitle: 'Visual Call of Duty: Warzone — loadout, pertempuran squad, dan match — dengan ESP, radar, dan Aimbot.',
		lead: 'Warzone Cheats untuk loop BR Call of Duty: Warzone: baca peta, lacak squad musuh, weapon drops, dan selamat di extract.',
		highlights: [
			{ title: 'ESP player & squad', copy: 'Deteksi player musuh di peta dan loadout drop routes untuk keputusan rotasi lebih baik.' },
			{ title: 'Marker weapon drops & peti', copy: 'Sorot loadout, peti, dan weapon drops tier tinggi tanpa membanjiri layar.' },
			{ title: 'Kontrol Aimbot Call of Duty: Warzone', copy: 'Atur smoothness, prioritas target, dan hotkey untuk AR, SMG, dan sniper.' },
		],
		updatesLabel: 'Update Warzone Cheats',
		updatesShort: 'Updates',
	},
	th: {
		eyebrow: 'Warzone Cheats',
		title: 'แกลเลอรี Call of Duty: Warzone',
		subtitle: 'ภาพ Call of Duty: Warzone — loadout การต่อสู้ทีม และ match — พร้อม ESP เรดาร์และ Aimbot',
		lead: 'Warzone Cheats สำหรับลูป BR ของ Call of Duty: Warzone: อ่านแผนที่ ติดตามทีมศัตรู เก็บ weapon drops และรอด extract',
		highlights: [
			{ title: 'ESP ผู้เล่นและทีม', copy: 'มองเห็นศัตรูบน แผนที่และ loadout drop routes เพื่อตัดสินใจหมุนเวียนได้ดีขึ้น' },
			{ title: 'มาร์กเกอร์ weapon drops และหีบ', copy: 'เน้น loadout หีบและ weapon drops ระดับสูงโดยไม่รกหน้าจอ' },
			{ title: 'ควบคุม Aimbot Call of Duty: Warzone', copy: 'ปรับความนุ่ม ลำดับเป้าหมาย และ hotkey สำหรับ AR SMG และ sniper' },
		],
		updatesLabel: 'อัปเดต Warzone Cheats',
		updatesShort: 'Updates',
	},
	vi: {
		eyebrow: 'Warzone Cheats',
		title: 'Thư viện Call of Duty: Warzone',
		subtitle: 'Hình ảnh Call of Duty: Warzone — loadout, chiến đấu squad và match — với ESP, radar và Aimbot.',
		lead: 'Warzone Cheats cho vòng BR Call of Duty: Warzone: đọc bản đồ, theo dõi squad địch, weapon drops và sống sót extract.',
		highlights: [
			{ title: 'ESP player & squad', copy: 'Phát hiện player địch trên bản đồ và loadout drop routes để quyết định rotate tốt hơn.' },
			{ title: 'Đánh dấu weapon drops & rương', copy: 'Làm nổi bật loadout, rương và weapon drops cao cấp mà không che màn hình.' },
			{ title: 'Điều khiển Aimbot Call of Duty: Warzone', copy: 'Tinh chỉnh độ mượt, ưu tiên mục tiêu và phím tắt cho AR, SMG và sniper.' },
		],
		updatesLabel: 'Cập nhật Warzone Cheats',
		updatesShort: 'Updates',
	},
	uk: {
		eyebrow: 'Warzone Cheats',
		title: 'Галерея Call of Duty: Warzone',
		subtitle: 'Візуали Call of Duty: Warzone — loadout, бої загонів і match — з ESP, радаром і Aimbot.',
		lead: 'Warzone Cheats для рейд-циклу Call of Duty: Warzone: читати карту, відстежувати ворожі загони, лут і виживати в extract.',
		highlights: [
			{ title: 'ESP гравців і загонів', copy: 'Помічайте ворожих гравців на Map і loadout drop routes для кращих ротацій.' },
			{ title: 'Маркери луту й скринь', copy: 'Підсвічуйте loadout, контракти та високий лут без перевантаження екрана.' },
			{ title: 'Налаштування Aimbot Call of Duty: Warzone', copy: 'Налаштуйте плавність, пріоритет цілі та гарячі клавіші для AR, SMG і снайперки.' },
		],
		updatesLabel: 'Оновлення Warzone Cheats',
		updatesShort: 'Updates',
	},
	cs: {
		eyebrow: 'Warzone Cheats',
		title: 'Galerie Call of Duty: Warzone',
		subtitle: 'Call of Duty: Warzone vizuály — loadouty, squad souboje a match — s ESP, radarem a Aimbot.',
		lead: 'Warzone Cheats pro BR smyčku Call of Duty: Warzone: číst mapu, sledovat nepřátelské squady, weapon drops a přežít extract.',
		highlights: [
			{ title: 'ESP players a squadů', copy: 'Spozorujte nepřátelské operátory na mapy a loadout drop routes pro lepší rotační rozhodnutí.' },
			{ title: 'Markery weapon dropsu a petitů', copy: 'Zvýrazněte loadouty, petity a high-tier weapon drops bez přeplnění obrazovky.' },
			{ title: 'Ovládání Aimbot Call of Duty: Warzone', copy: 'Nastavte smoothness, prioritu cíle a hotkeys pro AR, SMG a sniper.' },
		],
		updatesLabel: 'Aktualizace Warzone Cheats',
		updatesShort: 'Updates',
	},
	ro: {
		eyebrow: 'Warzone Cheats',
		title: 'Galerie Call of Duty: Warzone',
		subtitle: 'Vizualuri Call of Duty: Warzone — loadout, lupte de squad și match — cu ESP, radar și Aimbot.',
		lead: 'Warzone Cheats pentru bucla BR Call of Duty: Warzone: citește harta, urmărește squad-uri inamice, weapon drops și supraviețuiește extract.',
		highlights: [
			{ title: 'ESP playeri și squad-uri', copy: 'Detectează playeri inamici pe Map și loadout drop routes pentru decizii de rotație mai bune.' },
			{ title: 'Markere weapon drops și cheste', copy: 'Evidențiază loadout-uri, cheste și weapon drops de nivel înalt fără a aglomera ecranul.' },
			{ title: 'Controale Aimbot Call of Duty: Warzone', copy: 'Ajustează smoothness, prioritate țintă și hotkeys pentru AR, SMG și sniper.' },
		],
		updatesLabel: 'Actualizări Warzone Cheats',
		updatesShort: 'Updates',
	},
	sv: {
		eyebrow: 'Warzone Cheats',
		title: 'Call of Duty: Warzone galleri',
		subtitle: 'Call of Duty: Warzone-bilder — loadouts, squadstrider och match — med ESP, radar och Aimbot.',
		lead: 'Warzone Cheats för Call of Duty: Warzone:s match-loop: läs kartan, spåra fiendesquads, weapon dropsa och överlev extract.',
		highlights: [
			{ title: 'Player- & squad-ESP', copy: 'Spotta fiendeplayerer på kartor och loadout drop routes för bättre rotationsbeslut.' },
			{ title: 'Weapon drops- & petitsmarkörer', copy: 'Markera loadout-drops, petit och high-tier weapon drops utan skärmklutter.' },
			{ title: 'Call of Duty: Warzone Aimbot-kontroller', copy: 'Justera smoothness, målprioritet och snabbtangenter för AR, SMG och sniper.' },
		],
		updatesLabel: 'Warzone Cheats uppdateringar',
		updatesShort: 'Updates',
	},
};

export function getGalleryUi(locale: LocaleCode): GalleryUi {
	return galleryUi[locale];
}
