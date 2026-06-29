// МОК-API доменов. Граница для реальной интеграции:
// разработчики заменят это на агрегацию доменов по ЕСИА-id через API реселлеров.

// Иконки регистраторов (из public/). Нет иконки → запасной кружок в UI.
export const RESELLER_ICONS = {
  'Timeweb Хостинг': '/reg-hosting.svg',
  'Timeweb Cloud': '/reg-cloud.svg',
}

// Реселлеры для фильтра. Порядок как в макете.
export const RESELLERS = ['Timeweb Хостинг', 'Timeweb Cloud', 'Craftum']

// Цвет кружка-глобуса регистратора в мобильном списке.
export const RESELLER_COLORS = {
  'Timeweb Хостинг': '#2977b5',
  'Timeweb Cloud': '#464cee',
  Craftum: '#25a668',
}

const MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]
const HOSTINGS = ['Виртуальный хостинг', 'Облачный сервер', 'VDS', 'Выделенный сервер']

// Опорная дата прототипа (для расчёта «истекает скоро»).
const REFERENCE = new Date('2026-06-29T00:00:00')
const WARNING_DAYS = 60

function formatRuDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}
function statusFor(iso) {
  const days = (new Date(`${iso}T00:00:00`) - REFERENCE) / 86400000
  return days <= WARNING_DAYS ? 'warning' : 'ok'
}

// 50 доменов в зоне .ru с названиями в духе российских компаний.
// Источник в произвольном порядке — список сортируется по сроку в UI.
const RAW = [
  { name: 'coconote.ru', expiresAt: '2027-04-15' },
  { name: 'stroymarket-spb.ru', expiresAt: '2026-07-04' },
  { name: 'agroholding-kuban.ru', expiresAt: '2027-11-02' },
  { name: 'mebelgrad.ru', expiresAt: '2026-08-22' },
  { name: 'teplodom.ru', expiresAt: '2028-01-19' },
  { name: 'avtozapchasti-msk.ru', expiresAt: '2026-07-12' },
  { name: 'uralmetall.ru', expiresAt: '2027-02-28' },
  { name: 'sibtransservice.ru', expiresAt: '2026-09-30' },
  { name: 'nevskie-okna.ru', expiresAt: '2026-07-21' },
  { name: 'volgastroy.ru', expiresAt: '2027-06-11' },
  { name: 'medtehnika-plus.ru', expiresAt: '2026-08-08' },
  { name: 'promelektronika.ru', expiresAt: '2028-03-05' },
  { name: 'dvermaster.ru', expiresAt: '2026-10-14' },
  { name: 'rybnoe-mesto.ru', expiresAt: '2027-01-23' },
  { name: 'cvetochnyy-ryad.ru', expiresAt: '2026-07-29' },
  { name: 'knizhnyy-dvor.ru', expiresAt: '2027-09-17' },
  { name: 'chistyy-dom.ru', expiresAt: '2026-12-01' },
  { name: 'zelenaya-ferma.ru', expiresAt: '2028-05-20' },
  { name: 'gorodok-detstva.ru', expiresAt: '2026-08-14' },
  { name: 'tehnomir-nn.ru', expiresAt: '2027-03-30' },
  { name: 'yugstroyinvest.ru', expiresAt: '2026-11-08' },
  { name: 'baltika-logistik.ru', expiresAt: '2027-07-25' },
  { name: 'domashniy-uyut.ru', expiresAt: '2026-09-12' },
  { name: 'avtoremont-24.ru', expiresAt: '2026-07-07' },
  { name: 'kofeynya-utro.ru', expiresAt: '2028-02-14' },
  { name: 'svetotehnika-pro.ru', expiresAt: '2027-05-06' },
  { name: 'mir-instrumenta.ru', expiresAt: '2026-10-28' },
  { name: 'specodezhda-opt.ru', expiresAt: '2027-12-19' },
  { name: 'ekoprodukt-rf.ru', expiresAt: '2026-08-03' },
  { name: 'stankoservice.ru', expiresAt: '2028-06-09' },
  { name: 'yuvelirnyy-salon.ru', expiresAt: '2027-08-22' },
  { name: 'apteka-zdorovie.ru', expiresAt: '2026-09-05' },
  { name: 'fitnes-energiya.ru', expiresAt: '2026-12-27' },
  { name: 'turagentstvo-mir.ru', expiresAt: '2027-04-02' },
  { name: 'remont-kvartir-spb.ru', expiresAt: '2026-08-18' },
  { name: 'detskiy-sad-solnyshko.ru', expiresAt: '2028-04-11' },
  { name: 'avtoshkola-start.ru', expiresAt: '2027-10-30' },
  { name: 'pekarnya-kolosok.ru', expiresAt: '2026-11-21' },
  { name: 'yurservice-prof.ru', expiresAt: '2027-01-09' },
  { name: 'buhuchet-online.ru', expiresAt: '2026-10-02' },
  { name: 'clean-service-msk.ru', expiresAt: '2028-07-15' },
  { name: 'gruzoperevozki-rf.ru', expiresAt: '2027-06-28' },
  { name: 'okna-dveri-plus.ru', expiresAt: '2026-09-23' },
  { name: 'santehnika-shop.ru', expiresAt: '2027-03-12' },
  { name: 'krovelnyy-centr.ru', expiresAt: '2026-12-14' },
  { name: 'avtomoyka-blesk.ru', expiresAt: '2027-11-19' },
  { name: 'zoomagazin-drug.ru', expiresAt: '2026-10-09' },
  { name: 'tipografiya-print.ru', expiresAt: '2028-08-01' },
  { name: 'reklama-vektor.ru', expiresAt: '2027-05-27' },
  { name: 'it-resheniya.ru', expiresAt: '2026-11-30' },
  { name: 'carpfishing.ru', expiresAt: '2027-04-15' },
]

const MOCK_DOMAINS = RAW.map((d, i) => ({
  name: d.name,
  reseller: RESELLERS[i % RESELLERS.length],
  hosting: HOSTINGS[i % HOSTINGS.length],
  expiresAt: d.expiresAt,
  paidUntil: formatRuDate(d.expiresAt),
  dateStatus: statusFor(d.expiresAt),
}))

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// Список верифицированных доменов пользователя.
export async function fetchDomains() {
  await delay(150)
  return MOCK_DOMAINS
}
