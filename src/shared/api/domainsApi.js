// МОК-API доменов. Граница для реальной интеграции:
// разработчики заменят это на агрегацию доменов по ЕСИА-id через API реселлеров.

// Иконки регистраторов (из public/). Нет иконки → запасной кружок в UI.
export const RESELLER_ICONS = {
  'Timeweb Хостинг': '/reg-hosting.svg',
  'Timeweb Cloud': '/reg-cloud.svg',
}

// Реселлеры для фильтра. Порядок как в макете.
export const RESELLERS = ['Timeweb Хостинг', 'Timeweb Cloud', 'Craftum']

const MOCK_DOMAINS = [
  {
    name: 'basketballgame-spb.ru',
    reseller: 'Timeweb Хостинг',
    paidUntil: '9 августа 2026',
    dateStatus: 'warning',
    hosting: 'Виртуальный хостинг',
  },
  {
    name: 'coconote.ru',
    reseller: 'Timeweb Cloud',
    paidUntil: '15 апреля 2027',
    dateStatus: 'ok',
    hosting: 'Облачный сервер',
  },
  {
    name: 'carpfishing.ru',
    reseller: 'Timeweb Хостинг',
    paidUntil: '15 апреля 2027',
    dateStatus: 'ok',
    hosting: 'Виртуальный хостинг',
  },
]

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// Список верифицированных доменов пользователя.
export async function fetchDomains() {
  await delay(150)
  return MOCK_DOMAINS
}
