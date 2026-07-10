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

export const IconLogout = (p) => (
  <svg {...base} {...p}>
    <path d="M13 4H8a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h5" />
    <path d="m17 8 4 4-4 4M21 12H9" />
  </svg>
)

export const IconClose = (p) => (
  <svg {...base} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export const IconArrowLeft = (p) => (
  <svg {...base} {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
)

export const IconUser = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
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
    <rect x="11" y="7" width="2" height="7" rx="1" style={{ fill: 'var(--badge-mark, #fff)' }} />
    <circle cx="12" cy="16.5" r="1.2" style={{ fill: 'var(--badge-mark, #fff)' }} />
  </svg>
)

// Сплошной кружок с галочкой — статус «оплачен» (зелёный в макете).
export const IconCheckCircle = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="m8 12 2.5 2.5L16 9"
      fill="none"
      style={{ stroke: 'var(--badge-mark, #fff)' }}
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

// Солнце — светлая тема (макет, fill → currentColor).
export const IconSun = (p) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25ZM9 12.75C11.0711 12.75 12.75 11.0711 12.75 9C12.75 6.92893 11.0711 5.25 9 5.25C6.92893 5.25 5.25 6.92893 5.25 9C5.25 11.0711 6.92893 12.75 9 12.75Z"
    />
    <path d="M8.25 2.25C8.25 1.83579 8.58579 1.5 9 1.5C9.41421 1.5 9.75 1.83579 9.75 2.25V3C9.75 3.41421 9.41421 3.75 9 3.75C8.58579 3.75 8.25 3.41421 8.25 3V2.25Z" />
    <path d="M4.227 5.28814C4.5199 5.58104 4.99477 5.58104 5.28766 5.28814C5.58056 4.99525 5.58056 4.52038 5.28766 4.22748L4.75733 3.69715C4.46444 3.40426 3.98957 3.40426 3.69667 3.69715C3.40378 3.99005 3.40378 4.46492 3.69667 4.75781L4.227 5.28814Z" />
    <path d="M14.3033 3.69732C14.0104 3.40443 13.5356 3.40443 13.2427 3.69732L12.7123 4.22765C12.4195 4.52055 12.4195 4.99542 12.7123 5.28831C13.0052 5.58121 13.4801 5.58121 13.773 5.28831L14.3033 4.75798C14.5962 4.46509 14.5962 3.99022 14.3033 3.69732Z" />
    <path d="M5.28778 12.712C4.99488 12.4191 4.52001 12.4191 4.22712 12.712L3.69679 13.2423C3.40389 13.5352 3.40389 14.0101 3.69679 14.303C3.98968 14.5959 4.46455 14.5959 4.75745 14.303L5.28778 13.7726C5.58067 13.4797 5.58067 13.0049 5.28778 12.712Z" />
    <path d="M14.3032 14.3028C14.0103 14.5957 13.5355 14.5957 13.2426 14.3028L12.7122 13.7725C12.4193 13.4796 12.4193 13.0047 12.7122 12.7118C13.0051 12.4189 13.48 12.4189 13.7729 12.7118L14.3032 13.2421C14.5961 13.535 14.5961 14.0099 14.3032 14.3028Z" />
    <path d="M9 14.25C8.58579 14.25 8.25 14.5858 8.25 15V15.75C8.25 16.1642 8.58579 16.5 9 16.5C9.41421 16.5 9.75 16.1642 9.75 15.75V15C9.75 14.5858 9.41421 14.25 9 14.25Z" />
    <path d="M15.75 8.25C16.1642 8.25 16.5 8.58579 16.5 9C16.5 9.41421 16.1642 9.75 15.75 9.75H15C14.5858 9.75 14.25 9.41421 14.25 9C14.25 8.58579 14.5858 8.25 15 8.25H15.75Z" />
    <path d="M3.75 9C3.75 8.58579 3.41421 8.25 3 8.25H2.25C1.83579 8.25 1.5 8.58579 1.5 9C1.5 9.41421 1.83579 9.75 2.25 9.75H3C3.41421 9.75 3.75 9.41421 3.75 9Z" />
  </svg>
)

// Месяц — тёмная тема (макет, fill → currentColor).
export const IconMoon = (p) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.63758 1.85959C9.77379 2.083 9.78371 2.36126 9.66376 2.59381C9.23975 3.41586 9 4.34884 9 5.34C9 8.65371 11.6863 11.34 15 11.34L15.0028 11.34C15.2644 11.34 15.5071 11.4763 15.6432 11.6997C15.7794 11.9231 15.7893 12.2013 15.6693 12.4338C14.4245 14.8472 11.9059 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85889 4.85619 1.50167 8.99691 1.5C9.25857 1.49989 9.50137 1.63617 9.63758 1.85959ZM7.83646 3.11274C5.07963 3.65448 3 6.08438 3 9C3 12.3137 5.68629 15 9 15C10.9041 15 12.6019 14.1131 13.7017 12.728C10.1783 12.1131 7.5 9.03935 7.5 5.34C7.5 4.56513 7.61774 3.8169 7.83646 3.11274Z"
    />
  </svg>
)

export const IconRefresh = (p) => (
  <svg {...base} {...p}>
    <path d="M3 12a9 9 0 0 1 15.5-6.5M21 12a9 9 0 0 1-15.5 6.5" />
    <path d="M18.5 2v4h-4M5.5 22v-4h4" />
  </svg>
)

export const IconMessage = (p) => (
  <svg {...base} {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

export const IconMail = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

// Стилизованный «значок» Госуслуг (условный, не официальный логотип).
export const IconGos = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="11" opacity="0.28" />
    <circle cx="12" cy="12" r="6" />
  </svg>
)
