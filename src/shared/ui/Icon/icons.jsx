// Набор инлайновых SVG-иконок (stroke-based). Без внешних зависимостей.
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const IconGlobe = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
)

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const IconChevronRight = (p) => (
  <svg {...base} {...p}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconCopy = (p) => (
  <svg {...base} {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
)

export const IconLock = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

export const IconSearch = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4-4" />
  </svg>
)

export const IconBurger = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconFilter = (p) => (
  <svg {...base} {...p}>
    <path d="M3 5h18l-7 8v5l-4 2v-7z" />
  </svg>
)

export const IconArrowUp = (p) => (
  <svg {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
)

// Сплошной кружок с «!» — статус «истекает» (оранжевый в макете).
export const IconAlert = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="10" />
    <rect x="11" y="7" width="2" height="7" rx="1" fill="#fff" />
    <circle cx="12" cy="16.5" r="1.2" fill="#fff" />
  </svg>
)

// Сплошной кружок с галочкой — статус «оплачен» (зелёный в макете).
export const IconCheckCircle = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="m8 12 2.5 2.5L16 9"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconQuestion = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="10" />
    <path
      d="M9.2 9.3a2.8 2.8 0 0 1 5.4 1c0 1.8-2.6 2-2.6 3.4"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="17" r="1.1" fill="#fff" />
  </svg>
)

// Стилизованный «значок» Госуслуг (условный, не официальный логотип).
export const IconGos = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="11" opacity="0.28" />
    <circle cx="12" cy="12" r="6" />
  </svg>
)
