// Мок-данные панели регистратора. Без бэкенда — это справочный прототип.
// Данные приведены к макету Figma (узел 66454:18222).

export const USER = {
  name: 'Ильюков Никита Сергеевич',
  fullName: 'Ильюков Никита Сергеевич',
  esiaVerified: true,
}

// Статус оплаты домена («Оплачен до»): ok — зелёный, warning — оранжевый.
export const DATE_STATUS = {
  ok: { tone: 'green' },
  warning: { tone: 'orange' },
}

// Реселлеры (регистраторы) — для чипов-фильтра. Порядок как в макете.
export const RESELLERS = ['Timeweb Хостинг', 'Timeweb Cloud', 'Craftum']

// Иконки регистраторов (из public/). Если иконки нет — рендерим запасной кружок.
export const RESELLER_ICONS = {
  'Timeweb Хостинг': '/reg-hosting.svg',
  'Timeweb Cloud': '/reg-cloud.svg',
}

export const DOMAINS = [
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

// Ссылки футера «Частые вопросы».
export const FAQ_LINKS = [
  'Как добавить домен?',
  'Как передать домен другому лицу?',
  'Как сменить регистратора?',
]

// Демо-код верификации. TTL — 30 минут.
export const VERIFICATION_CODE = 'TWD-7K4P-9X2M'
export const CODE_TTL_SECONDS = 30 * 60
